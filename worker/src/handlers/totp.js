// TOTP setup + verification handlers
import { json, parseBody } from '../router.js';
import { buildTotpUri, verifyTotp, base32Encode } from '../services/totp.js';
import { generateTotpSecret, encrypt, generateBackupCodes, hashCode } from '../services/crypto.js';
import { queries } from '../db/queries.js';

export async function handleSetupTotp(reqCtx) {
  const user = reqCtx.user || await resolveUser(reqCtx);
  if (!user) return json({ error: 'userId is required' }, 400);

  // Generate secret
  const secretBytes = generateTotpSecret();
  const secretHex = bufToHex(secretBytes);

  // Encrypt for storage
  const encryptionKey = reqCtx.env.ENCRYPTION_KEY;
  const encryptedSecret = await encrypt(secretHex, encryptionKey);

  // Generate backup codes
  const backupCodes = generateBackupCodes();
  const hashedCodes = await Promise.all(backupCodes.map(c => hashCode(c)));

  // Save to DB
  await queries.saveTotpSecret(reqCtx.env.DB, {
    userId: user.id,
    secret: encryptedSecret,
    backupCodes: JSON.stringify(hashedCodes)
  }).run();

  // Set tfa_method on user
  await queries.updateTfaMethod(reqCtx.env.DB, user.id, 'totp').run();

  // Build QR URI
  const uri = buildTotpUri(secretBytes, user.email);
  const secret32 = base32Encode(secretBytes);

  return json({
    totpUri: uri,
    secret: secret32,
    backupCodes
  });
}

export async function handleVerifyTotpSetup(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body || !body.code) {
    return json({ error: 'Verification code is required' }, 400);
  }

  const user = reqCtx.user || await resolveUserFromBody(reqCtx.env.DB, body.userId);
  if (!user) return json({ error: 'userId is required' }, 400);
  const totpRecord = await queries.getTotpSecret(reqCtx.env.DB, user.id).first();
  if (!totpRecord) {
    return json({ error: 'TOTP not set up. Call setup-totp first.' }, 400);
  }

  // Decrypt secret
  const { decrypt } = await import('../services/crypto.js');
  const encryptionKey = reqCtx.env.ENCRYPTION_KEY;
  const secretHex = await decrypt(totpRecord.secret, encryptionKey);
  const secretBytes = hexToBuf(secretHex);

  // Verify
  const valid = await verifyTotp(secretBytes, body.code);
  if (!valid) {
    return json({ error: 'Invalid code. Try again.' }, 401);
  }

  // Mark user as 2FA verified
  await queries.setTfaVerified(reqCtx.env.DB, user.id).run();

  return json({ ok: true, message: 'TOTP verified successfully' });
}

// Resolve user from body userId when no session (during initial 2FA setup)
async function resolveUser(reqCtx) {
  const body = await parseBody(reqCtx.request);
  return await resolveUserFromBody(reqCtx.env.DB, body?.userId);
}

async function resolveUserFromBody(db, userId) {
  if (!userId) return null;
  const row = await queries.getUserById(db, userId).first();
  if (!row) return null;
  return { id: row.id, email: row.email, displayName: row.display_name, role: row.role };
}

function bufToHex(buf) {
  return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('');
}

function hexToBuf(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}
