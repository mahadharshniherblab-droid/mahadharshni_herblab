// In production set VITE_API_URL to the deployed API (e.g. https://api.mahadharshni.com).
// In development it is empty and Vite forwards /api to localhost:5000.
const BASE = import.meta.env.VITE_API_URL ?? '';

async function request(path, options = {}) {
  const { headers, ...rest } = options;
  const res = await fetch(`${BASE}${path}`, {
    ...rest,
    headers: { 'Content-Type': 'application/json', ...(headers ?? {}) }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // No JSON in the answer means the API itself was unreachable (e.g. the dev proxy could not connect).
    const fallback = data.error ?? (res.status >= 500 ? 'The server did not answer. Please try again.' : 'Request failed');
    throw Object.assign(new Error(fallback), { data, status: res.status });
  }
  return data;
}

export const fetchCatalogue = () => request('/api/products');

export const fetchQuote = (items, phone) =>
  request('/api/cart/quote', { method: 'POST', body: JSON.stringify({ items, phone }) });

export const sendEnquiry = (payload) =>
  request('/api/enquiries', { method: 'POST', body: JSON.stringify(payload) });

/** Everything the owner has published from the admin dashboard. */
export const fetchContent = () => request('/api/content');

// ---- Owner dashboard ----

const auth = (token) => ({ Authorization: `Bearer ${token}` });

export const adminLogin = (email, password) =>
  request('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const adminVerify = (email, otp) =>
  request('/api/admin/verify', { method: 'POST', body: JSON.stringify({ email, otp }) });

export const adminSession = (token) => request('/api/admin/session', { headers: auth(token) });

export const adminContent = (token) => request('/api/admin/content', { headers: auth(token) });

export const adminSaveHerbalData = (body, token) =>
  request('/api/admin/herbal-data', { method: 'PUT', headers: auth(token), body: JSON.stringify(body) });

export const adminSavePricing = (pricing, token) =>
  request('/api/admin/pricing', { method: 'PUT', headers: auth(token), body: JSON.stringify(pricing) });

export const adminCreateProduct = (body, token) =>
  request('/api/admin/products', { method: 'POST', headers: auth(token), body: JSON.stringify(body) });

export const adminSaveProduct = (id, body, token) =>
  request(`/api/admin/products/${id}`, { method: 'PUT', headers: auth(token), body: JSON.stringify(body) });

export const adminDeleteProduct = (id, token) =>
  request(`/api/admin/products/${id}`, { method: 'DELETE', headers: auth(token) });

export const adminCreateIngredient = (body, token) =>
  request('/api/admin/ingredients', { method: 'POST', headers: auth(token), body: JSON.stringify(body) });

export const adminSaveIngredient = (group, key, body, token) =>
  request(`/api/admin/ingredients/${group}/${key}`, { method: 'PUT', headers: auth(token), body: JSON.stringify(body) });

export const adminSaveIngredientGroup = (key, body, token) =>
  request(`/api/admin/ingredient-groups/${key}`, { method: 'PUT', headers: auth(token), body: JSON.stringify(body) });

export const adminDeleteIngredient = (group, key, token) =>
  request(`/api/admin/ingredients/${group}/${key}`, { method: 'DELETE', headers: auth(token) });

export const adminSaveOffer = (id, body, token) =>
  request(`/api/admin/offers/${encodeURIComponent(id)}`, { method: 'PUT', headers: auth(token), body: JSON.stringify(body) });

export const adminDeleteOffer = (id, token) =>
  request(`/api/admin/offers/${encodeURIComponent(id)}`, { method: 'DELETE', headers: auth(token) });

export const adminUpload = (dataUrl, token) =>
  request('/api/admin/upload', { method: 'POST', headers: auth(token), body: JSON.stringify({ dataUrl }) });

export const saveCheckout = (payload) =>
  request('/api/checkout', { method: 'POST', body: JSON.stringify(payload) });
