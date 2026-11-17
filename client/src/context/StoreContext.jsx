import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCatalogue } from '../api.js';

const StoreContext = createContext(null);

// Used until the API answers (or if it is not running)
const DEFAULT_PRICING = { regular: 399, discountPercent: 10, offer: 359, currency: 'INR' };
// The strip above the header: its own MRP, price and percentage (Price tab).
const DEFAULT_TOP_OFFER = { percent: 10, mrp: 399, price: 359 };

export function StoreProvider({ children }) {
  const [pricing, setPricing] = useState(DEFAULT_PRICING);
  const [topOffer, setTopOffer] = useState(DEFAULT_TOP_OFFER);
  const [apiOnline, setApiOnline] = useState(false);
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mh-cart') ?? '[]'); } catch { return []; }
  });

  useEffect(() => {
    fetchCatalogue()
      .then((data) => {
        setPricing({ ...DEFAULT_PRICING, ...data.pricing });
        setTopOffer({ ...DEFAULT_TOP_OFFER, ...(data.topOffer ?? {}) });
        setApiOnline(true);
      })
      .catch(() => setApiOnline(false));
  }, []);

  useEffect(() => {
    try { localStorage.setItem('mh-cart', JSON.stringify(cart)); } catch { /* ignore */ }
  }, [cart]);

  const addToCart = useCallback((productId, qty = 1) => {
    setCart((c) => {
      const found = c.find((i) => i.productId === productId);
      if (found) return c.map((i) => (i.productId === productId ? { ...i, qty: Math.min(20, i.qty + qty) } : i));
      return [...c, { productId, qty }];
    });
  }, []);

  const setQty = useCallback((productId, qty) => {
    setCart((c) => (qty < 1 ? c.filter((i) => i.productId !== productId)
      : c.map((i) => (i.productId === productId ? { ...i, qty: Math.min(20, qty) } : i))));
  }, []);

  // Pop-up message (e.g. "Ortho-G added to cart")
  const [toast, setToast] = useState(null);
  const notify = useCallback((text, img) => setToast({ id: Date.now(), text, img }), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const removeFromCart = useCallback((productId) => setCart((c) => c.filter((i) => i.productId !== productId)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(() => ({
    pricing, topOffer, apiOnline, cart,
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    addToCart, setQty, removeFromCart, clearCart, toast, notify, dismissToast
  }), [pricing, topOffer, apiOnline, cart, addToCart, setQty, removeFromCart, clearCart, toast, notify, dismissToast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
