// src/pages/Blog.jsx
import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import BlogList from '../components/blog/BlogList';
import { loadBlogPosts } from '../utils/blogUtils';
import { scrollMemory } from '../utils/storage';

const SEO = lazy(() => import('../components/SEO'));
import { breadcrumbSchema } from '../utils/schemas';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Blog - Brancha | Insights for Service Businesses';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Practical advice on building and maintaining a professional online presence for service businesses. Written for business owners who want to grow without the noise.');
    }

    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        
        const blogPosts = await loadBlogPosts();
        setPosts(blogPosts);
        
        // Only restore scroll position if coming from a blog post (back navigation)
        // Check navigation state
        const isFromBlogPost = location.state?.from === 'blog-post';
        
        if (isFromBlogPost) {
          // Restore scroll position after posts load and render
          requestAnimationFrame(() => {
            setTimeout(() => {
              const savedPosition = scrollMemory.get(location.pathname);
              if (savedPosition > 0) {
                window.scrollTo({
                  top: savedPosition,
                  behavior: 'instant'
                });
              }
            }, 100);
          });
        } else {
          // Clear any old saved position when navigating from other pages
          scrollMemory.save(location.pathname, 0);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();

    // Save scroll position before unmount only if scrolled
    return () => {
      if (window.scrollY > 0) {
        scrollMemory.save(location.pathname, window.scrollY);
      }
    };
  }, [location.pathname]);

  const blogBreadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' }
  ]);

  return (
    <>
      <Suspense fallback={null}>
        <SEO 
          title="Blog - Brancha | Insights for Service Businesses"
          description="Practical advice on building and maintaining a professional online presence for service businesses. Written for business owners who want to grow without the noise."
          canonical="/blog"
          ogImage="https://brancha.in/og-blog.jpg"
        />
      </Suspense>

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(blogBreadcrumb)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Brancha Blog',
            description: 'Insights for service businesses on building and maintaining professional online presence',
            url: 'https://brancha.in/blog',
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
        {/* Hero Section */}
        <section className="pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div 
                  className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md hover:shadow-[#e2493b]/10"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider uppercase" style={{ fontWeight: 600 }}>
                    Insights & Advice
                  </span>
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#1F1F1F] mb-4 sm:mb-6 leading-tight"
                style={{ letterSpacing: '-0.02em', fontWeight: 400 }}
              >
                Insights for <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>Service Businesses</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto"
                style={{ fontWeight: 400 }}
              >
                Practical advice on building and maintaining a professional online presence. 
                Written for business owners who want to grow without the noise.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div 
                  className="animate-spin w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#EFEDE9] border-t-[#e2493b] rounded-full mb-4" 
                  role="status"
                  aria-label="Loading articles" 
                />
                <p className="text-sm sm:text-base text-[#6B6B6B]" style={{ fontWeight: 400 }}>Loading articles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e2493b]/10 mb-4">
                  <span className="text-3xl" role="img" aria-label="Error">⚠️</span>
                </div>
                <p className="text-lg text-[#1F1F1F] mb-2" style={{ fontWeight: 500 }}>
                  Oops! Something went wrong
                </p>
                <p className="text-sm text-[#6B6B6B] mb-4" style={{ fontWeight: 400 }}>
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 bg-[#e2493b] text-white rounded-full font-medium transition-all duration-300 hover:bg-[#C94A3F]"
                  style={{ fontWeight: 500 }}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <motion.div 
                  className="mb-8 sm:mb-10 text-center"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <p className="text-sm sm:text-base text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                    {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <BlogList posts={posts} />
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
