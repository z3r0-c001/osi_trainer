// Email OTP send + verify handlers
import { json, parseBody } from '../router.js';
import { generateOtp, hashCode } from '../services/crypto.js';
import { sendOtpEmail } from '../services/email.js';
import { queries } from '../db/queries.js';

const OTP_TTL_MINUTES = 5;

async function resolveUserFromBody(db, userId) {
  if (!userId) return null;
  const row = await queries.getUserById(db, userId).first();
  if (!row) return null;
  return { id: row.id, email: row.email, displayName: row.display_name, role: row.role };
}

export async function handleRequestEmailOtp(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body || !body.userId) {
    return json({ error: 'userId is required' }, 400);
  }

  const { userId, purpose } = body;
  const validPurpose = purpose === 'setup' ? 'setup' : 'login';

  // Get user
  const user = await queries.getUserById(reqCtx.env.DB, userId).first();
  if (!user) {
    return json({ error: 'User not found' }, 404);
  }

  // Generate OTP
  const code = generateOtp();
  const codeHash = await hashCode(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString();

  // Save to DB
  await queries.createEmailOtp(reqCtx.env.DB, {
    id: crypto.randomUUID(),
    userId,
    code: codeHash,
    purpose: validPurpose,
    expiresAt
  }).run();

  // Send email
  const apiKey = reqCtx.env.EMAIL_API_KEY;
  if (apiKey && !apiKey.startsWith('re_dev')) {
    try {
      await sendOtpEmail(user.email, code, apiKey);
    } catch (err) {
      console.error('Email send error:', err.message);
      return json({ error: 'Failed to send email. Try again.' }, 500);
    }
  } else {
    // Dev mode — log OTP to console
    console.log(`[DEV] OTP for ${user.email}: ${code}`);
  }

  return json({ ok: true, message: 'Verification code sent to your email' });
}

export async function handleSetupEmailOtp(reqCtx) {
  const body = await parseBody(reqCtx.request);
  const user = reqCtx.user || await resolveUserFromBody(reqCtx.env.DB, body?.userId);
  if (!user) return json({ error: 'userId is required' }, 400);

  // Set 2FA method to email
  await queries.updateTfaMethod(reqCtx.env.DB, user.id, 'email').run();

  // Send a setup OTP
  const code = generateOtp();
  const codeHash = await hashCode(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString();

  await queries.createEmailOtp(reqCtx.env.DB, {
    id: crypto.randomUUID(),
    userId: user.id,
    code: codeHash,
    purpose: 'setup',
    expiresAt
  }).run();

  // Send email
  const apiKey = reqCtx.env.EMAIL_API_KEY;
  if (apiKey && !apiKey.startsWith('re_dev')) {
    try {
      await sendOtpEmail(user.email, code, apiKey);
    } catch (err) {
      console.error('Email send error:', err.message);
      return json({ error: 'Failed to send email' }, 500);
    }
  } else {
    console.log(`[DEV] Setup OTP for ${user.email}: ${code}`);
  }

  return json({ ok: true, message: 'Verification code sent. Confirm to complete setup.' });
}

export async function handleVerifyEmailSetup(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body || !body.code) {
    return json({ error: 'Verification code is required' }, 400);
  }

  const user = reqCtx.user || await resolveUserFromBody(reqCtx.env.DB, body.userId);
  if (!user) return json({ error: 'userId is required' }, 400);
  const otp = await queries.getActiveEmailOtp(reqCtx.env.DB, user.id, 'setup').first();
  if (!otp) {
    return json({ error: 'No active OTP. Request a new one.' }, 400);
  }

  const codeHash = await hashCode(body.code);
  if (codeHash !== otp.code) {
    return json({ error: 'Invalid code' }, 401);
  }

  await queries.markEmailOtpUsed(reqCtx.env.DB, otp.id).run();
  await queries.setTfaVerified(reqCtx.env.DB, user.id).run();

  return json({ ok: true, message: 'Email 2FA verified successfully' });
}
