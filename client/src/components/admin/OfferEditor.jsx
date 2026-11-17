import { useState } from 'react';
import { adminDeleteOffer, adminSaveOffer } from '../../api.js';
import { ImageField } from './fields.jsx';

export default function OfferEditor({ token, data, refresh, onExpired }) {
  const [adding, setAdding] = useState(false);
  const offers = data.offers ?? [];
  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <h2 className="admin-h2">Seasonal offers</h2>
        <button className="btn btn--gold" onClick={() => setAdding(!adding)}>{adding ? 'Close' : '+ Add offer'}</button>
      </div>
      <p className="admin-hint">Each offer appears on the home page during its dates. The cart applies the highest eligible discount.</p>
      {adding && <OfferForm token={token} onExpired={onExpired} refresh={async () => { await refresh(); setAdding(false); }} />}
      {offers.map((offer) => (
        <details className="admin-item" key={offer.id}>
          <summary>{offer.title || 'Seasonal offer'} · {offer.percent}%</summary>
          <OfferForm current={offer} token={token} refresh={refresh} onExpired={onExpired} />
        </details>
      ))}
    </div>
  );
}

function OfferForm({ current = {}, token, refresh, onExpired }) {
  const [id] = useState(() => current.id ?? crypto.randomUUID());
  const [title, setTitle] = useState(current.title ?? '');
  const [message, setMessage] = useState(current.message ?? '');
  const [image, setImage] = useState(current.image ?? '');
  const [from, setFrom] = useState(current.from ?? '');
  const [to, setTo] = useState(current.to ?? '');
  const [percent, setPercent] = useState(current.percent ?? '');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function save(event) {
    event.preventDefault();
    setBusy(true); setStatus(''); setError('');
    try {
      await adminSaveOffer(id, { title, message, image, from, to, percent: Number(percent) }, token);
      await refresh();
      setStatus('Offer saved. It shows on the home page between these dates.');
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
    } finally { setBusy(false); }
  }

  async function remove() {
    setBusy(true); setStatus(''); setError('');
    try {
      await adminDeleteOffer(id, token);
      await refresh();
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
    } finally { setBusy(false); }
  }

  const today = new Date().toISOString().slice(0, 10);
  const live = image && percent && (!from || from <= today) && (!to || to >= today);

  return (
    <form className={current.id ? 'admin-form' : 'admin-card'} onSubmit={save}>
        <div className="admin-grid">
          <label className="admin-field">
            <span>Offer percentage (%) *</span>
            <input type="number" min="1" max="90" value={percent} onChange={(e) => setPercent(e.target.value)} required />
          </label>
          <label className="admin-field">
            <span>Offer title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Diwali offer" />
          </label>
          <label className="admin-field">
            <span>Message (optional)</span>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Celebrate with our seasonal offer" />
          </label>
          <label className="admin-field">
            <span>Offer starts</span>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label className="admin-field">
            <span>Offer ends</span>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </label>
        </div>

        <ImageField label="Offer picture" value={image} onChange={setImage} token={token} onError={setError} />

        <p className="admin-preview">
          {!image
            ? 'Upload a picture and enter the percentage to publish the offer.'
            : !percent
              ? 'Enter the offer percentage to publish the offer.'
              : live
                ? `This ${percent}% offer is shown in the seasonal section on the home page today.`
                : 'This offer is outside its dates.'}
        </p>

        <div className="admin-actions">
          <button className="btn btn--gold" disabled={busy}>{busy ? 'Saving…' : 'Save offer'}</button>
          {current.id && <button type="button" className="btn btn--ghost" onClick={remove} disabled={busy}>
            Delete offer
          </button>}
          {status && <span className="admin-status">{status}</span>}
          {error && <span className="admin-error">{error}</span>}
        </div>
    </form>
  );
}
