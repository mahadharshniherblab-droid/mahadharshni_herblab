// No-install preview: run `node preview-server.mjs` from the preview folder, then open http://localhost:4173
// Serves the pre-built site and the same pricing API as ../server.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getContent, seasonalContent, catalogueView, cheapestPricing, topOfferView, herbalDataOf, ingredientGroupsOf
} from '../server/src/services/content.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'site');
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
const json = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  try {
    if (url.pathname.startsWith('/api/admin/') || ['/api/cart/quote', '/api/checkout', '/api/enquiries'].includes(url.pathname)) {
      const upstream = http.request({
        hostname: '127.0.0.1', port: process.env.ADMIN_API_PORT ?? 5000,
        path: url.pathname + url.search, method: req.method, headers: req.headers
      }, (reply) => {
        res.writeHead(reply.statusCode, reply.headers);
        reply.pipe(res);
      });
      upstream.on('error', () => json(res, 503, { error: 'The local API server is unavailable.' }));
      req.pipe(upstream);
      return;
    }
    if (url.pathname === '/api/health') return json(res, 200, { ok: true, storage: 'memory (preview)' });
    if (url.pathname === '/api/products') {
      const content = await getContent();
      return json(res, 200, { pricing: cheapestPricing(content), products: catalogueView(content), topOffer: topOfferView(content) });
    }
    // Mirrors ../server/src/index.js's /api/content so the preview shows whatever the
    // owner has actually saved from the admin dashboard (catalogue, ingredients, seasonal offer),
    // reading the same server/data/content.json file, instead of only the built-in defaults.
    if (url.pathname === '/api/content') {
      const content = await getContent();
      const pricing = cheapestPricing(content);
      return json(res, 200, {
        pricing,
        effectivePricing: pricing,
        topOffer: topOfferView(content),
        herbalData: herbalDataOf(content),
        catalogue: catalogueView(content),
        ingredientGroups: ingredientGroupsOf(content),
        ...seasonalContent(content)
      });
    }

    let file = normalize(join(ROOT, decodeURIComponent(url.pathname)));
    if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
    try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch { file = join(ROOT, 'index.html'); } // SPA fallback
    const data = await readFile(file);
    const ext = extname(file);
    // HTML/JS/CSS have no cache-busting filenames, so without this header browsers can
    // keep showing an old build after a rebuild until the person hard-refreshes.
    const headers = { 'Content-Type': TYPES[ext] ?? 'application/octet-stream' };
    if (ext === '.html' || ext === '.js' || ext === '.css') headers['Cache-Control'] = 'no-cache';
    res.writeHead(200, headers);
    res.end(data);
  } catch (e) { console.error(e); json(res, 500, { error: 'Server error' }); }
}).listen(PORT, () => console.log(`Mahadharshni Herblab preview running at http://localhost:${PORT}`));
