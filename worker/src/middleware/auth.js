// worker/src/middleware/auth.js
// JWT-based admin authentication using the Web Crypto API.
// Tokens are stored in HTTP-only cookies.

const TOKEN_COOKIE_NAME = 'admin_token';
const TOKEN_EXPIRY_SECONDS = 60 * 60 * 8; // 8 hours

// ─── JWT Utilities (Web Crypto) ───────────────────────────────────────────────

function base64UrlEncode(input) {
  let base64;
  if (typeof input === 'string') {
    base64 = btoa(unescape(encodeURIComponent(input)));
  } else {
    base64 = btoa(String.fromCharCode(...new Uint8Array(input)));
  }
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = 4 - (padded.length % 4);
  const base64 = padding !== 4 ? padded + '='.repeat(padding) : padded;
  return atob(base64);
}

async function getHmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Creates a signed JWT token.
 */
export async function createToken(payload, secret) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY_SECONDS,
  }));

  const data = `${header}.${body}`;
  const key = await getHmacKey(secret);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const sig = base64UrlEncode(sigBuffer);

  return `${data}.${sig}`;
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * Throws if invalid or expired.
 */
export async function verifyToken(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token format');

  const [header, body, sig] = parts;
  const data = `${header}.${body}`;

  const key = await getHmacKey(secret);

  // Decode signature
  const sigBytes = Uint8Array.from(base64UrlDecode(sig), (c) => c.charCodeAt(0));

  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    sigBytes,
    new TextEncoder().encode(data)
  );

  if (!valid) throw new Error('Invalid token signature');

  const payload = JSON.parse(base64UrlDecode(body));

  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }

  return payload;
}

// ─── Password Hashing (SHA-256) ───────────────────────────────────────────────

/**
 * Hashes a password using SHA-256.
 * The hash is compared against ADMIN_PASSWORD_HASH env variable.
 */
export async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ─── Cookie Helpers ───────────────────────────────────────────────────────────

/**
 * Reads the admin token from cookies.
 */
export function getTokenFromCookie(c) {
  const cookieHeader = c.req.header('Cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((pair) => {
      const [key, ...val] = pair.trim().split('=');
      return [key, val ? val.join('=') : ''];
    })
  );
  return cookies[TOKEN_COOKIE_NAME] || null;
}

/**
 * Reads the admin token from Authorization header (Bearer ...) or HTTP-only cookies.
 */
export function getTokenFromRequest(c) {
  const authHeader = c.req.header('Authorization') || c.req.header('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const bearer = authHeader.slice(7).trim();
    if (bearer) return bearer;
  }
  return getTokenFromCookie(c);
}

/**
 * Sets the admin auth cookie on the response.
 */
export function setAuthCookie(c, token) {
  const url = c.req.url || '';
  const isSecure = url.startsWith('https://');

  const cookieParts = [
    `${TOKEN_COOKIE_NAME}=${token}`,
    'HttpOnly',
    'Path=/',
    `Max-Age=${TOKEN_EXPIRY_SECONDS}`,
  ];

  if (isSecure) {
    cookieParts.push('Secure');
    cookieParts.push('SameSite=None');
  } else {
    cookieParts.push('SameSite=Lax');
  }

  c.header('Set-Cookie', cookieParts.join('; '));
}

/**
 * Clears the admin auth cookie.
 */
export function clearAuthCookie(c) {
  const url = c.req.url || '';
  const isSecure = url.startsWith('https://');

  const cookieParts = [
    `${TOKEN_COOKIE_NAME}=`,
    'HttpOnly',
    'Path=/',
    'Max-Age=0',
  ];

  if (isSecure) {
    cookieParts.push('Secure');
    cookieParts.push('SameSite=None');
  } else {
    cookieParts.push('SameSite=Lax');
  }

  c.header('Set-Cookie', cookieParts.join('; '));
}

// ─── Middleware ───────────────────────────────────────────────────────────────

/**
 * Hono middleware that verifies admin JWT from Authorization header or cookie.
 * Attaches the decoded payload to c.set('admin', payload).
 */
export async function requireAdmin(c, next) {
  const token = getTokenFromRequest(c);

  if (!token) {
    return c.json({ success: false, message: 'Authentication required.' }, 401);
  }

  try {
    const secret = c.env.SESSION_SECRET;
    if (!secret) {
      return c.json({ success: false, message: 'Server configuration error: SESSION_SECRET is missing.' }, 500);
    }

    const payload = await verifyToken(token, secret);
    c.set('admin', payload);
    await next();
  } catch (err) {
    return c.json({ success: false, message: 'Invalid or expired session. Please log in again.' }, 401);
  }
}
