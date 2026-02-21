const functions = require("firebase-functions");
const Stripe = require("stripe");

exports.stripeWebhook = functions
  .runWith({
    secrets: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"]
  })
  .https.onRequest(async (req, res) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Payment successful for session:", session.id);
    }

    res.json({ received: true });
  });
