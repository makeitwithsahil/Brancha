// src/pages/BlogPost.jsx
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { loadBlogPost, formatDate } from '../utils/blogUtils';

const SEO = lazy(() => import('../components/SEO'));
import { breadcrumbSchema } from '../utils/schemas';

const useOptimizedAnimations = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        fadeInUp: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      };
    }

    return {
      fadeInUp: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], opacity: { duration: 0.3 } } }
    };
  }, [prefersReducedMotion]);
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fadeInUp } = useOptimizedAnimations();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    async function fetchPost() {
      try {
        const blogPost = await loadBlogPost(slug);
        setPost(blogPost);
        
        if (blogPost) {
          document.title = `${blogPost.title} - Brancha Blog`;
          
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', blogPost.excerpt);
          }
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#EFEDE9] border-t-[#e2493b] rounded-full" />
          <p className="text-sm sm:text-base text-[#6B6B6B]" style={{ fontWeight: 400 }}>Loading article...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e2493b]/10 mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-4xl">📝</span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1F1F1F] mb-4" style={{ letterSpacing: '-0.01em', fontWeight: 500 }}>
              Post Not Found
            </h1>
            <p className="text-base sm:text-lg text-[#6B6B6B] mb-8 max-w-md mx-auto" style={{ fontWeight: 400 }}>
              The blog post you're looking for doesn't exist.
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
    { name: 'Home', url: 'https://brancha.in' },
    { name: 'Blog', url: 'https://brancha.in/blog' },
    { name: post.title, url: `https://brancha.in/blog/${post.slug}` }
  ]);

  return (
    <>
      <Suspense fallback={null}>
        <SEO 
          title={`${post.title} - Brancha Blog`}
          description={post.excerpt}
          canonicalUrl={`https://brancha.in/blog/${post.slug}`}
          ogImage="https://brancha.in/og-blog.jpg"
          type="article"
        />
      </Suspense>

      <Helmet>
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">
          {JSON.stringify(postBreadcrumb)}
        </script>
      </Helmet>

      <main className="bg-[#FAF9F7]">
        <article className="pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-24 md:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="mb-10 sm:mb-12"
              >
                <Link 
                  to="/blog" 
                  className="group inline-flex items-center gap-2 text-sm sm:text-base text-[#e2493b] font-medium transition-all duration-300 hover:gap-3"
                  style={{ fontWeight: 500 }}
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Blog
                </Link>
              </motion.div>

              {/* Article Header */}
              <motion.header 
                className="mb-12 sm:mb-16 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.1 }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e2493b]/5 border border-[#e2493b]/10 mb-6 relative overflow-hidden group cursor-default"
                  whileHover={{ 
                    scale: prefersReducedMotion ? 1 : 1.03,
                    boxShadow: '0 0 20px rgba(255, 111, 97, 0.15)',
                    transition: { duration: 0.25 }
                  }}
                >
                  <span className="text-xs sm:text-sm font-medium text-[#e2493b] italic relative z-10" style={{ letterSpacing: '0.01em', fontWeight: 500 }}>
                    {formatDate(post.date)}
                  </span>
                  
                  {!prefersReducedMotion && (
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e2493b]/10 to-transparent"
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </motion.div>
                
                <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-normal text-[#1F1F1F] mb-5 sm:mb-7 leading-[1.1]" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                  {post.title}
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                  {post.excerpt}
                </p>
              </motion.header>
              
              {/* Article Content */}
              <motion.div 
                className="blog-content"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              {/* Back to Blog CTA */}
              <motion.div 
                className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-[#EFEDE9] text-center"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#e2493b]/10 text-[#e2493b] rounded-full font-medium transition-all duration-300 hover:bg-[#e2493b]/20 hover:gap-3"
                  style={{ fontWeight: 500 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Read More Articles
                </Link>
              </motion.div>
            </div>
          </div>
        </article>
      </main>

      <style>{`
        .blog-content {
          color: #1F1F1F;
        }
        
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 500;
          margin-top: 3rem;
          margin-bottom: 1rem;
          color: #1F1F1F;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        
        @media (min-width: 640px) {
          .blog-content h2 {
            font-size: 2.25rem;
          }
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 500;
          margin-top: 2.5rem;
          margin-bottom: 0.875rem;
          color: #1F1F1F;
          letter-spacing: -0.01em;
        }
        
        @media (min-width: 640px) {
          .blog-content h3 {
            font-size: 1.875rem;
          }
        }
        
        .blog-content p {
          margin-bottom: 1.5rem;
          color: #6B6B6B;
          line-height: 1.8;
          font-size: 1rem;
          font-weight: 400;
        }
        
        @media (min-width: 640px) {
          .blog-content p {
            font-size: 1.125rem;
            line-height: 1.9;
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
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.75rem;
          color: #6B6B6B;
          line-height: 1.7;
          font-weight: 400;
        }
        
        @media (min-width: 640px) {
          .blog-content li {
            font-size: 1.125rem;
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
          padding: 1.25rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 2rem 0;
        }
        
        @media (min-width: 640px) {
          .blog-content pre {
            padding: 1.5rem;
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
          margin: 2rem 0;
          font-style: italic;
          color: #6B6B6B;
          font-weight: 400;
        }
        
        .hw-accelerate {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
        }
      `}</style>
    </>
  );
}