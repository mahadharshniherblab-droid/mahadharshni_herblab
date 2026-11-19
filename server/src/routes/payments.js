import { Router } from 'express';
import Razorpay from 'razorpay';
import { createPaymentService } from '../services/payments.js';
import { readRows, updatePendingOrder } from '../services/sheets.js';
import { withOrderLock } from '../services/order-lock.js';

export function paymentRouterFor(service) {
  const router = Router();
  const handle = operation => async (req, res) => {
    try {
      const result = await operation(req.body ?? {});
      res.status(result.pending ? 202 : 200).json(result);
    } catch (error) {
      // Never log provider request objects: they can contain authentication headers.
      const upstream = Number(error.statusCode ?? error.response?.status);
      const status = error.status ?? (upstream === 401 ? 401 : 500);
      const message = error.status ? error.message : upstream === 401
        ? 'Payment provider authentication failed. Please contact the store.'
        : 'Payment service could not complete the request. If debited, check payment status before paying again.';
      console.error('[payment]', status, error.code ?? 'request_failed');
      res.status(status).json({ error: message });
    }
  };
  router.post('/create-order', handle(body => service.create(body.orderId)));
  router.post('/verify-payment', handle(body => service.verify(body)));
  return router;
}
const keyId = process.env.RAZORPAY_KEY_ID?.trim();
const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
const provider = keyId && secret ? new Razorpay({ key_id: keyId, key_secret: secret }) : null;
export const paymentRouter = paymentRouterFor(createPaymentService({ provider, keyId, secret,
  readOrders: () => readRows('Orders'), saveOrder: updatePendingOrder, lock: withOrderLock }));
