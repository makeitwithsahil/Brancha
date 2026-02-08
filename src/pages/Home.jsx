import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { useEffect, memo, useState, useMemo, useRef, useCallback } from 'react';
import { link } from 'framer-motion/client';
import SEO from '../components/SEO';
import { organizationSchema } from '../utils/schemas';
import { 
  session, 
  performanceTracking, 
  leadIntent, 
  userPreferences,
  journeyTracking 
} from '../utils/storage';

/* ────────────────────────────────────────────
   SATOSHI FONT IMPORT  (CDN – Fontsource)
   ──────────────────────────────────────────── */
const SATOSHI_LINK = 'https://fonts.cdnfonts.com/css/satoshi?display=swap';

/* ─── DATA ─── */
const industries = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: 'Fitness Studios',
    challenge: 'Sign-ups come in. Half never show.',
    outcome: 'We turn trials into paying members.',
    link: '/gym'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M5 10v11M19 10v11M9 21v-6h6v6" />
      </svg>
    ),
    title: 'Real Estate',
    challenge: 'Ad spend goes up. Results stay hidden.',
    outcome: 'Every lead tracked to where it came from.',
    link: '/real-estate'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Healthcare',
    challenge: 'Patients visit once. Then vanish.',
    outcome: 'Systems that bring them back.',
    link: '/healthcare'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="m6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: 'Education',
    challenge: 'Admissions take forever. Chaos grows.',
    outcome: 'Automated systems. No manual work.',
    link: '/education'
  },
];

/* ─── HAND-DRAWN SVGs ─── */
const HDCircle = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 200 200" fill="none">
    <path d="M100,12 C140,10 175,38 182,75 C190,118 170,165 130,180 C88,193 38,178 22,140 C6,100 18,48 55,22 C72,12 86,13 100,12Z" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.38" />
    <path d="M100,20 C136,18 168,44 174,78 C181,114 164,157 128,172 C92,184 48,172 34,138 C20,104 30,54 62,28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.16" strokeDasharray="4 7" />
  </svg>
));
const HDUnderline = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 440 28" preserveAspectRatio="none" fill="none">
    <path d="M8,16 C50,20 100,10 160,15 C220,20 270,8 330,14 C380,19 420,12 434,15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.45" />
    <path d="M6,21 C48,24 98,15 158,19 C218,24 268,13 328,18 C378,22 418,16 436,18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.18" strokeDasharray="4 8" />
  </svg>
));
const HDArrow = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 160 90" fill="none">
    <path d="M12,52 C30,48 55,54 80,50 C105,46 125,44 138,36" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.38" />
    <path d="M122,22 L140,38 L124,50" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.38" />
    <path d="M8,58 C28,55 52,60 76,56" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.18" strokeDasharray="3 6" />
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
const HDCoil = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 40 180" fill="none">
    <path d="M20,8 C36,18 36,38 20,48 C4,58 4,78 20,88 C36,98 36,118 20,128 C4,138 4,158 20,168" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.34" />
  </svg>
));
const HDDots = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 130 130" fill="none">
    <circle cx="22" cy="22" r="4.5" fill="currentColor" opacity="0.28" /><circle cx="65" cy="18" r="3.2" fill="currentColor" opacity="0.2" />
    <circle cx="108" cy="28" r="4" fill="currentColor" opacity="0.25" /><circle cx="38" cy="65" r="3" fill="currentColor" opacity="0.18" />
    <circle cx="90" cy="68" r="3.8" fill="currentColor" opacity="0.22" /><circle cx="18" cy="108" r="3.5" fill="currentColor" opacity="0.2" />
    <circle cx="65" cy="105" r="4" fill="currentColor" opacity="0.25" /><circle cx="112" cy="112" r="3" fill="currentColor" opacity="0.18" />
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
const HDCheck = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 30 30" fill="none">
    <path d="M6,16 L13,22 L24,9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
    <path d="M7,17 L12,21 L23,10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.28" strokeDasharray="2 4" />
  </svg>
));

/* ─── MOTION VARIANTS ─── */
const fadeInScale = { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.11, delayChildren: 0.14 } } };

/* ─── INDUSTRY CARD ─── */
const IndustryCard = memo(({ industry, isReturningUser, hasVisitedBefore }) => {
  // ✅ [STORAGE] Track lead interest when user interacts
  const handleInteraction = useCallback(() => {
    if (isReturningUser) {
      leadIntent.markInterest(industry.title);
    }
  }, [industry.title, isReturningUser]);

  return (
    <motion.article
      variants={fadeInScale}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white border border-[#E8E5E0] rounded-2xl overflow-hidden hover:border-[#F1464A]/40 transition-all duration-500 cursor-default h-full flex flex-col"
      style={{ padding: '28px 26px' }}
      onMouseEnter={handleInteraction}
      onFocus={handleInteraction}
    >
      {/* subtle red wash on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F1464A]/[0.055] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      {/* star accent */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-[0.2] transition-opacity duration-500 pointer-events-none">
        <HDStar className="text-[#F1464A]" style={{ width: 56, height: 56 }} />
      </div>
      
      {/* ✅ [STORAGE] Subtle visited indicator - no new content, just a visual cue */}
      {hasVisitedBefore && (
        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#F1464A] opacity-30" aria-hidden="true" />
      )}

      <div className="relative z-10 flex flex-col flex-1">
        {/* icon */}
        <div className="w-11 h-11 mb-5 rounded-xl bg-[#F1464A]/[0.07] border border-[#F1464A]/[0.12]
                        flex items-center justify-center text-[#F1464A]
                        transition-all duration-300 group-hover:bg-[#F1464A] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#F1464A]/25">
          {industry.icon}
        </div>
        {/* title – bold */}
        <h3 className="font-bold text-[#1F1F1F] mb-2 tracking-tight" style={{ fontSize: 'clamp(15px, 2vw, 18px)' }}>
          {industry.title}
        </h3>
        {/* challenge – italic medium */}
        <p className="text-[#8A8A8A] mb-2 leading-snug min-h-[2.5rem]" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(13px, 1.6vw, 15px)' }}>
          {industry.challenge}
        </p>
        {/* outcome – medium */}
        <div className="relative inline-block mb-8 flex-1">
          <p className="text-[#1F1F1F] leading-snug min-h-[2.5rem]" style={{ fontWeight: 500, fontSize: 'clamp(13px, 1.6vw, 15px)' }}>
            {industry.outcome}
          </p>
          <HDUnderline className="absolute left-0 w-full text-[#F1464A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ bottom: -4, height: 10 }} />
        </div>
        {/* CTA Button */}
        <div className="mt-auto">
          <Link to={industry.link} className="block">
            <motion.button
              className="group/btn relative w-full inline-flex items-center justify-center gap-2 text-[#F1464A] font-bold bg-white rounded-lg overflow-hidden border-2 border-[#F1464A]/20 hover:border-[#F1464A] transition-all duration-300"
              style={{ padding: '12px 20px', fontSize: '14px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Learn More</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
              <div className="absolute inset-0 bg-[#F1464A]/[0.05] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
});

/* ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  
  // ✅ [STORAGE] Performance tracking
  const mountTimeRef = useRef(Date.now());
  
  // ✅ [STORAGE] Personalization state
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [visitedPages, setVisitedPages] = useState([]);
  
  // ✅ [STORAGE] Memoize user preferences for performance
  const lowPowerMode = useMemo(() => userPreferences.get('lowPowerMode', false), []);
  const shouldReduceMotion = prefersReducedMotion || lowPowerMode;

  useEffect(() => {
    // inject Satoshi font link once
    if (!document.getElementById('satoshi-font')) {
      const link = document.createElement('link');
      link.id = 'satoshi-font';
      link.rel = 'stylesheet';
      link.href = SATOSHI_LINK;
      document.head.appendChild(link);
    }
    
    // ✅ [STORAGE] Initialize personalization data
    const returningUser = session.isReturningUser();
    const visited = session.getVisited();
    setIsReturningUser(returningUser);
    setVisitedPages(visited);
    
    // ✅ [STORAGE] Mark page as visited
    session.markVisited('/');
    
    // ✅ [STORAGE] Track journey
    journeyTracking.addPage('Home', '/');
    
    // ✅ [STORAGE] Track performance (non-blocking)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const loadTime = Date.now() - mountTimeRef.current;
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          performanceTracking.track('Home', {
            loadTime,
            componentMountTime: loadTime,
            domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
            isReturningUser: returningUser
          });
        }
      });
    }
  }, []);

  return (
    <main className="bg-[#FAF9F7] overflow-hidden relative" style={{ fontFamily: "'Satoshi', sans-serif" }}>
      {/* ✅ [SEO] Add SEO component */}
      <SEO
        title="Industry Specialists in Conversion Architecture"
        description="Precision-engineered digital systems for gyms, real estate, healthcare, and education."
        canonical="/"
        keywords="digital marketing, fitness marketing, real estate marketing, healthcare marketing, education marketing, conversion optimization"
        schema={organizationSchema}
      />

      {/* grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      </div>

      {/* ══════ HERO ══════ */}
      <section className="relative" style={{ paddingTop: 'clamp(100px, 16vw, 220px)', paddingBottom: 'clamp(56px, 8vw, 120px)' }}>
        {/* bg glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1464A]/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[55%] h-[65%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F1464A]/[0.04] via-transparent to-transparent" />

        {/* drifting doodles – large screens only */}
        <div className="absolute top-[10%] left-[3%] hidden xl:block animate-float pointer-events-none" style={{ opacity: 0.11 }}>
          <HDScribble className="text-[#F1464A]" style={{ width: 120, height: 86 }} />
        </div>
        <div className="absolute top-[40%] right-[5%] hidden xl:block animate-float-delayed pointer-events-none" style={{ opacity: 0.09 }}>
          <HDStar className="text-[#F1464A]" style={{ width: 80, height: 80 }} />
        </div>
        <div className="absolute bottom-[12%] left-[8%] hidden lg:block animate-float pointer-events-none" style={{ opacity: 0.08 }}>
          <HDCircle className="text-[#F1464A]" style={{ width: 90, height: 90 }} />
        </div>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* ── badge – own block, stacked above headline ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F1464A]/[0.2] bg-white/90 backdrop-blur-sm shadow-sm shadow-[#F1464A]/[0.06]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F1464A] animate-pulse" />
                <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">
                  Industry-Focused Solutions
                </span>
                <Sparkles className="w-3 h-3 text-[#F1464A]" />
              </div>
            </motion.div>

            {/* ── headline – block below badge ── */}
            <div className="relative inline-block mb-5">
              <h1 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.08]" style={{ fontSize: 'clamp(40px, 8vw, 88px)' }}>
                Experts build
                <br />
                <span className="relative inline-block" style={{ marginTop: 4 }}>
                  <span className="bg-gradient-to-r from-[#F1464A] via-[#D4433E] to-[#F1464A] bg-clip-text text-transparent">
                    systems that convert
                  </span>
                  <HDUnderline className="absolute left-0 w-full text-[#F1464A]" style={{ bottom: -13, height: 18 }} />
                </span>
              </h1>
            </div>

            {/* ── sub – medium weight ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.42 }}
              className="text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed mb-8"
              style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 500 }}
            >
              Four industries. Four expert teams. Built to get results, not just look good.{' '}
              <br /><span className="text-[#1F1F1F] font-bold">One focus. One team. Total mastery.</span>
            </motion.p>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.6 }}
              className="relative inline-block"
            >
              <Link to="/contact" onClick={() => leadIntent.markInterest('Contact - Hero CTA')}>
                <motion.button
                  className="group relative inline-flex items-center gap-2.5 text-white font-bold bg-gradient-to-r from-[#F1464A] to-[#C94A3F] rounded-full overflow-hidden shadow-lg shadow-[#F1464A]/[0.25] border border-[#F1464A]"
                  style={{ padding: '14px 36px', fontSize: 'clamp(14px, 1.7vw, 16px)' }}
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.04, boxShadow: '0 16px 36px -8px rgba(241,70,74,0.42)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                </motion.button>
              </Link>
              {/* hand-drawn arrow below CTA */}
              <div className="absolute -bottom-8 right-[8%] hidden lg:block pointer-events-none" style={{ opacity: 0.17 }}>
                <HDArrow className="text-[#F1464A]" style={{ width: 100, height: 64, transform: 'rotate(20deg)' }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════ INDUSTRIES ══════ */}
      <section className="relative" style={{ paddingTop: 'clamp(64px, 9vw, 140px)', paddingBottom: 'clamp(64px, 9vw, 140px)' }}>
        <div className="absolute inset-0 bg-gradient-to-b via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10 sm:mb-14"
          >
            {/* tag – its own block */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#F1464A]/[0.18] bg-[#F1464A]/[0.06]">
                <Zap className="w-3 h-3 text-[#F1464A]" />
                <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">Expert Teams</span>
              </div>
            </div>

            {/* headline – next block, properly vertical */}
            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(32px, 6vw, 70px)' }}>
              Your industry.
              <br />
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent">Our expertise.</span>
            </h2>

            {/* sub */}
            <p className="text-[#6B6B6B] max-w-xl mx-auto leading-relaxed mt-4" style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', fontWeight: 500 }}>
              Every expert works in one field. They know the language, understand the rules, and know what gets results.
            </p>
          </motion.div>

          {/* cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch"
          >
            {industries.map((ind, i) => (
              <IndustryCard 
                key={i} 
                industry={ind} 
                isReturningUser={isReturningUser}
                hasVisitedBefore={visitedPages.includes(ind.link)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section className="relative bg-white" style={{ paddingTop: 'clamp(64px, 9vw, 140px)', paddingBottom: 'clamp(64px, 9vw, 140px)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F1464A]/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-[8%] right-[6%] hidden xl:block pointer-events-none" style={{ opacity: 0.08 }}>
          <HDStar className="text-[#F1464A]" style={{ width: 86, height: 86 }} />
        </div>

        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#F1464A]/[0.18] bg-[#F1464A]/[0.06]">
                <CheckCircle2 className="w-3 h-3 text-[#F1464A]" />
                <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">What We Do</span>
              </div>
            </div>
            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(32px, 6vw, 64px)' }}>
              Systems that work,
              <br />
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent">not just pretty designs</span>
            </h2>
          </motion.div>

          {/* asymmetric grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4"
          >
            {/* big card */}
            <motion.div
              variants={fadeInScale}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 relative bg-gradient-to-br from-[#FAF9F7] to-white border border-[#E8E5E0] rounded-2xl group overflow-hidden hover:border-[#F1464A]/[0.3] transition-all duration-500 shadow-md hover:shadow-lg"
              style={{ padding: 'clamp(28px, 4vw, 48px)' }}
            >
              {/* glow mesh */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#F1464A]/[0.06] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#C94A3F]/[0.05] rounded-full blur-3xl" />
              </div>
              <div className="absolute bottom-6 left-6 hidden lg:block pointer-events-none opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500">
                <HDCircle className="text-[#F1464A]" style={{ width: 110, height: 110 }} />
              </div>

              <div className="relative z-10">
                {/* tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1464A]/[0.08] border border-[#F1464A]/[0.16] mb-5">
                  <HDCheck className="text-[#F1464A]" style={{ width: 15, height: 15 }} />
                  <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">Primary Service</span>
                </div>

                <h3 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.15] mb-4" style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
                  Websites built to<br />turn visitors into customers
                </h3>

                <p className="text-[#6B6B6B] leading-relaxed mb-6 max-w-xl" style={{ fontSize: 'clamp(14px, 1.7vw, 15px)', fontWeight: 500 }}>
                  Websites built around rules and tracking. RERA for property. DISHA for healthcare. WhatsApp built in. Mobile-first, always.
                </p>

                {/* bullets */}
                <div className="space-y-3">
                  {[
                    'Google Business Profile setup included',
                    'Full tracking — from source to closed deal',
                    'Lightning-fast loading on every device',
                  ].map((txt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F1464A] mt-[7px] flex-shrink-0" />
                      <p className="text-[#1F1F1F]" style={{ fontSize: '14px', fontWeight: 500 }}>{txt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* stacked small cards */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* secondary */}
              <motion.div
                variants={fadeInScale}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-gradient-to-br from-[#FAF9F7] to-white border border-[#E8E5E0] rounded-2xl group overflow-hidden hover:border-[#F1464A]/[0.3] transition-all duration-500 shadow-md hover:shadow-lg flex-1"
                style={{ padding: 'clamp(24px, 3.5vw, 36px)' }}
              >
                <div className="absolute top-4 right-4 hidden lg:block pointer-events-none opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500">
                  <HDStar className="text-[#F1464A]" style={{ width: 50, height: 50 }} />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1464A]/[0.08] border border-[#F1464A]/[0.16] mb-4">
                    <HDCheck className="text-[#F1464A]" style={{ width: 15, height: 15 }} />
                    <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">Core Service</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-[#1F1F1F] mb-2 tracking-tight leading-tight">Smart lead capture</h3>
                  <p className="text-[#6B6B6B] leading-relaxed" style={{ fontSize: '14px', fontWeight: 500 }}>
                    WhatsApp automation, CRM setup, and multi-channel tracking — all in one place.
                  </p>
                </div>
              </motion.div>

              {/* red card */}
              <motion.div
                variants={fadeInScale}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-gradient-to-br from-[#F1464A] via-[#D4433E] to-[#C94A3F] text-white rounded-2xl overflow-hidden shadow-lg shadow-[#F1464A]/[0.2]"
                style={{ padding: 'clamp(24px, 3.5vw, 36px)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />
                <div className="absolute top-4 right-4 pointer-events-none" style={{ opacity: 0.18 }}>
                  <HDScribble className="text-white" style={{ width: 90, height: 64 }} />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.14] border border-white/[0.18] mb-4">
                    <span className="text-[11px] font-bold text-white tracking-widest uppercase">Coming Soon</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-white mb-2 tracking-tight leading-tight">Workflow automation</h3>
                  <p className="text-white/[0.85] leading-relaxed" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Admissions, patient follow-ups, trial bookings — custom-built for your industry.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ PHILOSOPHY ══════ */}
      <section className="relative overflow-hidden" style={{ paddingTop: 'clamp(64px, 9vw, 140px)', paddingBottom: 'clamp(64px, 9vw, 140px)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F1464A]/[0.018] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.035 }}>
          <HDCircle className="text-[#F1464A]" style={{ width: 600, height: 600 }} />
        </div>
        <div className="absolute top-[12%] left-[2%] hidden xl:block pointer-events-none" style={{ opacity: 0.11 }}>
          <HDCoil className="text-[#F1464A]" style={{ width: 24, height: 130 }} />
        </div>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* heading */}
            <div className="relative inline-block mb-8">
              <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(30px, 5.5vw, 60px)' }}>
                Focus
                <br />
                <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent">drives results</span>
              </h2>
              <HDUnderline className="absolute left-0 w-full text-[#F1464A]" style={{ bottom: -6, height: 16 }} />
              <div className="absolute -right-20 -top-8 hidden xl:block pointer-events-none" style={{ opacity: 0.1 }}>
                <HDScribble className="text-[#F1464A]" style={{ width: 110, height: 80, transform: 'rotate(-8deg)' }} />
              </div>
            </div>

            {/* prose */}
            <div className="space-y-5">
              <p className="text-[#4A4A4A] leading-relaxed" style={{ fontSize: 'clamp(16px, 2.1vw, 18px)', fontWeight: 500 }}>
                Generic agencies build websites without knowing your business. They can't explain why someone picks your gym over another, or what makes a buyer book a viewing.
              </p>
              <p className="text-[#4A4A4A] leading-relaxed" style={{ fontSize: 'clamp(16px, 2.1vw, 18px)', fontWeight: 500 }}>
                We work differently.{' '}
                <span className="font-bold text-[#F1464A]" style={{ fontStyle: 'italic' }}>Each team focuses on one industry.</span>{' '}
                Fitness. Real estate. Healthcare. Education. No generalists here.
              </p>

              {/* blockquote */}
              <div className="relative pl-5 border-l-[3px] border-[#F1464A] py-2 mt-6">
                <p className="font-bold text-[#1F1F1F] leading-[1.3]" style={{ fontSize: 'clamp(18px, 2.8vw, 24px)' }}>
                  Experts deliver results. Generalists just design websites.
                </p>
                <div className="absolute -left-2.5 top-2 pointer-events-none">
                  <HDCheck className="text-[#F1464A]" style={{ width: 18, height: 18 }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="relative bg-white overflow-hidden" style={{ paddingTop: 'clamp(64px, 9vw, 140px)', paddingBottom: 'clamp(80px, 11vw, 160px)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F1464A]/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-[12%] left-[10%] hidden xl:block pointer-events-none" style={{ opacity: 0.07 }}>
          <HDDots className="text-[#F1464A]" style={{ width: 80, height: 80 }} />
        </div>
        <div className="absolute bottom-[14%] right-[8%] hidden xl:block pointer-events-none" style={{ opacity: 0.08 }}>
          <HDSparkle className="text-[#F1464A]" style={{ width: 72, height: 72 }} />
        </div>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* small scribble accent */}
            <div className="flex justify-center mb-5">
              <HDScribble className="text-[#F1464A]" style={{ width: 160, height: 56, opacity: 0.18 }} />
            </div>

            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1] mb-4" style={{ fontSize: 'clamp(32px, 6vw, 64px)' }}>
              Ready to grow?
              <br />
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent" style={{ fontStyle: 'italic' }}>
                Let's talk.
              </span>
            </h2>

            <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto leading-relaxed" style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 500 }}>
              Custom systems for fitness, property, healthcare, and education. Real expertise — not guesswork.
            </p>

            <Link to="/contact" onClick={() => leadIntent.markInterest('Contact - Bottom CTA')}>
              <motion.button
                className="group relative inline-flex items-center gap-2.5 text-white font-bold bg-gradient-to-r from-[#F1464A] to-[#C94A3F] rounded-full overflow-hidden shadow-lg shadow-[#F1464A]/[0.25] border border-[#F1464A]"
                style={{ padding: '15px 40px', fontSize: 'clamp(14px, 1.8vw, 17px)' }}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.04, boxShadow: '0 18px 40px -10px rgba(241,70,74,0.45)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── keyframes ── */}
      <style>{`
        @import url('${SATOSHI_LINK}');
        @keyframes float        { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(1.5deg)} }
        @keyframes float-delayed{ 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-11px) rotate(-2deg)} }
        .animate-float         { animation: float 7s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 9s ease-in-out infinite 1s; }
      `}</style>
    </main>
  );
}