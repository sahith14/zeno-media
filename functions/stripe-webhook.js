// functions/stripe-webhook.js
const { onRequest } = require('firebase-functions/v2/https');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');
const { sendEmail } = require('./email');

exports.createStripeCheckoutSession = onRequest(async (req, res) => {
  const { productId, userId } = req.body.data;
  const db = admin.firestore();
  const productDoc = await db.collection('products').doc(productId).get();
  if (!productDoc.exists) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  const product = productDoc.data();
  const price = product.salePrice || product.price;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: { name: product.name },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://zenomedia.com/shop?success=true',
    cancel_url: 'https://zenomedia.com/shop?canceled=true',
    metadata: { productId, userId },
  });
  res.json({ sessionId: session.id });
});

exports.stripeWebhook = onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { productId, userId } = session.metadata;
    const db = admin.firestore();
    await db.collection('purchases').add({
      userId,
      productId,
      amount: session.amount_total / 100,
      currency: session.currency,
      paymentMethod: 'stripe',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const user = await admin.auth().getUser(userId);
    const productDoc = await db.collection('products').doc(productId).get();
    const product = productDoc.data();
    await sendEmail(user.email, product);
  }
  res.json({ received: true });
});
