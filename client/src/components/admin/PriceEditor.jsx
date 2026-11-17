import { useState } from 'react';
import { adminSavePricing } from '../../api.js';

/** The strip above the header. Product prices live in the Products tab. */
export default function PriceEditor({ token, data, refresh, onExpired }) {
  const [topPercent, setTopPercent] = useState(data.topOffer?.percent ?? 10);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');


  async function save(event) {
    event.preventDefault();
    setBusy(true); setStatus(''); setError('');
    try {
      await adminSavePricing({ topOfferPercent: Number(topPercent) }, token);
      await refresh();
      setStatus('First-order discount saved.');
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
    } finally { setBusy(false); }
  }

  return (
    <div className="admin-panel">
      <h2 className="admin-h2">Price</h2>

      <form className="admin-card" onSubmit={save}>
        <h3 className="admin-h3">First-order offer</h3>
        <p className="admin-hint">This percentage appears in the banner and applies to eligible first orders.</p>
        <div className="admin-grid">
          <label className="admin-field">
            <span>First-order discount (%)</span>
            <input type="number" min="0" max="90" value={topPercent} onChange={(e) => setTopPercent(e.target.value)} required />
          </label>
        </div>

        <div className="admin-actions">
          <button className="btn btn--gold" disabled={busy}>{busy ? 'Saving…' : 'Save first-order offer'}</button>
          {status && <span className="admin-status">{status}</span>}
          {error && <span className="admin-error">{error}</span>}
        </div>
      </form>
    </div>
  );
}
