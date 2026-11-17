// Google Sheets "database" with an in-memory fallback for local development.
// Expected tabs (row 1 = headers):
//   Customers: phone | name | email | language | createdAt
//   Orders:    orderId | phone | itemsJson | total | status | paymentId | createdAt
//   Enquiries: name | phone | email | message | createdAt
import { google } from 'googleapis';

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const useSheets = Boolean(SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);

const memory = { Customers: [], Orders: [], Enquiries: [] };
let sheetsClient;

function client() {
  if (!sheetsClient) {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    sheetsClient = google.sheets({ version: 'v4', auth });
  }
  return sheetsClient;
}

export const storageMode = useSheets ? 'google-sheets' : 'memory';

/** Returns all rows of a tab as objects keyed by the header row. */
export async function readRows(tab) {
  if (!useSheets) return memory[tab] ?? [];
  const res = await client().spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: `${tab}!A1:Z` });
  const [header = [], ...rows] = res.data.values ?? [];
  return rows.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

/** Appends one row; `values` must follow the tab's column order. */
export async function appendRow(tab, values, asObject) {
  if (!useSheets) {
    (memory[tab] ??= []).push(asObject);
    return;
  }
  await client().spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A1`,
    valueInputOption: tab === 'Orders' ? 'RAW' : 'USER_ENTERED',
    requestBody: { values: [values] }
  });
}

export async function updatePendingOrder(index, row) {
  if (!useSheets) { memory.Orders[index] = row; return; }
  await client().spreadsheets.values.update({
    spreadsheetId: SHEET_ID, range: `Orders!A${index + 2}:U${index + 2}`,
    valueInputOption: 'RAW', requestBody: { values: [Object.values(row)] }
  });
}

/** A customer qualifies for the first-order price if they have no PAID order yet. */
export async function hasPaidOrder(phone) {
  const orders = await readRows('Orders');
  return orders.some((o) => String(o.phone).replace(/\D/g, '').slice(-10) === phone && String(o.status).toUpperCase() === 'PAID');
}
