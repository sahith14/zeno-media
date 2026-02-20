const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("YOUR_STRIPE_SECRET");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();

/* --------------------------
   EMAIL TRANSPORT
--------------------------- */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zenomedia.work@gmail.com",
    pass: "YOUR_GMAIL_APP_PASSWORD"
  }
});

/* --------------------------
   STRIPE CHECKOUT SESSION
--------------------------- */

exports.createStripeSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }

  const discount = data.coupon === "ZENO40" ? 0.6 : 1;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: context.auth.token.email,
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: { name: data.title },
          unit_amount: Math.round(data.price * 100 * discount)
        },
        quantity: 1
      }
    ],
    success_url: data.successUrl,
    cancel_url: data.cancelUrl
  });

  return { url: session.url };
});

/* --------------------------
   STRIPE WEBHOOK
--------------------------- */

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = "YOUR_STRIPE_WEBHOOK_SECRET";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderRef = await db.collection("orders").add({
      email: session.customer_email,
      amount: session.amount_total / 100,
      createdAt: Date.now()
    });

    const downloadUrl = "https://your-r2-public-url/digital-file.zip";

    await transporter.sendMail({
      from: "ZENO MEDIA",
      to: session.customer_email,
      subject: "Your Digital Download",
      text: `Download here: ${downloadUrl}`
    });

    await orderRef.update({ downloadUrl });
  }

  res.json({ received: true });
});

/* --------------------------
   RAZORPAY
--------------------------- */

const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY",
  key_secret: "YOUR_RAZORPAY_SECRET"
});

exports.createRazorpayOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }

  const discount = data.coupon === "ZENO40" ? 0.6 : 1;

  const order = await razorpay.orders.create({
    amount: Math.round(data.price * 100 * discount),
    currency: "GBP"
  });

  return order;
});

/* --------------------------
   CONTACT EMAIL TRIGGER
--------------------------- */

exports.contactEmail = functions.firestore
  .document("messages/{id}")
  .onCreate(async (snap) => {
    const data = snap.data();

    await transporter.sendMail({
      from: data.email,
      to: "zenomedia.work@gmail.com",
      subject: "New Contact Message",
      text: data.message
    });
  });
