import { useState } from 'react';
import { adminUpload } from '../../api.js';

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('That file could not be read.'));
    reader.readAsDataURL(file);
  });
}

/** Picture field: uploads to Cloudinary through the API and stores the URL. */
export function ImageField({ label, value, onChange, token, onError }) {
  const [busy, setBusy] = useState(false);

  async function pick(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { onError('Please choose an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { onError('Please choose an image under 5 MB.'); return; }
    setBusy(true);
    try {
      const dataUrl = await readImageFile(file);
      const { url } = await adminUpload(dataUrl, token);
      onChange(url);
    } catch (error) {
      onError(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-image">
      <span className="admin-label">{label}</span>
      <div className="admin-image__row">
        {value ? <img src={value} alt="" /> : <span className="admin-image__empty">No picture yet</span>}
        <div className="admin-image__actions">
          <label className={'btn btn--ghost admin-upload' + (busy ? ' is-busy' : '')}>
            {busy ? 'Uploading…' : value ? 'Replace picture' : 'Upload picture'}
            <input type="file" accept="image/*" onChange={pick} disabled={busy} />
          </label>
          {value && <button type="button" className="link-btn" onClick={() => onChange('')}>Remove</button>}
        </div>
      </div>
    </div>
  );
}
