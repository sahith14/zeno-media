// functions/r2-upload.js
const { onRequest } = require('firebase-functions/v2/https');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const admin = require('firebase-admin');

// Initialize admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

exports.generateR2UploadUrl = onRequest(
  {
    cors: true,
    secrets: ['CLOUDFLARE_R2_ACCESS_KEY_ID', 'CLOUDFLARE_R2_SECRET_ACCESS_KEY', 'ADMIN_EMAIL']
  },
  async (req, res) => {
    try {
      // Set CORS headers
      res.set('Access-Control-Allow-Origin', '*');
      
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const token = authHeader.split(' ')[1];
      let decoded;
      
      try {
        decoded = await admin.auth().verifyIdToken(token);
      } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      if (decoded.email !== ADMIN_EMAIL) {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }

      const { fileName, fileType } = req.body.data;
      
      if (!fileName || !fileType) {
        res.status(400).json({ error: 'Missing fileName or fileType' });
        return;
      }

      // Sanitize filename
      const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const key = `videos/${Date.now()}_${sanitizedFileName}`;
      
      const command = new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: key,
        ContentType: fileType,
      });
      
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      res.json({ url, key });
      
    } catch (error) {
      console.error('Error generating upload URL:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);
