// Single source of truth for the catalogue on the server.
// Prices are NEVER taken from the browser - the client only sends product ids and quantities.

const regularPrice = Number(process.env.REGULAR_PRICE ?? 399);
const discountPercent = Number(process.env.DISCOUNT_PERCENT ?? 10);

/** Prices from .env, overridden by whatever the owner saved in the admin dashboard. */
export function pricingFrom(overrides = {}) {
  const regular = Number(overrides.regularPrice ?? regularPrice);
  const percent = Number(overrides.discountPercent ?? discountPercent);
  return {
    regular,
    discountPercent: percent,
    // Flat discount applied to every order, every unit - no first-order restriction.
    offer: regular - Math.round((regular * percent) / 100),
    currency: 'INR'
  };
}

export const PRICING = pricingFrom();

export const PRODUCTS = [
  {
    id: 'ortho-g',
    slug: 'ortho-g',
    sku: 'MH-ORTHOG-50',
    name: 'Ortho-G Pain Relief Roll-On',
    size: '50 ml',
    image: '/media/ortho-g.png',
    inStock: true
  },
  {
    id: 'keshdharshni',
    slug: 'keshdharshni-hair-oil',
    sku: 'MH-KESH-100',
    name: 'Keshdharshni Herbal Hair Oil',
    size: '100 ml',
    image: '/media/keshdharshni.jpg',
    inStock: true
  },
  {
    id: 'byewart',
    slug: 'byewart-gel',
    sku: 'MH-BYEWART-50',
    name: 'ByeWart Gel',
    size: '50 ml',
    image: '/media/byewart.jpg',
    inStock: true
  }
];

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}
