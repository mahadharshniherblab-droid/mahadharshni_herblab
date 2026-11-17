import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { isSectionRoute } from '../lib/sections.js';
import ThemeToggle from './ThemeToggle.jsx';
import Logo from './Logo.jsx';

const LINKS = [
  { to: '/', key: 'home', sections: ['home', 'about'] },
  { to: '/offers', key: 'offers', sections: ['seasonal-offer'] },
  { to: '/shop', key: 'shop', sections: ['shop'] },
  { to: '/ingredients', key: 'ingredients', sections: ['ingredients'] },
  { to: '/contact', key: 'contact', sections: ['contact'] }
];

export default function Header() {
  const { t, lang, setLang, languages } = useLang();
  const { cartCount } = useStore();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const adminRef = useRef(null);
  const [section, setSection] = useState('home');
  const [bump, setBump] = useState(false);
  const firstCount = useRef(true);
  const close = () => setOpen(false);
  const onePage = isSectionRoute(pathname);

  // Highlight the menu item for whichever section is on screen
  useEffect(() => {
    if (!onePage) return;
    const ids = ['home', 'seasonal-offer', 'about', 'shop', 'ingredients', 'contact'];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSection(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    const t0 = setTimeout(() => ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); }), 50);
    return () => { clearTimeout(t0); io.disconnect(); };
  }, [onePage, pathname]);

  // Close the owner menu on an outside click or Escape
  useEffect(() => {
    if (!adminOpen) return;
    const onDown = (event) => { if (!adminRef.current?.contains(event.target)) setAdminOpen(false); };
    const onKey = (event) => { if (event.key === 'Escape') setAdminOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [adminOpen]);

  // Bounce the cart icon whenever something is added
  useEffect(() => {
    if (firstCount.current) { firstCount.current = false; return; }
    setBump(true);
    const timer = setTimeout(() => setBump(false), 650);
    return () => clearTimeout(timer);
  }, [cartCount]);

  const isActive = (link) => (onePage ? link.sections.includes(section) : false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand" onClick={close}>
          <Logo size={52} className="logo--spin" />
          <span className="brand__text">
            <strong>Mahadharshni</strong>
            <small>Herblab</small>
          </span>
        </Link>

        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
          {LINKS.map((link, i) => (
            <Link key={link.key} to={link.to} onClick={close} style={{ '--i': i }}
              className={isActive(link) ? 'active' : undefined} aria-current={isActive(link) ? 'page' : undefined}>
              {t('nav.' + link.key)}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language"
          >
            {languages.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>

          <ThemeToggle />

          <Link to="/cart" className={'cart-btn' + (bump ? ' cart-btn--bump' : '') + (pathname === '/cart' ? ' active' : '')} aria-label={t('nav.cart')} onClick={close}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 6h15l-1.5 9h-12z" /><path d="M6 6 5 3H2" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
            </svg>
            {cartCount > 0 && <span className="cart-btn__count" key={cartCount}>{cartCount}</span>}
          </Link>

          {/* Owner / admin login: the three dots open a small menu */}
          <div className="admin-menu-wrap" ref={adminRef}>
            <button
              type="button"
              className={'admin-btn' + (adminOpen ? ' is-open' : '')}
              title="Owner / Admin login"
              aria-label="Owner / Admin login"
              aria-haspopup="menu"
              aria-expanded={adminOpen}
              onClick={() => setAdminOpen((isOpen) => !isOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="5" r="1.9" /><circle cx="12" cy="12" r="1.9" /><circle cx="12" cy="19" r="1.9" />
              </svg>
            </button>
            {adminOpen && (
              <div className="admin-menu" role="menu">
                <Link
                  to="/admin"
                  role="menuitem"
                  className="admin-menu__item"
                  onClick={() => { setAdminOpen(false); close(); }}
                >
                  <span className="admin-menu__title">Owner login</span>
                  <small className="muted">Open the admin dashboard</small>
                </Link>
              </div>
            )}
          </div>

          <button className={'menu-btn' + (open ? ' is-open' : '')} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
