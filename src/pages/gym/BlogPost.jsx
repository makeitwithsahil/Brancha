import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MessageSquare } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import SEO from '../../components/SEO';
import { 
  leadIntent, 
  session, 
  userPreferences,
  performanceTracking,
  journeyTracking,
  storage
} from '../../utils/storage';

export default function BlogPost() {
  const { slug } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // Check if user prefers reduced motion
  const reducedMotion = useMemo(() => {
    return userPreferences.get('reducedMotion', false);
  }, []);

  // Check if user has read this post before
  const hasReadBefore = useMemo(() => {
    const readPosts = storage.get('read_blog_posts', { temporary: false, consent: false }) || [];
    return readPosts.includes(slug);
  }, [slug]);

  // Get reading history for recommendations
  const readingHistory = useMemo(() => {
    return storage.get('read_blog_posts', { temporary: false, consent: false }) || [];
  }, []);

  useEffect(() => {
    const startTime = performance.now();

    // Mark gym blog interest
    leadIntent.markInterest('gym');

    // Track page visit
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const endTime = performance.now();
        performanceTracking.track(`Blog Post: ${slug}`, {
          loadTime: Math.round(endTime - startTime),
          hasReadBefore,
          readingHistoryCount: readingHistory.length
        });
      });
    }
  }, [slug, hasReadBefore, readingHistory.length]);

  // Optimize mouse and scroll handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (reducedMotion) return;
      
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 30 - 15,
        y: (e.clientY / window.innerHeight) * 30 - 15
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsWhatsAppVisible(currentScrollY > 100);

      // Calculate read progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min((currentScrollY / documentHeight) * 100, 100);
      setReadProgress(progress);

      // Mark as read when user scrolls past 70%
      if (progress > 70 && !hasReadBefore) {
        const readPosts = storage.get('read_blog_posts', { temporary: false, consent: false }) || [];
        if (!readPosts.includes(slug)) {
          storage.set('read_blog_posts', [...readPosts, slug], { temporary: false, consent: false });
          
          // Track completion
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              performanceTracking.track('Blog Post Completed', {
                slug,
                readProgress: Math.round(progress)
              });
            });
          }
        }
      }
    };

    if (!reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion, slug, hasReadBefore]);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        setError(false);

        // Check cache first for faster repeat visits
        const cacheKey = `blog_post_${slug}`;
        const cachedPost = storage.get(cacheKey, { temporary: true, consent: false });
        
        if (cachedPost) {
          setPost(cachedPost);
          setTimeout(() => setIsVisible(true), 50);
          setLoading(false);
          return;
        }

        // First, load the index to get post metadata
        const indexResponse = await fetch('/blogs/index.json');
        const indexData = await indexResponse.json();
        
        const postMetadata = indexData.posts.find(p => p.slug === slug);
        
        if (!postMetadata) {
          setError(true);
          setLoading(false);
          return;
        }

        // Then load the actual markdown content
        const contentResponse = await fetch(`/blogs/${slug}.md`);
        const markdownContent = await contentResponse.text();

        const loadedPost = {
          ...postMetadata,
          content: markdownContent
        };

        setPost(loadedPost);

        // Cache for faster repeat visits (24 hours)
        storage.set(cacheKey, loadedPost, { 
          temporary: true, 
          consent: false, 
          expiresIn: 24 * 60 * 60 * 1000 
        });

        // Trigger animation after post loads
        setTimeout(() => {
          setIsVisible(true);
        }, 50);

      } catch (err) {
        console.error('Error loading blog post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [slug]);

  // Track CTA clicks
  const handleCTAClick = useCallback((ctaType) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        performanceTracking.track('Blog CTA Click', {
          ctaType,
          slug,
          readProgress: Math.round(readProgress)
        });
      });
    }
  }, [slug, readProgress]);

  // Simple markdown to HTML converter
  const renderMarkdown = useCallback((markdown) => {
    if (!markdown) return null;

    return markdown
      .split('\n')
      .map((line, index) => {
        // Skip metadata lines
        if (line.match(/^\*\*(Category|Date|Read Time):/)) {
          return null;
        }

        // Skip title (first h1)
        if (line.startsWith('# ')) {
          return null;
        }

        // H2 headings
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl sm:text-3xl font-bold text-white/90 mb-4 mt-10 tracking-tight">
              {line.replace('## ', '')}
            </h2>
          );
        }

        // H3 headings
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl sm:text-2xl font-bold text-white/85 mb-3 mt-8 tracking-tight">
              {line.replace('### ', '')}
            </h3>
          );
        }

        // Horizontal rules
        if (line.trim() === '---') {
          return (
            <div key={index} className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />
          );
        }

        // List items
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-base leading-[1.8] text-white/70 font-light ml-6 mb-2">
              <span className="text-[#F1464A] mr-2">•</span>
              {line.replace('- ', '')}
            </li>
          );
        }

        // Process inline markdown (bold, links)
        let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90 font-semibold">$1</strong>');
        processedLine = processedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#F1464A] hover:text-[#FF5252] underline transition-colors">$1</a>');

        // Regular paragraphs
        if (line.trim() && !line.startsWith('#') && !line.startsWith('-')) {
          return (
            <p 
              key={index} 
              className="text-base leading-[1.8] text-white/70 mb-6 font-light"
              dangerouslySetInnerHTML={{ __html: processedLine }}
            />
          );
        }

        return null;
      })
      .filter(Boolean);
  }, []);

  if (loading) {
    return (
      <>
        <SEO
          title="Loading Article..."
          description="Loading gym marketing insights and tips from Brancha."
          canonical={`/gym/blog/${slug}`}
          noindex={true}
        />
        <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#F1464A]/20 border-t-[#F1464A] rounded-full animate-spin mb-4"></div>
            <p className="text-white/50">Loading article...</p>
          </div>
        </div>
      </>
    );
  }

  // Handle error or missing post
  if (error || (!loading && !post)) {
    return (
      <>
        <SEO
          title="Article Not Found"
          description="The blog post you're looking for doesn't exist."
          canonical={`/gym/blog/${slug}`}
          noindex={true}
        />
        <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white/95 mb-4">Article Not Found</h1>
              <p className="text-white/60 mb-8">The blog post you're looking for doesn't exist.</p>
              <Link
                to="/gym/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#F1464A] to-[#d63942] rounded-xl text-sm font-bold hover:scale-[1.02] transition-all"
                onClick={() => handleCTAClick('back_to_blog_404')}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Ensure post exists before rendering (safety check)
  if (!post) {
    return null;
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt || `${post.title} - Read expert gym marketing insights and tips from Brancha.`}
        canonical={`/gym/blog/${slug}`}
        keywords={`gym marketing, fitness marketing, ${post.category}, gym tips, fitness business`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "datePublished": post.date,
          "author": {
            "@type": "Organization",
            "name": "Brancha"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Brancha",
            "url": "https://brancha.in"
          },
          "articleSection": post.category,
          "url": `https://brancha.in/gym/blog/${slug}`
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white antialiased">
        
        {/* Reading Progress Bar */}
        <div 
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#F1464A] to-[#FF5252] z-50 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />

        {/* Advanced Background System */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute top-[-10%] left-[10%] w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[140px] will-change-transform"
            style={{
              background: 'radial-gradient(circle, #F1464A 0%, #d63942 50%, transparent 70%)',
              transform: reducedMotion 
                ? 'none' 
                : `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(${1 + scrollY * 0.0001})`,
              transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          />
          <div
            className="absolute bottom-[-15%] right-[15%] w-[600px] h-[600px] rounded-full opacity-[0.10] blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #F1464A 0%, #8B2832 60%, transparent 75%)',
              transform: reducedMotion 
                ? 'none' 
                : `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
              transition: reducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay'
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919219917186?text=Hi, I'm interested in learning more about your services"
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isWhatsAppVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
          onClick={() => handleCTAClick('whatsapp_float')}
        >
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

            <div className="relative w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-7 h-7 text-white" strokeWidth={2.5} fill="white" />
            </div>
          </div>
        </a>

        <article 
          className={`relative pt-24 sm:pt-32 pb-16 px-5 sm:px-6 lg:px-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-3xl mx-auto">
            
            <Link
              to="/gym/blog"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 mb-8 transition-all hover:gap-3 group"
              onClick={() => handleCTAClick('back_to_blog')}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>

            <div 
              className={`mb-8 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F1464A]/10 border border-[#F1464A]/30 mb-6">
                <span className="text-xs font-bold text-[#F1464A] uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-white/25" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                {hasReadBefore && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/25" />
                    <span className="text-[#F1464A] text-xs">Previously read</span>
                  </>
                )}
              </div>
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

            <div 
              className={`prose prose-invert prose-lg max-w-none transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {renderMarkdown(post.content)}
            </div>

            <div 
              className={`mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-xl font-bold text-white/95 mb-3">
                Found This Helpful?
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                If you're dealing with similar challenges at your gym, let's talk about how to fix them.
              </p>
              <Link
                to="/gym/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#F1464A] to-[#d63942] rounded-xl text-sm font-bold hover:scale-[1.02] transition-transform"
                onClick={() => handleCTAClick('get_in_touch')}
              >
                <span>Get in Touch</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>

          </div>
        </article>

        <style jsx>{`
          @keyframes slide-in-fade {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
