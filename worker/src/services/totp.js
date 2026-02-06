// RFC 6238 TOTP implementation via WebCrypto (HMAC-SHA1)

const TOTP_PERIOD = 30;
const TOTP_DIGITS = 6;
const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

// Generate TOTP code for a given secret and time
export async function generateTotp(secretBytes, time = Date.now()) {
  const counter = Math.floor(time / 1000 / TOTP_PERIOD);
  return await hmacOtp(secretBytes, counter);
}

// Verify TOTP with a window of +/- 1 period
export async function verifyTotp(secretBytes, code, time = Date.now()) {
  const counter = Math.floor(time / 1000 / TOTP_PERIOD);
  for (let i = -1; i <= 1; i++) {
    const expected = await hmacOtp(secretBytes, counter + i);
    if (timingSafeEqual(code, expected)) return true;
  }
  return false;
}

// Build otpauth:// URI for QR code generation
export function buildTotpUri(secretBytes, email, issuer = 'OSI Trainer') {
  const secret = base32Encode(secretBytes);
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedEmail = encodeURIComponent(email);
  return `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=${TOTP_DIGITS}&period=${TOTP_PERIOD}`;
}

// Base32 encode for TOTP secret sharing
export function base32Encode(buf) {
  let bits = '';
  for (const byte of buf) {
    bits += byte.toString(2).padStart(8, '0');
  }
  let result = '';
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.substring(i, i + 5).padEnd(5, '0');
    result += BASE32_CHARS[parseInt(chunk, 2)];
  }
  return result;
}

// Base32 decode
export function base32Decode(str) {
  let bits = '';
  for (const ch of str.toUpperCase()) {
    const idx = BASE32_CHARS.indexOf(ch);
    if (idx === -1) continue;
    bits += idx.toString(2).padStart(5, '0');
  }
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.substring(i * 8, (i + 1) * 8), 2);
  }
  return bytes;
}

async function hmacOtp(secretBytes, counter) {
  // Import key for HMAC-SHA1
  const key = await crypto.subtle.importKey(
    'raw',
    secretBytes,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );

  // Counter as 8-byte big-endian
  const counterBuf = new ArrayBuffer(8);
  const view = new DataView(counterBuf);
  view.setUint32(4, counter, false); // big-endian lower 32 bits

  const hmac = new Uint8Array(await crypto.subtle.sign('HMAC', key, counterBuf));

  // Dynamic truncation
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code = (
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)
  ) % Math.pow(10, TOTP_DIGITS);

  return code.toString().padStart(TOTP_DIGITS, '0');
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
