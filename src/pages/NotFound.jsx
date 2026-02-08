import { useEffect, memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Home, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { 
  journeyTracking, 
  session, 
  performanceTracking,
  storage 
} from '../utils/storage';

/* ────────────────────────────────────────────
   SATOSHI FONT IMPORT  (CDN – Fontsource)
   ──────────────────────────────────────────── */
const SATOSHI_LINK = 'https://fonts.cdnfonts.com/css/satoshi?display=swap';

/* ─── HAND-DRAWN SVGs (matching Home.jsx) ─── */
const HDCircle = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 200 200" fill="none">
    <path d="M100,12 C140,10 175,38 182,75 C190,118 170,165 130,180 C88,193 38,178 22,140 C6,100 18,48 55,22 C72,12 86,13 100,12Z" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.38" />
    <path d="M100,20 C136,18 168,44 174,78 C181,114 164,157 128,172 C92,184 48,172 34,138 C20,104 30,54 62,28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.16" strokeDasharray="4 7" />
  </svg>
));

const HDScribble = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 180 110" fill="none">
    <path d="M20,58 Q38,32 58,56 Q78,80 98,52 Q118,24 138,54 Q152,72 160,56" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.3" />
    <path d="M26,66 Q42,44 60,64 Q78,82 96,60 Q114,38 132,60" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.14" strokeDasharray="3 7" />
  </svg>
));

const HDStar = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 120 120" fill="none">
    <path d="M60,15 L65,48 L96,36 L76,62 L108,78 L72,76 L78,108 L60,82 L42,108 L48,76 L12,78 L44,62 L24,36 L55,48 Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.32" />
    <path d="M60,26 L64,50 L88,42 L74,60 L98,73 L74,72 L78,98 L60,78 L42,98 L46,72 L22,73 L46,60 L32,42 L56,50 Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.14" strokeDasharray="4 6" />
  </svg>
));

const HDSparkle = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 100 100" fill="none">
    <path d="M50,10 L53,44 L50,44 L47,44 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.32" />
    <path d="M10,50 L44,47 L44,50 L44,53 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.32" />
    <path d="M50,90 L47,56 L50,56 L53,56 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.32" />
    <path d="M90,50 L56,53 L56,50 L56,47 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.32" />
    <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.38" />
  </svg>
));

const HDDots = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 130 130" fill="none">
    <circle cx="22" cy="22" r="4.5" fill="currentColor" opacity="0.28" />
    <circle cx="65" cy="18" r="3.2" fill="currentColor" opacity="0.2" />
    <circle cx="108" cy="28" r="4" fill="currentColor" opacity="0.25" />
    <circle cx="38" cy="65" r="3" fill="currentColor" opacity="0.18" />
    <circle cx="90" cy="68" r="3.8" fill="currentColor" opacity="0.22" />
    <circle cx="18" cy="108" r="3.5" fill="currentColor" opacity="0.2" />
    <circle cx="65" cy="105" r="4" fill="currentColor" opacity="0.25" />
    <circle cx="112" cy="112" r="3" fill="currentColor" opacity="0.18" />
  </svg>
));

export default function NotFound() {
  const prefersReducedMotion = useReducedMotion();

  // ✅ STORAGE-DRIVEN PERSONALIZATION: Smart quick links based on user journey
  const quickLinks = useMemo(() => {
    // Get user's journey to understand what they've visited
    const journey = journeyTracking.getJourney();
    const visitedPages = session.getVisited();
    
    // All available links
    const allLinks = [
      { name: 'Home', path: '/', priority: 100 }, // Always high priority
      { name: 'Departments', path: '/departments', priority: 80 },
      { name: 'About', path: '/about', priority: 60 },
      { name: 'Contact', path: '/contact', priority: 70 },
      { name: 'Process', path: '/process', priority: 50 },
      { name: 'Gym', path: '/gym', priority: 40 },
      { name: 'Real Estate', path: '/real-estate', priority: 40 },
      { name: 'Healthcare', path: '/healthcare', priority: 40 },
      { name: 'Education', path: '/education', priority: 40 }
    ];

    // Boost priority for pages user has visited before
    const scoredLinks = allLinks.map(link => {
      let score = link.priority;
      
      // Boost if user visited this page in current session
      if (visitedPages.includes(link.path)) {
        score += 30;
      }
      
      // Boost if user visited in overall journey
      const visitedInJourney = journey.some(entry => entry.url === link.path);
      if (visitedInJourney) {
        score += 20;
      }
      
      return { ...link, score };
    });

    // Sort by score and take top 4
    return scoredLinks
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, []);

  // ✅ STORAGE: Track 404 errors for UX insights (privacy-safe, no URLs stored)
  useEffect(() => {
    const startTime = performance.now();

    // Inject Satoshi font link once
    if (!document.getElementById('satoshi-font')) {
      const link = document.createElement('link');
      link.id = 'satoshi-font';
      link.rel = 'stylesheet';
      link.href = SATOSHI_LINK;
      document.head.appendChild(link);
    }
    
    document.title = '404 - Page Not Found | Brancha';

    // ✅ STORAGE: Track 404 encounter (for UX analytics)
    storage.set('last_404_time', Date.now(), { 
      temporary: true, 
      consent: false // UX tracking, no personal data
    });

    // ✅ STORAGE: Track 404 count this session (helps identify navigation issues)
    const current404Count = storage.get('404_count_session', { temporary: true, consent: false }) || 0;
    storage.set('404_count_session', current404Count + 1, { 
      temporary: true, 
      consent: false 
    });

    // ✅ PERFORMANCE: Track page load time
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const loadTime = performance.now() - startTime;
        performanceTracking.track('404_Page', {
          loadTime: Math.round(loadTime),
          quickLinksGenerated: quickLinks.length
        });
      });
    }

    // ✅ STORAGE: Mark 404 page visit in journey
    session.markVisited('/404');
  }, [quickLinks.length]);

  return (
    <main className="bg-[#FAF9F7] min-h-screen overflow-hidden relative" style={{ fontFamily: "'Satoshi', sans-serif" }}>
      {/* grain texture overlay (matching Home.jsx) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      </div>

      {/* ══════ HERO SECTION ══════ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'clamp(80px, 12vw, 140px)', paddingBottom: 'clamp(60px, 8vw, 100px)' }}>
        {/* bg glows (matching Home.jsx) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1464A]/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[55%] h-[65%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F1464A]/[0.04] via-transparent to-transparent" />

        {/* drifting doodles – large screens only (matching Home.jsx) */}
        <div className="absolute top-[10%] left-[3%] hidden xl:block animate-float pointer-events-none" style={{ opacity: 0.11 }}>
          <HDScribble className="text-[#F1464A]" style={{ width: 120, height: 86 }} />
        </div>
        <div className="absolute top-[40%] right-[5%] hidden xl:block animate-float-delayed pointer-events-none" style={{ opacity: 0.09 }}>
          <HDStar className="text-[#F1464A]" style={{ width: 80, height: 80 }} />
        </div>
        <div className="absolute bottom-[12%] left-[8%] hidden lg:block animate-float pointer-events-none" style={{ opacity: 0.08 }}>
          <HDCircle className="text-[#F1464A]" style={{ width: 90, height: 90 }} />
        </div>
        <div className="absolute top-[20%] right-[15%] hidden 2xl:block animate-float pointer-events-none" style={{ opacity: 0.07 }}>
          <HDDots className="text-[#F1464A]" style={{ width: 70, height: 70 }} />
        </div>
        <div className="absolute bottom-[25%] right-[8%] hidden xl:block animate-float-delayed pointer-events-none" style={{ opacity: 0.06 }}>
          <HDSparkle className="text-[#F1464A]" style={{ width: 65, height: 65 }} />
        </div>

        <div className="w-full max-w-5xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── badge (matching Home.jsx style) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-[#F1464A]/[0.2] bg-white/90 backdrop-blur-sm shadow-sm shadow-[#F1464A]/[0.06]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F1464A] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">
                  404 • Page Not Found
                </span>
                <Sparkles className="w-3 h-3 text-[#F1464A]" />
              </div>
            </motion.div>

            {/* ── Large 404 Display ── */}
            <div className="relative inline-block mb-6 sm:mb-8">
              <h1 
                className="font-bold text-[#1F1F1F] tracking-tight leading-[1.08]" 
                style={{ fontSize: 'clamp(100px, 18vw, 280px)' }}
              >
                404
              </h1>
            </div>

            {/* ── Main Heading (matching Home.jsx typography) ── */}
            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.15] mb-4 sm:mb-5 px-4" style={{ fontSize: 'clamp(24px, 5vw, 56px)' }}>
              ㅤThis page doesn't{' '}
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent inline-block" style={{ fontStyle: 'italic' }}>
                existㅤ
              </span>
            </h2>

            {/* ── Description (matching Home.jsx) ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.42 }}
              className="text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-4"
              style={{ fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 500 }}
            >
              The page you're looking for has been moved, deleted, or never existed. Let's get you back on track.
            </motion.p>

            {/* ── Primary Action Buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4"
            >
              <a href="/" className="w-full sm:w-auto">
                <motion.button
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-white font-bold bg-gradient-to-r from-[#F1464A] to-[#C94A3F] rounded-full overflow-hidden shadow-lg shadow-[#F1464A]/[0.25] border border-[#F1464A]"
                  style={{ padding: 'clamp(12px, 2vw, 15px) clamp(28px, 5vw, 40px)', fontSize: 'clamp(13px, 1.8vw, 17px)' }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.04, boxShadow: '0 18px 40px -10px rgba(241,70,74,0.45)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" strokeWidth={2.5} />
                  <span className="relative z-10">Back to Home</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                </motion.button>
              </a>

              <a href="/contact" className="w-full sm:w-auto">
                <motion.button
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[#F1464A] font-bold bg-white rounded-full border-2 border-[#F1464A]/20 hover:border-[#F1464A] transition-all duration-300 overflow-hidden"
                  style={{ padding: 'clamp(12px, 2vw, 15px) clamp(28px, 5vw, 40px)', fontSize: 'clamp(13px, 1.8vw, 17px)' }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" strokeWidth={2.5} />
                  <span className="relative z-10">Contact Support</span>
                  <div className="absolute inset-0 bg-[#F1464A]/[0.05] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
              </a>
            </motion.div>

            {/* ── Quick Links (PERSONALIZED - shows user's most relevant pages) ── */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto px-4"
            >
              <p className="text-[#6B6B6B] mb-5 sm:mb-6 font-bold tracking-tight uppercase text-[10px] sm:text-[11px]">
                Quick Navigation
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {quickLinks.map((link, index) => (
                  <a key={link.path} href={link.path} className="block">
                    <motion.div
                      className="group relative bg-white border border-[#E8E5E0] rounded-xl overflow-hidden hover:border-[#F1464A]/40 transition-all duration-500 cursor-pointer"
                      style={{ padding: 'clamp(16px, 3vw, 20px)' }}
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.7 + index * 0.08,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* subtle red wash on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F1464A]/[0.055] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <span className="relative text-[#1F1F1F] font-bold text-[13px] sm:text-[14px] tracking-tight flex items-center justify-between gap-2">
                        <span>{link.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F1464A] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" strokeWidth={2.5} />
                      </span>
                    </motion.div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Help Text ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.9 }}
              className="mt-10 sm:mt-12 text-[#6B6B6B] max-w-md mx-auto leading-relaxed px-4"
              style={{ fontSize: 'clamp(13px, 1.8vw, 15px)', fontWeight: 500 }}
            >
              Still can't find what you're looking for?{' '}
              <a href="/contact" className="text-[#F1464A] hover:underline font-bold transition-colors duration-300">
                Reach out to us
              </a>
              {' '}and we'll help you navigate.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── keyframes (matching Home.jsx) ── */}
      <style>{`
        @import url('${SATOSHI_LINK}');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1.5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-11px) rotate(-2deg); }
        }
        
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 9s ease-in-out infinite 1s;
        }
      `}</style>
    </main>
  );
}
