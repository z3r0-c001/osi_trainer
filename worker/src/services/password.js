// PBKDF2 password hashing via WebCrypto (Workers-compatible)

const ITERATIONS = 100000;
const HASH_ALGO = 'SHA-256';
const KEY_LENGTH = 32; // bytes
const SALT_LENGTH = 16; // bytes

export async function hashPassword(password, pepper) {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const pepperedPassword = password + pepper;

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(pepperedPassword),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: HASH_ALGO },
    keyMaterial,
    KEY_LENGTH * 8
  );

  const saltHex = bufToHex(salt);
  const hashHex = bufToHex(new Uint8Array(derivedBits));
  return `pbkdf2:${ITERATIONS}:${saltHex}:${hashHex}`;
}

export async function verifyPassword(password, storedHash, pepper) {
  const parts = storedHash.split(':');
  if (parts[0] !== 'pbkdf2') return false;

  const iterations = parseInt(parts[1], 10);
  const salt = hexToBuf(parts[2]);
  const expectedHash = parts[3];
  const pepperedPassword = password + pepper;

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(pepperedPassword),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: HASH_ALGO },
    keyMaterial,
    KEY_LENGTH * 8
  );

  const derivedHex = bufToHex(new Uint8Array(derivedBits));
  return timingSafeEqual(derivedHex, expectedHash);
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

// Constant-time string comparison
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
