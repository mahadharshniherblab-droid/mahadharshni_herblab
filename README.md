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

Razorpay Standard Checkout is integrated with server-side order creation and payment verification. See payment setup below before accepting payments.

## Run it on your computer

You need **Node.js 20 or newer** (https://nodejs.org).

Open two terminals in this folder:

```bash
# Terminal 1 – API
cd server
copy .env.example .env      # FIRST SETUP ONLY; do not overwrite an existing .env
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

## Razorpay Standard Checkout

Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `server/.env` locally and in **Render → backend → Environment** for deployment. Restart/redeploy the API after changes. Keep the secret on the backend only. The frontend receives the public key ID from the create-order response; no Vite key variable is needed. Environment files are ignored by Git; `.env.example` contains placeholders only.

Use a Razorpay test key pair first. Configure automatic payment capture in the Razorpay dashboard. Only a captured payment with the correct order, amount and currency is recorded as paid. Authorised payments remain pending. Test payments use `TEST_PAID` in the existing Orders sheet, not `PAID`, and must not be fulfilled. They do not affect first-order eligibility.

Flow:

1. The existing address checkout saves the server-priced order and returns its `orderId`.
2. `POST /api/create-order` with `{ "orderId": "<checkout UUID>" }` creates a Razorpay order using the saved total in paise (minimum 100). Browser-supplied prices are ignored. Response includes `order_id`, `amount`, `currency`, `key_id` and `test_mode`.
3. The Payment page loads `https://checkout.razorpay.com/v1/checkout.js` and opens Standard Checkout.
4. `POST /api/verify-payment` accepts `orderId`, `razorpay_order_id`, `razorpay_payment_id` and `razorpay_signature`. It verifies HMAC-SHA256 with the server-stored provider order ID, checks the payment through Razorpay, then updates the existing sheet row. No new database or sheet tab is needed; the provider mapping is stored in `quoteJson`.

Invalid/missing fields or signatures return 400; provider authentication failures return 401; other provider failures return 500; unconfigured credentials return 503; payments awaiting capture return 202. Failed verification never marks an order paid. Address/amount changes are locked once its payment order is created.

To test, start both servers above, add a product, enter delivery details, and click **Pay securely with Razorpay**. Use the test options shown by Razorpay. Check success, modal cancellation and failure; confirm a successful test row says `TEST_PAID`. Use a separate test Google Sheet if you do not want test rows in your business sheet. Automated tests use fake storage and do not write customer data: `node --test server/test/*.test.mjs`. Build the client with `npm --prefix client run build`.

Retries reuse the saved provider order. If a browser callback is lost, **Check payment / retry** checks Razorpay for a captured payment before opening another modal. This integration does not include background webhook reconciliation: if the customer never returns, review the Razorpay dashboard before fulfilment. Writes are serialized within a single backend process, consistent with the existing Sheets storage; do not run independent backend writers against the same sheet.

Deploy both client and server. Keep the existing Netlify API proxy. For real payments, activate your Razorpay account and replace the test pair with a live pair on Render; restart the backend and create a fresh checkout. Never put the secret in Netlify frontend variables, source code, or Git. Rotate keys shared outside your secret storage before production use.
