import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, TrendingUp, CheckCircle2, Mail, Zap } from 'lucide-react';
import { useEffect, memo, useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  session, 
  userPreferences, 
  storage,
  journeyTracking,
  leadIntent
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

const HDUnderline = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 440 28" preserveAspectRatio="none" fill="none">
    <path d="M8,16 C50,20 100,10 160,15 C220,20 270,8 330,14 C380,19 420,12 434,15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.45" />
    <path d="M6,21 C48,24 98,15 158,19 C218,24 268,13 328,18 C378,22 418,16 436,18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.18" strokeDasharray="4 8" />
  </svg>
));

const HDScribble = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 180 110" fill="none">
    <path d="M20,58 Q38,32 58,56 Q78,80 98,52 Q118,24 138,54 Q152,72 160,56" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.3" />
    <path d="M26,66 Q42,44 60,64 Q78,82 96,60 Q114,38 132,60" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.14" strokeDasharray="3 7" />
  </svg>
));

const HDCoil = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 40 180" fill="none">
    <path d="M20,8 C36,18 36,38 20,48 C4,58 4,78 20,88 C36,98 36,118 20,128 C4,138 4,158 20,168" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.34" />
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

const HDArrow = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 100 64" fill="none">
    <path d="M8,32 Q30,12 55,28 T88,34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.35" />
    <path d="M85,28 L88,34 L82,36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.35" />
  </svg>
));

/* ─── MOTION VARIANTS ─── */
const fadeInScale = { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.11, delayChildren: 0.14 } } };

/* ─── DIFFERENCE CARD ─── */
const DifferenceCard = memo(({ item }) => (
  <motion.article
    variants={fadeInScale}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className="group p-7 sm:p-8 bg-white border-2 border-[#E8E8E8] rounded-xl hover:border-[#F1464A] transition-all duration-500"
  >
    <div className="w-12 h-12 rounded-xl bg-[#F1464A]/[0.08] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#F1464A]/[0.14]">
      <div className="text-[#F1464A]">{item.icon}</div>
    </div>
    <h3 className="text-[18px] sm:text-[19px] font-bold text-[#1F1F1F] mb-3 tracking-tight leading-tight">
      {item.title}
    </h3>
    <p className="text-[#4A4A4A] leading-[1.7] text-[14px] sm:text-[15px]" style={{ fontWeight: 500 }}>
      {item.description}
    </p>
  </motion.article>
));

/* ─── VALUE CARD ─── */
const ValueCard = memo(({ value }) => (
  <motion.article
    variants={fadeInScale}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className="p-7 sm:p-8 bg-white border-2 border-[#E8E8E8] rounded-xl text-center hover:border-[#F1464A] transition-all duration-500"
  >
    <h3 className="text-[20px] sm:text-[22px] font-bold text-[#F1464A] mb-3 tracking-tight">
      {value.title}
    </h3>
    <p className="text-[#4A4A4A] leading-[1.7] text-[14px] sm:text-[15px]" style={{ fontWeight: 500 }}>
      {value.description}
    </p>
  </motion.article>
));

/* ─── STEP CARD ─── */
const StepCard = memo(({ step }) => (
  <motion.article
    variants={fadeInScale}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className="relative p-7 sm:p-8 bg-white border-2 border-[#E8E8E8] rounded-xl hover:border-[#F1464A] transition-all duration-500"
  >
    <div className="text-[48px] sm:text-[56px] font-bold text-[#F1464A]/[0.12] mb-3 leading-none">
      {step.step}
    </div>
    <h3 className="text-[18px] sm:text-[19px] font-bold text-[#1F1F1F] mb-3 tracking-tight leading-tight">
      {step.title}
    </h3>
    <p className="text-[#4A4A4A] leading-[1.7] text-[14px] sm:text-[15px]" style={{ fontWeight: 500 }}>
      {step.description}
    </p>
  </motion.article>
));

/* ─── TEAM CARD (Enhanced with storage tracking) ─── */
const TeamCard = memo(({ member, onPortfolioClick }) => {
  const handleClick = useCallback(() => {
    onPortfolioClick(member.name);
  }, [member.name, onPortfolioClick]);

  return (
    <motion.article
      variants={fadeInScale}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white border-2 border-[#E8E8E8] rounded-xl overflow-hidden hover:border-[#F1464A] transition-all duration-500 h-full flex flex-col"
    >
      <a 
        href={member.portfolioUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex flex-col h-full"
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b-2 border-[#E8E8E8] bg-[#FAF9F7]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#F1464A]" />
            <span className="text-xs font-bold tracking-widest text-[#6B6B6B] uppercase">
              {member.role}
            </span>
          </div>
          <h3 className="text-[28px] sm:text-[32px] font-bold text-[#1F1F1F] tracking-tight">
            {member.name}
          </h3>
        </div>

        {/* Body - using flex-1 to fill space */}
        <div className="p-6 sm:p-7 flex flex-col flex-1">
          <p className="text-[#4A4A4A] mb-6 leading-[1.7] text-[14px] sm:text-[15px] min-h-[4.2rem]" style={{ fontWeight: 500 }}>
            {member.description}
          </p>

          <ul className="space-y-3 mb-6 flex-1">
            {member.focus.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F1464A] flex-shrink-0 mt-0.5" />
                <span className="text-[14px] text-[#1F1F1F]" style={{ fontWeight: 500 }}>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t-2 border-[#E8E8E8] mt-auto">
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-[14px] text-[#6B6B6B] transition-colors duration-300 hover:text-[#F1464A]"
              style={{ fontWeight: 500 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="w-4 h-4" />
              <span>{member.email}</span>
            </a>
          </div>
        </div>
      </a>
    </motion.article>
  );
});

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  // Performance: Check returning user status and preferences once
  const isReturningUser = useMemo(() => session.isReturningUser(), []);
  const hasVisitedAbout = useMemo(() => session.hasVisited('/about'), []);
  const reducedMotionPref = useMemo(() => userPreferences.get('reducedMotion', false), []);
  
  // Storage: Track team member portfolio clicks
  const [viewedProfiles, setViewedProfiles] = useState(() => {
    return storage.get('viewed_team_profiles', { temporary: true }) || [];
  });

  // Personalization: Show subtle indicator for returning users
  const [showContinuityMessage, setShowContinuityMessage] = useState(false);

  // Performance: Skip font preload for returning users (likely cached)
  const shouldPreloadFonts = useMemo(() => !isReturningUser, [isReturningUser]);

  // Performance: Determine if animations should run
  const shouldAnimate = useMemo(() => {
    return !prefersReducedMotion && !reducedMotionPref;
  }, [prefersReducedMotion, reducedMotionPref]);

  // Storage: Track interest in learning about the company
  useEffect(() => {
    leadIntent.markInterest('about-brancha');
    session.markVisited('/about');
  }, []);

  // Personalization: Show continuity message for returning users who viewed team profiles
  useEffect(() => {
    if (isReturningUser && hasVisitedAbout && viewedProfiles.length > 0) {
      const timer = setTimeout(() => {
        setShowContinuityMessage(true);
        const hideTimer = setTimeout(() => setShowContinuityMessage(false), 4000);
        return () => clearTimeout(hideTimer);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isReturningUser, hasVisitedAbout, viewedProfiles.length]);

  // Storage: Handle team member portfolio clicks
  const handlePortfolioClick = useCallback((memberName) => {
    const updated = [...new Set([...viewedProfiles, memberName])];
    setViewedProfiles(updated);
    storage.set('viewed_team_profiles', updated, { temporary: true });
    journeyTracking.addPage(`About - ${memberName} Portfolio`, `/about#${memberName}`);
  }, [viewedProfiles]);

  const differences = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Niche specialists, not generalists",
      description: "We have dedicated departments—Gym, Real Estate, Healthcare, Education. Each team only works in their industry. No generalists switching between gyms and restaurants."
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Systems that convert, not just design",
      description: "Most agencies build websites that look good but don't convert. We build WhatsApp automation, lead tracking, and conversion-focused systems that turn visitors into customers."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Long-term partnership, not projects",
      description: "We don't disappear after launch. Monthly retainers keep your systems working—SEO, ads, content, optimization. Continuous improvement, not one-time delivery."
    }
  ];

  const values = [
    {
      title: "Professional",
      description: "Clear communication. On-time delivery. No hype, no pressure. We treat your business with the seriousness it deserves."
    },
    {
      title: "Honest",
      description: "If something won't work for your business, we'll tell you. No upselling. We recommend what actually fits your needs."
    },
    {
      title: "Results-focused",
      description: "We measure what matters: conversion rates, cost per enquiry, leads per month. Data-driven decisions, not guesses."
    }
  ];

  const approach = [
    {
      step: "01",
      title: "We listen first",
      description: "Before anything, we understand your business. What's working? What's broken? What do customers actually need? No templates. No assumptions."
    },
    {
      step: "02",
      title: "We build the foundation",
      description: "Conversion-focused website. WhatsApp integration. Google Business Profile. Lead tracking. This stops customer loss before we drive traffic."
    },
    {
      step: "03",
      title: "We manage growth",
      description: "Monthly retainer begins. SEO, ads, content, optimization—handled. We keep everything current, working, and improving."
    },
    {
      step: "04",
      title: "We measure & improve",
      description: "Monthly reports: leads, conversion rates, cost per customer. We adjust based on data. What's working gets doubled. What's not gets fixed."
    }
  ];

  const team = [
    {
      name: "Sahil",
      role: "Founder",
      description: "Handles strategy, systems, and client direction. Ensures every project solves real business problems, not just design problems.",
      focus: [
        "Business strategy and positioning",
        "System design for growth",
        "Client communication and direction",
        "Department structure and operations"
      ],
      email: "workwiths4hil@gmail.com",
      portfolioUrl: "https://sahilmaurya.vercel.app/"
    },
    {
      name: "Saad",
      role: "Co-Founder",
      description: "Focuses on brand direction and visual judgment. Makes sure everything looks intentional, refined, and trustworthy.",
      focus: [
        "Brand tone and visual direction",
        "Design taste and restraint",
        "Trust and perception",
        "Long-term brand recall"
      ],
      email: "saadbombaywala9@gmail.com",
      portfolioUrl: "https://www.linkedin.com/in/saad-bombaywala-34a923382/"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F7]" style={{ fontFamily: "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      </div>
      
      <Helmet>
        {shouldPreloadFonts && <link rel="preload" href={SATOSHI_LINK} as="style" />}
        <title>About Brancha | Niche-Specialist Tech Company for Gyms, Real Estate, Healthcare & Education</title>
        <meta name="description" content="Brancha is a niche-specialist tech company with dedicated departments for gyms, real estate, healthcare, and education. We build conversion-focused websites and lead systems, then solve operations with custom SaaS." />
        <meta name="keywords" content="brancha about, niche specialist agency, gym marketing experts, real estate marketing specialists, healthcare marketing vadodara, education marketing agency" />
        <link rel="canonical" href="https://brancha.in/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Brancha | Niche-Specialist Tech Company" />
        <meta property="og:description" content="Dedicated departments for gyms, real estate, healthcare, and education. Conversion-focused websites + lead generation systems." />
        <meta property="og:url" content="https://brancha.in/about" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Brancha | Niche-Specialist Tech Company" />
        <meta name="twitter:description" content="Dedicated departments for gyms, real estate, healthcare, and education. Conversion-focused websites + lead generation systems." />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Brancha",
            "url": "https://brancha.in",
            "logo": "https://brancha.in/Brancha_logo_with_tagline-png.webp",
            "description": "Niche-specialist tech company with dedicated departments for gyms, real estate, healthcare, and education",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Vadodara",
              "addressRegion": "Gujarat",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-98258-83015",
              "contactType": "customer service",
              "email": "support@brancha.in"
            },
            "sameAs": [
              "https://instagram.com/growwithbrancha",
              "https://linkedin.com/company/brancha",
              "https://youtube.com/@growwithbrancha"
            ],
            "founder": [
              {
                "@type": "Person",
                "name": "Sahil",
                "email": "workwiths4hil@gmail.com",
                "jobTitle": "Founder"
              },
              {
                "@type": "Person",
                "name": "Saad",
                "email": "saadbombaywala9@gmail.com",
                "jobTitle": "Co-Founder"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Personalization: Continuity Message for Returning Users */}
      {showContinuityMessage && shouldAnimate && (
        <div 
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down"
        >
          <div className="bg-white/95 backdrop-blur-sm border-2 border-[#F1464A]/20 px-6 py-3 rounded-xl shadow-lg">
            <p className="text-[13px] font-medium text-[#1F1F1F]">
              Welcome back — you've viewed {viewedProfiles.length} team {viewedProfiles.length === 1 ? 'profile' : 'profiles'}
            </p>
          </div>
        </div>
      )}

      {/* ══════ HERO ══════ */}
      <section className="relative" style={{ paddingTop: 'clamp(100px, 16vw, 220px)', paddingBottom: 'clamp(56px, 8vw, 120px)' }}>
        {/* bg glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1464A]/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[55%] h-[65%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F1464A]/[0.04] via-transparent to-transparent" />

        {/* drifting doodles – large screens only */}
        <div className={`absolute top-[10%] left-[3%] hidden xl:block pointer-events-none ${shouldAnimate ? 'animate-float' : ''}`} style={{ opacity: 0.11 }}>
          <HDScribble className="text-[#F1464A]" style={{ width: 120, height: 86 }} />
        </div>
        <div className={`absolute top-[40%] right-[5%] hidden xl:block pointer-events-none ${shouldAnimate ? 'animate-float-delayed' : ''}`} style={{ opacity: 0.09 }}>
          <HDSparkle className="text-[#F1464A]" style={{ width: 80, height: 80 }} />
        </div>
        <div className={`absolute bottom-[12%] left-[8%] hidden lg:block pointer-events-none ${shouldAnimate ? 'animate-float' : ''}`} style={{ opacity: 0.08 }}>
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
                  About Brancha
                </span>
                <Users className="w-3 h-3 text-[#F1464A]" />
              </div>
            </motion.div>

            {/* ── headline – block below badge ── */}
            <div className="relative inline-block mb-5">
              <h1 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.08]" style={{ fontSize: 'clamp(40px, 8vw, 88px)' }}>
                We're not a
                <br />
                <span className="relative inline-block" style={{ marginTop: 4 }}>
                  <span className="bg-gradient-to-r from-[#F1464A] via-[#D4433E] to-[#F1464A] bg-clip-text text-transparent">
                    generic agency
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
              Brancha is a niche-specialist tech company with dedicated departments for gyms, real estate, healthcare, and education.{' '}
              <span className="text-[#1F1F1F] font-bold">Conversion-focused websites. Custom lead systems. Real results.</span>
            </motion.p>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.6 }}
              className="relative inline-block"
            >
              <Link to="/contact">
                <motion.button
                  className="group relative inline-flex items-center gap-2.5 text-white font-bold bg-gradient-to-r from-[#F1464A] to-[#C94A3F] rounded-full overflow-hidden shadow-lg shadow-[#F1464A]/[0.25] border border-[#F1464A]"
                  style={{ padding: '14px 36px', fontSize: 'clamp(14px, 1.7vw, 16px)' }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.04, boxShadow: '0 16px 36px -8px rgba(241,70,74,0.42)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════ WHAT MAKES US DIFFERENT ══════ */}
      <section className="relative overflow-hidden" style={{ paddingTop: 'clamp(50px, 6.5vw, 90px)', paddingBottom: 'clamp(50px, 6.5vw, 90px)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F1464A]/[0.015] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:block pointer-events-none" style={{ opacity: 0.025 }}>
          <HDCircle className="text-[#F1464A]" style={{ width: 500, height: 500 }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#F1464A]/[0.18] bg-[#F1464A]/[0.06]">
                <Zap className="w-3 h-3 text-[#F1464A]" />
                <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">How We're Different</span>
              </div>
            </div>
            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1] mb-4 sm:mb-5" style={{ fontSize: 'clamp(30px, 7vw, 56px)' }}>
              What makes us{' '}
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent">different?</span>
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto leading-[1.7]" style={{ fontSize: 'clamp(15px, 2.2vw, 17px)', fontWeight: 500 }}>
              We're not your typical marketing agency. Here's why businesses choose to work with us.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {differences.map((item, idx) => (
              <DifferenceCard key={idx} item={item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ OUR VALUES ══════ */}
      <section className="relative bg-white" style={{ paddingTop: 'clamp(50px, 6.5vw, 90px)', paddingBottom: 'clamp(50px, 6.5vw, 90px)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F1464A]/[0.01] to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#F1464A]/[0.18] bg-[#F1464A]/[0.06]">
                <CheckCircle2 className="w-3 h-3 text-[#F1464A]" />
                <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">Our Values</span>
              </div>
            </div>
            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1] mb-4 sm:mb-5" style={{ fontSize: 'clamp(30px, 7vw, 56px)' }}>
              How we{' '}
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent">operate</span>
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto leading-[1.7]" style={{ fontSize: 'clamp(15px, 2.2vw, 17px)', fontWeight: 500 }}>
              Three principles that guide every decision, project, and relationship.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-3 gap-6 sm:gap-8"
          >
            {values.map((value, idx) => (
              <ValueCard key={idx} value={value} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ OUR APPROACH ══════ */}
      <section className="relative bg-[#FAF9F7]" style={{ paddingTop: 'clamp(50px, 6.5vw, 90px)', paddingBottom: 'clamp(50px, 6.5vw, 90px)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F1464A]/[0.03] via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#F1464A]/[0.18] bg-[#F1464A]/[0.06]">
                <Target className="w-3 h-3 text-[#F1464A]" />
                <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">The Process</span>
              </div>
            </div>
            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1] mb-4 sm:mb-5" style={{ fontSize: 'clamp(30px, 7vw, 56px)' }}>
              How we{' '}
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent">work</span>
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto leading-[1.7]" style={{ fontSize: 'clamp(15px, 2.2vw, 17px)', fontWeight: 500 }}>
              A clear, repeatable process that gets results for every industry we work in.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-6 sm:gap-8"
          >
            {approach.map((step, idx) => (
              <StepCard key={idx} step={step} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ TEAM ══════ */}
      <section className="relative bg-white" style={{ paddingTop: 'clamp(50px, 6.5vw, 90px)', paddingBottom: 'clamp(50px, 6.5vw, 90px)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F1464A]/[0.01] to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#F1464A]/[0.18] bg-[#F1464A]/[0.06]">
                <Users className="w-3 h-3 text-[#F1464A]" />
                <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">The Team</span>
              </div>
            </div>
            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1] mb-4 sm:mb-5" style={{ fontSize: 'clamp(30px, 7vw, 56px)' }}>
              Meet the{' '}
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent">founders</span>
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto leading-[1.7]" style={{ fontSize: 'clamp(15px, 2.2vw, 17px)', fontWeight: 500 }}>
              Two people building systems that actually work for businesses.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-6 sm:gap-8 items-stretch"
          >
            {team.map((member, idx) => (
              <TeamCard key={idx} member={member} onPortfolioClick={handlePortfolioClick} />
            ))}
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

        <div className="max-w-3xl mx-auto px-6 sm:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* scribble accent */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <HDScribble className="text-[#F1464A]" style={{ width: 160, height: 56, opacity: 0.18 }} />
            </div>

            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1] mb-5 sm:mb-6" style={{ fontSize: 'clamp(34px, 6vw, 64px)' }}>
              Ready to work
              <br />
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent" style={{ fontStyle: 'italic' }}>
                with specialists?
              </span>
            </h2>

            <p className="text-[#6B6B6B] mb-10 sm:mb-12 max-w-xl mx-auto leading-[1.7]" style={{ fontSize: 'clamp(15px, 2.1vw, 17px)', fontWeight: 500 }}>
              Let's talk about your business. We'll recommend what actually fits your needs.
            </p>

            <Link to="/contact">
              <motion.button
                className="group relative inline-flex items-center gap-2.5 text-white font-bold bg-gradient-to-r from-[#F1464A] to-[#C94A3F] rounded-full overflow-hidden shadow-lg shadow-[#F1464A]/[0.25] border border-[#F1464A]"
                style={{ padding: '15px 40px', fontSize: 'clamp(14px, 1.8vw, 17px)' }}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.04, boxShadow: '0 18px 40px -10px rgba(241,70,74,0.45)' }}
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
        ${shouldPreloadFonts ? `@import url('${SATOSHI_LINK}');` : ''}
        
        ${shouldAnimate ? `
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(12px, -16px) rotate(2deg); }
          66% { transform: translate(-8px, 14px) rotate(-1.5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-14px, 18px) rotate(-2deg); }
          66% { transform: translate(10px, -12px) rotate(1.5deg); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        .animate-float {
          animation: float 22s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 26s ease-in-out infinite;
        }
        
        .animate-slide-down {
          animation: slideDown 0.4s ease-out both;
        }
        ` : ''}
      `}</style>
    </main>
  );
}
