export function shippingCharge(subtotal) {
  return subtotal > 0 && subtotal <= 1000 ? 80 : 0;
}
