import 'dotenv/config';
import express from 'express';
import Razorpay from 'razorpay';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 8080);
const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

const app = express();
app.use(express.json());

// Serve static site files
app.use(express.static(__dirname));

function requireRazorpay() {
  if (!KEY_ID || !KEY_SECRET) {
    const err = new Error('Missing Razorpay keys. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env');
    // @ts-ignore
    err.statusCode = 500;
    throw err;
  }
  return new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
}

// Create a Razorpay order (server-side, required)
app.post('/api/razorpay/order', async (req, res) => {
  try {
    const rzp = requireRazorpay();
    const amountInr = Number(req.body?.amountInr);
    const receipt = String(req.body?.receipt || '');
    const notes = req.body?.notes && typeof req.body.notes === 'object' ? req.body.notes : {};

    if (!Number.isFinite(amountInr) || amountInr <= 0) {
      return res.status(400).json({ error: 'Invalid amountInr' });
    }

    const order = await rzp.orders.create({
      amount: Math.round(amountInr * 100), // INR paise
      currency: 'INR',
      receipt: receipt || undefined,
      notes,
    });

    return res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (e) {
    const status = e?.statusCode || 500;
    return res.status(status).json({ error: e?.message || 'Order creation failed' });
  }
});

// Verify Razorpay payment signature (server-side, required for production)
app.post('/api/razorpay/verify', (req, res) => {
  try {
    if (!KEY_SECRET) {
      return res.status(500).json({ ok: false, error: 'Missing RAZORPAY_KEY_SECRET in .env' });
    }
    const orderId = String(req.body?.razorpay_order_id || '');
    const paymentId = String(req.body?.razorpay_payment_id || '');
    const signature = String(req.body?.razorpay_signature || '');

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ ok: false, error: 'Missing order/payment/signature' });
    }

    const hmac = crypto.createHmac('sha256', KEY_SECRET);
    hmac.update(`${orderId}|${paymentId}`);
    const expected = hmac.digest('hex');

    const ok = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    return res.json({ ok });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Verification failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Ticket Verse running on http://127.0.0.1:${PORT}`);
  console.log('Razorpay order endpoint: POST /api/razorpay/order');
  console.log('Razorpay verify endpoint: POST /api/razorpay/verify');
});

