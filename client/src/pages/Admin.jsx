import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import PriceEditor from '../components/admin/PriceEditor.jsx';
import ProductEditor from '../components/admin/ProductEditor.jsx';
import IngredientEditor from '../components/admin/IngredientEditor.jsx';
import HerbalDataEditor from '../components/admin/HerbalDataEditor.jsx';
import OfferEditor from '../components/admin/OfferEditor.jsx';
import { adminContent, adminLogin, adminSession, adminVerify } from '../api.js';

const TOKEN_KEY = 'mh-admin-token';

function readToken() {
  try { return localStorage.getItem(TOKEN_KEY) ?? ''; } catch { return ''; }
}

function storeToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch { /* ignore */ }
}

const TABS = [
  { key: 'price', label: 'Price' },
  { key: 'products', label: 'Products' },
  { key: 'ingredients', label: 'Ingredients' },
  { key: 'herbal', label: 'Herbal data' },
  { key: 'offer', label: 'Seasonal offers' }
];

export default function Admin() {
  const [token, setToken] = useState(readToken);
  const [step, setStep] = useState(() => (readToken() ? 'checking' : 'login'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('price');
  const [data, setData] = useState(null);

  function signOut() {
    storeToken('');
    setToken('');
    setData(null);
    setPassword('');
    setOtp('');
    setError('');
    setStep('login');
  }

  async function openDashboard(current) {
    const payload = await adminContent(current);
    setData(payload);
    setStep('dashboard');
  }

  // Warm the API connection while the owner types, so the first Continue click is not a cold request.
  useEffect(() => {
    fetch('/api/health').catch(() => {});
  }, []);

  // A saved session keeps the owner signed in for 8 hours.
  useEffect(() => {
    if (step !== 'checking') return;
    let cancelled = false;
    adminSession(token)
      .then(() => adminContent(token))
      .then((payload) => { if (!cancelled) { setData(payload); setStep('dashboard'); } })
      .catch(() => {
        if (cancelled) return;
        storeToken('');
        setToken('');
        setStep('login');
      });
    return () => { cancelled = true; };
  }, [step, token]);

  const refresh = async () => {
    try {
      setData(await adminContent(token));
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  async function submitLogin(event) {
    event.preventDefault();
    setError(''); setBusy(true);
    try {
      let result;
      try {
        result = await adminLogin(email, password);
      } catch (e) {
        // A starting API (or the dev proxy) can fail the very first request. Retry once before
        // showing an error, so correct credentials work on the first click.
        if (e.status !== 500 && e.status !== 503 && e.status !== 504) throw e;
        await new Promise((resolve) => setTimeout(resolve, 700));
        result = await adminLogin(email, password);
      }
      if (result?.ok !== true || typeof result.sentTo !== 'string' || result.sentTo !== email.trim().toLowerCase()) {
        throw new Error('The login server could not confirm your sign-in. Please try again.');
      }
      setSentTo(result.sentTo);
      setOtp('');
      setStep('otp');
    } catch (e) {
      setError(e.message);
    } finally { setBusy(false); }
  }

  async function submitOtp(event) {
    event.preventDefault();
    setError(''); setBusy(true);
    try {
      const result = await adminVerify(email, otp);
      storeToken(result.token);
      setToken(result.token);
      await openDashboard(result.token);
      setPassword('');
      setOtp('');
    } catch (e) {
      if (e.status === 401) signOut();
      setError(e.message);
    } finally { setBusy(false); }
  }

  if (step === 'checking') {
    return (
      <section className="section container center admin-gate">
        <p className="muted">Checking your session…</p>
      </section>
    );
  }

  if (step === 'login' || step === 'otp') {
    return (
      <section className="section admin-gate">
        <div className="container admin-gate__inner">
          <Logo size={84} />
          <h1>Owner login</h1>
          <p className="admin-hint">
            {step === 'login'
              ? 'Only the shop owner can sign in here. Enter the owner email address and password.'
              : `A 6-digit code has been sent to ${sentTo}. Open that email and type the code below.`}
          </p>

          {step === 'login' ? (
            <form className="admin-card admin-gate__card" onSubmit={submitLogin}>
              <label className="admin-field">
                <span>Email</span>
                <input
                  type="email"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck="false"
                  className="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                />
              </label>
              <label className="admin-field">
                <span>Password</span>
                <div className="admin-password">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="admin-password__toggle"
                    onClick={() => setShowPassword((shown) => !shown)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.1 4" />
                        <path d="M6.6 6.7A17.3 17.3 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.4-.9" />
                        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                        <path d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>
              <button className="btn btn--gold btn--block" disabled={busy}>{busy ? 'Checking…' : 'Continue'}</button>
              {error && <p className="admin-error">{error}</p>}
            </form>
          ) : (
            <form className="admin-card admin-gate__card" onSubmit={submitOtp}>
              <label className="admin-field">
                <span>Login code from the email</span>
                <input
                  inputMode="numeric" autoComplete="one-time-code" maxLength="6" pattern="\d{6}"
                  value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} required
                />
              </label>
              <button className="btn btn--gold btn--block" disabled={busy}>{busy ? 'Checking…' : 'Open dashboard'}</button>
              {error && <p className="admin-error">{error}</p>}
              <button type="button" className="link-btn" onClick={() => { setStep('login'); setError(''); setOtp(''); }}>
                Use a different email or password
              </button>
            </form>
          )}

          <Link className="link-btn" to="/">Back to the website</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section admin">
      <div className="container">
        <header className="admin-head">
          <div>
            <p className="admin-eyebrow">Mahadharshni Herblab</p>
            <h1>Owner dashboard</h1>
          </div>
          <div className="admin-head__actions">
            <Link className="btn btn--ghost" to="/" target="_blank" rel="noreferrer">View website</Link>
            <button className="btn btn--primary" onClick={signOut}>Sign out</button>
          </div>
        </header>

        <nav className="admin-tabs">
          {TABS.map((item) => (
            <button
              key={item.key}
              className={tab === item.key ? 'is-active' : undefined}
              aria-current={tab === item.key ? 'page' : undefined}
              onClick={() => setTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {!data ? (
          <p className="admin-hint">Loading your content…</p>
        ) : (
          <>
            {tab === 'price' && <PriceEditor token={token} data={data} refresh={refresh} onExpired={signOut} />}
            {tab === 'products' && <ProductEditor token={token} data={data} refresh={refresh} onExpired={signOut} />}
            {tab === 'ingredients' && <IngredientEditor token={token} data={data} refresh={refresh} onExpired={signOut} />}
            {tab === 'herbal' && <HerbalDataEditor token={token} data={data} refresh={refresh} onExpired={signOut} />}
            {tab === 'offer' && <OfferEditor token={token} data={data} refresh={refresh} onExpired={signOut} />}
          </>
        )}
      </div>
    </section>
  );
}
