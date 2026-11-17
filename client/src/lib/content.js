// Applies the catalogue the owner maintains in the admin dashboard (served by /api/content)
// to the product and ingredient modules the whole storefront reads from.
import { PRODUCT_CONTENT, PRODUCT_ORDER } from '../data/products.js';
import { ingredientGroups } from '../data/ingredients.js';

const EMPTY = { pricing: {}, effectivePricing: {}, herbalData: {}, catalogue: null, ingredientGroups: null, offer: null };
let loaded = EMPTY;

export const getLoadedContent = () => loaded;

export function applyContent(content) {
  if (!content || typeof content !== 'object') return loaded;
  loaded = { ...EMPTY, ...content };

  if (Array.isArray(loaded.catalogue)) {
    for (const id of Object.keys(PRODUCT_CONTENT)) delete PRODUCT_CONTENT[id];
    PRODUCT_ORDER.length = 0;

    for (const product of loaded.catalogue) {
      const pick = (lang) => product.i18n?.[lang] ?? product.i18n?.en ?? {};
      PRODUCT_CONTENT[product.id] = {
        slug: product.slug ?? product.id,
        size: product.size ?? '',
        images: product.images ?? {},
        cardImage: product.cardImage ?? '',
        // "blend" melts a white studio background into the card (see .is-blend in styles.css).
        cardFit: product.cardFit ?? '',
        accent: product.accent ?? '#2e7d32',
        price: product.price,
        en: pick('en'),
        ta: pick('ta'),
        te: pick('te'),
        hi: pick('hi')
      };
      PRODUCT_ORDER.push(product.id);
    }
  }

  if (Array.isArray(loaded.ingredientGroups)) {
    ingredientGroups.length = 0;
    for (const group of loaded.ingredientGroups) {
      ingredientGroups.push({
        key: group.key,
        product: group.product,
        label: group.label ?? '',
        entries: (group.entries ?? []).map((entry) => [entry.key, entry.label, entry.description, entry.image])
      });
    }
  }

  return loaded;
}
