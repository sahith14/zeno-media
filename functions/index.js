const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("YOUR_STRIPE_SECRET");

admin.initializeApp();

exports.createStripeSession = functions.https.onCall(async (data) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "gbp",
        product_data: { name: data.title },
        unit_amount: data.price * 100
      },
      quantity: 1
    }],
    success_url: "https://yourdomain.com",
    cancel_url: "https://yourdomain.com"
  });

  return { url: session.url };
});
