import crypto from 'crypto';

const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!KEY_SECRET) {
      return res.status(500).json({ ok: false, error: 'Missing RAZORPAY_KEY_SECRET in environment' });
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
    return res.status(200).json({ ok });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Verification failed' });
  }
}
