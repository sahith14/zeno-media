// functions/download.js
const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { getStorage } = require('firebase-admin/storage');

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

exports.getVideoUrl = onRequest(async (req, res) => {
  const { videoId } = req.body.data;
  const db = admin.firestore();
  const videoRef = db.collection('portfolio').doc(videoId);
  await videoRef.update({ views: admin.firestore.FieldValue.increment(1) });
  const video = await videoRef.get();
  const r2Key = video.data().r2Key;
  const command = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: r2Key,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  res.json({ url });
});

exports.getDownloadUrl = onRequest(async (req, res) => {
  const { purchaseId } = req.body.data;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const token = authHeader.split(' ')[1];
  let uid;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    uid = decoded.uid;
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  const db = admin.firestore();
  const purchase = await db.collection('purchases').doc(purchaseId).get();
  if (!purchase.exists || purchase.data().userId !== uid) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  const product = await db.collection('products').doc(purchase.data().productId).get();
  const filePath = product.data().filePath;
  const bucket = getStorage().bucket();
  const [url] = await bucket.file(filePath).getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + 60 * 60 * 1000,
  });
  res.json({ url });
});
