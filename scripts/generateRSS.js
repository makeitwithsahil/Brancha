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

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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
    };
  });

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate RSS XML
  const rssItems = posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${post.link}</link>
      <guid isPermaLink="true">${post.link}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Brancha Blog</title>
    <link>https://brancha.in/blog</link>
    <description>Insights and advice for service business owners on building a strong online presence and growing their business.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://brancha.in/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
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
}

generateRSS();
