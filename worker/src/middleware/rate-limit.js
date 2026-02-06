// KV-based rate limiting middleware
import { json } from '../router.js';

const RATE_LIMITS = {
  '/api/auth/login': { max: 5, windowSeconds: 60, keyPrefix: 'login' },
  '/api/auth/signup': { max: 3, windowSeconds: 3600, keyPrefix: 'signup' },
  '/api/auth/request-email-otp': { max: 1, windowSeconds: 60, keyPrefix: 'otp' },
  '/api/auth/verify-2fa': { max: 5, windowSeconds: 60, keyPrefix: 'verify2fa' }
};

export async function rateLimitMiddleware(reqCtx) {
  const { path, request, env } = reqCtx;

  if (request.method !== 'POST') return null;

  const limit = RATE_LIMITS[path];
  if (!limit) return null;

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `rl:${limit.keyPrefix}:${ip}`;

  try {
    const current = await env.RATE_LIMIT.get(key, 'json');
    const now = Date.now();

    if (current && current.count >= limit.max && (now - current.start) < limit.windowSeconds * 1000) {
      const retryAfter = Math.ceil((current.start + limit.windowSeconds * 1000 - now) / 1000);
      return json(
        { error: 'Too many requests', retryAfter },
        429,
        { 'Retry-After': String(retryAfter) }
      );
    }

    if (!current || (now - current.start) >= limit.windowSeconds * 1000) {
      // New window
      await env.RATE_LIMIT.put(key, JSON.stringify({ count: 1, start: now }), {
        expirationTtl: limit.windowSeconds
      });
    } else {
      // Increment
      await env.RATE_LIMIT.put(key, JSON.stringify({ count: current.count + 1, start: current.start }), {
        expirationTtl: limit.windowSeconds
      });
    }
  } catch {
    // If KV fails, allow request through
  }

  return null;
}
