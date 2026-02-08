import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Clock, Calendar } from 'lucide-react';
import SEO from '../../components/SEO';
import { 
  leadIntent, 
  session, 
  userPreferences,
  performanceTracking,
  storage
} from '../../utils/storage';

export default function GymBlog() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);

  // Check if user prefers reduced motion
  const reducedMotion = useMemo(() => {
    return userPreferences.get('reducedMotion', false);
  }, []);

  // Get reading history
  const readingHistory = useMemo(() => {
    return storage.get('read_blog_posts', { temporary: false, consent: false }) || [];
  }, []);

  // Get last visited category preference
  const lastCategory = useMemo(() => {
    return storage.get('blog_last_category', { temporary: true, consent: false });
  }, []);

  // Track if we've already restored the category on mount
  const [hasRestoredCategory, setHasRestoredCategory] = useState(false);

  // Detect returning visitor (non-intrusive)
  useEffect(() => {
    const visitCount = storage.get('gym_blog_visits', { temporary: false, consent: false }) || 0;
    const isReturning = visitCount > 0;
    setIsReturningVisitor(isReturning);
    
    // Increment visit count
    storage.set('gym_blog_visits', visitCount + 1, { temporary: false, consent: false });
  }, []);

  useEffect(() => {
    const startTime = performance.now();

    // Mark gym blog interest
    leadIntent.markInterest('gym');

    // Restore last category ONLY on first mount for returning visitors
    if (lastCategory && !hasRestoredCategory && isReturningVisitor) {
      setSelectedCategory(lastCategory);
      setHasRestoredCategory(true);
    }

    // Track page load performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const endTime = performance.now();
        performanceTracking.track('Gym Blog', {
          loadTime: Math.round(endTime - startTime),
          readHistoryCount: readingHistory.length,
          hasReadBefore: readingHistory.length > 0,
          isReturningVisitor
        });
      });
    }
  }, [lastCategory, readingHistory.length, isReturningVisitor]);

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
      setScrollY(window.scrollY);
      setIsWhatsAppVisible(window.scrollY > 100);
    };

    if (!reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion]);

  // Load blog posts dynamically with caching
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);

        // Check cache first
        const cacheKey = 'blog_posts_index';
        const cachedPosts = storage.get(cacheKey, { temporary: true, consent: false });
        
        if (cachedPosts) {
          setBlogPosts(cachedPosts);
          setLoading(false);
          return;
        }

        // Fetch the blog index file
        const response = await fetch('/blogs/index.json');
        const data = await response.json();
        const posts = data.posts || [];
        
        setBlogPosts(posts);

        // Cache for 1 hour
        storage.set(cacheKey, posts, { 
          temporary: true, 
          consent: false, 
          expiresIn: 60 * 60 * 1000 
        });

      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Save category preference
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    storage.set('blog_last_category', category, { temporary: true, consent: false });
  }, []);

  // Check if post was read (MUST be defined before using it)
  const isPostRead = useCallback((slug) => {
    return readingHistory.includes(slug);
  }, [readingHistory]);

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // Personalization: Separate read and unread posts for returning visitors
  const unreadPosts = regularPosts.filter(post => !isPostRead(post.slug));
  const readPosts = regularPosts.filter(post => isPostRead(post.slug));
  const hasReadArticles = readingHistory.length > 0;

  // Track CTA clicks with enhanced context
  const handleCTAClick = useCallback((ctaType) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        performanceTracking.track('Blog CTA Click', {
          ctaType,
          category: selectedCategory,
          postsVisible: filteredPosts.length,
          isReturningVisitor,
          readCount: readingHistory.length,
          unreadCount: hasReadArticles ? unreadPosts.length : regularPosts.length
        });
      });
    }
  }, [selectedCategory, filteredPosts.length, isReturningVisitor, readingHistory.length, hasReadArticles, unreadPosts.length, regularPosts.length]);

  return (
    <>
      <SEO
        title="Gym Marketing Blog - Insights & Observations"
        description="Real problems and real solutions for gym owners. Learn from our experience working with gyms to build better websites and digital systems."
        canonical="/gym/blog"
        keywords="gym marketing blog, fitness marketing tips, gym website tips, gym lead generation"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Brancha Gym Marketing Blog",
          "description": "Notes from working with gym owners who want websites and systems that actually help their business grow.",
          "url": "https://brancha.in/gym/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Brancha",
            "url": "https://brancha.in"
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white antialiased overflow-x-hidden">

        {/* Advanced Background System */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Animated Gradient Orbs */}
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

          {/* Grain Texture Overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay'
            }}
          />

          {/* Subtle Grid Pattern */}
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

        {/* Hero Section */}
        <section className="relative mt-20 pt-16 sm:pt-20 pb-12 sm:pb-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#F1464A]/8 to-[#F1464A]/5 border border-[#F1464A]/20 backdrop-blur-xl mb-8 fade-in relative group shadow-lg shadow-[#F1464A]/5">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A]/20 via-[#F1464A]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F1464A] animate-pulse" style={{ animationDuration: '2s' }} />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-[#F1464A] opacity-60" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-white/85 tracking-wide uppercase relative z-10" style={{ letterSpacing: '0.08em' }}>
                  Insights & Observations
                </span>
              </div>

              <div className="mb-8 slide-up">
                <h1
                  className="text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.05] tracking-[-0.02em] mb-4"
                  style={{
                    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                >
                  <span className="block text-white/95">Real Problems.</span>
                  <span className="block text-white/95 mt-1">Real Solutions.</span>
                  <span
                    className="block mt-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 50%, #F1464A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    No Fluff.
                  </span>
                </h1>

                <div className="hidden sm:flex items-center gap-3 mt-6 opacity-0 animate-slide-in-fade justify-center" style={{ animationDelay: '200ms' }}>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#F1464A]/60 to-transparent" />
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/35 font-semibold">What We Learn From Gym Owners</span>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#F1464A]/60 to-transparent" />
                </div>
              </div>

              <div className="max-w-2xl mx-auto mb-10 opacity-0 animate-slide-in-fade" style={{ animationDelay: '300ms' }}>
                <p
                  className="text-base sm:text-lg leading-[1.6] text-white/70 mb-3 font-normal tracking-tight"
                  style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                >
                  Notes from working with gym owners who want websites and systems that actually help their business grow.
                </p>
                
                {/* Subtle returning visitor personalization */}
                {isReturningVisitor && hasReadArticles && (
                  <p className="text-sm text-white/50 font-light">
                    {readingHistory.length === 1 
                      ? "Welcome back — you've read 1 article." 
                      : `Welcome back — you've read ${readingHistory.length} articles.`}
                  </p>
                )}

                {readingHistory.length > 0 && (
                  <p className="text-sm text-[#F1464A] font-medium">
                    You've read {readingHistory.length} article{readingHistory.length !== 1 ? 's' : ''} so far
                  </p>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="relative pb-8 px-5 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-br from-[#F1464A] to-[#d63942] text-white shadow-lg shadow-[#F1464A]/25'
                      : 'bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] text-white/60 hover:text-white/90 hover:border-[#F1464A]/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="relative py-8 sm:py-12 px-5 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-[#F1464A]/20 border-t-[#F1464A] rounded-full animate-spin mb-4"></div>
                <p className="text-white/50">Loading articles...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/50">No articles found in this category.</p>
              </div>
            ) : (
              <>
                {/* Featured Posts */}
                {featuredPosts.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-[2px] w-8 bg-gradient-to-r from-[#F1464A] to-transparent" />
                      <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em]">
                        Featured
                      </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {featuredPosts.map((post, index) => {
                        const hasRead = isPostRead(post.slug);
                        return (
                          <Link
                            key={index}
                            to={`/gym/blog/${post.slug}`}
                            className="group block"
                            onClick={() => handleCTAClick('featured_post_click')}
                          >
                            <article className="h-full rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] group-hover:border-[#F1464A]/40 transition-all duration-300 overflow-hidden">
                              <div className="p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="inline-block px-3 py-1.5 rounded-lg bg-[#F1464A]/10 backdrop-blur-sm border border-[#F1464A]/30">
                                    <span className="text-xs font-bold text-[#F1464A] uppercase tracking-wider">
                                      {post.category}
                                    </span>
                                  </div>
                                  {hasRead && (
                                    <span className="text-[10px] text-white/40 font-medium">
                                      Previously read
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                                    <span className="font-medium">{post.date}</span>
                                  </div>
                                  <span className="w-1 h-1 rounded-full bg-white/25" />
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                                    <span className="font-medium">{post.readTime}</span>
                                  </div>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-white/95 mb-4 tracking-tight leading-[1.2] group-hover:text-white transition-colors duration-300">
                                  {post.title}
                                </h3>

                                <p className="text-sm sm:text-base leading-[1.6] text-white/60 font-light tracking-tight mb-6">
                                  {post.summary}
                                </p>

                                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#F1464A] group-hover:gap-3 transition-all duration-300">
                                  <span>Read Article</span>
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                                </div>
                              </div>
                            </article>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {regularPosts.length > 0 && (
                  <>
                    {/* For returning visitors with reading history: show unread first */}
                    {hasReadArticles && unreadPosts.length > 0 && (
                      <div className="mb-12">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="h-[2px] w-8 bg-gradient-to-r from-[#F1464A] to-transparent" />
                          <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em]">
                            New for You
                          </h2>
                          <span className="text-[10px] text-white/30 font-medium">
                            {unreadPosts.length} {unreadPosts.length === 1 ? 'article' : 'articles'}
                          </span>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                          {unreadPosts.map((post, index) => (
                            <Link
                              key={index}
                              to={`/gym/blog/${post.slug}`}
                              className="group block"
                              onClick={() => handleCTAClick('post_click_unread')}
                            >
                              <article className="h-full rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] group-hover:border-[#F1464A]/40 transition-all duration-300 overflow-hidden">
                                
                                <div className="p-5">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="inline-block px-2.5 py-1 rounded-lg bg-[#F1464A]/10 backdrop-blur-sm border border-[#F1464A]/30 transition-colors duration-300">
                                      <span className="text-[9px] font-bold text-[#F1464A] uppercase tracking-wider">
                                        {post.category}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 text-[10px] text-white/40 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" strokeWidth={2} />
                                      <span className="font-medium">{post.date}</span>
                                    </div>
                                    <span className="w-0.5 h-0.5 rounded-full bg-white/25" />
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" strokeWidth={2} />
                                      <span className="font-medium">{post.readTime}</span>
                                    </div>
                                  </div>

                                  <h3 className="text-base sm:text-lg font-bold text-white/95 mb-3 tracking-tight leading-[1.2] group-hover:text-white transition-colors duration-300 line-clamp-2">
                                    {post.title}
                                  </h3>

                                  <p className="text-sm leading-[1.6] text-white/55 font-light tracking-tight mb-4 line-clamp-3 transition-colors duration-300">
                                    {post.summary}
                                  </p>

                                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1464A] group-hover:gap-2.5 transition-all duration-300">
                                    <span>Read More</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                                  </div>
                                </div>
                              </article>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Previously read articles for returning visitors */}
                    {hasReadArticles && readPosts.length > 0 && (
                      <div>
                        <div className="flex items-center gap-3 mb-8">
                          <div className="h-[2px] w-8 bg-gradient-to-r from-white/20 to-transparent" />
                          <h2 className="text-xs font-bold text-white/40 uppercase tracking-[0.15em]">
                            Previously Read
                          </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                          {readPosts.map((post, index) => (
                            <Link
                              key={index}
                              to={`/gym/blog/${post.slug}`}
                              className="group block opacity-70 hover:opacity-100 transition-opacity"
                              onClick={() => handleCTAClick('post_click_read')}
                            >
                              <article className="h-full rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] group-hover:border-[#F1464A]/40 transition-all duration-300 overflow-hidden">
                                
                                <div className="p-5">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="inline-block px-2.5 py-1 rounded-lg bg-[#F1464A]/10 backdrop-blur-sm border border-[#F1464A]/30 transition-colors duration-300">
                                      <span className="text-[9px] font-bold text-[#F1464A] uppercase tracking-wider">
                                        {post.category}
                                      </span>
                                    </div>
                                    <span className="text-[9px] text-white/40 font-medium">
                                      Read
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-[10px] text-white/40 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" strokeWidth={2} />
                                      <span className="font-medium">{post.date}</span>
                                    </div>
                                    <span className="w-0.5 h-0.5 rounded-full bg-white/25" />
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" strokeWidth={2} />
                                      <span className="font-medium">{post.readTime}</span>
                                    </div>
                                  </div>

                                  <h3 className="text-base sm:text-lg font-bold text-white/95 mb-3 tracking-tight leading-[1.2] group-hover:text-white transition-colors duration-300 line-clamp-2">
                                    {post.title}
                                  </h3>

                                  <p className="text-sm leading-[1.6] text-white/55 font-light tracking-tight mb-4 line-clamp-3 transition-colors duration-300">
                                    {post.summary}
                                  </p>

                                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1464A] group-hover:gap-2.5 transition-all duration-300">
                                    <span>Read Again</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                                  </div>
                                </div>
                              </article>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* First-time visitors see all articles normally */}
                    {!hasReadArticles && (
                      <div>
                        <div className="flex items-center gap-3 mb-8">
                          <div className="h-[2px] w-8 bg-gradient-to-r from-[#F1464A] to-transparent" />
                          <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em]">
                            All Articles
                          </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                          {regularPosts.map((post, index) => (
                            <Link
                              key={index}
                              to={`/gym/blog/${post.slug}`}
                              className="group block"
                              onClick={() => handleCTAClick('post_click')}
                            >
                              <article className="h-full rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] group-hover:border-[#F1464A]/40 transition-all duration-300 overflow-hidden">
                                
                                <div className="p-5">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="inline-block px-2.5 py-1 rounded-lg bg-[#F1464A]/10 backdrop-blur-sm border border-[#F1464A]/30 transition-colors duration-300">
                                      <span className="text-[9px] font-bold text-[#F1464A] uppercase tracking-wider">
                                        {post.category}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 text-[10px] text-white/40 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" strokeWidth={2} />
                                      <span className="font-medium">{post.date}</span>
                                    </div>
                                    <span className="w-0.5 h-0.5 rounded-full bg-white/25" />
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" strokeWidth={2} />
                                      <span className="font-medium">{post.readTime}</span>
                                    </div>
                                  </div>

                                  <h3 className="text-base sm:text-lg font-bold text-white/95 mb-3 tracking-tight leading-[1.2] group-hover:text-white transition-colors duration-300 line-clamp-2">
                                    {post.title}
                                  </h3>

                                  <p className="text-sm leading-[1.6] text-white/55 font-light tracking-tight mb-4 line-clamp-3 transition-colors duration-300">
                                    {post.summary}
                                  </p>

                                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1464A] group-hover:gap-2.5 transition-all duration-300">
                                    <span>Read More</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                                  </div>
                                </div>
                              </article>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

          </div>
        </section>

        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white/95 mb-3 tracking-tight">
                  Want to Talk About Your Gym?
                </h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6 max-w-xl mx-auto">
                  These posts come from real conversations with gym owners. If something here resonates with a problem you're facing, let's talk.
                </p>

                <Link
                  to="/gym/contact"
                  className="group relative overflow-hidden inline-block"
                  onClick={() => handleCTAClick('lets_talk_cta')}
                >
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A] to-[#FF5252] rounded-2xl opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500" />

                  <div className="relative px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-br from-[#F1464A] to-[#d63942] rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 transition-all group-hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#F1464A]/25">
                    <span className="tracking-tight">Let's Talk</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300"
                      strokeWidth={2.5}
                    />
                  </div>

                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 rounded-2xl" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        <div className="h-12" />

        <style jsx>{`
          /* Advanced Animations */
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
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-slide-in-fade {
            animation: slide-in-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          .animate-gradient {
            animation: gradient 3s linear infinite;
          }
          
          .fade-in {
            animation: slide-in-fade 0.6s ease-out forwards;
          }

          .slide-up {
            animation: slide-in-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Performance Optimizations */
          .will-change-transform {
            will-change: transform;
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Reduced Motion Support */
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          /* Enhanced font rendering */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        `}</style>
      </div>
    </>
  );
}
