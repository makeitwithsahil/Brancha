// scripts/generateRSS.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2];

  const frontmatter = {};
  const lines = frontmatterText.split('\n');

  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: markdownContent };
}

function generateRSS() {
  const blogDir = path.join(__dirname, '../src/blog');
  const outputPath = path.join(__dirname, '../public/rss.xml');

  // Read all markdown files
  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

  // Parse posts
  const posts = files.map(file => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const { frontmatter } = parseFrontmatter(content);
    const slug = frontmatter.slug || file.replace('.md', '');

    return {
      title: frontmatter.title || 'Untitled',
      excerpt: frontmatter.excerpt || '',
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      slug,
      link: `https://brancha.in/blog/${slug}`,
      category: frontmatter.category || 'Business Growth'
    };
  });

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate RSS XML with CDATA sections for LinkedIn compatibility
  const rssItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.link}</link>
      <guid isPermaLink="true">${post.link}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>Brancha</dc:creator>
      <category>${post.category}</category>
      <category>Online Presence</category>
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Brancha Blog</title>
    <link>https://brancha.in/blog</link>
    <description>Insights and advice for service business owners on building a strong online presence and growing their business.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://brancha.in/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>Brancha Blog</generator>
    <webMaster>support@brancha.in (Brancha)</webMaster>
    <managingEditor>support@brancha.in (Brancha)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} Brancha. All rights reserved.</copyright>
    <image>
      <url>https://brancha.in/og-blog.jpg</url>
      <title>Brancha Blog</title>
      <link>https://brancha.in/blog</link>
      <width>144</width>
      <height>144</height>
    </image>${rssItems}
  </channel>
</rss>`;

  // Ensure public directory exists
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write RSS file
  fs.writeFileSync(outputPath, rss.trim());
  console.log(`✅ RSS feed generated: ${outputPath}`);
  console.log(`📝 Total posts: ${posts.length}`);
  console.log(`🔗 Feed URL: https://brancha.in/rss.xml`);
  console.log('');
  console.log('LinkedIn Integration:');
  console.log('1. Go to your LinkedIn Company Page');
  console.log('2. Click Admin tools → Edit Page');
  console.log('3. Add RSS feed: https://brancha.in/rss.xml');
  console.log('4. Select "Share automatically"');
  console.log('5. Wait 24-48 hours for first post');
}

generateRSS();
