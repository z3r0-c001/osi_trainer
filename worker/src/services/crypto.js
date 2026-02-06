// Crypto utilities: random codes, AES-GCM encryption

// Generate a random join code using unambiguous characters
const UNAMBIGUOUS_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generateJoinCode(length = 6) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes).map(b => UNAMBIGUOUS_CHARS[b % UNAMBIGUOUS_CHARS.length]).join('');
}

// Generate a 6-digit numeric OTP
export function generateOtp() {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const num = new DataView(bytes.buffer).getUint32(0) % 1000000;
  return num.toString().padStart(6, '0');
}

// Generate a random TOTP secret (20 bytes = 160 bits, standard for HMAC-SHA1)
export function generateTotpSecret() {
  return crypto.getRandomValues(new Uint8Array(20));
}

// AES-256-GCM encrypt
export async function encrypt(plaintext, keyHex) {
  const key = await importKey(keyHex);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  return bufToHex(iv) + ':' + bufToHex(new Uint8Array(ciphertext));
}

// AES-256-GCM decrypt
export async function decrypt(stored, keyHex) {
  const [ivHex, cipherHex] = stored.split(':');
  const key = await importKey(keyHex);
  const iv = hexToBuf(ivHex);
  const ciphertext = hexToBuf(cipherHex);

  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );

  return new TextDecoder().decode(plaintext);
}

// Generate backup codes (8 codes, 8 chars each)
export function generateBackupCodes() {
  const codes = [];
  for (let i = 0; i < 8; i++) {
    const bytes = crypto.getRandomValues(new Uint8Array(4));
    codes.push(bufToHex(bytes));
  }
  return codes;
}

// Hash a backup code for storage
export async function hashCode(code) {
  const encoded = new TextEncoder().encode(code);
  const hash = await crypto.subtle.digest('SHA-256', encoded);
  return bufToHex(new Uint8Array(hash));
}

async function importKey(keyHex) {
  // Key should be 32 bytes (64 hex chars) for AES-256
  // If shorter, pad with the key material repeated
  let normalizedHex = keyHex.replace(/[^0-9a-fA-F]/g, '');
  while (normalizedHex.length < 64) {
    normalizedHex += normalizedHex;
  }
  normalizedHex = normalizedHex.substring(0, 64);

  const keyBytes = hexToBuf(normalizedHex);
  return crypto.subtle.importKey('raw', keyBytes, 'AES-GCM', false, ['encrypt', 'decrypt']);
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
