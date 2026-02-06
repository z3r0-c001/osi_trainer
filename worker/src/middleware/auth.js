// Session cookie verification middleware
import { json } from '../router.js';

// Paths that don't require authentication
const PUBLIC_PATHS = [
  '/api/health',
  '/api/auth/signup',
  '/api/auth/login',
  '/api/auth/verify-2fa',
  '/api/auth/request-email-otp',
  '/api/auth/setup-totp',
  '/api/auth/verify-totp-setup',
  '/api/auth/setup-email-otp',
  '/api/auth/verify-email-setup'
];

export async function authMiddleware(reqCtx) {
  const { path, request, env } = reqCtx;

  // Skip auth for public paths
  if (PUBLIC_PATHS.includes(path) || request.method === 'OPTIONS') {
    return null;
  }

  // Extract session token from cookie
  const cookie = request.headers.get('Cookie') || '';
  const sessionToken = parseCookie(cookie, 'session');

  if (!sessionToken) {
    return json({ error: 'Authentication required' }, 401);
  }

  // Look up session in D1
  const session = await env.DB.prepare(
    'SELECT s.*, u.id as uid, u.email, u.display_name, u.role, u.tfa_method, u.tfa_verified FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = ? AND s.expires_at > datetime(\'now\')'
  ).bind(sessionToken).first();

  if (!session) {
    return json({ error: 'Session expired' }, 401);
  }

  // Attach user to context
  reqCtx.user = {
    id: session.uid,
    email: session.email,
    displayName: session.display_name,
    role: session.role,
    tfaMethod: session.tfa_method,
    tfaVerified: session.tfa_verified
  };
  reqCtx.session = { id: session.id, expiresAt: session.expires_at };

  return null; // continue
}

function parseCookie(cookieStr, name) {
  const match = cookieStr.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}
