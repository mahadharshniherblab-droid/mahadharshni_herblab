// Owner login: email + password, then a one-time code sent by email, then a signed session token.
import crypto from 'node:crypto';

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';
const SESSION_SECRET = process.env.SESSION_SECRET ?? '';
const OTP_TTL_MS = 10 * 60 * 1000;
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

export const authConfigured = Boolean(ADMIN_EMAIL && ADMIN_PASSWORD && SESSION_SECRET);
export const adminEmail = ADMIN_EMAIL;

const otps = new Map(); // email -> { hash, expiresAt, attempts }
const loginAttempts = new Map(); // ip -> { count, resetAt }

const sha256 = (value) => crypto.createHash('sha256').update(String(value)).digest();

function sameSecret(a, b) {
  const left = sha256(a);
  const right = sha256(b);
  return crypto.timingSafeEqual(left, right);
}

/** Simple in-memory throttle so the login form cannot be brute-forced. */
export function allowAttempt(ip, limit = 10, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}

export function resetAttempts(ip) {
  loginAttempts.delete(ip);
}

export function checkPassword(email, password) {
  if (!authConfigured) return false;
  const emailOk = sameSecret(String(email ?? '').trim().toLowerCase(), ADMIN_EMAIL);
  const passwordOk = sameSecret(String(password ?? ''), ADMIN_PASSWORD);
  return emailOk && passwordOk;
}

/** Creates a 6-digit code and keeps only its hash. */
export function issueOtp(email) {
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
  otps.set(email, { hash: sha256(code), expiresAt: Date.now() + OTP_TTL_MS, attempts: 0 });
  return code;
}

export function verifyOtp(email, code) {
  const entry = otps.get(email);
  if (!entry) return { ok: false, error: 'Please request a new code.' };
  if (Date.now() > entry.expiresAt) {
    otps.delete(email);
    return { ok: false, error: 'That code has expired. Please request a new one.' };
  }
  entry.attempts += 1;
  if (entry.attempts > 5) {
    otps.delete(email);
    return { ok: false, error: 'Too many attempts. Please sign in again.' };
  }
  const given = String(code ?? '').trim();
  if (/^\d{6}$/.test(given) && crypto.timingSafeEqual(sha256(given), entry.hash)) {
    otps.delete(email);
    return { ok: true };
  }
  return { ok: false, error: 'That code is not correct.' };
}

const sign = (data) => crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');

export function createToken(email) {
  const payload = Buffer.from(JSON.stringify({ sub: email, exp: Date.now() + SESSION_TTL_MS })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function readToken(token) {
  if (!token || !SESSION_SECRET) return null;
  const [payload, signature] = String(token).split('.');
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.exp || Date.now() > data.exp) return null;
    if (String(data.sub).toLowerCase() !== ADMIN_EMAIL) return null;
    return data;
  } catch {
    return null;
  }
}

/** Express middleware: requires `Authorization: Bearer <token>`. */
export function requireAdmin(req, res, next) {
  const header = req.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const session = readToken(token);
  if (!session) return res.status(401).json({ error: 'Please sign in again.' });
  req.admin = session;
  next();
}
