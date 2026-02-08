import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://brancha.in';
const SITE_NAME = 'Brancha';
const SITE_DESCRIPTION = 'Professional website development and digital transformation for service businesses across India';

/**
 * Generate RSS feed from blog posts
 */
function generateRSS() {
  try {
    const blogsIndexPath = path.join(__dirname, '../public/blogs/index.json');
    const distDir = path.join(__dirname, '../dist');
    const rssPath = path.join(distDir, 'rss.xml');
    
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    let blogPosts = [];
    
    // Try to read blog index
    if (fs.existsSync(blogsIndexPath)) {
      const indexContent = fs.readFileSync(blogsIndexPath, 'utf8');
      const indexData = JSON.parse(indexContent);
      blogPosts = indexData.posts || [];
    }
    
    // Generate RSS feed
    const rssContent = generateRSSContent(blogPosts);
    fs.writeFileSync(rssPath, rssContent);
    
    if (blogPosts.length > 0) {
      console.log(`✅ RSS feed generated successfully with ${blogPosts.length} posts`);
    } else {
      console.log('✅ Empty RSS feed generated successfully');
    }
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    // Don't fail the build, create an empty RSS feed
    const emptyRSS = generateEmptyRSS();
    const distDir = path.join(__dirname, '../dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distDir, 'rss.xml'), emptyRSS);
    console.log('✅ Empty RSS feed created');
    process.exit(0);
  }
}

/**
 * Generate RSS content from blog posts
 */
function generateRSSContent(posts) {
  if (!posts || posts.length === 0) {
    return generateEmptyRSS();
  }

  const now = new Date().toUTCString();
  
  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blogs/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || post.description || ''}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.author ? `<author>${post.author}</author>` : ''}
      ${post.category ? `<category>${post.category}</category>` : ''}
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;
}

/**
 * Generate an empty RSS feed
 */
function generateEmptyRSS() {
  const now = new Date().toUTCString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`;
}

// Run the script
generateRSS();
