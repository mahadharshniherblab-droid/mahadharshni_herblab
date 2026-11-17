// Owner-only routes. Every mutating route needs a session token from /verify.
import { Router } from 'express';
import {
  allowAttempt, authConfigured, checkPassword, createToken, issueOtp,
  readToken, requireAdmin, resetAttempts, verifyOtp
} from '../services/auth.js';
import { sendLoginCode } from '../services/mailer.js';
import { uploadImage } from '../services/media.js';
import {
  getContent, updateContent, productsOf, ingredientGroupsOf, herbalDataOf,
  offersOf, seasonalContent, catalogueView, cheapestPricing, topOfferPercent, productPricing, topOfferView } from '../services/content.js';
import { pairToAllLanguages, translateList, toAllLanguages } from '../services/translate.js';

export const adminRouter = Router();

const LANGS = ['en', 'ta', 'te', 'hi'];
const MAX_TEXT = 5000;

const text = (value, max = MAX_TEXT) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const englishOf = (value) => String(value ?? '').split('|')[0].trim();
const isDate = (value) => value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value);
const slugify = (value) => {
  const slug = String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
  return slug || 'item';
};

const PRODUCT_TEXT_FIELDS = ['name', 'type', 'tagline', 'short', 'howToUse', 'caution'];

/** Fills Tamil, Telugu and Hindi from the English text the owner typed. */
async function translatedI18n(english) {
  const items = [
    ...PRODUCT_TEXT_FIELDS.map((key) => english[key] ?? ''),
    ...(english.benefits ?? [])
  ];
  const result = await translateList(items);

  const build = (lang) => {
    const parts = result[lang];
    const text = { ...english };
    PRODUCT_TEXT_FIELDS.forEach((key, index) => {
      text[key] = parts[index] || english[key] || '';
    });
    text.benefits = (english.benefits ?? []).map((benefit, index) => parts[PRODUCT_TEXT_FIELDS.length + index] || benefit);
    return text;
  };

  return {
    i18n: { en: english, ta: build('ta'), te: build('te'), hi: build('hi') },
    translated: result.translated
  };
}

const i18nFromBody = (fields) => ({
  name: text(fields?.name, 120),
  type: text(fields?.type, 120),
  tagline: text(fields?.tagline, 200),
  short: text(fields?.short, 400),
  benefits: Array.isArray(fields?.benefits)
    ? fields.benefits.map((b) => text(b, 200)).filter(Boolean).slice(0, 12)
    : [],
  howToUse: text(fields?.howToUse, 2000),
  caution: text(fields?.caution, 2000)
});

const dashboardPayload = (content) => ({
  topOffer: topOfferView(content),
  pricing: cheapestPricing(content),
  herbalData: herbalDataOf(content),
  ...seasonalContent(content),
  catalogue: catalogueView(content),
  ingredientGroups: ingredientGroupsOf(content)
});

// ---------- sign in ----------

adminRouter.post('/login', async (req, res, next) => {
  try {
    if (!authConfigured) {
      return res.status(503).json({ error: 'Owner login is not configured. Add ADMIN_EMAIL, ADMIN_PASSWORD and SESSION_SECRET to server/.env.' });
    }
    const ip = req.ip ?? 'unknown';
    if (!allowAttempt(ip)) return res.status(429).json({ error: 'Too many tries. Please wait 15 minutes.' });

    const email = text(req.body?.email, 200).toLowerCase();
    const password = String(req.body?.password ?? '');
    if (!checkPassword(email, password)) return res.status(401).json({ error: 'Email or password is not correct.' });

    const code = issueOtp(email);
    try {
      await sendLoginCode(email, code);
    } catch (error) {
      // The code is never returned to the browser: it goes to the mailbox, or to the server log.
      console.error('[admin] could not send the login code:', error.message);
      console.log(`[admin] login code for ${email}: ${code}`);
      return res.status(502).json({ error: 'The code could not be emailed. Check the server log, then try again.' });
    }
    resetAttempts(ip);
    res.json({ ok: true, sentTo: email, message: 'A 6-digit code has been sent to the owner email address.' });
  } catch (e) { next(e); }
});

adminRouter.post('/verify', async (req, res) => {
  const email = text(req.body?.email, 200).toLowerCase();
  const result = verifyOtp(email, req.body?.otp);
  if (!result.ok) return res.status(400).json({ error: result.error });
  res.json({ ok: true, token: createToken(email) });
});

adminRouter.get('/session', (req, res) => {
  const header = req.get('authorization') ?? '';
  const session = readToken(header.startsWith('Bearer ') ? header.slice(7) : '');
  if (!session) return res.status(401).json({ error: 'Please sign in again.' });
  res.json({ ok: true, email: session.sub });
});

// ---------- content ----------

adminRouter.get('/content', requireAdmin, async (_req, res, next) => {
  try {
    res.json(dashboardPayload(await getContent()));
  } catch (e) { next(e); }
});

adminRouter.put('/pricing', requireAdmin, async (req, res, next) => {
  try {
    const topPercent = Math.round(Number(req.body?.topOfferPercent));
    if (!Number.isFinite(topPercent) || topPercent < 0 || topPercent > 90) {
      return res.status(400).json({ error: 'The top offer must be between 0 and 90 percent.' });
    }
    // MRP shown in the top bar ("MRP ₹399"). Optional, so older dashboards keep working.
    let topMrp;
    if (req.body?.topOfferMrp !== undefined) {
      topMrp = Math.round(Number(req.body.topOfferMrp));
      if (!Number.isFinite(topMrp) || topMrp < 1 || topMrp > 100000) {
        return res.status(400).json({ error: 'The MRP must be between 1 and 100000.' });
      }
    }

    const rows = Array.isArray(req.body?.products) ? req.body.products : [];
    const cleaned = new Map();
    for (const row of rows) {
      const id = text(row?.id, 80);
      const price = Math.round(Number(row?.price));
      if (!id) return res.status(400).json({ error: 'Every price row needs a product.' });
      if (!Number.isFinite(price) || price < 1 || price > 100000) {
        return res.status(400).json({ error: `The price for ${id} must be between 1 and 100000.` });
      }
      cleaned.set(id, { price });
    }

    const content = await updateContent((draft) => {
      draft.topOffer = { ...draft.topOffer, percent: topPercent, ...(topMrp ? { mrp: topMrp } : {}) };
      draft.products = productsOf(draft).map((product) => (
        cleaned.has(product.id) ? { ...product, ...cleaned.get(product.id) } : product
      ));
    });
    res.json({ ok: true, ...dashboardPayload(content) });
  } catch (e) { next(e); }
});

adminRouter.put('/herbal-data', requireAdmin, async (req, res, next) => {
  try {
    const count = (value, fallback) => {
      const n = Math.round(Number(value));
      return Number.isFinite(n) && n >= 0 && n <= 10000 ? n : fallback;
    };
    const current = herbalDataOf(await getContent());
    const herbalData = {
      products: count(req.body?.products, current.products),
      productsSuffix: text(req.body?.productsSuffix, 8),
      ingredients: count(req.body?.ingredients, current.ingredients),
      ingredientsSuffix: text(req.body?.ingredientsSuffix, 8)
    };
    const content = await updateContent((draft) => { draft.herbalData = herbalData; });
    res.json({ ok: true, herbalData: herbalDataOf(content) });
  } catch (e) { next(e); }
});

// ---------- products ----------

adminRouter.post('/products', requireAdmin, async (req, res, next) => {
  try {
    const content = await getContent();
    const catalogue = productsOf(content);
    const fields = i18nFromBody(req.body);
    if (!fields.name) return res.status(400).json({ error: 'Please give the product a name.' });

    let id = slugify(fields.name);
    if (catalogue.some((p) => p.id === id)) id = `${id}-${Date.now().toString().slice(-4)}`;

    const image = text(req.body?.image, 600);
    const cardImage = text(req.body?.cardImage, 600) || image;
    const { i18n, translated } = await translatedI18n(fields);
    const fallbackPricing = productPricing({}, content);
    const priceInput = Math.round(Number(req.body?.price));
    const product = {
      id,
      slug: id,
      price: Number.isFinite(priceInput) && priceInput >= 1 && priceInput <= 100000 ? priceInput : fallbackPricing.regular,
      size: text(req.body?.size, 60),
      accent: /^#[0-9a-fA-F]{3,8}$/.test(text(req.body?.accent, 9)) ? text(req.body?.accent, 9) : '#2e7d32',
      inStock: true,
      order: catalogue.length,
      cardImage,
      images: image ? { en: image } : {},
      i18n
    };

    const saved = await updateContent((draft) => {
      draft.products = [...catalogue, product];
    });
    res.status(201).json({ ok: true, product, translated, catalogue: productsOf(saved) });
  } catch (e) { next(e); }
});

adminRouter.put('/products/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = text(req.params.id, 80);
    const content = await getContent();
    const catalogue = productsOf(content);
    const existing = catalogue.find((p) => p.id === id);
    if (!existing) return res.status(404).json({ error: 'Unknown product.' });

    const body = req.body ?? {};
    const next_ = structuredClone(existing);
    next_.updatedAt = new Date().toISOString();

    if (typeof body.size === 'string') next_.size = text(body.size, 60);
    const accent = text(body.accent, 9);
    if (/^#[0-9a-fA-F]{3,8}$/.test(accent)) next_.accent = accent;

    // Price and offer belong to the product itself.
    if (body.price !== undefined) {
      const price = Math.round(Number(body.price));
      if (!Number.isFinite(price) || price < 1 || price > 100000) {
        return res.status(400).json({ error: 'Price must be between 1 and 100000.' });
      }
      next_.price = price;
    }

    if (body.images && typeof body.images === 'object') {
      const images = { ...next_.images };
      for (const lang of LANGS) {
        if (typeof body.images[lang] !== 'string') continue;
        const url = text(body.images[lang], 600);
        if (url) images[lang] = url;
        else delete images[lang];
      }
      next_.images = images;
    }
    if (typeof body.cardImage === 'string') next_.cardImage = text(body.cardImage, 600);

    let translated = false;
    if (body.i18n && typeof body.i18n === 'object') {
      const fields = i18nFromBody(body.i18n.en ?? body.i18n);
      if (!fields.name) return res.status(400).json({ error: 'Please give the product a name.' });
      const result = await translatedI18n(fields);
      next_.i18n = result.i18n;
      translated = result.translated;
    }

    const saved = await updateContent((draft) => {
      draft.products = catalogue.map((p) => (p.id === id ? next_ : p));
    });
    res.json({ ok: true, product: next_, translated, catalogue: productsOf(saved) });
  } catch (e) { next(e); }
});

adminRouter.delete('/products/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = text(req.params.id, 80);
    const catalogue = productsOf(await getContent());
    if (!catalogue.some((p) => p.id === id)) return res.status(404).json({ error: 'Unknown product.' });
    const saved = await updateContent((draft) => {
      draft.products = catalogue.filter((p) => p.id !== id).map((p, index) => ({ ...p, order: index }));
    });
    res.json({ ok: true, catalogue: productsOf(saved) });
  } catch (e) { next(e); }
});

// ---------- ingredients ----------

adminRouter.post('/ingredients', requireAdmin, async (req, res, next) => {
  try {
    const content = await getContent();
    const groups = structuredClone(ingredientGroupsOf(content));

    const name = text(req.body?.name, 120);
    const description = text(req.body?.description, 1200);
    if (!name) return res.status(400).json({ error: 'Please give the ingredient a name.' });

    const groupName = text(req.body?.group, 80);
    if (!groupName) return res.status(400).json({ error: 'Please choose which product the ingredient belongs to.' });

    let group = groups.find((g) => g.key === slugify(groupName) || g.product.toLowerCase() === groupName.toLowerCase());
    if (!group) {
      group = { key: slugify(groupName), product: groupName, order: groups.length, entries: [] };
      groups.push(group);
    }

    // The short kind written next to the product name on the ingredients page (e.g. "Hair oil").
    const groupLabel = text(req.body?.groupLabel, 80);
    let labelTranslated = false;
    if (groupLabel) {
      const translatedLabel = await toAllLanguages(groupLabel);
      group.label = translatedLabel.value;
      labelTranslated = translatedLabel.translated;
    }

    let key = slugify(name);
    if (group.entries.some((e) => e.key === key)) key = `${key}-${Date.now().toString().slice(-4)}`;

    const translated = await pairToAllLanguages(name, description);

    group.entries.push({
      key,
      label: translated.label,
      description: translated.description,
      image: text(req.body?.image, 600),
      order: group.entries.length,
      updatedAt: new Date().toISOString()
    });

    const saved = await updateContent((draft) => { draft.ingredients = groups; });
    res.status(201).json({
      ok: true,
      translated: translated.translated && (!groupLabel || labelTranslated),
      ingredientGroups: ingredientGroupsOf(saved)
    });
  } catch (e) { next(e); }
});

// The short kind next to the group name ("Hair oil", "Roll-on"): one editable line per group.
adminRouter.put('/ingredient-groups/:key', requireAdmin, async (req, res, next) => {
  try {
    const groups = structuredClone(ingredientGroupsOf(await getContent()));
    const group = groups.find((g) => g.key === text(req.params.key, 80));
    if (!group) return res.status(404).json({ error: 'Unknown ingredient group.' });

    const label = text(req.body?.label, 80);
    const translated = label ? await toAllLanguages(label) : { value: '', translated: false };
    group.label = translated.value;
    group.updatedAt = new Date().toISOString();

    const saved = await updateContent((draft) => { draft.ingredients = groups; });
    res.json({ ok: true, translated: translated.translated, ingredientGroups: ingredientGroupsOf(saved) });
  } catch (e) { next(e); }
});

adminRouter.put('/ingredients/:group/:key', requireAdmin, async (req, res, next) => {
  try {
    const content = await getContent();
    const groups = structuredClone(ingredientGroupsOf(content));
    const group = groups.find((g) => g.key === text(req.params.group, 80));
    if (!group) return res.status(404).json({ error: 'Unknown ingredient group.' });
    const entry = group.entries.find((e) => e.key === text(req.params.key, 80));
    if (!entry) return res.status(404).json({ error: 'Unknown ingredient.' });

    const name = text(req.body?.name, 120);
    if (!name) return res.status(400).json({ error: 'Please give the ingredient a name.' });

    const description = typeof req.body?.description === 'string' ? text(req.body.description, 1200) : null;
    const translated = await pairToAllLanguages(name, description ?? englishOf(entry.description));
    entry.label = translated.label;
    if (description !== null) entry.description = translated.description;
    if (typeof req.body?.image === 'string') entry.image = text(req.body.image, 600);
    entry.updatedAt = new Date().toISOString();

    const saved = await updateContent((draft) => { draft.ingredients = groups; });
    res.json({
      ok: true,
      translated: translated.translated,
      ingredientGroups: ingredientGroupsOf(saved)
    });
  } catch (e) { next(e); }
});

adminRouter.delete('/ingredients/:group/:key', requireAdmin, async (req, res, next) => {
  try {
    const content = await getContent();
    const groups = structuredClone(ingredientGroupsOf(content));
    const group = groups.find((g) => g.key === text(req.params.group, 80));
    if (!group) return res.status(404).json({ error: 'Unknown ingredient group.' });
    if (!group.entries.some((e) => e.key === text(req.params.key, 80))) {
      return res.status(404).json({ error: 'Unknown ingredient.' });
    }

    group.entries = group.entries.filter((e) => e.key !== text(req.params.key, 80)).map((e, index) => ({ ...e, order: index }));
    const remaining = groups.filter((g) => g.entries.length > 0).map((g, index) => ({ ...g, order: index }));

    const saved = await updateContent((draft) => { draft.ingredients = remaining; });
    res.json({ ok: true, ingredientGroups: ingredientGroupsOf(saved) });
  } catch (e) { next(e); }
});

// ---------- seasonal offer ----------

adminRouter.put(['/offers/:id', '/offer'], requireAdmin, async (req, res, next) => {
  try {
    const title = text(req.body?.title, 160);
    const message = text(req.body?.message, 600);
    const image = text(req.body?.image, 600);
    const from = text(req.body?.from, 10);
    const to = text(req.body?.to, 10);
    const percent = Math.round(Number(req.body?.percent));
    if (!isDate(from) || !isDate(to)) return res.status(400).json({ error: 'Dates must use the YYYY-MM-DD format.' });
    if (from && to && from > to) return res.status(400).json({ error: 'The "from" date must be before the "to" date.' });
    if (!image) return res.status(400).json({ error: 'Please upload an offer picture first.' });
    if (!Number.isFinite(percent) || percent < 1 || percent > 90) {
      return res.status(400).json({ error: 'Enter the offer percentage (1 to 90).' });
    }

    const content = await updateContent((draft) => {
      const offers = offersOf(draft);
      const id = req.params.id ?? 'legacy';
      const offer = { id, title, message, image, from, to, percent, updatedAt: new Date().toISOString() };
      const index = offers.findIndex((entry) => entry.id === id);
      if (index === -1) offers.push(offer);
      else offers[index] = offer;
      draft.offers = offers;
      delete draft.offer;
    });
    res.json({ ok: true, ...seasonalContent(content) });
  } catch (e) { next(e); }
});

adminRouter.delete(['/offers/:id', '/offer'], requireAdmin, async (req, res, next) => {
  try {
    await updateContent((draft) => {
      draft.offers = offersOf(draft).filter((offer) => offer.id !== (req.params.id ?? 'legacy'));
      delete draft.offer;
    });
    res.json({ ok: true, offer: null });
  } catch (e) { next(e); }
});

adminRouter.post('/upload', requireAdmin, async (req, res, next) => {
  try {
    const result = await uploadImage(req.body?.dataUrl);
    res.status(201).json(result);
  } catch (e) {
    res.status(e.status ?? 500).json({ error: e.message });
  }
});
