// functions/index.js
const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createStripeCheckoutSession = require('./stripe-webhook').createStripeCheckoutSession;
exports.stripeWebhook = require('./stripe-webhook').stripeWebhook;
exports.createRazorpayOrder = require('./razorpay-webhook').createRazorpayOrder;
exports.razorpayWebhook = require('./razorpay-webhook').razorpayWebhook;
exports.getVideoUrl = require('./download').getVideoUrl;
exports.getDownloadUrl = require('./download').getDownloadUrl;
exports.generateR2UploadUrl = require('./r2-upload').generateR2UploadUrl;
