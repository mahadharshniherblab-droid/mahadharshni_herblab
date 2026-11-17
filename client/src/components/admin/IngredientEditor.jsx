import { useState } from 'react';
import { adminCreateIngredient, adminDeleteIngredient, adminSaveIngredient, adminSaveIngredientGroup } from '../../api.js';
import { ImageField } from './fields.jsx';

// Ingredient text is stored as "English|தமிழ்|తెలుగు|हिन्दी"; the dashboard only shows English.
const english = (value) => String(value ?? '').split('|')[0] ?? '';

export default function IngredientEditor({ token, data, refresh, onExpired }) {
  const groups = data.ingredientGroups ?? [];
  const [adding, setAdding] = useState(false);

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <div>
          <h2 className="admin-h2">Herbal ingredients</h2>
          <p className="admin-hint">
            The herbs listed under “Our Ingredients” on the home page. Type in English only — Tamil, Telugu and
            Hindi are translated automatically.
          </p>
        </div>
        <button className="btn btn--gold" onClick={() => setAdding((open) => !open)}>
          {adding ? 'Close' : '+ Add ingredient'}
        </button>
      </div>

      {adding && (
        <AddIngredient
          token={token}
          groups={groups}
          onExpired={onExpired}
          onSaved={async () => { setAdding(false); await refresh(); }}
        />
      )}

      {groups.map((group) => (
        <section className="admin-group" key={group.key}>
          <h3>{group.product} <span className="muted">· {group.entries.length} ingredients</span></h3>
          <GroupKind group={group} token={token} refresh={refresh} onExpired={onExpired} />
          {group.entries.map((entry) => (
            <IngredientForm
              key={entry.key}
              group={group.key}
              entry={entry}
              token={token}
              refresh={refresh}
              onExpired={onExpired}
            />
          ))}
        </section>
      ))}

      {!groups.length && <p className="admin-hint">No ingredients yet. Use “Add ingredient” to create the first one.</p>}
    </div>
  );
}

// The small caption the website shows after the product name ("Keshdharshni · Hair oil").
function GroupKind({ group, token, refresh, onExpired }) {
  const [label, setLabel] = useState(english(group.label));
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function save(event) {
    event.preventDefault();
    setBusy(true); setStatus(''); setError('');
    try {
      const result = await adminSaveIngredientGroup(group.key, { label }, token);
      await refresh();
      setStatus(result.translated ? 'Saved and translated.' : 'Saved.');
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
    } finally { setBusy(false); }
  }

  return (
    <form className="admin-inline" onSubmit={save}>
      <label className="admin-field">
        <span>Kind shown next to “{group.product}” (e.g. Hair oil)</span>
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Hair oil" />
      </label>
      <button className="btn btn--ghost" disabled={busy}>{busy ? 'Saving…' : 'Save kind'}</button>
      {status && <span className="admin-status">{status}</span>}
      {error && <span className="admin-error">{error}</span>}
    </form>
  );
}

function AddIngredient({ token, groups, onSaved, onExpired }) {
  const [group, setGroup] = useState('');
  const [groupLabel, setGroupLabel] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function save(event) {
    event.preventDefault();
    setBusy(true); setStatus(''); setError('');
    try {
      const result = await adminCreateIngredient({ group, groupLabel, name, description, image }, token);
      setStatus(result.translated ? 'Added and translated.' : 'Added. The translation service was unavailable, so English is shown in every language.');
      setName(''); setDescription(''); setImage(''); setGroupLabel('');
      await onSaved();
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
    } finally { setBusy(false); }
  }

  return (
    <form className="admin-card" onSubmit={save}>
      <h3 className="admin-h3">New ingredient</h3>
      <div className="admin-grid">
        <label className="admin-field">
          <span>Belongs to</span>
          <input
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="Type the product name"
            required
          />
        </label>
        <label className="admin-field">
          <span>Kind shown after the product name (e.g. Hair oil)</span>
          <input value={groupLabel} onChange={(e) => setGroupLabel(e.target.value)} placeholder="Hair oil" />
        </label>
        <label className="admin-field">
          <span>Ingredient name (English) *</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="admin-field admin-field--wide">
          <span>Description (English)</span>
          <textarea rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
      </div>

      <ImageField label="Ingredient picture" value={image} onChange={setImage} token={token} onError={setError} />

      <div className="admin-actions">
        <button className="btn btn--primary" disabled={busy}>{busy ? 'Saving…' : 'Add ingredient'}</button>
        {status && <span className="admin-status">{status}</span>}
        {error && <span className="admin-error">{error}</span>}
      </div>
    </form>
  );
}

function IngredientForm({ group, entry, token, refresh, onExpired }) {
  const [name, setName] = useState(english(entry.label));
  const [description, setDescription] = useState(english(entry.description));
  const [image, setImage] = useState(entry.image ?? '');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function save(event) {
    event.preventDefault();
    setBusy(true); setStatus(''); setError('');
    try {
      const result = await adminSaveIngredient(group, entry.key, { name, description, image }, token);
      await refresh();
      setStatus(result.translated ? 'Saved and translated.' : 'Saved. English is shown in every language.');
    } catch (e) {
      if (e.status === 401) return onExpired();
      setError(e.message);
    } finally { setBusy(false); }
  }

  async function remove() {
    if (!window.confirm(`Delete “${name || entry.key}”?`)) return;
    setBusy(true); setStatus(''); setError('');
    try {
      await adminDeleteIngredient(group, entry.key, token);
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
          {image ? <img src={image} alt="" /> : <span className="admin-item__noimg">no picture</span>}
        </span>
        {name || entry.key}
      </summary>
      <form className="admin-form" onSubmit={save}>
        <div className="admin-grid">
          <label className="admin-field">
            <span>Name (English)</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="admin-field admin-field--wide">
            <span>Description (English)</span>
            <textarea rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
        </div>

        <ImageField label="Ingredient picture" value={image} onChange={setImage} token={token} onError={setError} />

        <div className="admin-actions">
          <button className="btn btn--primary" disabled={busy}>{busy ? 'Saving…' : 'Save ingredient'}</button>
          <button type="button" className="btn btn--danger" onClick={remove} disabled={busy}>Delete ingredient</button>
          {status && <span className="admin-status">{status}</span>}
          {error && <span className="admin-error">{error}</span>}
        </div>
      </form>
    </details>
  );
}
