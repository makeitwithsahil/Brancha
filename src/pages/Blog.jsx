// src/pages/Blog.jsx
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import BlogList from '../components/blog/BlogList';
import { loadBlogPosts } from '../utils/blogUtils';

const SEO = lazy(() => import('../components/SEO'));
import { breadcrumbSchema } from '../utils/schemas';

const useOptimizedAnimations = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        fadeInUp: { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: '-100px', amount: 0.15 }, transition: { duration: 0.2 } },
        staggerContainer: { whileInView: { transition: { staggerChildren: 0.02 } }, viewport: { once: true, margin: '-100px', amount: 0.1 } }
      };
    }

    return {
      fadeInUp: { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-100px', amount: 0.15 }, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
      staggerContainer: { whileInView: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } }, viewport: { once: true, margin: '-100px', amount: 0.1 } }
    };
  }, [prefersReducedMotion]);
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fadeInUp, staggerContainer } = useOptimizedAnimations();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Blog - Brancha | Insights for Service Businesses';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Practical advice on building and maintaining a professional online presence for service businesses. Written for business owners who want to grow without the noise.');
    }

    async function fetchPosts() {
      try {
        const blogPosts = await loadBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const blogBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://brancha.in' },
    { name: 'Blog', url: 'https://brancha.in/blog' }
  ]);

  return (
    <>
      <Suspense fallback={null}>
        <SEO 
          title="Blog - Brancha | Insights for Service Businesses"
          description="Practical advice on building and maintaining a professional online presence for service businesses. Written for business owners who want to grow without the noise."
          canonicalUrl="https://brancha.in/blog"
          ogImage="https://brancha.in/og-blog.jpg"
        />
      </Suspense>

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(blogBreadcrumb)}
        </script>
      </Helmet>

      <main className="bg-[#FAF9F7]">
        {/* Hero Section - Much more compact */}
        <section className="pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-4 sm:mb-5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ 
                  scale: prefersReducedMotion ? 1 : 1.05,
                  boxShadow: '0 4px 16px rgba(255, 111, 97, 0.15)',
                  transition: { duration: 0.25 }
                }}
              >
                <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider uppercase" style={{ fontWeight: 600 }}>
                  Insights & Advice
                </span>
              </motion.div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-3 sm:mb-4 leading-tight" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                Insights for <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>Service Businesses</span>
              </h1>
              
              <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Practical advice on building and maintaining a professional online presence. 
                Written for business owners who want to grow without the noise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Section - More compact */}
        <section className="pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="animate-spin w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#EFEDE9] border-t-[#e2493b] rounded-full mb-4" />
                <p className="text-sm sm:text-base text-[#6B6B6B]" style={{ fontWeight: 400 }}>Loading articles...</p>
              </div>
            ) : (
              <>
                <motion.div 
                  className="mb-5 sm:mb-6 text-center"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                >
                  <p className="text-sm sm:text-base text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                    {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                  </p>
                </motion.div>
                
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
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