import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCT_CONTENT, imageFor } from '../data/products.js';
import { videoFor } from '../data/videos.js';
import Price from './Price.jsx';
import { flyToCart } from '../lib/effects.js';

export default function ProductCard({ id, index = 0 }) {
  const { t, lang } = useLang();
  const { addToCart, notify } = useStore();
  const img = useRef(null);
  const [added, setAdded] = useState(false);
  const [slide, setSlide] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragged = useRef(false);
  const p = PRODUCT_CONTENT[id];
  const c = p[lang] ?? p.en;
  const cardImage = p.cardImage || (p.images[lang] && lang !== 'en'
    ? imageFor(id, lang)
    : (p.images.en || (location.protocol === 'file:' ? 'preview/site/media/' : '/media/') + 'logo.png'));
  const video = videoFor(id);
  const slideCount = video ? 2 : 1;
  const goTo = (i) => setSlide(Math.max(0, Math.min(slideCount - 1, i)));
  const onDragStart = (e) => {
    // Nothing to swipe to (no video) - leave taps alone so the cover always opens the product.
    if (slideCount <= 1) return;
    dragging.current = true;
    dragged.current = false;
    dragStartX.current = e.clientX;
    // Keep the tap target on the cover link. Capture only after a swipe begins.
  };
  const onDragMove = (e) => {
    if (!dragging.current) return;
    let dx = e.clientX - dragStartX.current;
    // A bit of tolerance so an ordinary tap isn't mistaken for the start of a swipe.
    if (Math.abs(dx) > 12) {
      dragged.current = true;
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
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
  // A swipe that changed slides shouldn't also fire the cover photo's link.
  const onMediaClick = (e) => { if (dragged.current) { e.preventDefault(); dragged.current = false; } };

  const add = () => {
    flyToCart(img.current);
    addToCart(id, 1);
    notify(t('fx.added', { name: c.name }), cardImage);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="card" style={{ '--accent': p.accent, '--d': index * 120 + 'ms' }} data-reveal="up">
      <div className="card__slider">
        <div
          className={'card__slides' + (dragging.current ? ' is-dragging' : '')}
          style={{ '--slide': slide, '--drag': dragDelta + 'px' }}
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
        >
          <div className="card__slide">
            <Link to={`/product/${p.slug}`} className="card__media" onClick={onMediaClick}>
              <img ref={img} src={cardImage} alt={`${c.name} ${c.type}`} loading="lazy" draggable={false} className={p.cardFit === 'blend' ? 'is-blend' : undefined} />
              <span className="card__peek">{t('product.viewDetails')} →</span>
            </Link>
          </div>
          {video && (
            <div className="card__slide">
              <video src={video} autoPlay muted loop playsInline />
            </div>
          )}
        </div>
        {video && (
          <>
            <button className="gallery-arrow" type="button" aria-label={t(slide === 0 ? 'product.video' : 'product.photo')} onClick={() => goTo(1 - slide)}>
              {slide === 0 ? '→' : '←'}
            </button>
            <div className="card__dots">
            <button type="button" className={slide === 0 ? 'is-active' : undefined} aria-label={t('product.photo')} onClick={(e) => { e.preventDefault(); goTo(0); }} />
            <button type="button" className={slide === 1 ? 'is-active' : undefined} aria-label={t('product.video')} onClick={(e) => { e.preventDefault(); goTo(1); }} />
          </div>
            </>
        )}
      </div>
      <div className="card__body">
        <div className="card__heading">
          <h3 className="card__title">
            <Link to={`/product/${p.slug}`}>{c.name}</Link>
          </h3>
          <span className="card__size">{p.size}</span>
        </div>
        <Link className="card__description" to={`/product/${p.slug}`}>
        <p className="card__type">{c.type}</p>
        <p className="card__short">{c.short}</p>
        <Price regular={p.price} />
        </Link>
        <div className="card__actions">
          <button className={'btn btn--primary' + (added ? ' is-added' : '')} onClick={add}>{added ? '✓ ' + t('product.added') : t('product.addToCart')}</button>
          <Link className="btn btn--ghost" to={`/product/${p.slug}`}>{t('product.viewDetails')}</Link>
        </div>
      </div>
    </article>
  );
}
