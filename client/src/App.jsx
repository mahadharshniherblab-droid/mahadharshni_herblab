import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import OfferBar from './components/OfferBar.jsx';
import Toast from './components/Toast.jsx';
import WelcomePopup from './components/WelcomePopup.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Payment from './pages/Payment.jsx';
import Cart from './pages/Cart.jsx';
import { isSectionRoute } from './lib/sections.js';
import { startReveal, startRipples } from './lib/effects.js';

export default function App() {
  const { pathname } = useLocation();
  const topbar = useRef(null);
  // Home, Shop, Ingredients and Contact are sections of one page; Home scrolls to them itself.
  useEffect(() => { if (!isSectionRoute(pathname)) window.scrollTo(0, 0); }, [pathname]);

  // Scroll-in animations and button ripples for the whole site
  useEffect(() => startReveal(document.getElementById('root')), []);
  useEffect(() => startRipples(), []);

  // Keep the sticky header height in a CSS variable so section jumps land just below it
  useEffect(() => {
    const el = topbar.current;
    if (!el) return; // the owner dashboard has no shop header
    const set = () => document.documentElement.style.setProperty('--topbar-h', el.offsetHeight + 'px');
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pathname]);

  // The owner dashboard has its own plain layout: no shop header, intro or welcome pop-up.
  if (pathname.startsWith('/admin')) {
    return (
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Admin />} />
      </Routes>
    );
  }

  return (
    <>
      <div className="topbar" ref={topbar}>
        <OfferBar />
        <Header />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Home />} />
          <Route path="/ingredients" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout/address" element={<Cart />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
      <Toast />
      <WelcomePopup ready />
    </>
  );
}
