import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import { useEffect, memo, useMemo, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  session,
  userPreferences,
  journeyTracking,
  leadIntent,
  packageInterest
} from '../utils/storage';

/* ────────────────────────────────────────────
   SATOSHI FONT IMPORT  (CDN – Fontsource)
   ──────────────────────────────────────────── */
const SATOSHI_LINK = 'https://fonts.cdnfonts.com/css/satoshi?display=swap';

/* ─── SEO-OPTIMIZED DEPARTMENTS DATA ─── */
const departments = [
  {
    slug: 'gym',
    title: 'Fitness & Gym Department',
    subtitle: 'Fitness Studios & Gym Marketing',
    metaTitle: 'Gym & Fitness Marketing Agency | Website Design & Lead Generation',
    metaDescription: 'Specialized gym marketing agency in Vadodara. We build conversion-focused websites and WhatsApp lead systems that turn trial bookings into paying members. 10% conversion guarantee.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    problem: 'Most gyms get leads but lose 50%+ to no-shows and poor follow-up',
    solution: 'Conversion-focused websites + WhatsApp automation that turn leads into paying members',
    outcome: '10% website conversion rate minimum. 5-10 quality enquiries per month.',
    features: [
      'WhatsApp click-to-chat integration',
      'Trial booking automation',
      'Lead tracking dashboard',
      'Google Business Profile optimization',
      'Member conversion tracking'
    ],
    keywords: ['gym marketing agency', 'fitness studio website design', 'gym lead generation', 'fitness marketing Vadodara', 'gym website development'],
  },
  {
    slug: 'real-estate',
    title: 'Real Estate Department',
    subtitle: 'Property Developer Marketing',
    metaTitle: 'Real Estate Marketing Agency | Property Website Design & Lead Tracking',
    metaDescription: 'Specialized real estate marketing in Vadodara, Surat. RERA-compliant websites with CRM integration that measure Cost Per Booking, not just Cost Per Lead. ROI-focused campaigns.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M5 10v11M19 10v11M9 21v-6h6v6" />
      </svg>
    ),
    problem: 'Most developers get portal leads but can\'t track which campaigns actually drive site visits',
    solution: 'RERA-compliant websites + CRM systems that measure Cost Per Booking, not just Cost Per Lead',
    outcome: 'Clear ROI tracking. Higher site visit conversion rates. Know exactly which ads work.',
    features: [
      'RERA compliance implementation',
      'Site visit booking tracking',
      'Cost per booking analytics',
      'Property listing optimization',
      'Multi-campaign attribution'
    ],
    keywords: ['real estate marketing agency', 'property website design', 'RERA compliant website', 'real estate lead tracking', 'property marketing Vadodara'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare Department',
    subtitle: 'Dental Clinics & Medical Centers',
    metaTitle: 'Healthcare Marketing Agency | Medical Practice Website Design & Patient Retention',
    metaDescription: 'Specialized healthcare marketing for clinics in Vadodara. DISHA-compliant websites with patient recall automation that increases lifetime value and reduces acquisition costs.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
    problem: 'Most clinics spend ₹2,000-3,000 per patient but have low retention and no compliance systems',
    solution: 'DISHA-compliant websites + patient recall automation that increases lifetime value',
    outcome: 'Lower acquisition costs through better retention. Automated follow-ups bring patients back.',
    features: [
      'DISHA compliance integration',
      'Patient appointment automation',
      'Recall and follow-up systems',
      'Treatment package promotion',
      'Patient lifetime value tracking'
    ],
    keywords: ['healthcare marketing agency', 'dental clinic website design', 'DISHA compliant website', 'patient recall system', 'medical marketing Vadodara'],
  },
  {
    slug: 'education',
    title: 'Education Department',
    subtitle: 'Schools, Colleges & Coaching Institutes',
    metaTitle: 'Education Marketing Agency | School Website Design & Admissions Automation',
    metaDescription: 'Specialized education marketing for schools and coaching institutes. Centralized admissions systems that reduce administrative workload by 30-40%. Faster enrollment processing.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="m6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    problem: 'Most schools and coaching institutes lose hours every week managing admissions, student records, and communication',
    solution: 'Centralized student management systems covering admissions, records, communication, and workflows',
    outcome: '30-40% reduction in administrative workload. Faster admissions handling. Clearer operational visibility.',
    features: [
      'Admissions automation',
      'Student record management',
      'Parent communication portal',
      'Attendance tracking',
      'Fee collection integration'
    ],
    keywords: ['education marketing agency', 'school website design', 'admissions management system', 'coaching institute website', 'education marketing Vadodara'],
  }
];

/* ─── HAND-DRAWN SVGs (same as home page) ─── */
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

/* ─── MOTION VARIANTS ─── */
const fadeInScale = { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.11, delayChildren: 0.14 } } };

/* ─── DEPARTMENT CARD ─── */
const DepartmentCard = memo(({ dept, index, onCardClick }) => {
  const prefersReducedMotion = useReducedMotion();
  
  // ✅ OPTIMIZATION: Memoized click handler
  const handleClick = useCallback(() => {
    onCardClick(dept.slug);
  }, [dept.slug, onCardClick]);
  
  return (
    <motion.article
      variants={fadeInScale}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-2xl border-2 border-[#E8E8E8] hover:border-[#F1464A] overflow-hidden transition-all duration-500 h-full flex flex-col"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F1464A]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* content */}
      <div className="relative p-6 sm:p-8 flex flex-col flex-1">
        {/* icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#F1464A] to-[#C94A3F] text-white mb-4 sm:mb-5 shadow-lg shadow-[#F1464A]/[0.25]">
          {dept.icon}
        </div>

        {/* title */}
        <h3 
          className="text-[20px] sm:text-[22px] font-bold text-[#1F1F1F] mb-2 tracking-tight leading-tight"
          itemProp="name"
        >
          {dept.title}
        </h3>
        
        {/* subtitle */}
        <p className="text-[12px] sm:text-[13px] font-bold text-[#F1464A] tracking-wide uppercase mb-4">
          {dept.subtitle}
        </p>

        {/* problem */}
        <div className="mb-4 pb-4 border-b border-[#E8E8E8]">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#6B6B6B] tracking-widest uppercase block mb-2">Problem</span>
          <p className="text-[#4A4A4A] leading-relaxed text-[13px] sm:text-[14px] min-h-[3rem]" style={{ fontWeight: 500 }}>
            {dept.problem}
          </p>
        </div>

        {/* solution */}
        <div className="mb-4 pb-4 border-b border-[#E8E8E8]">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#6B6B6B] tracking-widest uppercase block mb-2">Solution</span>
          <p 
            className="text-[#4A4A4A] leading-relaxed text-[13px] sm:text-[14px] min-h-[3rem]" 
            style={{ fontWeight: 500 }}
            itemProp="description"
          >
            {dept.solution}
          </p>
        </div>

        {/* outcome */}
        <div className="mb-5">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#6B6B6B] tracking-widest uppercase block mb-2">Outcome</span>
          <p className="text-[#1F1F1F] font-bold leading-relaxed text-[14px] sm:text-[15px] min-h-[3rem]">
            {dept.outcome}
          </p>
        </div>

        {/* features */}
        <div className="mb-6 flex-1">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#6B6B6B] tracking-widest uppercase block mb-3">Key Features</span>
          <ul className="space-y-2">
            {dept.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <HDCheck className="text-[#F1464A] flex-shrink-0 mt-0.5" style={{ width: 16, height: 16 }} />
                <span className="text-[#4A4A4A] text-[13px] sm:text-[14px]" style={{ fontWeight: 500 }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link to={`/${dept.slug}`} onClick={handleClick}>
            <motion.button
              className="group/btn relative w-full inline-flex items-center justify-center gap-2 text-white font-bold bg-gradient-to-r from-[#F1464A] to-[#C94A3F] rounded-xl overflow-hidden shadow-md shadow-[#F1464A]/[0.2] border border-[#F1464A] text-[14px] sm:text-[15px]"
              style={{ padding: '12px 24px' }}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.02, boxShadow: '0 12px 28px -8px rgba(241,70,74,0.4)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative z-10">View {dept.title}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* decorative accent */}
      <div className="absolute -top-8 -right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <HDSparkle className="text-[#F1464A]" style={{ width: 80, height: 80, opacity: 0.12 }} />
      </div>
    </motion.article>
  );
});

DepartmentCard.displayName = 'DepartmentCard';

/* ─── MAIN COMPONENT ─── */
export default function Departments() {
  const prefersReducedMotion = useReducedMotion();

  // ✅ OPTIMIZATION: Check returning user status (memoized)
  const isReturningUser = useMemo(() => {
    try {
      return session.isReturningUser();
    } catch {
      return false;
    }
  }, []);

  // ✅ OPTIMIZATION: Check reduced motion preference (memoized)
  const reducedMotionPref = useMemo(() => {
    try {
      return userPreferences.get('reducedMotion', false);
    } catch {
      return false;
    }
  }, []);

  // ✅ OPTIMIZATION: Determine if animations should run
  const shouldAnimate = useMemo(() => {
    return !prefersReducedMotion && !reducedMotionPref;
  }, [prefersReducedMotion, reducedMotionPref]);

  // ✅ OPTIMIZATION: Track visited departments
  const [viewedDepartments, setViewedDepartments] = useState(() => {
    try {
      return session.get('viewed_departments', { temporary: true }) || [];
    } catch {
      return [];
    }
  });

  // ✅ OPTIMIZATION: Track page visit on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    try {
      session.markVisited('/departments');
      journeyTracking.addPage('Departments', '/departments');
      leadIntent.markInterest('departments');
    } catch {
      // Silent fail
    }
  }, []);

  // ✅ OPTIMIZATION: Memoized department card click handler
  const handleDepartmentClick = useCallback((slug) => {
    try {
      // Track department interest
      leadIntent.markInterest(slug);
      
      // Update viewed departments
      const updated = [...new Set([...viewedDepartments, slug])];
      setViewedDepartments(updated);
      
      // Save to session storage
      session.set('viewed_departments', updated, { temporary: true });
    } catch {
      // Silent fail
    }
  }, [viewedDepartments]);

  // ✅ OPTIMIZATION: Memoized structured data
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Brancha",
    "description": "Niche-specialist tech company helping gyms, real estate firms, clinics, and education institutions grow through premium websites and lead systems",
    "url": "https://brancha.in/departments",
    "department": departments.map(dept => ({
      "@type": "Organization",
      "name": dept.title,
      "description": dept.solution,
      "url": `https://brancha.in/${dept.slug}`,
      "areaServed": {
        "@type": "City",
        "name": "Vadodara"
      }
    }))
  }), []);

  // ✅ OPTIMIZATION: Memoized breadcrumb schema
  const breadcrumbSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://brancha.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Departments",
        "item": "https://brancha.in/departments"
      }
    ]
  }), []);

  return (
    <main className="relative bg-[#FAF9F7] overflow-hidden" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      {/* grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      </div>

      {/* SEO Meta Tags */}
      <Helmet>
        <title>Specialized Marketing Departments | Brancha - Gym, Real Estate, Healthcare & Education</title>
        <meta name="description" content="Dedicated specialist departments for gym marketing, real estate marketing, healthcare marketing, and education marketing in Vadodara. Each team focuses on one industry for better results." />
        <meta name="keywords" content="marketing departments, gym marketing agency, real estate marketing, healthcare marketing, education marketing, Vadodara marketing agency, niche specialist marketing" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Specialized Marketing Departments | Brancha" />
        <meta property="og:description" content="Expert marketing departments for gyms, real estate, healthcare & education. Each team specializes in one industry." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brancha.in/departments" />
        <meta property="og:image" content="https://brancha.in/og-departments.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Specialized Marketing Departments | Brancha" />
        <meta name="twitter:description" content="Expert marketing departments for gyms, real estate, healthcare & education." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        
        {/* Canonical */}
        <link rel="canonical" href="https://brancha.in/departments" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#F1464A" />
      </Helmet>

      {/* ══════ HERO SECTION ══════ */}
      <section className="relative overflow-hidden" style={{ paddingTop: 'clamp(120px, 16vw, 200px)', paddingBottom: 'clamp(50px, 7vw, 90px)' }}>
        {/* bg glows – matches Home hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1464A]/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[55%] h-[65%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F1464A]/[0.04] via-transparent to-transparent" />

        {/* floating doodles – large screens only */}
        <div className={`absolute top-[10%] left-[3%] hidden xl:block pointer-events-none ${shouldAnimate ? 'animate-float' : ''}`} style={{ opacity: 0.11 }}>
          <HDScribble className="text-[#F1464A]" style={{ width: 120, height: 86 }} />
        </div>
        <div className={`absolute top-[40%] right-[5%] hidden xl:block pointer-events-none ${shouldAnimate ? 'animate-float-delayed' : ''}`} style={{ opacity: 0.09 }}>
          <HDDots className="text-[#F1464A]" style={{ width: 80, height: 80 }} />
        </div>
        <div className={`absolute bottom-[12%] left-[8%] hidden lg:block pointer-events-none ${shouldAnimate ? 'animate-float' : ''}`} style={{ opacity: 0.08 }}>
          <HDCircle className="text-[#F1464A]" style={{ width: 90, height: 90 }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F1464A]/[0.2] bg-white/90 backdrop-blur-sm shadow-sm shadow-[#F1464A]/[0.06]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F1464A] animate-pulse" />
                <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">
                  Specialized Departments
                </span>
                <Target className="w-3 h-3 text-[#F1464A]" />
              </div>
            </motion.div>

            {/* heading - more breathing room */}
            <div className="relative inline-block mb-10">
              <h1 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(36px, 8vw, 72px)' }}>
                One company.
                <br />
                <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent">
                  Four specialist departments.
                </span>
              </h1>
              <HDUnderline className="absolute left-0 w-full text-[#F1464A]" style={{ bottom: -14, height: 18 }} />
            </div>

            {/* subheading - cleaner, more space */}
            <p className="text-[#4A4A4A] max-w-2xl mx-auto mb-12 leading-[1.7]" style={{ fontSize: 'clamp(16px, 2.5vw, 19px)', fontWeight: 500 }}>
              Each department focuses exclusively on one industry. No generalists. No compromises.{' '}
              <span className="font-bold text-[#F1464A]" style={{ fontStyle: 'italic' }}>Just deep expertise that drives results.</span>
            </p>

            {/* value props - simplified, more space */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
              {[
                { icon: Users, text: 'Dedicated Specialists' },
                { icon: Target, text: 'Industry-Focused' },
                { icon: TrendingUp, text: 'Proven Results' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F1464A] to-[#C94A3F] flex items-center justify-center shadow-sm shadow-[#F1464A]/[0.2]">
                    <item.icon className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] font-bold text-[#1F1F1F] tracking-tight">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ DEPARTMENTS GRID ══════ */}
      <section className="relative" style={{ paddingTop: 'clamp(50px, 6.5vw, 90px)', paddingBottom: 'clamp(50px, 6.5vw, 90px)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1464A]/[0.008] via-transparent to-[#F1464A]/[0.008] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-stretch"
          >
            {departments.map((dept, idx) => (
              <DepartmentCard 
                key={dept.slug} 
                dept={dept} 
                index={idx}
                onCardClick={handleDepartmentClick}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ WHY DEPARTMENTS MATTER ══════ */}
      <section className="relative overflow-hidden" style={{ paddingTop: 'clamp(50px, 6.5vw, 90px)', paddingBottom: 'clamp(50px, 6.5vw, 90px)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F1464A]/[0.018] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.035 }}>
          <HDCircle className="text-[#F1464A]" style={{ width: 600, height: 600 }} />
        </div>
        <div className="absolute top-[12%] left-[2%] hidden xl:block pointer-events-none" style={{ opacity: 0.11 }}>
          <HDCoil className="text-[#F1464A]" style={{ width: 24, height: 130 }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* heading */}
            <div className="relative inline-block mb-10 sm:mb-12">
              <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(32px, 7vw, 64px)' }}>
                Why
                <br />
                <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent">departments work</span>
              </h2>
              <HDUnderline className="absolute left-0 w-full text-[#F1464A]" style={{ bottom: -8, height: 18 }} />
            </div>

            {/* content */}
            <div className="space-y-6 sm:space-y-7">
              <p className="text-[#4A4A4A] leading-[1.75]" style={{ fontSize: 'clamp(16px, 2.3vw, 18px)', fontWeight: 500 }}>
                Generic agencies spread themselves too thin. One day they're building a restaurant website. The next, a gym. Then a law firm.
              </p>
              <p className="text-[#4A4A4A] leading-[1.75]" style={{ fontSize: 'clamp(16px, 2.3vw, 18px)', fontWeight: 500 }}>
                They can't tell you why someone picks your gym over another. They don't know what makes a property buyer book a site visit. They guess.
              </p>
              <p className="text-[#4A4A4A] leading-[1.75]" style={{ fontSize: 'clamp(16px, 2.3vw, 18px)', fontWeight: 500 }}>
                At Brancha, each department only works in their industry. Our gym team doesn't touch healthcare. Our real estate team doesn't touch gyms.
              </p>
              <p className="text-[#1F1F1F] font-bold leading-[1.75]" style={{ fontSize: 'clamp(17px, 2.4vw, 19px)' }}>
                That focus is why we can promise results. We know what works because we only do one thing.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 sm:mt-14 text-center">
              <Link to="/contact">
                <motion.button
                  className="group relative inline-flex items-center gap-2.5 text-white font-bold bg-gradient-to-r from-[#F1464A] to-[#C94A3F] rounded-full overflow-hidden shadow-lg shadow-[#F1464A]/[0.25] border border-[#F1464A]"
                  style={{ padding: '15px 40px', fontSize: 'clamp(14px, 1.8vw, 17px)' }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.04, boxShadow: '0 18px 40px -10px rgba(241,70,74,0.45)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="relative z-10">Talk to a Specialist</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── keyframes ── */}
      <style>{`
        @import url('${SATOSHI_LINK}');
        
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
        
        .animate-float {
          animation: float 22s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 26s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
