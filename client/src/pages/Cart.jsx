import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCT_CONTENT, imageFor } from '../data/products.js';
import { fetchQuote, saveCheckout } from '../api.js';

export default function Cart() {
  const { t, lang } = useLang();
  const { cart, setQty, removeFromCart } = useStore();
  const [quote, setQuote] = useState(null);
  const navigate = useNavigate();
  const { state: checkoutState, pathname } = useLocation();
  const checkoutOpen = pathname === '/checkout/address';
  const dialog = useRef(null);
  const edit = checkoutState?.customer;
  const [quoteError, setQuoteError] = useState(false);
  const [quoteAttempt, setQuoteAttempt] = useState(0);

  const [details, setDetails] = useState(edit ?? {});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const submission = useRef(checkoutState?.orderId);
  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError('');
    try {
      submission.current ??= crypto.randomUUID();
      const result = await saveCheckout({ orderId: submission.current, customer: details, items: cart });
      navigate('/payment', { state: { ...result, customer: details } });
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }

  useEffect(() => {
    if (!cart.length) { setQuote(null); return; }
    let cancelled = false;
    setQuote(null);
    setQuoteError(false);
    fetchQuote(cart)
      .then((q) => { if (!cancelled) setQuote(q); })
      .catch(() => { if (!cancelled) setQuoteError(true); });
    return () => { cancelled = true; };
  }, [cart, quoteAttempt]);

  useEffect(() => {
    const el = dialog.current;
    if (!checkoutOpen || !el) return;
    el.showModal();
    return () => el.close();
  }, [checkoutOpen, cart.length]);

  if (!cart.length) {
    return (
      <section className="section container center cart-empty">
        <div className="cart-empty__icon" aria-hidden="true">🛒</div>
        <h1>{t('cart.title')}</h1>
        <p>{t('cart.empty')}</p>
        <Link className="btn btn--primary" to="/shop">{t('cart.continue')}</Link>
      </section>
    );
  }

  const lineFor = (id) => quote?.lines.find((l) => l.productId === id);

  return (
    <section className="section">
      <div className="container cart">
        <div className="cart__items">
          <h1>{t('cart.title')}</h1>
          {cart.map((item) => {
            const p = PRODUCT_CONTENT[item.productId];
            if (!p) return null;
            const c = p[lang] ?? p.en;
            const line = lineFor(item.productId);
            return (
              <div className="cart-row" key={item.productId} data-reveal="left">
                <img src={imageFor(item.productId, lang)} alt="" />
                <div className="cart-row__info">
                  <Link to={`/product/${p.slug}`}><strong>{c.name}</strong> {c.type}</Link>
                  <small className="muted">{p.size}</small>
                  <div className="qty qty--small">
                    <button onClick={() => setQty(item.productId, item.qty - 1)} aria-label="-">−</button>
                    <span key={item.qty} className="qty__num">{item.qty}</span>
                    <button onClick={() => setQty(item.productId, item.qty + 1)} aria-label="+">+</button>
                  </div>
                </div>
                <div className="cart-row__price">
                  {line ? (
                    <strong>₹{line.lineTotal}</strong>
                  ) : <span className="muted">{t(quoteError ? 'cart.unavailable' : 'cart.loading')}</span>}
                  <button className="link-btn" onClick={() => removeFromCart(item.productId)}>{t('cart.remove')}</button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="cart__summary" data-reveal="right">
          {quote ? (
            <>
              <div className="sum-row"><span>{t('cart.mrpTotal')}</span><span>₹{quote.mrpTotal}</span></div>
              {quote.discount > 0 && <div className="sum-row sum-row--save"><span>{t(quote.discountType === 'seasonal' ? 'cart.seasonalDiscount' : 'cart.discount')}{quote.percent > 0 && ` (${quote.percent}%)`}</span><span>− ₹{quote.discount}</span></div>}
              <div className="sum-row"><span>{t('cart.shipping')}</span><span>{quote.shipping ? `₹${quote.shipping}` : t('cart.free')}</span></div>
              <p className="shipping-note">{t('shippingPolicy')}</p>
               {quote.firstOrderEstimate && <p className="muted small">{t('cart.firstOrderEstimate')}</p>}
              <div className="sum-row sum-row--total"><span>{t('cart.total')}</span><span>₹{quote.total}</span></div>
            </>
          ) : <p className="muted">{t(quoteError ? 'cart.unavailable' : 'cart.loading')}</p>}
          {quoteError && <button className="btn btn--primary" onClick={() => setQuoteAttempt(n => n + 1)}>↻ {({en:'Retry prices',ta:'மீண்டும் முயற்சி',te:'మళ్లీ ప్రయత్నించండి',hi:'फिर कोशिश करें'})[lang]}</button>}
          <Link className="btn btn--gold btn--lg btn--block btn--shine" to="/checkout/address" state={{ fromCart: true }}>
            {t('cart.checkout')}
          </Link>
          <Link className="link-btn" to="/shop">{t('cart.continue')}</Link>
        </aside>
      </div>
      {checkoutOpen && (
        <dialog ref={dialog} className="address-dialog" aria-labelledby="address-title"
          onCancel={e => { e.preventDefault(); if (!saving) navigate(checkoutState ? -1 : '/cart'); }}>
          <header>
            <h2 id="address-title">{t('cart.address')}</h2>
            <button type="button" className="link-btn" aria-label={t('fx.close')} disabled={saving}
              onClick={() => navigate(checkoutState ? -1 : '/cart')}>×</button>
          </header>
            <form className="checkout-details" onSubmit={submit}>
              {['name','phone','pincode','house','street','town','city','state'].map((key) => (
                <label key={key} className="admin-field">
                  {t(key === 'name' || key === 'phone' ? 'contact.' + key : 'cart.' + key)}
                  <input name={key} required autoFocus={key === 'name'} type={key === 'phone' ? 'tel' : 'text'}
                    autoComplete={({name:'name',phone:'tel-national',pincode:'postal-code',house:'address-line1',street:'address-line2',town:'address-line3',city:'address-level2',state:'address-level1'})[key]}
                    inputMode={['phone','pincode'].includes(key) ? 'numeric' : 'text'}
                    pattern={key === 'phone' ? '[0-9]{10}' : key === 'pincode' ? '[1-9][0-9]{5}' : '.*\\S.*'}
                    maxLength={key === 'phone' ? 10 : key === 'pincode' ? 6 : 250}
                    value={details[key] ?? ''} onChange={e => setDetails({ ...details, [key]: e.target.value })} />
                </label>
              ))}
              <button className="btn btn--gold" disabled={saving}>{t('cart.toPayment')}</button>
              {error && <p className="admin-error" role="alert">{error}</p>}
            </form>
        </dialog>
      )}
    </section>
  );
}
