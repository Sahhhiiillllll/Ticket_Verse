import Razorpay from 'razorpay';

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

function requireRazorpay() {
  if (!KEY_ID || !KEY_SECRET) {
    const err = new Error('Missing Razorpay keys. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment');
    err.statusCode = 500;
    throw err;
  }
  return new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
}

export default async function handler(req, res) {
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

    return res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (e) {
    const status = e?.statusCode || 500;
    return res.status(status).json({ error: e?.message || 'Order creation failed' });
  }
}
