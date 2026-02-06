// Auth handlers: signup, login, verify-2fa, logout
import { json, parseBody } from '../router.js';
import { hashPassword, verifyPassword } from '../services/password.js';
import { queries } from '../db/queries.js';

const SESSION_TTL_DAYS = 7;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function handleSignup(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body) return json({ error: 'Invalid request body' }, 400);

  const { email, password, displayName, role } = body;

  // Validate
  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: 'Valid email is required' }, 400);
  }
  if (!password || password.length < 8) {
    return json({ error: 'Password must be at least 8 characters' }, 400);
  }
  if (!displayName || displayName.trim().length < 1 || displayName.length > 100) {
    return json({ error: 'Display name is required (max 100 chars)' }, 400);
  }
  const validRole = (role === 'teacher') ? 'teacher' : 'student';

  // Check if email exists
  const existing = await queries.getUserByEmail(reqCtx.env.DB, email.toLowerCase()).first();
  if (existing) {
    return json({ error: 'Email already registered' }, 409);
  }

  // Hash password
  const pepper = reqCtx.env.PASSWORD_PEPPER || '';
  const passwordHash = await hashPassword(password, pepper);

  // Create user
  const userId = crypto.randomUUID();
  await queries.createUser(reqCtx.env.DB, {
    id: userId,
    email: email.toLowerCase(),
    displayName: displayName.trim(),
    passwordHash,
    role: validRole
  }).run();

  return json({
    userId,
    email: email.toLowerCase(),
    displayName: displayName.trim(),
    role: validRole,
    requiresTfaSetup: true
  }, 201);
}

export async function handleLogin(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body) return json({ error: 'Invalid request body' }, 400);

  const { email, password } = body;
  if (!email || !password) {
    return json({ error: 'Email and password are required' }, 400);
  }

  // Find user
  const user = await queries.getUserByEmail(reqCtx.env.DB, email.toLowerCase()).first();
  if (!user) {
    return json({ error: 'Invalid email or password' }, 401);
  }

  // Verify password
  const pepper = reqCtx.env.PASSWORD_PEPPER || '';
  const valid = await verifyPassword(password, user.password_hash, pepper);
  if (!valid) {
    return json({ error: 'Invalid email or password' }, 401);
  }

  // Check if 2FA is set up and verified
  if (user.tfa_verified) {
    // User has 2FA — return userId + method, require 2FA verification
    return json({
      userId: user.id,
      requiresTfa: true,
      tfaMethod: user.tfa_method
    });
  }

  // Check if user has started but not finished 2FA setup
  if (user.tfa_method && !user.tfa_verified) {
    return json({
      userId: user.id,
      requiresTfaSetup: true,
      tfaMethod: user.tfa_method
    });
  }

  // No 2FA set up at all — require setup
  return json({
    userId: user.id,
    requiresTfaSetup: true
  });
}

export async function handleVerify2fa(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body) return json({ error: 'Invalid request body' }, 400);

  const { userId, code, method } = body;
  if (!userId || !code) {
    return json({ error: 'userId and code are required' }, 400);
  }

  const user = await queries.getUserById(reqCtx.env.DB, userId).first();
  if (!user) {
    return json({ error: 'User not found' }, 404);
  }

  let verified = false;

  if (method === 'totp' || user.tfa_method === 'totp') {
    // Verify TOTP
    const { verifyTotp } = await import('../services/totp.js');
    const { decrypt } = await import('../services/crypto.js');

    const totpRecord = await queries.getTotpSecret(reqCtx.env.DB, userId).first();
    if (!totpRecord) {
      return json({ error: 'TOTP not set up' }, 400);
    }

    const encryptionKey = reqCtx.env.ENCRYPTION_KEY;
    const secretHex = await decrypt(totpRecord.secret, encryptionKey);
    const secretBytes = hexToBuf(secretHex);
    verified = await verifyTotp(secretBytes, code);

    // Check backup codes if TOTP fails
    if (!verified && totpRecord.backup_codes) {
      const { hashCode } = await import('../services/crypto.js');
      const backupCodes = JSON.parse(totpRecord.backup_codes);
      const codeHash = await hashCode(code);
      const idx = backupCodes.indexOf(codeHash);
      if (idx !== -1) {
        verified = true;
        // Remove used backup code
        backupCodes.splice(idx, 1);
        await queries.saveTotpSecret(reqCtx.env.DB, {
          userId,
          secret: totpRecord.secret,
          backupCodes: JSON.stringify(backupCodes)
        }).run();
      }
    }
  } else if (method === 'email' || user.tfa_method === 'email') {
    // Verify email OTP
    const { hashCode } = await import('../services/crypto.js');
    const otp = await queries.getActiveEmailOtp(reqCtx.env.DB, userId, 'login').first();
    if (!otp) {
      return json({ error: 'No active OTP. Request a new one.' }, 400);
    }

    const codeHash = await hashCode(code);
    if (codeHash === otp.code) {
      verified = true;
      await queries.markEmailOtpUsed(reqCtx.env.DB, otp.id).run();
    }
  } else {
    return json({ error: 'Unknown 2FA method' }, 400);
  }

  if (!verified) {
    return json({ error: 'Invalid verification code' }, 401);
  }

  // Mark 2FA as verified if first time
  if (!user.tfa_verified) {
    await queries.setTfaVerified(reqCtx.env.DB, userId).run();
  }

  // Create session
  return await createSessionResponse(reqCtx, user);
}

export async function handleLogout(reqCtx) {
  if (reqCtx.session) {
    await queries.deleteSession(reqCtx.env.DB, reqCtx.session.id).run();
  }

  return json({ ok: true }, 200, {
    'Set-Cookie': 'session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
  });
}

// Shared: create a session and return response with cookie
export async function createSessionResponse(reqCtx, user) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const ip = reqCtx.request.headers.get('CF-Connecting-IP') || '';
  const ua = reqCtx.request.headers.get('User-Agent') || '';

  await queries.createSession(reqCtx.env.DB, {
    id: sessionId,
    userId: user.id,
    expiresAt,
    ipAddress: ip,
    userAgent: ua
  }).run();

  const maxAge = SESSION_TTL_DAYS * 24 * 60 * 60;
  const isSecure = new URL(reqCtx.request.url).protocol === 'https:';
  const cookieParts = [
    `session=${sessionId}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${maxAge}`
  ];
  if (isSecure) cookieParts.push('Secure');

  return json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      role: user.role,
      tfaMethod: user.tfa_method
    }
  }, 200, {
    'Set-Cookie': cookieParts.join('; ')
  });
}

function hexToBuf(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}
