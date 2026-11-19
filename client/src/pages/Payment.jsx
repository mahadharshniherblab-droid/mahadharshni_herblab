import { useRef, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { createPaymentOrder, verifyPayment } from '../api.js';
import { loadRazorpay } from '../lib/razorpay.js';

export default function Payment() {
  const { state } = useLocation();
  const { t } = useLang();
  const { clearCart } = useStore();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [paid, setPaid] = useState(null);
  const [locked, setLocked] = useState(false);
  const working = useRef(false);
  const receiptKey = `mh-payment-${state?.orderId}`;

  function remember(value) {
    try { sessionStorage.setItem(receiptKey, JSON.stringify(value)); } catch { /* retry can reconcile through the backend */ }
  }
  function finish(result) {
    if (!result.paid || !result.success) {
      setMessage(result.message ?? 'Payment is awaiting confirmation. Please check payment status shortly.');
      return;
    }
    setPaid(result);
    remember({ paid: result });
    clearCart();
    setMessage('');
  }
  async function pay() {
    if (working.current) return;
    working.current = true;
    setBusy(true);
    setMessage('');
    let modalOpen = false;
    try {
      let receipt;
      try { receipt = JSON.parse(sessionStorage.getItem(receiptKey) ?? 'null'); } catch { /* ignore */ }
      if (receipt?.callback) {
        setLocked(true);
        finish(await verifyPayment({ orderId: state.orderId, ...receipt.callback }));
        return;
      }
      const Checkout = await loadRazorpay();
      const order = await createPaymentOrder(state.orderId);
      setLocked(true);
      if (order.paid || order.pending) { finish(order); return; }
      let handled = false;
      const modal = new Checkout({
        key: order.key_id,
        order_id: order.order_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Mahadharshni Herblab',
        description: order.test_mode ? 'TEST PAYMENT - no real money' : 'Herbal products order',
        prefill: { name: state.customer.name, contact: '+91' + state.customer.phone },
        theme: { color: '#405125' },
        handler: async callback => {
          handled = true;
          remember({ callback });
          setMessage('Confirming payment. Please keep this page open.');
          try { finish(await verifyPayment({ orderId: state.orderId, ...callback })); }
          catch (error) { setMessage(error.message + ' Use the button below to check again; do not make a second payment.'); }
          finally { working.current = false; setBusy(false); }
        },
        modal: { ondismiss: () => {
          if (handled) return;
          working.current = false;
          setBusy(false);
          setMessage('Checkout closed. No payment has been confirmed. You can check its status or try again.');
        } }
      });
      modal.on('payment.failed', event => {
        handled = true;
        modal.close();
        working.current = false;
        setBusy(false);
        setMessage(event.error?.description ?? 'Payment failed. Please try again.');
      });
      modal.open();
      modalOpen = true;
    } catch (error) { setMessage(error.message); }
    finally { if (!modalOpen) { working.current = false; setBusy(false); } }
  }
  if (!state?.customer || !state?.quote) return <Navigate to="/cart" replace />;
  const { customer, quote } = state;
  if (paid) return <section className="section container center">
    <h1>{paid.test_mode ? 'Test payment successful' : 'Payment successful'}</h1>
    <p>{paid.test_mode ? 'This was a test transaction. No real money was collected and this is not a fulfilment order.' : 'Thank you. Your payment has been verified and your order is confirmed.'}</p>
    <p>Order reference: {state.orderId}</p>
    <p>Payment reference: {paid.payment_id}</p>
    <Link className="btn btn--gold" to="/shop">Continue shopping</Link>
  </section>;
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
          {!locked && <Link to="/checkout/address" state={{customer, orderId: state.orderId}} className="link-btn edit-address-link">
            {t('cart.editDetails')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8" />
              <path d="m9 16 1-4L19.5 2.5a1.4 1.4 0 0 1 2 0l1 1a1.4 1.4 0 0 1 0 2L13 15zM18 4l3 3" />
            </svg>
          </Link>}
        </div>
      </div>
      <aside className="cart__summary">
        <h2>{t('cart.priceDetails')}</h2>
        {quote.lines.map(line => <div key={line.productId} className="sum-row"><span>{line.name} × {line.qty}</span><span>₹{line.lineTotal}</span></div>)}
        <div className="sum-row"><span>{t('cart.mrpTotal')}</span><span>₹{quote.mrpTotal}</span></div>
        {quote.discount > 0 && <div className="sum-row sum-row--save"><span>{t(quote.discountType === 'seasonal' ? 'cart.seasonalDiscount' : 'cart.discount')} ({quote.percent}%)</span><span>− ₹{quote.discount}</span></div>}
        <div className="sum-row"><span>{t('cart.shipping')}</span><span>{quote.shipping ? '₹' + quote.shipping : t('cart.free')}</span></div>
        <div className="sum-row sum-row--total"><span>{t('cart.total')}</span><strong>₹{quote.total}</strong></div>
        <button className="btn btn--gold btn--block" disabled={busy} onClick={pay}>
          {busy ? 'Processing…' : locked ? 'Check payment / retry' : 'Pay securely with Razorpay'}
        </button>
        {message && <p className="admin-error" role="status">{message}</p>}
      </aside>
    </section>
  );
}
