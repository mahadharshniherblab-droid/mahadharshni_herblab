import { createHash } from 'node:crypto';

export const SETTINGS_TAB = 'WebsiteSettings';
const FORMAT = 'herblab-settings-v1';
const digest = text => createHash('sha256').update(text).digest('hex');

export function encodeSettings(content) {
  if (!content || typeof content !== 'object' || Array.isArray(content)) throw new Error('Invalid website settings.');
  const payload = JSON.stringify(content);
  // Stay below the Sheets cell limit, including multilingual text.
  const characters = Array.from(payload);
  const chunks = [];
  for (let i = 0; i < characters.length; i += 15000) chunks.push(characters.slice(i, i + 15000).join(''));
  if (chunks.length > 999) throw new Error('Website settings exceed the storage capacity.');
  return [[FORMAT, String(chunks.length), digest(payload)], ...chunks.map((chunk, i) => [String(i), chunk])];
}

export function decodeSettings(rows) {
  const [header, ...chunks] = rows ?? [];
  const count = Number(header?.[1]);
  if (header?.[0] !== FORMAT || !Number.isInteger(count) || count < 1 || count > chunks.length) {
    throw new Error('WebsiteSettings is missing or invalid. Run the settings migration; defaults will not be saved.');
  }
  const payload = chunks.slice(0, count).map((row, i) => {
    if (String(row[0]) !== String(i) || typeof row[1] !== 'string') throw new Error('WebsiteSettings has a missing chunk.');
    return row[1];
  }).join('');
  if (digest(payload) !== header[2]) throw new Error('WebsiteSettings integrity check failed. Restore the saved settings.');
  const content = JSON.parse(payload);
  if (!content || typeof content !== 'object' || Array.isArray(content)) throw new Error('Invalid website settings.');
  return content;
}

export function createSettingsStore(api, spreadsheetId) {
  return {
    async read() {
      const response = await api.spreadsheets.values.get({ spreadsheetId, range: `'${SETTINGS_TAB}'!A:C` });
      return decodeSettings(response.data.values);
    },
    async write(content) {
      const values = encodeSettings(content);
      // One request replaces the manifest and all chunks; old trailing chunks are ignored.
      await api.spreadsheets.values.update({ spreadsheetId, range: `'${SETTINGS_TAB}'!A1:C${values.length}`,
        valueInputOption: 'RAW', requestBody: { values } });
      return content;
    }
  };
}
