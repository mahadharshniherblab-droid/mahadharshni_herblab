import 'dotenv/config';
import fs from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';
import { storageMode, sheetsClient, SHEET_ID } from '../src/services/sheets.js';
import { SETTINGS_TAB, createSettingsStore } from '../src/services/settings-store.js';
import { catalogueView, ingredientGroupsOf, herbalDataOf, topOfferView, seasonalContent } from '../src/services/content.js';

try {
  if (storageMode !== 'google-sheets') throw new Error('Google Sheets credentials are required.');
  const api = sheetsClient();
  const store = createSettingsStore(api, SHEET_ID);
  const metadata = await api.spreadsheets.get({ spreadsheetId: SHEET_ID, fields: 'sheets.properties.title' });
  if (metadata.data.sheets.some(sheet => sheet.properties.title === SETTINGS_TAB)) {
    await store.read();
    console.log('WebsiteSettings already exists and is valid. Nothing overwritten.');
  } else {
    const source = JSON.parse(await fs.readFile(new URL('../data/content.json', import.meta.url), 'utf8'));
    const response = await fetch('https://mahadharshni-herblab.onrender.com/api/content', {signal: AbortSignal.timeout(60000)});
    if (!response.ok) throw new Error('Live settings could not be verified. Migration stopped.');
    const live = await response.json();
    const projected = { catalogue: catalogueView(source), ingredientGroups: ingredientGroupsOf(source),
      herbalData: herbalDataOf(source), topOffer: topOfferView(source), ...seasonalContent(source) };
    for (const key of Object.keys(projected)) {
      if (!isDeepStrictEqual(projected[key], live[key])) throw new Error(`Live ${key} differs from the migration source. Migration stopped.`);
    }
    // Preserve an independent local snapshot before any cloud write.
    await fs.mkdir(new URL('../data/backups/', import.meta.url), { recursive: true });
    await fs.writeFile(new URL(`../data/backups/settings-${Date.now()}.json`, import.meta.url), JSON.stringify(source, null, 2), {flag:'wx'});
    await api.spreadsheets.batchUpdate({ spreadsheetId: SHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: SETTINGS_TAB, gridProperties: { rowCount: 1000, columnCount: 3 } } } }] } });
    await store.write(source);
    if (!isDeepStrictEqual(await store.read(), source)) throw new Error('Migration verification failed.');
    console.log('WebsiteSettings created and verified. Existing customer/order tabs were not modified.');
  }
} catch (error) {
  console.error('Migration failed:', error.response?.data?.error?.message ?? error.message);
  process.exitCode = 1;
}
