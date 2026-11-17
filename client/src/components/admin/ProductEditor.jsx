import { useState } from 'react';
import { adminCreateProduct, adminDeleteProduct, adminSaveProduct } from '../../api.js';
import { ImageField } from './fields.jsx';

const englishOf = (product) => product.i18n?.en ?? {};

const newFields = () => ({
  name: '', type: '', size: '', tagline: '', short: '', benefits: '', howToUse: '', caution: '', accent: '#2e7d32', image: '', cardImage: '', price: ''
});

const TRANSLATION_NOTE = 'Type in English only — Tamil, Telugu and Hindi are translated automatically for customers.';

export default function ProductEditor({ token, data, refresh, onExpired }) {
  const [adding, setAdding] = useState(false);
  const products = data.catalogue ?? [];

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <div>
          <h2 className="admin-h2">Herbal products</h2>
          <p className="admin-hint">
            Add, edit or delete products, with each product&rsquo;s own price. Everything saved here
            appears on the home page, the shop and the product pages. {TRANSLATION_NOTE}
          </p>
        </div>
        <button className="btn btn--gold" onClick={() => setAdding((open) => !open)}>
          {adding ? 'Close' : '+ Add product'}
        </button>
      </div>

      {adding && (
        <AddProduct
          token={token}
          onExpired={onExpired}
          defaultPrice={data.pricing?.regular ?? 399}
          onSaved={async () => { setAdding(false); await refresh(); }}
        />
      )}

      {products.map((product) => (
        <ProductForm
          key={product.id}
          product={product}
          token={token}
          refresh={refresh}
          onExpired={onExpired}
        />
      ))}

      {!products.length && <p className="admin-hint">No products yet. Use “Add product” to create the first one.</p>}
    </div>
  );
}

function AddProduct({ token, onSaved, onExpired, defaultPrice = 399 }) {
  const [fields, setFields] = useState(() => ({
    ...newFields(),
    price: String(defaultPrice),
  }));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const set = (key, value) => setFields((all) => ({ ...all, [key]: value }));

  async function save(event) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      await adminCreateProduct({
        ...fields,
        price: Number(fields.price),
        benefits: fields.benefits.split('\n').map((line) => line.trim()).filter(Boolean)
      }, token);
      await onSaved();
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
    } finally { setBusy(false); }
  }

  return (
    <form className="admin-card" onSubmit={save}>
      <h3 className="admin-h3">New product</h3>
      <p className="admin-hint">{TRANSLATION_NOTE}</p>
      <div className="admin-grid">
        <label className="admin-field">
          <span>Name (English) *</span>
          <input value={fields.name} onChange={(e) => set('name', e.target.value)} required />
        </label>
        <label className="admin-field">
          <span>Type (English, e.g. Herbal Hair Oil)</span>
          <input value={fields.type} onChange={(e) => set('type', e.target.value)} />
        </label>
        <label className="admin-field">
          <span>Size (e.g. 100 ml)</span>
          <input value={fields.size} onChange={(e) => set('size', e.target.value)} />
        </label>
        <label className="admin-field">
          <span>Price, MRP (₹) *</span>
          <input type="number" min="1" max="100000" value={fields.price} onChange={(e) => set('price', e.target.value)} required />
        </label>
        <label className="admin-field">
          <span>Accent colour</span>
          <input type="color" className="admin-color" value={fields.accent} onChange={(e) => set('accent', e.target.value)} />
        </label>
        <label className="admin-field admin-field--wide">
          <span>Tagline (English)</span>
          <input value={fields.tagline} onChange={(e) => set('tagline', e.target.value)} />
        </label>
        <label className="admin-field admin-field--wide">
          <span>Short description (English)</span>
          <textarea rows="2" value={fields.short} onChange={(e) => set('short', e.target.value)} />
        </label>
        <label className="admin-field admin-field--wide">
          <span>Benefits (English, one per line)</span>
          <textarea rows="4" value={fields.benefits} onChange={(e) => set('benefits', e.target.value)} />
        </label>
        <label className="admin-field admin-field--wide">
          <span>How to use (English)</span>
          <textarea rows="3" value={fields.howToUse} onChange={(e) => set('howToUse', e.target.value)} />
        </label>
        <label className="admin-field admin-field--wide">
          <span>Caution (English)</span>
          <textarea rows="2" value={fields.caution} onChange={(e) => set('caution', e.target.value)} />
        </label>
      </div>

      <ImageField label="Product picture (product page)" value={fields.image} onChange={(url) => set('image', url)} token={token} onError={setError} />

      <ImageField label="Card picture (home page and shop grid)" value={fields.cardImage} onChange={(url) => set('cardImage', url)} token={token} onError={setError} />

      <div className="admin-actions">
        <button className="btn btn--primary" disabled={busy}>{busy ? 'Saving…' : 'Create product'}</button>
        {error && <span className="admin-error">{error}</span>}
      </div>
    </form>
  );
}

function ProductForm({ product, token, refresh, onExpired }) {
  const english = englishOf(product);
  const [size, setSize] = useState(product.size ?? '');
  const [price, setPrice] = useState(product.price ?? 399);
  const [accent, setAccent] = useState(product.accent ?? '#2e7d32');
  const [cardImage, setCardImage] = useState(product.cardImage ?? '');
  const [image, setImage] = useState(product.images?.en ?? '');
  const [fields, setFields] = useState(() => ({
    name: english.name ?? '',
    type: english.type ?? '',
    tagline: english.tagline ?? '',
    short: english.short ?? '',
    benefits: (english.benefits ?? []).join('\n'),
    howToUse: english.howToUse ?? '',
    caution: english.caution ?? ''
  }));
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const set = (key, value) => setFields((all) => ({ ...all, [key]: value }));

  async function save(event) {
    event.preventDefault();
    setBusy(true); setStatus(''); setError('');
    try {
      const result = await adminSaveProduct(product.id, {
        size,
        price: Number(price),
        accent,
        cardImage,
        images: { en: image },
        i18n: {
          en: {
            ...fields,
            benefits: fields.benefits.split('\n').map((line) => line.trim()).filter(Boolean)
          }
        }
      }, token);
      await refresh();
      setStatus(result.translated
        ? 'Saved and translated. Reload the website to see the change.'
        : 'Saved. The translation service was unavailable, so English is shown in every language.');
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
    } finally { setBusy(false); }
  }

  async function remove() {
    if (!window.confirm(`Delete “${english.name || product.id}” from the website?`)) return;
    setBusy(true); setStatus(''); setError('');
    try {
      await adminDeleteProduct(product.id, token);
      await refresh();
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
      setBusy(false);
    }
  }

  return (
    <details className="admin-item">
      <summary>
        <span className="admin-item__thumb">
          {cardImage || image
            ? <img src={cardImage || image} alt="" />
            : <span className="admin-item__noimg">no picture</span>}
        </span>
        {english.name || product.id}{' '}
        <span className="muted">· {size || 'no size'} · ₹{price}</span>
      </summary>

      <form className="admin-form" onSubmit={save}>
        <div className="admin-grid">
          <label className="admin-field">
            <span>Size (shown next to the name)</span>
            <input value={size} onChange={(e) => setSize(e.target.value)} />
          </label>
          <label className="admin-field">
            <span>Price, MRP (₹)</span>
            <input type="number" min="1" max="100000" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </label>
          <label className="admin-field">
            <span>Accent colour</span>
            <input type="color" className="admin-color" value={accent} onChange={(e) => setAccent(e.target.value)} />
          </label>
          <label className="admin-field admin-field--wide">
            <span>Name (English)</span>
            <input value={fields.name} onChange={(e) => set('name', e.target.value)} required />
          </label>
          <label className="admin-field admin-field--wide">
            <span>Type (English)</span>
            <input value={fields.type} onChange={(e) => set('type', e.target.value)} />
          </label>
          <label className="admin-field admin-field--wide">
            <span>Tagline (English)</span>
            <input value={fields.tagline} onChange={(e) => set('tagline', e.target.value)} />
          </label>
          <label className="admin-field admin-field--wide">
            <span>Short description (English)</span>
            <textarea rows="2" value={fields.short} onChange={(e) => set('short', e.target.value)} />
          </label>
          <label className="admin-field admin-field--wide">
            <span>Benefits (English, one per line)</span>
            <textarea rows="4" value={fields.benefits} onChange={(e) => set('benefits', e.target.value)} />
          </label>
          <label className="admin-field admin-field--wide">
            <span>How to use (English)</span>
            <textarea rows="3" value={fields.howToUse} onChange={(e) => set('howToUse', e.target.value)} />
          </label>
          <label className="admin-field admin-field--wide">
            <span>Caution (English)</span>
            <textarea rows="2" value={fields.caution} onChange={(e) => set('caution', e.target.value)} />
          </label>
        </div>

        <ImageField
          label="Product picture (product page)"
          value={image}
          onChange={setImage}
          token={token}
          onError={setError}
        />

        <ImageField
          label="Card picture (home page and shop grid)"
          value={cardImage}
          onChange={setCardImage}
          token={token}
          onError={setError}
        />

        <div className="admin-actions">
          <button className="btn btn--primary" disabled={busy}>{busy ? 'Saving…' : 'Save product'}</button>
          <button type="button" className="btn btn--danger" onClick={remove} disabled={busy}>Delete product</button>
          {status && <span className="admin-status">{status}</span>}
          {error && <span className="admin-error">{error}</span>}
        </div>
      </form>
    </details>
  );
}
