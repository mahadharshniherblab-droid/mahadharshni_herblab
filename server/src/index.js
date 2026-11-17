import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { quoteOrder } from './services/pricing.js';
import { appendRow, updatePendingOrder, readRows, hasPaidOrder, storageMode } from './services/sheets.js';
import {
  getContent, seasonalContent, productsOf, ingredientGroupsOf, herbalDataOf,
  catalogueView, cheapestPricing, topOfferPercent, topOfferView
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
      pricing: {
        ...cheapestPricing(content),
        topOfferPercent: topOfferPercent(content),
        topOfferMrp: topOfferView(content).mrp,
        topOfferPrice: topOfferView(content).price
      },
      topOffer: topOfferView(content),
      products: view.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.i18n?.en?.name ?? p.id,
        size: p.size ?? '',
        image: p.images?.en ?? p.cardImage ?? '',
        inStock: p.inStock !== false,
        price: p.price
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
      topOffer: topOfferView(content),
      herbalData: herbalDataOf(content),
      catalogue: catalogueView(content),
      ingredientGroups: ingredientGroupsOf(content),
      ...seasonalContent(content)
    });
  } catch (e) { next(e); }
});

// Price quote. Every product uses its own MRP and offer percentage.
app.post('/api/cart/quote', async (req, res, next) => {
  try {
    const content = await getContent();
    const phone = String(req.body?.phone ?? '').trim();
    if (phone && !/^\d{10}$/.test(phone)) return res.status(400).json({ error: 'Enter a 10-digit mobile number.' });
    const quote = quoteOrder(req.body?.items, content, phone ? await hasPaidOrder(phone) : false);
    if (quote.errors.length) return res.status(400).json(quote);
    res.json({ ...quote, firstOrderEstimate: !phone && quote.percent > 0 && quote.discountType === 'firstOrder' });
  } catch (e) { next(e); }
});

// Serialize pending-order writes so retrying a submission cannot append twice.
let pendingCheckout = Promise.resolve();
app.post('/api/checkout', async (req, res, next) => {
  try {
    const { items, orderId, customer } = req.body ?? {};
    if (typeof orderId !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(orderId) || !Array.isArray(items) || !items.length || items.some(i => !i || typeof i.productId !== 'string')) {
      return res.status(400).json({ error: 'A valid cart is required.' });
    }
    const fields = ['name', 'phone', 'pincode', 'house', 'street', 'town', 'city', 'state'];
    const details = Object.fromEntries(fields.map(key => [key, typeof customer?.[key] === 'string' ? customer[key].trim() : '']));
    if (Object.values(details).some(v => !v || v.length > 250) || !/^\d{10}$/.test(details.phone) || !/^[1-9]\d{5}$/.test(details.pincode)) {
      return res.status(400).json({ error: 'Check your name, mobile number and delivery address.' });
    }
    const save = pendingCheckout.then(async () => {
      const rows = await readRows('Orders');
      const index = rows.findIndex(r => r.orderId === orderId);
      const previous = rows[index];
      if (previous && previous.status !== 'PENDING_PAYMENT') {
        return res.status(409).json({ error: 'This checkout is already closed.' });
      }
      const quote = quoteOrder(items, await getContent(), await hasPaidOrder(details.phone));
      if (quote.errors.length) return res.status(400).json({ error: quote.errors.join(' ') });
      const row = {
        orderId, phone: details.phone, itemsJson: JSON.stringify(quote.lines), total: quote.total,
        status: 'PENDING_PAYMENT', paymentId: '', createdAt: previous?.createdAt ?? new Date().toISOString(),
        name: details.name, pincode: details.pincode, house: details.house, street: details.street,
        town: details.town, city: details.city, state: details.state, mrpTotal: quote.mrpTotal,
        discountPercent: quote.percent, discount: quote.discount, shipping: quote.shipping,
        paymentMethod: 'Razorpay', requestItems: JSON.stringify(items), quoteJson: JSON.stringify(quote)
      };
      if (previous) await updatePendingOrder(index, row);
      else await appendRow('Orders', Object.values(row), row);
      res.status(201).json({ orderId, quote });
    });
    pendingCheckout = save.catch(() => {});
    await save;
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
