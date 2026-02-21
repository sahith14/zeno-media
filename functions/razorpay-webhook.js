// functions/razorpay-webhook.js
const { onRequest } = require('firebase-functions/v2/https');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const admin = require('firebase-admin');
const { sendEmail } = require('./email');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createRazorpayOrder = onRequest(async (req, res) => {
  const { productId, userId } = req.body.data;
  const db = admin.firestore();
  const productDoc = await db.collection('products').doc(productId).get();
  if (!productDoc.exists) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  const product = productDoc.data();
  const price = (product.salePrice || product.price) * 100; // in paise
  const options = {
    amount: price,
    currency: 'INR',
    receipt: `receipt_${productId}_${userId}`,
    notes: { productId, userId },
  };
  const order = await razorpay.orders.create(options);
  res.json(order);
});

exports.razorpayWebhook = onRequest(async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');
  if (digest !== req.headers['x-razorpay-signature']) {
    res.status(400).send('Invalid signature');
    return;
  }
  const event = req.body.event;
  if (event === 'payment.captured') {
    const payment = req.body.payload.payment.entity;
    const { productId, userId } = payment.notes;
    const db = admin.firestore();
    await db.collection('purchases').add({
      userId,
      productId,
      amount: payment.amount / 100,
      currency: payment.currency,
      paymentMethod: 'razorpay',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const user = await admin.auth().getUser(userId);
    const productDoc = await db.collection('products').doc(productId).get();
    const product = productDoc.data();
    await sendEmail(user.email, product);
  }
  res.json({ received: true });
});
