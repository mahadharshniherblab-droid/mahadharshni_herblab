import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCT_CONTENT, PRODUCT_ORDER, findBySlug, imageFor } from '../data/products.js';
import { videoFor } from '../data/videos.js';
import Price from '../components/Price.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { flyToCart } from '../lib/effects.js';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const { addToCart, notify } = useStore();
  const img = useRef(null);
  const zoom = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--zx', ((e.clientX - r.left) / r.width) * 100 + '%');
    e.currentTarget.style.setProperty('--zy', ((e.clientY - r.top) / r.height) * 100 + '%');
  };
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [slide, setSlide] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);

  const id = findBySlug(slug);

  // A fresh product (navigating from one product page straight to another)
  // should always start on the photo, not wherever the last product's slider was.
  useEffect(() => { setSlide(0); }, [id]);

  if (!id) {
    return (
      <section className="section container center">
        <h1>{t('product.notFound')}</h1>
        <Link className="btn btn--primary" to="/shop">{t('product.backToShop')}</Link>
      </section>
    );
  }

  const p = PRODUCT_CONTENT[id];
  const c = p[lang] ?? p.en;
  const others = PRODUCT_ORDER.filter((o) => o !== id);
  const video = videoFor(id);
  const slideCount = video ? 2 : 1;
  const goTo = (i) => setSlide(Math.max(0, Math.min(slideCount - 1, i)));
  const onDragStart = (e) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onDragMove = (e) => {
    if (!dragging.current) return;
    let dx = e.clientX - dragStartX.current;
    // Resist dragging past the first or last slide instead of letting it slide away freely.
    if ((slide === 0 && dx > 0) || (slide === slideCount - 1 && dx < 0)) dx *= 0.35;
    setDragDelta(dx);
  };
  const onDragEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = dragDelta;
    setDragDelta(0);
    if (Math.abs(dx) > 40) goTo(slide + (dx < 0 ? 1 : -1));
  };

  const add = () => {
    flyToCart(img.current);
    addToCart(id, qty);
    notify(t('fx.added', { name: (qty > 1 ? qty + ' × ' : '') + c.name }), imageFor(id, lang));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  const buyNow = () => { addToCart(id, qty); navigate('/cart'); };

  return (
    <>
      <section className="section">
        <div className="container pdp" style={{ '--accent': p.accent }}>
          <div className="pdp__media" data-reveal="left">
            <div className="pdp__slider">
              <div
                className={'pdp__slides' + (dragging.current ? ' is-dragging' : '')}
                style={{ '--slide': slide, '--drag': dragDelta + 'px' }}
                onPointerMove={(e) => { zoom(e); onDragMove(e); }}
                onPointerDown={onDragStart}
                onPointerUp={onDragEnd}
                onPointerCancel={onDragEnd}
              >
                <div className="pdp__slide">
                  <img ref={img} className={'pdp__photo' + (p.cardFit === 'blend' ? ' is-blend' : '')} src={imageFor(id, lang)} alt={`${c.name} ${c.type}`} draggable={false} />
                </div>
                {video && (
                  <div className="pdp__slide">
                    <video src={video} autoPlay muted loop playsInline controls />
                  </div>
                )}
              </div>
              {video && (
                <>
            <button className="gallery-arrow" type="button" aria-label={t(slide === 0 ? 'product.video' : 'product.photo')} onClick={() => goTo(1 - slide)}>
              {slide === 0 ? '→' : '←'}
            </button>
            <div className="pdp__dots">
                  <button type="button" className={slide === 0 ? 'is-active' : undefined} aria-label={t('product.photo')} onClick={() => goTo(0)} />
                  <button type="button" className={slide === 1 ? 'is-active' : undefined} aria-label={t('product.video')} onClick={() => goTo(1)} />
                </div>
            </>
              )}
            </div>
          </div>
          <div className="pdp__info" data-reveal="right">
            <p className="pdp__brand">Mahadharshni Herblab</p>
            <h1>{c.name} <span className="pdp__type">{c.type}</span></h1>
            <p className="pdp__tagline">{c.tagline}</p>
            <p>{c.short}</p>
            <p className="pdp__size">{t('product.size')}: <strong>{p.size}</strong></p>
            <Price large regular={p.price} />
            <small className="muted">{t('product.inclTax')}</small>

            <div className="pdp__buy">
              <div className="qty" aria-label={t('product.qty')}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="-">−</button>
                <span key={qty} className="qty__num">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="+">+</button>
              </div>
              <button className={'btn btn--primary btn--lg' + (added ? ' is-added' : '')} onClick={add}>{added ? '✓ ' + t('product.added') : t('product.addToCart')}</button>
              <button className="btn btn--gold btn--lg btn--shine" onClick={buyNow}>{t('product.buyNow')}</button>
            </div>
            <p className="shipping-note">{t('shippingPolicy')}</p>

            <div className="pdp__block" data-reveal="">
              <h2>{t('product.benefits')}</h2>
              <ul className="ticks">{c.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
            <div className="pdp__block">
              <h2>{t('product.howToUse')}</h2>
              <p>{c.howToUse}</p>
            </div>
            <div className="pdp__block pdp__caution">
              <h2>{t('product.caution')}</h2>
              <p>{c.caution}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="grid grid--two">
            {others.map((o, i) => <ProductCard key={o} id={o} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}
