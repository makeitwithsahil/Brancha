// src/utils/blogUtils.js

/**
 * Parse frontmatter from markdown content
 */
export function parseFrontmatter(content) {
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

/**
 * Convert markdown to HTML
 */
export function markdownToHtml(markdown) {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Code blocks
  html = html.replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Line breaks
  html = html.replace(/\n/g, '<br>');

  // Lists
  html = html.replace(/<p>- (.*?)<br>/g, '<ul><li>$1</li>');
  html = html.replace(/<\/li><br><li>/g, '</li><li>');
  html = html.replace(/<\/li><br><\/p>/g, '</li></ul>');

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p><br><\/p>/g, '');

  return html;
}

/**
 * Load all blog posts
 */
export async function loadBlogPosts() {
  try {
    const blogModules = import.meta.glob('/src/blog/*.md', { as: 'raw', eager: false });
    const posts = [];

    for (const path in blogModules) {
      try {
        const content = await blogModules[path]();
        const { frontmatter } = parseFrontmatter(content);
        const filename = path.split('/').pop();
        const slug = frontmatter.slug || filename.replace('.md', '');

        posts.push({
          ...frontmatter,
          slug,
          filename,
        });
      } catch (err) {
        console.error(`Error loading blog post from ${path}:`, err);
      }
    }

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

/**
 * Load single blog post by slug
 */
export async function loadBlogPost(slug) {
  try {
    // Use dynamic import with eager: false to ensure modules work at runtime
    const blogModules = import.meta.glob('/src/blog/*.md', { as: 'raw', eager: false });

    // First, check if we have any modules at all
    const modulePaths = Object.keys(blogModules);
    if (modulePaths.length === 0) {
      console.error('No blog modules found');
      return null;
    }

    // Try to find the matching slug
    for (const path in blogModules) {
      const filename = path.split('/').pop();
      const fileSlug = filename.replace('.md', '');

      if (fileSlug === slug) {
        try {
          const content = await blogModules[path]();
          const { frontmatter, content: markdownContent } = parseFrontmatter(content);

          return {
            ...frontmatter,
            slug,
            content: markdownContent,
            html: markdownToHtml(markdownContent),
          };
        } catch (loadError) {
          console.error(`Error loading specific blog post ${slug}:`, loadError);
          return null;
        }
      }
    }

    console.error(`Blog post with slug "${slug}" not found in available modules:`, modulePaths);
    return null;
  } catch (error) {
    console.error('Error in loadBlogPost:', error);
    return null;
  }
}

/**
 * Format date
 */
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}