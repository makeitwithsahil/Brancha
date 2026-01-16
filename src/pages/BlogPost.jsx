// src/pages/BlogPost.jsx
import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { loadBlogPost, formatDate } from '../utils/blogUtils';
import { recentlyViewedPosts } from '../utils/storage';

const SEO = lazy(() => import('../components/SEO'));
import { breadcrumbSchema } from '../utils/schemas';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [error, setError] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const handleBackToBlog = (e) => {
    e.preventDefault();
    navigate('/blog', { state: { from: 'blog-post' } });
  };

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError(null);

      try {
        const blogPost = await loadBlogPost(slug);

        if (blogPost) {
          setPost(blogPost);

          // Update document title
          document.title = `${blogPost.title} - Brancha Blog`;

          // Update meta description
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', blogPost.excerpt);
          }

          // Track this post as recently viewed
          recentlyViewedPosts.add(blogPost.slug, blogPost.title);

          // Get updated recent posts (excluding current)
          const allRecent = recentlyViewedPosts.get();
          setRecentPosts(allRecent.filter(p => p.slug !== slug));

          // Scroll to top smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setError('Post not found');
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-28 sm:pt-32 md:pt-36 pb-12 min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="flex flex-col items-center gap-4">
          <div
            className="animate-spin w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#EFEDE9] border-t-[#e2493b] rounded-full"
            role="status"
            aria-label="Loading article"
          />
          <p className="text-sm sm:text-base text-[#6B6B6B]" style={{ fontWeight: 400 }}>Loading article...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="pt-28 sm:pt-32 md:pt-36 pb-12 min-h-screen bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="text-center py-12">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e2493b]/10 mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-4xl" role="img" aria-label="Not found">📄</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1F1F1F] mb-4" style={{ letterSpacing: '-0.01em', fontWeight: 500 }}>
              Post Not Found
            </h1>
            <p className="text-base sm:text-lg text-[#6B6B6B] mb-8 max-w-md mx-auto" style={{ fontWeight: 400 }}>
              {error === 'Failed to load post'
                ? 'There was an error loading this article. Please try again.'
                : "The blog post you're looking for doesn't exist."}
            </p>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#e2493b] text-white rounded-full font-medium transition-all duration-300 hover:bg-[#C94A3F] hover:shadow-lg hover:shadow-[#e2493b]/30"
              style={{ fontWeight: 500 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const postBreadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` }
  ]);

  return (
    <>
      <Suspense fallback={null}>
        <SEO
          title={`${post.title} - Brancha Blog`}
          description={post.excerpt}
          canonical={`/blog/${post.slug}`}
          ogImage="https://brancha.in/og-blog.jpg"
          ogType="article"
        />
      </Suspense>

      <Helmet>
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Brancha" />
        <script type="application/ld+json">
          {JSON.stringify(postBreadcrumb)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              '@type': 'Organization',
              name: 'Brancha'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Brancha',
              logo: {
                '@type': 'ImageObject',
                url: 'https://brancha.in/logo.png'
              }
            }
          })}
        </script>
      </Helmet>

      <main className="bg-[#FAF9F7]">
        <article className="pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 sm:mb-6"
              >
                <Link
                  to="/blog"
                  onClick={handleBackToBlog}
                  className="group inline-flex items-center gap-2 text-sm sm:text-base text-[#e2493b] font-medium transition-all duration-300 hover:gap-3"
                  style={{ fontWeight: 500 }}
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Blog
                </Link>
              </motion.div>

              {/* Article Header */}
              <motion.header
                className="mb-6 sm:mb-8 text-center"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-4 sm:mb-5 transition-all duration-300 hover:shadow-md hover:shadow-[#e2493b]/10"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider" style={{ fontWeight: 600 }}>
                    {formatDate(post.date)}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#1F1F1F] mb-3 sm:mb-4 leading-tight" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                  {post.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto" style={{ fontWeight: 400 }}>
                  {post.excerpt}
                </p>
              </motion.header>

              {/* Article Content */}
              <motion.div
                className="blog-content"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              {/* Recently Read Section */}
              {recentPosts.length > 0 && (
                <motion.div
                  className="mt-8 p-6 bg-white border border-[#EFEDE9] rounded-xl"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-[#1F1F1F] mb-4" style={{ fontWeight: 500 }}>
                    Recently Read
                  </h3>
                  <ul className="space-y-2">
                    {recentPosts.slice(0, 3).map(p => (
                      <li key={p.slug}>
                        <Link
                          to={`/blog/${p.slug}`}
                          className="text-sm text-[#6B6B6B] hover:text-[#e2493b] transition-colors duration-200 flex items-center gap-2 group"
                          style={{ fontWeight: 400 }}
                        >
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                          {p.title}
                          {p.viewCount > 1 && (
                            <span className="text-xs text-[#6B6B6B]/60">({p.viewCount} views)</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Back to Blog CTA */}
              <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#EFEDE9] text-center">
                <Link
                  to="/blog"
                  onClick={handleBackToBlog}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#e2493b]/10 text-[#e2493b] rounded-full font-medium transition-all duration-300 hover:bg-[#e2493b]/20 hover:gap-3"
                  style={{ fontWeight: 500 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Read More Articles
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <style>{`
        .blog-content {
          color: #1F1F1F;
        }
        
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 400;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
          color: #1F1F1F;
          line-height: 1.3;
          letter-spacing: -0.015em;
        }
        
        @media (min-width: 640px) {
          .blog-content h2 {
            font-size: 2rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
        }
        
        @media (min-width: 768px) {
          .blog-content h2 {
            font-size: 2.25rem;
          }
        }
        
        .blog-content h3 {
          font-size: 1.375rem;
          font-weight: 500;
          margin-top: 1.25rem;
          margin-bottom: 0.625rem;
          color: #1F1F1F;
          letter-spacing: -0.01em;
        }
        
        @media (min-width: 640px) {
          .blog-content h3 {
            font-size: 1.625rem;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
        }
        
        .blog-content p {
          margin-bottom: 0.875rem;
          color: #1F1F1F;
          line-height: 1.65;
          font-size: 1rem;
          font-weight: 400;
        }
        
        @media (min-width: 640px) {
          .blog-content p {
            font-size: 1.0625rem;
            line-height: 1.7;
            margin-bottom: 1rem;
          }
        }
        
        .blog-content strong {
          color: #1F1F1F;
          font-weight: 600;
        }
        
        .blog-content a {
          color: #e2493b;
          text-decoration: underline;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .blog-content a:hover {
          color: #C94A3F;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 0.875rem 0;
          padding-left: 1.5rem;
        }
        
        @media (min-width: 640px) {
          .blog-content ul, .blog-content ol {
            margin: 1rem 0;
          }
        }
        
        .blog-content li {
          margin-bottom: 0.375rem;
          color: #6B6B6B;
          line-height: 1.6;
          font-weight: 400;
        }
        
        @media (min-width: 640px) {
          .blog-content li {
            font-size: 1.0625rem;
            line-height: 1.65;
            margin-bottom: 0.5rem;
          }
        }
        
        .blog-content code {
          background-color: #EFEDE9;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.875em;
          color: #1F1F1F;
          font-weight: 400;
        }
        
        .blog-content pre {
          background-color: #EFEDE9;
          padding: 1rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.25rem 0;
        }
        
        @media (min-width: 640px) {
          .blog-content pre {
            padding: 1.25rem;
          }
        }
        
        .blog-content pre code {
          background: none;
          padding: 0;
          font-size: 0.875rem;
        }
        
        .blog-content blockquote {
          border-left: 3px solid #e2493b;
          padding-left: 1.5rem;
          margin: 1.25rem 0;
          font-style: italic;
          color: #6B6B6B;
          font-weight: 400;
        }
        
        @media (min-width: 640px) {
          .blog-content blockquote {
            margin: 1.5rem 0;
          }
        }
      `}</style>
    </>
  );
}
