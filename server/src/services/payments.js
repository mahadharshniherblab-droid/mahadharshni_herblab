import crypto from 'node:crypto';
import { indiaTimestamp } from './time.js';

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
export function validPaymentSignature(orderId, paymentId, signature, secret) {
  if (typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest();
  return crypto.timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}

// Injected storage and provider keep tests isolated from real payments and customer sheets.
export function createPaymentService({ provider, keyId, secret, readOrders, saveOrder, lock }) {
  const testMode = keyId?.startsWith('rzp_test_');
  async function find(orderId) {
    if (typeof orderId !== 'string' || !UUID.test(orderId)) fail(400, 'A valid checkout reference is required.');
    const rows = await readOrders();
    const index = rows.findIndex(row => row.orderId === orderId);
    if (index < 0) fail(404, 'Checkout not found. Please return to your cart.');
    const row = rows[index];
    let quote;
    try { quote = JSON.parse(row.quoteJson); } catch { fail(500, 'The saved checkout could not be read.'); }
    const amount = Math.round(Number(row.total) * 100);
    if (!Number.isSafeInteger(amount) || amount < 100 || Number(quote.total) !== Number(row.total)) fail(400, 'Order total must be at least 100 paise and match the saved checkout.');
    return { row, index, quote, amount };
  }
  function configured() {
    if (!provider || !keyId || !secret) fail(503, 'Payments are not configured. Please contact the store.');
  }
  function result(record) {
    return { success: true, paid: true, orderId: record.row.orderId, payment_id: record.row.paymentId, test_mode: testMode };
  }
  async function confirm(record, payment) {
    const stored = record.quote.razorpay;
    if (payment.order_id !== stored.orderId || Number(payment.amount) !== record.amount || payment.currency !== 'INR') fail(400, 'Payment does not match this checkout.');
    if (payment.status !== 'captured' || payment.captured !== true) {
      if (payment.status === 'authorized') return { success: false, pending: true, message: 'Payment is authorised and awaiting capture. Check payment status shortly; do not pay again.' };
      fail(400, 'Payment has not been captured.');
    }
    if (['PAID', 'TEST_PAID'].includes(record.row.status)) {
      if (record.row.paymentId !== payment.id) fail(409, 'This checkout was paid using a different payment.');
      return result(record);
    }
    const row = { ...record.row, status: testMode ? 'TEST_PAID' : 'PAID', paymentId: payment.id,
      paymentMethod: testMode ? 'Razorpay Test' : 'Razorpay',
      quoteJson: JSON.stringify({ ...record.quote, razorpay: { ...stored, capturedAt: indiaTimestamp() } }) };
    await saveOrder(record.index, row);
    return result({ ...record, row });
  }
  return {
    create(orderId) {
      return lock(async () => {
        configured();
        const record = await find(orderId);
        const stored = record.quote.razorpay;
        if (stored && (stored.keyId !== keyId || stored.amount !== record.amount || stored.currency !== 'INR')) fail(409, 'Payment configuration changed. Please create a new checkout from your cart.');
        if (['PAID', 'TEST_PAID'].includes(record.row.status)) return result(record);
        if (!['PENDING_PAYMENT', 'PAYMENT_CREATED'].includes(record.row.status)) fail(409, 'This checkout is closed.');
        let order;
        if (stored) {
          order = await provider.orders.fetch(stored.orderId);
          if (order.id !== stored.orderId || Number(order.amount) !== record.amount || order.currency !== 'INR') fail(400, 'Payment order does not match the saved checkout.');
          // Recover a captured payment if the browser closed before its callback was saved.
          const payments = await provider.orders.fetchPayments(stored.orderId);
          const captured = payments.items?.find(payment => payment.status === 'captured');
          if (captured) return confirm(record, captured);
          if (order.status === 'paid' || payments.items?.some(payment => payment.status === 'authorized')) {
            return { pending: true, message: 'Payment is being processed. Check its status shortly; do not pay again.' };
          }
        } else {
          order = await provider.orders.create({ amount: record.amount, currency: 'INR', receipt: record.row.orderId });
          if (!/^order_[a-zA-Z0-9]+$/.test(order.id) || Number(order.amount) !== record.amount || order.currency !== 'INR') fail(500, 'The payment provider returned an invalid order.');
          record.quote.razorpay = { orderId: order.id, amount: record.amount, currency: 'INR', keyId };
          await saveOrder(record.index, { ...record.row, status: 'PAYMENT_CREATED', quoteJson: JSON.stringify(record.quote) });
        }
        return { order_id: order.id, amount: record.amount, currency: 'INR', key_id: keyId, test_mode: testMode };
      });
    },
    verify(body = {}) {
      return lock(async () => {
        configured();
        const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
        if (typeof razorpay_order_id !== 'string' || !/^order_[a-zA-Z0-9]+$/.test(razorpay_order_id) ||
            typeof razorpay_payment_id !== 'string' || !/^pay_[a-zA-Z0-9]+$/.test(razorpay_payment_id) || !razorpay_signature) fail(400, 'All payment verification fields are required.');
        const record = await find(orderId);
        const stored = record.quote.razorpay;
        if (!stored || stored.keyId !== keyId || stored.orderId !== razorpay_order_id || stored.amount !== record.amount || stored.currency !== 'INR') fail(400, 'Payment order does not match this checkout.');
        // Always sign the server-stored order ID, never trust the callback order ID alone.
        if (!validPaymentSignature(stored.orderId, razorpay_payment_id, razorpay_signature, secret)) fail(400, 'Payment signature verification failed.');
        if (!['PAYMENT_CREATED', 'PAID', 'TEST_PAID'].includes(record.row.status)) fail(409, 'This checkout is closed.');
        const payment = await provider.payments.fetch(razorpay_payment_id);
        if (payment.id !== razorpay_payment_id) fail(400, 'Payment reference does not match.');
        return confirm(record, payment);
      });
    }
  };
}
