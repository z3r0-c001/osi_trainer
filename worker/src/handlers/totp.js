// TOTP setup + verification handlers
import { json, parseBody } from '../router.js';
import { generateTotpSecret, buildTotpUri, verifyTotp, base32Encode } from '../services/totp.js';
import { encrypt, generateBackupCodes, hashCode } from '../services/crypto.js';
import { queries } from '../db/queries.js';

export async function handleSetupTotp(reqCtx) {
  const user = reqCtx.user;

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

  const user = reqCtx.user;
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
