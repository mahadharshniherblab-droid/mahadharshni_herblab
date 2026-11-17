import { Link, Navigate, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';

export default function Payment() {
  const { state } = useLocation();
  const { t } = useLang();
  if (!state?.customer || !state?.quote) return <Navigate to="/cart" replace />;
  const { customer, quote } = state;
  return (
    <section className="section container cart">
      <div className="cart__items">
        <h1>{t('cart.address')}</h1>
        <div className="admin-card">
          <strong>{customer.name}</strong>
          <address className="delivery-address">
            {customer.house}, {customer.street}<br />
            {customer.town}, {customer.city}<br />
            {customer.state} – {customer.pincode}
          </address>
          <span>{t('contact.phone')} · {customer.phone}</span>
          <Link to="/checkout/address" state={{customer, orderId: state.orderId}} className="link-btn edit-address-link">
            {t('cart.editDetails')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8" />
              <path d="m9 16 1-4L19.5 2.5a1.4 1.4 0 0 1 2 0l1 1a1.4 1.4 0 0 1 0 2L13 15zM18 4l3 3" />
            </svg>
          </Link>
        </div>
      </div>
      <aside className="cart__summary">
        <h2>{t('cart.priceDetails')}</h2>
        {quote.lines.map(line => <div key={line.productId} className="sum-row"><span>{line.name} × {line.qty}</span><span>₹{line.lineTotal}</span></div>)}
        <div className="sum-row"><span>{t('cart.mrpTotal')}</span><span>₹{quote.mrpTotal}</span></div>
        {quote.discount > 0 && <div className="sum-row sum-row--save"><span>{t(quote.discountType === 'seasonal' ? 'cart.seasonalDiscount' : 'cart.discount')} ({quote.percent}%)</span><span>− ₹{quote.discount}</span></div>}
        <div className="sum-row"><span>{t('cart.shipping')}</span><span>{quote.shipping ? '₹' + quote.shipping : t('cart.free')}</span></div>
        <div className="sum-row sum-row--total"><span>{t('cart.total')}</span><strong>₹{quote.total}</strong></div>
        <button className="btn btn--gold btn--block" disabled>{t('cart.razorpay')}</button>
      </aside>
    </section>
  );
}
