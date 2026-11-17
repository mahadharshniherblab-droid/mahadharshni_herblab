import { useState } from 'react';
import { adminSaveHerbalData } from '../../api.js';

/** The two numbers shown under the hero: herbal products and herbal ingredients. */
export default function HerbalDataEditor({ token, data, refresh, onExpired }) {
  const current = data.herbalData;
  const [products, setProducts] = useState(current.products);
  const [productsSuffix, setProductsSuffix] = useState(current.productsSuffix ?? '');
  const [ingredients, setIngredients] = useState(current.ingredients);
  const [ingredientsSuffix, setIngredientsSuffix] = useState(current.ingredientsSuffix ?? '+');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function save(event) {
    event.preventDefault();
    setBusy(true); setStatus(''); setError('');
    try {
      await adminSaveHerbalData({ products, productsSuffix, ingredients, ingredientsSuffix }, token);
      await refresh();
      setStatus('Herbal data saved. The home page numbers are updated.');
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
    } finally { setBusy(false); }
  }

  return (
    <div className="admin-panel">
      <h2 className="admin-h2">Herbal data</h2>
      <p className="admin-hint">
        The two numbers shown on the home page under the hero: “{products || 0}{productsSuffix} herbal products”
        and “{ingredients || 0}{ingredientsSuffix} herbal ingredients”.
      </p>

      <form className="admin-card" onSubmit={save}>
        <div className="admin-grid">
          <label className="admin-field">
            <span>Herbal products</span>
            <input type="number" min="0" max="10000" value={products} onChange={(e) => setProducts(e.target.value)} required />
          </label>
          <label className="admin-field">
            <span>Products suffix (e.g. +)</span>
            <input value={productsSuffix} maxLength="4" onChange={(e) => setProductsSuffix(e.target.value)} />
          </label>
          <label className="admin-field">
            <span>Herbal ingredients</span>
            <input type="number" min="0" max="10000" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
          </label>
          <label className="admin-field">
            <span>Ingredients suffix (e.g. +)</span>
            <input value={ingredientsSuffix} maxLength="4" onChange={(e) => setIngredientsSuffix(e.target.value)} />
          </label>
        </div>

        <div className="admin-actions">
          <button className="btn btn--gold" disabled={busy}>{busy ? 'Saving…' : 'Save herbal data'}</button>
          {status && <span className="admin-status">{status}</span>}
          {error && <span className="admin-error">{error}</span>}
        </div>
      </form>
    </div>
  );
}
