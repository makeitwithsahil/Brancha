import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://brancha.in';

/**
 * Generate sitemap.xml from public folder sitemap
 */
function generateSitemap() {
  try {
    const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
    const distDir = path.join(__dirname, '../dist');
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Check if sitemap exists in public folder
    if (fs.existsSync(publicSitemapPath)) {
      // Copy sitemap from public to dist
      const sitemapContent = fs.readFileSync(publicSitemapPath, 'utf8');
      fs.writeFileSync(distSitemapPath, sitemapContent);
      console.log('✅ Sitemap copied successfully from public to dist');
    } else {
      // Generate a basic sitemap if it doesn't exist
      const sitemap = generateBasicSitemap();
      fs.writeFileSync(distSitemapPath, sitemap);
      console.log('✅ Basic sitemap generated successfully');
    }
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    // Don't fail the build, just log the error
    process.exit(0);
  }
}

/**
 * Generate a basic sitemap with main pages
 */
function generateBasicSitemap() {
  const pages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'weekly' },
    { url: '/departments', priority: '0.8', changefreq: 'weekly' },
    { url: '/process', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.9', changefreq: 'weekly' },
    { url: '/gym', priority: '0.8', changefreq: 'weekly' },
    { url: '/healthcare', priority: '0.8', changefreq: 'weekly' },
    { url: '/real-estate', priority: '0.8', changefreq: 'weekly' },
    { url: '/education', priority: '0.8', changefreq: 'weekly' },
  ];

  const now = new Date().toISOString().split('T')[0];

  const urls = pages.map(page => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

// Run the script
generateSitemap();
