// functions/email.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (to, product) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL,
    subject: `Your download from ZENO MEDIA: ${product.name}`,
    html: `<p>Thank you for your purchase!</p><p>You can download your product <a href="https://zenomedia.com/downloads">here</a> after logging in.</p>`,
  };
  await sgMail.send(msg);
};
