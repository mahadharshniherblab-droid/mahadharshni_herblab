import { shippingCharge } from '../../../shared/shipping.mjs';
import { PRICING } from '../config/products.js';

import { catalogueView, topOfferPercent, seasonalContent } from './content.js';

export function quoteOrder(items, content, returningCustomer) {
  const seasonalPercent = seasonalContent(content).offers.reduce((best, offer) =>
    offer.active ? Math.max(best, Number(offer.percent) || 0) : best, 0);
  // A live seasonal offer replaces the first-order offer and applies to everyone,
  // first-time or repeat. With no seasonal offer running, only a customer who has
  // no PAID order yet gets the top-strip percentage; repeat customers get nothing.
  const seasonalRunning = seasonalPercent > 0;
  const percent = seasonalRunning ? seasonalPercent : (returningCustomer === false ? topOfferPercent(content) : 0);
  return { ...quoteCart(items, catalogueView(content), percent), percent, discountType: seasonalRunning ? 'seasonal' : 'firstOrder' };
}

/**
 * Builds a price quote for a cart. The discount is rounded once on the combined merchandise total.
 * @param {Array<{productId:string, qty:number}>} items
 * @param {Array<{id:string, slug:string, price?:number, offerPrice?:number, discountPercent?:number, size?:string, images?:object, i18n?:object, inStock?:boolean}>} catalogue
 */
export function quoteCart(items, catalogue = [], percent = 0) {
  const lines = [];
  const errors = [];

  for (const raw of items ?? []) {
    const key = String(raw.productId);
    const product = catalogue.find((p) => p.id === key || p.slug === key);
    const qty = Math.floor(Number(raw.qty));
    if (!product) { errors.push(`Unknown product: ${raw.productId}`); continue; }
    if (!Number.isFinite(qty) || qty < 1 || qty > 20) { errors.push(`Invalid quantity for ${product.id}`); continue; }
    if (product.inStock === false) { errors.push(`${product.i18n?.en?.name ?? product.id} is out of stock`); continue; }

    const regular = Number(product.price ?? PRICING.regular);

    lines.push({
      productId: product.id,
      name: product.i18n?.en?.name ?? product.id,
      size: product.size ?? '',
      qty,
      unitRegular: regular,
      mrpTotal: qty * regular,
      lineTotal: qty * regular
    });
  }

  const mrpTotal = lines.reduce((s, l) => s + l.mrpTotal, 0);

  const discount = Math.round(mrpTotal * percent / 100);
  const subtotal = mrpTotal - discount;
  const shipping = shippingCharge(subtotal);

  return {
    currency: PRICING.currency,
    lines,
    mrpTotal,
    discount,
    subtotal,
    shipping,
    total: subtotal + shipping,
    errors
  };
}
