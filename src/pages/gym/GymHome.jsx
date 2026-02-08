import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, BarChart3, Zap, CheckCircle2, Clock, Target, TrendingUp, Sparkles, Star } from 'lucide-react';
import SEO from '../../components/SEO';
import { organizationSchema, websiteSchema, breadcrumbSchema } from '../../utils/schemas';
import {
  session,
  journeyTracking,
  leadIntent,
  userPreferences,
  storage
} from '../../utils/storage';

export default function GymLandingContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);

  // ✅ [PERSONALIZATION] Returning user state
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [previousVisitCount, setPreviousVisitCount] = useState(0);
  const [hasViewedServices, setHasViewedServices] = useState(false);

  // ✅ [PERFORMANCE] Device capability detection
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowBandwidth, setLowBandwidth] = useState(false);

  // ✅ [PERSONALIZATION] Initialize returning user detection
  useEffect(() => {
    // Check if user is returning
    const returning = session.isReturningUser();
    setIsReturningUser(returning);

    // Track gym vertical interest
    leadIntent.markInterest('gym');

    // Get visit history
    const journey = journeyTracking.getJourney();
    const gymVisits = journey.filter(entry => entry.url?.includes('/gym')).length;
    setPreviousVisitCount(gymVisits);

    // Check if user has viewed services before
    const viewedServices = journeyTracking.hasVisited('/gym/services');
    setHasViewedServices(viewedServices);

    // Get preferences
    const motion = userPreferences.get('reducedMotion', false);
    const bandwidth = userPreferences.get('connectionType');
    const isSlowConnection = bandwidth === 'slow-2g' || bandwidth === '2g';

    setReducedMotion(motion);
    setLowBandwidth(isSlowConnection);

    // Track page view
    session.markVisited('/gym');

    // ✅ [STORAGE] Store last visited gym page timestamp
    storage.set('gym_last_visit', Date.now(), { consent: false });

    // ✅ [STORAGE] Increment gym visit counter
    const visitCount = storage.get('gym_visit_count', { consent: false }) || 0;
    storage.set('gym_visit_count', visitCount + 1, { consent: false });
  }, []);

  // ✅ [PERFORMANCE] Optimized mouse tracking with throttling
  useEffect(() => {
    // Skip expensive animations on low-end devices or reduced motion
    if (reducedMotion || lowBandwidth) return;

    let rafId;
    let lastUpdate = 0;
    const throttleDelay = 50; // 20fps, sufficient for smooth parallax

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastUpdate < throttleDelay) return;

      lastUpdate = now;

      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 30 - 15,
          y: (e.clientY / window.innerHeight) * 30 - 15
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, lowBandwidth]);

  // ✅ [PERFORMANCE] Optimized scroll tracking with throttling
  useEffect(() => {
    let rafId;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          setIsWhatsAppVisible(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ✅ [PERSONALIZATION] CTA text based on user journey
  const ctaText = useMemo(() => {
    if (hasViewedServices) {
      return "Let's Get Started";
    }
    if (isReturningUser && previousVisitCount > 1) {
      return "Ready to Talk?";
    }
    return "Let's Fix This";
  }, [hasViewedServices, isReturningUser, previousVisitCount]);

  // ✅ [PERSONALIZATION] WhatsApp message based on user journey
  const whatsappMessage = useMemo(() => {
    if (hasViewedServices) {
      return encodeURIComponent("Hi, I've reviewed your services and I'm interested in discussing my gym's website");
    }
    if (isReturningUser) {
      return encodeURIComponent("Hi, I'm back to learn more about your gym website services");
    }
    return encodeURIComponent("Hi, I'm interested in learning more about your services");
  }, [hasViewedServices, isReturningUser]);

  // ✅ [PERFORMANCE] Memoized WhatsApp URL
  const whatsappUrl = useMemo(() =>
    `https://wa.me/919219917186?text=${whatsappMessage}`,
    [whatsappMessage]
  );

  // ✅ [PERFORMANCE] Handle CTA click with analytics
  const handleCtaClick = useCallback(() => {
    // Track intent without slowing down navigation
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        storage.set('gym_cta_clicked', Date.now(), { consent: false, temporary: true });
      });
    }
  }, []);

  // ✅ [SEO] Structured data
  const gymBreadcrumbs = useMemo(() => breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Gym', path: '/gym' }
  ]), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white antialiased overflow-x-hidden">

      {/* ✅ [SEO] Meta tags and structured data */}
      <SEO
        title="Gym Website Design & Lead Generation | Brancha Fitness"
        description="Professional gym websites and WhatsApp lead systems that turn trial bookings into paying members. No website? Old website? You're missing enquiries."
        canonical="/gym"
        keywords="gym website design, fitness website, gym lead generation, WhatsApp automation for gyms, gym marketing"
        schema={gymBreadcrumbs}
      />

      {/* Advanced Background System */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Animated Gradient Orbs - Disabled on reduced motion/low bandwidth */}
        {!reducedMotion && !lowBandwidth && (
          <>
            <div
              className="absolute top-[-10%] left-[10%] w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[140px] will-change-transform"
              style={{
                background: 'radial-gradient(circle, #F1464A 0%, #d63942 50%, transparent 70%)',
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(${1 + scrollY * 0.0001})`,
                transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            />
            <div
              className="absolute bottom-[-15%] right-[15%] w-[600px] h-[600px] rounded-full opacity-[0.10] blur-[120px]"
              style={{
                background: 'radial-gradient(circle, #F1464A 0%, #8B2832 60%, transparent 75%)',
                transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
                transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            />
          </>
        )}

        {/* Static gradient fallback for low-bandwidth users */}
        {(reducedMotion || lowBandwidth) && (
          <div
            className="absolute top-0 left-0 w-full h-full opacity-[0.08]"
            style={{
              background: 'radial-gradient(circle at 30% 20%, #F1464A 0%, transparent 50%), radial-gradient(circle at 70% 80%, #8B2832 0%, transparent 50%)'
            }}
          />
        )}

        {/* Grain Texture Overlay - Lighter on low bandwidth */}
        <div
          className={lowBandwidth ? "absolute inset-0 opacity-[0.015]" : "absolute inset-0 opacity-[0.025]"}
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
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isWhatsAppVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
          }`}
        aria-label="Contact us on WhatsApp"
      >
        <div className="group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

          <div className="relative w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <MessageSquare className="w-7 h-7 text-white" strokeWidth={2.5} fill="white" />
          </div>
        </div>
      </a>

      {/* Hero Section - Premium & Calm */}
      <section className="relative mt-20 pt-16 sm:pt-20 pb-12 sm:pb-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column - Content */}
            <div>

              {/* ✅ [PERSONALIZATION] Floating Badge - Contextual for returning users */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#F1464A]/8 to-[#F1464A]/5 border border-[#F1464A]/20 backdrop-blur-xl mb-8 fade-in relative group shadow-lg shadow-[#F1464A]/5">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A]/20 via-[#F1464A]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F1464A] animate-pulse" style={{ animationDuration: '2s' }} />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-[#F1464A] opacity-60" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-white/85 tracking-wide uppercase relative z-10" style={{ letterSpacing: '0.08em' }}>
                  {isReturningUser && previousVisitCount > 1 ? 'Welcome Back' : 'For Gym Owners'}
                </span>
              </div>

              {/* Hero Headline - Balanced Typography */}
              <div className="mb-8 slide-up">
                <h1
                  className="text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.05] tracking-[-0.02em] mb-4"
                  style={{
                    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                >
                  <span className="block text-white/95">No Website?</span>
                  <span className="block text-white/95 mt-1">Old Website?</span>
                  <span
                    className="block mt-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 50%, #F1464A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    You're Missing Enquiries.
                  </span>

                </h1>

                {/* Typographic Ornament - Fixed for mobile */}
                <div className="hidden sm:flex items-center gap-3 mt-6 opacity-0 animate-slide-in-fade" style={{ animationDelay: '200ms' }}>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#F1464A]/60 to-transparent" />
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/35 font-semibold">We Fix What's Actually Broken</span>
                </div>
              </div>

              {/* Refined Subheadline */}
              <div className="max-w-xl mb-10 opacity-0 animate-slide-in-fade" style={{ animationDelay: '300ms' }}>
                <p
                  className="text-base sm:text-lg leading-[1.6] text-white/70 mb-3 font-normal tracking-tight"
                  style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Someone tries to contact you. Nothing happens.
                </p>
                <p className="text-sm sm:text-base text-white/45 leading-relaxed font-light">
                  Forms fail quietly. WhatsApp messages get missed. Enquiries wait without a response—and interest fades before you even notice.
                </p>

              </div>

              {/* ✅ [PERSONALIZATION] Premium CTA Section - Dynamic text */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-8 opacity-0 animate-slide-in-fade" style={{ animationDelay: '400ms' }}>
                <Link
                  to="/gym/contact"
                  onClick={handleCtaClick}
                  className="group relative overflow-hidden w-full sm:w-auto"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A] to-[#FF5252] rounded-2xl opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500" />

                  {/* Button content */}
                  <div className="relative px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-br from-[#F1464A] via-[#F1464A] to-[#d63942] rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all group-hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#F1464A]/25">
                    <span className="tracking-tight">{ctaText}</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300"
                      strokeWidth={2.5}
                    />
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 rounded-2xl" />
                </Link>

                {/* ✅ [PERSONALIZATION] Secondary CTA - Contextual based on journey */}
                {!hasViewedServices && (
                  <Link
                    to="/gym/services"
                    className="group relative w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                  >
                    <span className="tracking-tight">View Services</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300"
                      strokeWidth={2.5}
                    />
                  </Link>
                )}
              </div>

              {/* Trust Indicators - Subtle */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-white/40 opacity-0 animate-slide-in-fade" style={{ animationDelay: '500ms' }}>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F1464A]/70" strokeWidth={2.5} />
                  <span className="tracking-tight">Monthly Payment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F1464A]/70" strokeWidth={2.5} />
                  <span className="tracking-tight">3-Month Minimum</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F1464A]/70" strokeWidth={2.5} />
                  <span className="tracking-tight">Cancel Anytime After</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative lg:block opacity-0 animate-slide-in-fade" style={{ animationDelay: '600ms' }}>
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-full">
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F1464A]/20 via-transparent to-transparent rounded-3xl blur-3xl" />

                {/* Problem/Solution visual card */}
                <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#151515] rounded-3xl p-8 border border-white/[0.08] shadow-2xl">
                  <div className="space-y-6">
                    {/* Problem State */}
                    <div className="pb-6 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Current State</span>
                      </div>
                      <div className="space-y-3">
                        {['No / poor website', 'Form submission fails', 'WhatsApp not connected', 'No enquiry tracking'].map((problem, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-white/50">
                            <X className="w-4 h-4 text-red-500/70 flex-shrink-0" strokeWidth={2.5} />
                            <span>{problem}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Solution State */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#F1464A]" />
                        <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">With Brancha</span>
                      </div>
                      <div className="space-y-3">
                        {['High-converting website', 'Instant WhatsApp delivery', 'Auto-reply confirmation', 'Full enquiry dashboard'].map((solution, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                            <CheckCircle2 className="w-4 h-4 text-[#F1464A] flex-shrink-0" strokeWidth={2.5} />
                            <span>{solution}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Metric badge */}
                  <div className="mt-6 pt-6 border-t border-white/[0.08]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-white/40 mb-1">Enquiry Capture Rate</div>
                        <div className="text-2xl font-bold text-white/95">98%</div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F1464A]/10 border border-[#F1464A]/20">
                        <TrendingUp className="w-3.5 h-3.5 text-[#F1464A]" strokeWidth={2.5} />
                        <span className="text-xs font-semibold text-[#F1464A]">+87%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Deep Dive Section */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#0F0F0F] to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className="text-[clamp(1.75rem,5vw,2.75rem)] font-black mb-4 leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
            >
              <span className="block text-white/95">The Real Problem</span>
              <span
                className="block mt-1"
                style={{
                  background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Isn't the Website.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
              It's that when someone tries to contact you, nothing reliable happens.
            </p>
          </div>

          {/* Problem Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Forms That Don't Work",
                description: 'Submissions fail silently. No notification. No backup. The lead is gone before you know it existed.',
                stat: '40%',
                statLabel: 'of forms fail',
                color: '#F1464A'
              },
              {
                icon: Clock,
                title: 'Delayed Responses',
                description: "By the time you see the enquiry and reply, they've already messaged 3 other gyms.",
                stat: '2 hours',
                statLabel: 'average delay',
                color: '#FF6B6B'
              },
              {
                icon: Target,
                title: 'No Follow-Up System',
                description: "Even if the first message goes through, there's no automated reminder or nurture sequence.",
                stat: '70%',
                statLabel: 'need follow-up',
                color: '#d63942'
              }
            ].map((problem, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                    <problem.icon className="w-6 h-6 text-white/80" strokeWidth={2} />
                  </div>

                  <h3 className="text-lg font-bold text-white/95 mb-2">{problem.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-5">{problem.description}</p>

                  <div className="pt-4 border-t border-white/[0.08]">
                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl font-bold" style={{ color: problem.color }}>{problem.stat}</div>
                      <div className="text-xs text-white/40">{problem.statLabel}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className="text-[clamp(1.75rem,5vw,2.75rem)] font-black mb-4 leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
            >
              <span className="block text-white/95">What Actually</span>
              <span
                className="block mt-1"
                style={{
                  background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Needs to Happen.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
              Every enquiry should trigger immediate, reliable action.
            </p>
          </div>

          {/* Solution Flow */}
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                step: '1',
                title: 'Website That Captures Leads',
                description: 'Brancha builds a fast, conversion-focused website that captures every enquiry properly.',
                outcome: 'More Enquiries',
                color: '#F1464A'
              },
              {
                step: '2',
                title: 'Instant WhatsApp Delivery',
                description: 'The moment someone enquires, the lead is delivered straight to your WhatsApp.',
                outcome: 'Instant Reach',
                color: '#FF6B6B'
              },
              {
                step: '3',
                title: 'Tracking & Follow-Up System',
                description: 'All enquiries are logged, tracked, and easy to follow up from one dashboard.',
                outcome: 'Full Control',
                color: '#d63942'
              }

            ].map((step, i) => (
              <div
                key={i}
                className="group relative"
              >
                {/* Connector line */}
                {i < 2 && (
                  <div className="absolute left-6 top-[4.5rem] w-[2px] h-6 bg-gradient-to-b from-white/20 to-transparent" />
                )}

                <div className="flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                  {/* Step number */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2"
                    style={{
                      backgroundColor: `${step.color}12`,
                      borderColor: `${step.color}40`,
                      color: step.color
                    }}
                  >
                    {step.step}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white/95 mb-2">{step.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed mb-4">{step.description}</p>

                    {/* Outcome badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                      style={{
                        backgroundColor: `${step.color}12`,
                        borderColor: `${step.color}30`
                      }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: step.color }} strokeWidth={2} />
                      <span className="text-xs font-bold tracking-tight" style={{ color: step.color }}>
                        {step.outcome}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note - Subtle Clarification */}
      <section className="relative py-12 px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#F1464A]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white/95 mb-2">Flexible Options</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-3">
                  We offer both one-time setup packages and monthly ongoing support. Monthly packages require a minimum 3-month commitment to ensure we have time to deliver real results.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F1464A]/70" strokeWidth={2.5} />
                    <span className="text-white/50">One-time setup available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F1464A]/70" strokeWidth={2.5} />
                    <span className="text-white/50">Monthly packages (3-month minimum)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Premium & Calm */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-4xl mx-auto text-center">

          <h2
            className="text-[clamp(1.75rem,5.5vw,3rem)] font-black mb-5 sm:mb-6 leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
          >
            <span className="block text-white/95">Missed Enquiries</span>
            <span className="block text-white/95 mt-1.5">Don't Come Back.</span>
            <span
              className="block mt-2"
              style={{
                background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              They Go Elsewhere.
            </span>

          </h2>

          <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light tracking-tight">
            Someone is trying to contact you right now. If your website or enquiry flow isn't working smoothly, that interest quietly disappears.
          </p>


          <Link
            to="/gym/contact"
            onClick={handleCtaClick}
            className="group relative overflow-hidden w-full sm:w-auto mb-8 inline-block"
          >
            {/* Glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A] to-[#FF5252] rounded-2xl opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500" />

            {/* Button content */}
            <div className="relative px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-br from-[#F1464A] to-[#d63942] rounded-2xl text-base sm:text-lg font-bold flex items-center justify-center gap-3 transition-all group-hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#F1464A]/25">
              <span className="tracking-tight">Let&apos;s Talk</span>
              <ArrowRight
                className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-300"
                strokeWidth={2.5}
              />
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 rounded-2xl" />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/35">
            {['Monthly Payment', 'No Lock-In', 'Cancel Anytime'].map((item, i, arr) => (
              <div key={item} className="flex items-center gap-4 sm:gap-6">
                <span className="tracking-tight font-medium">{item}</span>
                {i < arr.length - 1 && <span className="hidden sm:block w-1 h-1 rounded-full bg-white/25" />}
              </div>
            ))}
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

        /* Low bandwidth optimizations */
        .reduce-motion * {
          animation: none !important;
          transition: none !important;
        }
      `}</style>
    </div>
  );
}

// Missing X import from lucide-react
import { X } from 'lucide-react';
