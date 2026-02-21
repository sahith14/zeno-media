const functions = require("firebase-functions");
const Stripe = require("stripe");
const { onRequest } = require("firebase-functions/v2/https");
const sgMail = require("@sendgrid/mail");

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

exports.sendTestEmail = onRequest(
  { secrets: ["SENDGRID_API_KEY"] },
  async (req, res) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: "yourpersonalemail@gmail.com",
        from: "zenomedia.work@gmail.com",
        subject: "Zeno Media Test Email",
        text: "Your email system is working correctly.",
        html: "<strong>Your email system is working correctly.</strong>",
      };

      await sgMail.send(msg);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);
