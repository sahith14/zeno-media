# Zeno Media

## Deploy from terminal (Firebase)

This project deploys to **Firebase Hosting + Cloud Functions + Firestore + Storage rules**.

### 1) Prerequisites

- Node.js 20+ (Functions are pinned to Node 20)
- npm
- Firebase CLI

```bash
npm install -g firebase-tools
```

### 2) Install dependencies

From the repo root:

```bash
npm install
cd functions && npm install && cd ..
```

### 3) Configure frontend environment variables

Create a `.env` file in the repo root for Vite:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

### 4) Authenticate Firebase CLI and select project

```bash
firebase login
firebase use <your-firebase-project-id>
```

### 5) Set Cloud Functions secrets (required)

Set the secrets your functions use:

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
firebase functions:secrets:set SENDGRID_API_KEY
firebase functions:secrets:set CLOUDFLARE_R2_ACCESS_KEY_ID
firebase functions:secrets:set CLOUDFLARE_R2_SECRET_ACCESS_KEY
firebase functions:secrets:set ADMIN_EMAIL
```

If you use these in your flows, also set them:

```bash
firebase functions:secrets:set FROM_EMAIL
firebase functions:secrets:set RAZORPAY_KEY_ID
firebase functions:secrets:set RAZORPAY_KEY_SECRET
firebase functions:secrets:set RAZORPAY_WEBHOOK_SECRET
firebase functions:secrets:set CLOUDFLARE_R2_ENDPOINT
firebase functions:secrets:set CLOUDFLARE_R2_BUCKET_NAME
```

### 6) Build the frontend

```bash
npm run build
```

### 7) Deploy

Deploy everything:

```bash
npm run deploy
```

Or deploy by target:

```bash
npm run deploy:hosting
npm run deploy:functions
npm run deploy:firestore
```

## Quick deploy checklist

```bash
npm install
(cd functions && npm install)
npm run build
firebase login
firebase use <project-id>
npm run deploy
```
