// scripts/generate-sitemap.js
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

const db = getFirestore();

async function generateSitemap() {
  const baseUrl = 'https://zenomedia.com';
  let urls = [
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 },
    { loc: '/portfolio', priority: 0.9 },
    { loc: '/shop', priority: 0.9 },
    { loc: '/contact', priority: 0.7 },
  ];

  const portfolioSnapshot = await db.collection('portfolio').get();
  portfolioSnapshot.forEach(doc => {
    urls.push({ loc: `/portfolio/${doc.id}`, priority: 0.6 });
  });

  const productsSnapshot = await db.collection('products').get();
  productsSnapshot.forEach(doc => {
    urls.push({ loc: `/shop/${doc.id}`, priority: 0.6 });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  writeFileSync(resolve('public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated');
}

generateSitemap().catch(console.error);
