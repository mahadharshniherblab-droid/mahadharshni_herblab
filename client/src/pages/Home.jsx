import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { PRODUCT_ORDER } from '../data/products.js';
import { SECTION_ROUTES } from '../lib/sections.js';
import { reducedMotion } from '../lib/effects.js';
import { getLoadedContent } from '../lib/content.js';
import HeroLogo from '../components/HeroLogo.jsx';
import SeasonalOffer from '../components/SeasonalOffer.jsx';
import IngredientMarquee from '../components/IngredientMarquee.jsx';
import CountUp from '../components/CountUp.jsx';
import About from './About.jsx';
import Shop from './Shop.jsx';
import Ingredients from './Ingredients.jsx';
import Contact from './Contact.jsx';

export default function Home() {
  const { t } = useLang();
  const location = useLocation();
  const navigationType = useNavigationType();
  const mounted = useRef(false);
  // The two home-page numbers, editable under “Herbal data” in the owner dashboard.
  const herbal = getLoadedContent().herbalData ?? {};
  const stats = {
    products: herbal.products ?? PRODUCT_ORDER.length,
    productsSuffix: herbal.productsSuffix ?? '',
    ingredients: herbal.ingredients ?? 20,
    ingredientsSuffix: herbal.ingredientsSuffix ?? '+'
  };

  // Every menu item lands on its section of this one page, so the following sections
  // (Shop → Ingredients → Contact) always come next as you scroll.
  useEffect(() => {
    // Coming back via the Back button (e.g. from a product page) should land you
    // right where you were on this page, not jump up to the top of the home hero.
    if (navigationType === 'POP') { mounted.current = true; return; }
    const id = SECTION_ROUTES[location.pathname] ?? 'home';
    const behavior = mounted.current && !reducedMotion() ? 'smooth' : 'auto';
    mounted.current = true;
    const go = () => {
      if (id === 'home') return window.scrollTo({ top: 0, behavior });
      // The Offers link lands on the seasonal section; when no offer is posted,
      // fall back to the products so the menu item still goes somewhere sensible.
      const target = document.getElementById(id) ?? (id === 'seasonal-offer' ? document.getElementById('shop') : null);
      target?.scrollIntoView({ behavior, block: 'start' });
    };
    const frame = requestAnimationFrame(go);
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.key, navigationType]);

  return (
    <>
      <section className="hero" id="home">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">{t('hero.eyebrow')}</p>
            <p className="hero__positioning">{t('hero.positioning')}</p>
            <h1><span>{t('hero.title')}</span>{' '}<em>{t('hero.accent')}</em></h1>
            <p>{t('hero.subtitle')}</p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn--gold btn--lg btn--shine">{t('hero.cta')} <span className="btn__arrow" aria-hidden="true">→</span></Link>
              <Link to="/ingredients" className="btn btn--ghost btn--lg">{t('nav.ingredients')}</Link>
            </div>
            <p className="shipping-note">{t('shippingPolicy')}</p>
            <dl className="hero__stats">
              <div><dt>{t('hero.products')}</dt><dd><CountUp to={stats.products} suffix={stats.productsSuffix} /></dd></div>
              <div><dt>{t('hero.ingredients')}</dt><dd><CountUp to={stats.ingredients} suffix={stats.ingredientsSuffix} /></dd></div>
            </dl>
          </div>
          <HeroLogo />
        </div>
        <a className="hero__scroll" href="#about" aria-label="Scroll down"
          onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
          <span />
        </a>
      </section>

      <SeasonalOffer />
      <IngredientMarquee />
      <About embedded />
      <Shop embedded />
      <Ingredients embedded />
      <Contact embedded />
    </>
  );
}
