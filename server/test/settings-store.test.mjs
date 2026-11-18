import test from 'node:test';
import assert from 'node:assert/strict';
import { encodeSettings, decodeSettings, createSettingsStore } from '../src/services/settings-store.js';
function fakeSheets() {
  let rows;
  return { spreadsheets: { values: {
    get: async () => ({ data: { values: structuredClone(rows) } }),
    update: async ({valueInputOption, requestBody}) => {
      assert.equal(valueInputOption, 'RAW');
      rows = [...structuredClone(requestBody.values), ...(rows ?? []).slice(requestBody.values.length)];
    }
  } } };
}
test('large multilingual settings round-trip', () => {
  const settings = {products:[{id:'oil',price:450,image:'https://res.cloudinary.com/example/image.jpg',description:'தமிழ் 🌿'.repeat(14000)}],offers:[]};
  const rows = encodeSettings(settings);
  assert.ok(rows.length > 2);
  assert.ok(rows.every(row => row.every(cell => cell.length < 50000)));
  assert.deepEqual(decodeSettings(JSON.parse(JSON.stringify(rows))),settings);
});
test('missing, truncated and corrupted settings fail instead of resetting', () => {
  assert.throws(() => decodeSettings([]));
  const rows=encodeSettings({products:[]});
  assert.throws(() => decodeSettings(rows.slice(0,1)));
  rows[1][1]='{"products":[1]}';
  assert.throws(() => decodeSettings(rows),/integrity/);
});
test('price edits and deletions survive restart and shorter rewrites', async () => {
  const api=fakeSheets(); const first=createSettingsStore(api,'test-sheet');
  await first.write({products:[{id:'ortho-g',price:450},{id:'oil',description:'x'.repeat(50000)}],offers:[{id:'old'}]});
  const restarted=createSettingsStore(api,'test-sheet');
  const settings=await restarted.read();
  assert.equal(settings.products[0].price,450);
  settings.products.pop();settings.offers=[];
  await restarted.write(settings);
  assert.deepEqual(await createSettingsStore(api,'test-sheet').read(),settings);
});
test('API errors propagate', async () => {
  const api=fakeSheets();const store=createSettingsStore(api,'test-sheet');
  api.spreadsheets.values.get=async()=>{throw new Error('permission denied');};
  await assert.rejects(store.read(),/permission denied/);
  api.spreadsheets.values.update=async()=>{throw new Error('quota');};
  await assert.rejects(store.write({products:[]}),/quota/);
});
