# Mahadharshni Herblab – Website

*Innovation starts here*

Online store for **Ortho-G Pain Relief Roll-On (50 ml)**, **Keshdharshni Herbal Hair Oil (100 ml)** and **ByeWart Gel (50 ml)**.

| | |
|---|---|
| Regular price (MRP) | ₹399 per product |
| First-order price | ₹199 per product |
| Languages | English, தமிழ், తెలుగు, हिन्दी |

## What's in this version (Phases 1–2: foundation + storefront)

- Home page with the logo animation, offer banner, product grid and "why us"
- Shop page and a detail page for each product (benefits, how to use, caution)
- Cart with quantity controls and a price summary worked out by the server
- About and Contact pages (enquiries are saved to Google Sheets)
- Language switcher (remembers the choice), mobile-friendly layout

**Coming next:** Phase 3 mobile OTP login + checkout + Razorpay payment; Phase 4 order emails (Resend), admin view, Cloudinary media.

## Run it on your computer

You need **Node.js 20 or newer** (https://nodejs.org).

Open two terminals in this folder:

```bash
# Terminal 1 – API
cd server
copy .env.example .env      # on Mac/Linux: cp .env.example .env
npm install
npm run dev                 # http://localhost:5000

# Terminal 2 – website
cd client
npm install
npm run dev                 # open http://localhost:5173
```

Without Google Sheets keys the API keeps data in memory, which is fine for trying it out.

## How first-order pricing works

- The **server** decides prices (`server/src/config/products.js` and `.env`); the browser never sends a price.
- A customer counts as "first order" if their mobile number has **no PAID order** in the `Orders` sheet. This check becomes OTP-verified in Phase 3.
- `FIRST_ORDER_MAX_QTY_PER_PRODUCT=1` (default) means one unit of each product is ₹199 and extra units are ₹399. That stops one person buying 20 units at ₹199. Set it to `0` to give ₹199 on every unit of the first order.

## Google Sheets setup (when you're ready)

1. Create a Google Sheet with three tabs, each with these headers in row 1:
   - `Customers`: phone, name, email, language, createdAt
   - `Orders`: orderId, phone, itemsJson, total, status, paymentId, createdAt, name, pincode, house, street, town, city, state, mrpTotal, discountPercent, discount, shipping, paymentMethod, requestItems, quoteJson
   - `Enquiries`: name, phone, email, message, createdAt
2. In Google Cloud Console create a **service account**, enable the **Google Sheets API**, and download a JSON key.
3. Share the sheet with the service-account email (Editor).
4. Put `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` into `server/.env`.

## Changing things

| To change… | Edit |
|---|---|
| Prices / offer rule | `server/.env` |
| Product text in any language | `client/src/data/products.js` |
| Menu, buttons and page text | `client/src/i18n/translations.js` |
| Logo / intro video / product photos | `client/public/media/` (keep the same file names) |
| Per-language promo image | add e.g. `public/media/ta/byewart.jpg`, then add `ta: '/media/ta/byewart.jpg'` to that product's `images` |
| Colours / fonts | top of `client/src/styles.css` |

> The logo is a still taken from the intro video for now. Replace `client/public/media/logo.png` with the original logo file (square PNG, transparent background) when you have it.

> Please have a native speaker check the Tamil, Telugu and Hindi text, and confirm the product claims, usage directions and caution notes against your labels and AYUSH licence before launch.


## Netlify frontend and Render API

The production frontend requests `/api/...` from its own origin. `client/public/_redirects` proxies those requests to `https://mahadharshni-herblab.onrender.com/api/...` before the SPA fallback. Deploy both the frontend source and `_redirects` together. Production no longer uses `VITE_API_URL`; development still accepts it or uses the local Vite proxy.

After pushing, wait for a successful Netlify deployment, refresh the phone browser, and verify cart pricing and address submission. A backend outage can still interrupt checkout; the cart has a retry control and request failures retain the address form. No automatic checkout resubmission is performed.

Customer policy pages are linked in the footer. Delivery, cancellation, return and refund timing use contact-based guidance until the business supplies specific terms. Shipping remains ₹80 at exactly ₹1,000 and free above ₹1,000, calculated after discounts.


## Persistent admin settings

With Google credentials configured, products, ingredient groups, pricing, top offers, seasonal offers and herbal data are stored in the existing spreadsheet's `WebsiteSettings` tab. Cloudinary retains uploaded images; settings retain their image URLs. Orders, Customers and Enquiries are not changed by this feature.

The tab contains an application-managed JSON snapshot split into Unicode-safe chunks with an integrity checksum. Use the website admin to edit it; do not edit, rename or delete this tab manually. Reads are cached for up to 15 seconds to reduce Sheets quota use. Admin saves refresh the cloud snapshot first and report success only after Sheets accepts the write. A missing/corrupt sheet or API failure never causes a fallback write of old local settings. Production startup requires Google credentials.

### One-time migration

From `server`, run `node scripts/migrate-settings.mjs` **before deploying this version**. It compares local `data/content.json` against the live public catalogue, creates an ignored backup in `server/data/backups/`, creates the settings tab, and verifies the saved snapshot. If a valid settings tab already exists, it does nothing. A different live catalogue, inaccessible sheet, or invalid existing tab stops migration rather than overwriting data.

After migration, restart/deploy the API. `/api/health` reports `contentStorage: "google-sheets"`. Changing the tracked JSON file no longer changes configured sites. Local development with no Google credentials retains file storage; local development using the production sheet edits the SAME live settings. Prefer the live admin for routine changes and a separate sheet for experiments. Writes are serialized within one API process; this is intended for one backend and one active editor, not concurrent independent writers.

Validation: `node --test server/test/settings-store.test.mjs`.
