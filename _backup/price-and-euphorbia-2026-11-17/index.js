import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { quoteCart } from './services/pricing.js';
import { appendRow, storageMode } from './services/sheets.js';
import {
  getContent, withOfferStatus, productsOf, ingredientGroupsOf, herbalDataOf,
  catalogueView, cheapestPricing, topOfferPercent
} from './services/content.js';
import { adminRouter } from './routes/admin.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') ?? true }));
app.use(express.json({ limit: '8mb' })); // room for base64 image uploads from the admin dashboard

app.get('/api/health', (_req, res) => res.json({ ok: true, storage: storageMode }));

app.get('/api/products', async (_req, res, next) => {
  try {
    const content = await getContent();
    const view = catalogueView(content);
    res.json({
      // `pricing` stays for the header strip and older screens: the cheapest product's numbers.
      pricing: { ...cheapestPricing(content), topOfferPercent: topOfferPercent(content) },
      topOffer: { percent: topOfferPercent(content) },
      products: view.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.i18n?.en?.name ?? p.id,
        size: p.size ?? '',
        image: p.images?.en ?? p.cardImage ?? '',
        inStock: p.inStock !== false,
        price: p.price,
        offerPrice: p.offerPrice,
        discountPercent: p.discountPercent
      }))
    });
  } catch (e) { next(e); }
});

// Everything the owner has published: catalogue (each product with its own price),
// ingredients, stats, the top offer strip and the seasonal offer.
app.get('/api/content', async (_req, res, next) => {
  try {
    const content = await getContent();
    const pricing = cheapestPricing(content);
    res.json({
      pricing,
      effectivePricing: pricing,
      topOffer: { percent: topOfferPercent(content) },
      herbalData: herbalDataOf(content),
      catalogue: catalogueView(content),
      ingredientGroups: ingredientGroupsOf(content),
      offer: withOfferStatus(content.offer)
    });
  } catch (e) { next(e); }
});

// Price quote. Every product uses its own MRP and offer percentage.
app.post('/api/cart/quote', async (req, res, next) => {
  try {
    const content = await getContent();
    const quote = quoteCart(req.body?.items, catalogueView(content));
    if (quote.errors.length) return res.status(400).json(quote);
    res.json(quote);
  } catch (e) { next(e); }
});

app.post('/api/enquiries', async (req, res, next) => {
  try {
    const { name, phone, email, message } = req.body ?? {};
    if (!name?.trim() || !message?.trim()) return res.status(400).json({ error: 'Name and message are required' });
    const row = { name: name.trim(), phone: phone ?? '', email: email ?? '', message: message.trim().slice(0, 2000), createdAt: new Date().toISOString() };
    await appendRow('Enquiries', Object.values(row), row);
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
});

app.use('/api/admin', adminRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

const port = Number(process.env.PORT ?? 5000);
app.listen(port, () => console.log(`Herblab API on http://localhost:${port} (storage: ${storageMode})`));
