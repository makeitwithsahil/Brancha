import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Workflow, Rocket, MessageSquare, BarChart3, Zap, RefreshCw, TrendingUp, CheckCircle2, Globe, Users, X } from 'lucide-react';
import { journeyTracking, userPreferences, session, storage, leadIntent, packageInterest } from '../../utils/storage';
import SEO from '../../components/SEO';

export default function GymService() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);

  // ✅ [PERSONALIZATION] Track viewed packages
  const [viewedPackages, setViewedPackages] = useState(() => {
    return storage.get('gym_services_viewed_packages', { temporary: true, consent: false }) || [];
  });

  // ✅ [PERSONALIZATION] Track package interest clicks
  const [interestedPackages, setInterestedPackages] = useState(() => {
    return storage.get('gym_services_interested_packages', { temporary: true, consent: false }) || [];
  });

  // ✅ NEW: Modal state with smooth animation
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [modalAnimating, setModalAnimating] = useState(false);

  // ✅ [PERSONALIZATION] User context from journey
  const userContext = useMemo(() => {
    const journey = journeyTracking.getJourney();
    const hasVisitedProcess = journeyTracking.hasVisited('Gym > Process');
    const hasVisitedPortfolio = journeyTracking.hasVisited('Gym > Portfolio');
    const hasVisitedContact = journeyTracking.hasVisited('Gym > Contact');
    const isReturningUser = session.isReturningUser();
    const hasVisitedServicesBefore = session.hasVisited('/gym/services');
    
    return {
      journey,
      hasVisitedProcess,
      hasVisitedPortfolio,
      hasVisitedContact,
      isReturningUser,
      hasVisitedServicesBefore,
      visitCount: journey.length
    };
  }, []);

  // ✅ [PERFORMANCE] Memoized reduced motion preference
  const reducedMotion = useMemo(() => 
    userPreferences.get('reducedMotion', false),
    []
  );

  // ✅ [PERFORMANCE] Conditional mouse and scroll tracking
  useEffect(() => {
    if (reducedMotion) {
      setMousePosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 30 - 15,
        y: (e.clientY / window.innerHeight) * 30 - 15
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsWhatsAppVisible(window.scrollY > 100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion]);

  // ✅ [PERSONALIZATION] Track package views using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const packageName = entry.target.getAttribute('data-package');
            if (packageName && !viewedPackages.includes(packageName)) {
              const updated = [...viewedPackages, packageName];
              setViewedPackages(updated);
              storage.set('gym_services_viewed_packages', updated, { temporary: true, consent: false });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const packageElements = document.querySelectorAll('[data-package]');
    packageElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [viewedPackages]);

  // ✅ [PERSONALIZATION] Handle package interest - Multi-select with animation
  const handlePackageInterest = (packageName) => {
    if (interestedPackages.includes(packageName)) {
      // Remove if already selected
      const updated = interestedPackages.filter(p => p !== packageName);
      setInterestedPackages(updated);
      storage.set('gym_services_interested_packages', updated, { temporary: true, consent: false });
    } else {
      // Add to selection
      const updated = [...interestedPackages, packageName];
      setInterestedPackages(updated);
      storage.set('gym_services_interested_packages', updated, { temporary: true, consent: false });
      packageInterest.set(packageName);
      
      // Show modal with smooth animation after first selection
      if (!showPackageModal) {
        setShowPackageModal(true);
        setTimeout(() => setModalAnimating(true), 10);
      }
    }
    leadIntent.markInterest('gym');
  };

  // ✅ Close modal with animation
  const closeModal = () => {
    setModalAnimating(false);
    setTimeout(() => setShowPackageModal(false), 300);
  };

  // ✅ Handle WhatsApp redirect with selected packages
  const handleWhatsAppContact = () => {
    const pkgs = interestedPackages.slice(0, 3).join(', ');
    const message = `Hi, I'm interested in the ${pkgs} package${interestedPackages.length > 1 ? 's' : ''} for my gym`;
    window.open(`https://wa.me/919219917186?text=${encodeURIComponent(message)}`, '_blank');
    handleContactInteraction();
  };

  // ✅ [PERSONALIZATION] Mark contact intent
  const handleContactInteraction = () => {
    leadIntent.markInterest('gym');
    storage.set('gym_services_contact_intent', Date.now(), { temporary: true, consent: false });
  };

  const foundationOffers = [
    {
      name: "Root",
      tagline: "Get Online",
      icon: <Globe className="w-5 h-5" strokeWidth={2} />,
      description: "A single-page website designed to get you visible and contactable. No complexity, no overwhelm—just the essentials working correctly.",
      includes: [
        "One-page conversion-focused website",
        "WhatsApp click-to-chat integration",
        "Google Business Profile setup",
        "60 days of post-launch support"
      ],
      doesNotInclude: [
        "Automation systems",
        "Paid advertising",
        "Multi-page website structure"
      ],
      bestFor: "New gyms testing digital channels for the first time, or gyms that just need a functional online presence without complexity.",
      outcome: "Your gym becomes contactable online. People can find you, see what you offer, and reach out directly through WhatsApp."
    },
    {
      name: "Branch",
      tagline: "Establish Presence",
      icon: <Layers className="w-5 h-5" strokeWidth={2} />,
      description: "A professional multi-page website that explains who you are, what you offer, and why someone should train with you. Built for gyms ready to be taken seriously.",
      includes: [
        "3–5 page professional website",
        "WhatsApp Business with auto-reply setup",
        "Google Business Profile optimization",
        "Lead tracking sheet for enquiry monitoring",
        "90 days of post-launch support",
        "3 strategy calls to review performance"
      ],
      doesNotInclude: [
        "Trial reminder automation",
        "Paid advertising campaigns"
      ],
      bestFor: "Growing gyms with 80–150 active members who need a credible online presence that reflects the quality of their facility.",
      outcome: "You look professional online. Your website becomes a tool that builds trust and makes it easier for interested people to take the next step."
    },
    {
      name: "Grow",
      tagline: "Build Systems",
      icon: <Workflow className="w-5 h-5" strokeWidth={2} />,
      description: "A complete website paired with automation to ensure trial bookings don't get forgotten and show-up rates improve. For gyms serious about conversion.",
      includes: [
        "5–7 page full website with detailed content",
        "WhatsApp automation for trial reminders",
        "Trial show-up tracking system",
        "Google Business Profile management (first month)",
        "Performance dashboard setup",
        "120 days of post-launch support",
        "6 strategy calls for ongoing optimization"
      ],
      doesNotInclude: [
        "Ongoing paid advertising (separate package)",
        "WhatsApp automation tool subscription fee"
      ],
      note: "WhatsApp automation requires a third-party tool subscription, typically ₹2,000–₹3,000 per month, paid directly to the provider.",
      bestFor: "Serious gyms with 150+ members preparing to scale. You've proven the model works—now you need systems that prevent leads from slipping through.",
      outcome: "More trial bookings actually show up. You gain visibility into what's working and what's breaking in your enquiry process."
    }
  ];

  const ongoingOffers = [
    {
      name: "Maintain",
      tagline: "Stay Visible",
      icon: <RefreshCw className="w-5 h-5" strokeWidth={2} />,
      commitment: "3-month minimum",
      description: "Ongoing maintenance to ensure your website stays functional, your Google Business Profile stays active, and you don't lose enquiries to technical issues.",
      includes: [
        "Website maintenance and updates",
        "12 Google Business Profile posts per month",
        "Review monitoring and response guidance",
        "Monthly WhatsApp performance report"
      ],
      doesNotInclude: [
        "Paid advertising management",
        "Automation system updates"
      ],
      bestFor: "Small gyms focused on consistency and visibility rather than aggressive growth. You want to avoid missed opportunities without investing heavily in ads.",
      outcome: "Your digital presence stays functional. Fewer missed enquiries due to broken links, outdated information, or neglected profiles."
    },
    {
      name: "Scale",
      tagline: "Drive Growth",
      icon: <TrendingUp className="w-5 h-5" strokeWidth={2} />,
      commitment: "3-month minimum",
      description: "Active growth through Meta ads (Facebook and Instagram), automation updates, and weekly performance tracking. Built for gyms ready to invest in member acquisition.",
      includes: [
        "Everything in Maintain",
        "Meta ads management (Facebook + Instagram)",
        "WhatsApp automation updates as needed",
        "Weekly performance reports and insights",
        "A/B testing for ad creatives and messaging"
      ],
      doesNotInclude: [
        "Google Ads (different platform, different strategy)"
      ],
      note: "Requires a separate ad budget of ₹10,000–₹15,000 per month, paid directly to Meta.",
      bestFor: "Mid-size gyms (80–150 members) looking for consistent monthly growth through paid advertising and optimized follow-up.",
      outcome: "You gain a predictable system for generating enquiries. More people see your gym, more people contact you, and conversion rates improve through better follow-up."
    },
    {
      name: "Dominate",
      tagline: "Lead Your Market",
      icon: <Rocket className="w-5 h-5" strokeWidth={2} />,
      commitment: "3-month minimum",
      description: "Comprehensive growth execution. Advanced automation, daily content posting, retention tracking, and bi-weekly strategy calls. For premium gyms that want to own their local market.",
      includes: [
        "Everything in Scale",
        "Advanced WhatsApp follow-up sequences",
        "Daily Google Business Profile posts (30 per month)",
        "Member retention tracking and analysis",
        "Bi-weekly strategy calls for optimization",
        "Monthly creative refresh for ads and messaging"
      ],
      doesNotInclude: [
        "Video production or professional photography"
      ],
      note: "Requires a larger ad budget of ₹15,000–₹20,000 per month, paid directly to Meta.",
      bestFor: "Premium gyms with 150+ members who want to be the clear market leader. You're not just looking for more members—you're building a brand.",
      outcome: "You become the gym people talk about. More enquiries, better retention, and a reputation that makes selling easier."
    }
  ];

  const combinationPackages = [
    {
      name: "Starter Pack",
      structure: "Root + Maintain (3 Months)",
      description: "Basic online presence plus three months of visibility and consistency. Ideal for testing whether digital systems make a difference for your gym.",
      bestFor: "Small gyms (50–80 members) who want to go online without committing to a large upfront investment."
    },
    {
      name: "Growth Bundle",
      structure: "Branch + Scale (3 Months)",
      badge: "Most Popular",
      description: "Full professional website plus three months of growth execution through ads and automation. The most common starting point for serious gym owners.",
      note: "Requires ₹30,000–₹45,000 in ad budget over 3 months, paid directly to Meta.",
      bestFor: "Mid-size gyms (80–150 members) ready to invest in member acquisition and conversion systems."
    },
    {
      name: "Scale Fast",
      structure: "Grow + Scale (6 Months)",
      description: "Complete system setup with six months of execution. Enough time to properly dial in your messaging, optimize your follow-up, and see real impact.",
      note: "Requires ₹60,000–₹90,000 in ad budget over 6 months, paid directly to Meta.",
      bestFor: "Serious gyms ready to scale aggressively. You understand that real growth takes time and you're willing to commit to the process."
    },
    {
      name: "Annual Deal",
      structure: "Branch + Scale (12 Months)",
      badge: "Best Value",
      description: "One year of partnership. Website, ads, automation, and ongoing optimization. Locked pricing for the full year—no surprises, no sudden increases.",
      note: "Requires ₹1.2–₹1.8 lakh in ad budget over 12 months, paid directly to Meta.",
      bestFor: "Long-term, committed gym owners who want a reliable partner for the next year and beyond."
    }
  ];

  // ✅ [PERSONALIZATION] Smart WhatsApp message based on viewed/interested packages
  const whatsappMessage = useMemo(() => {
    if (interestedPackages.length > 0) {
      const pkgs = interestedPackages.slice(0, 2).join(' and ');
      return `Hi, I'm interested in the ${pkgs} package${interestedPackages.length > 1 ? 's' : ''} for my gym`;
    }
    
    if (viewedPackages.length >= 3) {
      return "Hi, I've reviewed your services. I'd like to discuss which package would be right for my gym";
    }

    if (userContext.hasVisitedProcess) {
      return "Hi, I've reviewed your services and process. I'd like to discuss pricing and next steps";
    }

    return "Hi, I'm interested in learning more about your services";
  }, [interestedPackages, viewedPackages.length, userContext.hasVisitedProcess]);

  // ✅ [PERSONALIZATION] Dynamic CTA based on engagement
  const ctaMessage = useMemo(() => {
    // Very high intent - clicked on packages + visited process
    if (interestedPackages.length >= 2 && userContext.hasVisitedProcess) {
      return {
        heading: "Ready to Get Started?",
        subheading: "You know what you need. Let's discuss implementation, timeline, and pricing for your gym.",
        cta: "Schedule a Call"
      };
    }

    // High intent - viewed multiple packages
    if (viewedPackages.length >= 4 || interestedPackages.length >= 1) {
      return {
        heading: "Ready to Fix What's Actually Broken?",
        subheading: "Let's talk about your gym. No sales pitch. No pressure. Just an honest conversation about what's working, what's not, and whether we're the right people to help.",
        cta: "Let's Talk"
      };
    }

    // Returning visitor researching
    if (userContext.isReturningUser && userContext.hasVisitedServicesBefore) {
      return {
        heading: "Still Exploring Options?",
        subheading: "We're happy to answer questions and help you understand which approach makes sense for your specific situation.",
        cta: "Ask a Question"
      };
    }

    // Default
    return {
      heading: "Ready to Fix What's Actually Broken?",
      subheading: "Let's talk about your gym. No sales pitch. No pressure. Just an honest conversation about what's working, what's not, and whether we're the right people to help.",
      cta: "Let's Talk"
    };
  }, [interestedPackages.length, viewedPackages.length, userContext]);

  // ✅ [PERFORMANCE] Memoized transform styles
  const orb1Transform = useMemo(() => {
    if (reducedMotion) return {};
    return {
      transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(${1 + scrollY * 0.0001})`,
      transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
    };
  }, [mousePosition.x, mousePosition.y, scrollY, reducedMotion]);

  const orb2Transform = useMemo(() => {
    if (reducedMotion) return {};
    return {
      transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    };
  }, [mousePosition.x, mousePosition.y, reducedMotion]);

  return (
    <>
      <SEO
        title="Gym Marketing Services & Packages - Custom Solutions"
        description="Transparent pricing and services for gym websites, enquiry systems, and growth marketing. From basic online presence to comprehensive market leadership."
        canonical="/gym/services"
        keywords="gym marketing packages, fitness center website pricing, gym digital marketing services, gym marketing agency"
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white antialiased overflow-x-hidden">

        {/* Advanced Background System */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute top-[-10%] left-[10%] w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[140px] will-change-transform"
            style={{
              background: 'radial-gradient(circle, #F1464A 0%, #d63942 50%, transparent 70%)',
              ...orb1Transform
            }}
          />
          <div
            className="absolute bottom-[-15%] right-[15%] w-[600px] h-[600px] rounded-full opacity-[0.10] blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #F1464A 0%, #8B2832 60%, transparent 75%)',
              ...orb2Transform
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

        {/* ✅ [PERSONALIZATION] WhatsApp with smart pre-filled message */}
        <a
          href={`https://wa.me/919219917186?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleContactInteraction}
          className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
            isWhatsAppVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
          }`}
        >
          <div className="group relative">
            <div className={`absolute -inset-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500 ${reducedMotion ? '' : 'animate-pulse'}`} />
            
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
                  <div className={`w-1.5 h-1.5 rounded-full bg-[#F1464A] ${reducedMotion ? '' : 'animate-pulse'}`} style={{ animationDuration: '2s' }} />
                  <div className={`absolute w-1.5 h-1.5 rounded-full bg-[#F1464A] opacity-60`} style={{ animation: reducedMotion ? 'none' : 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-white/85 tracking-wide uppercase relative z-10" style={{ letterSpacing: '0.08em' }}>
                  Services & Pricing
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
                  <span className="block text-white/95">What We Build</span>
                  <span className="block text-white/95 mt-1">and What It</span>
                  <span
                    className="block mt-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 50%, #F1464A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Actually Costs
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-tight">
                Transparent pricing. Clear deliverables. No hidden fees. No surprise charges. Just straightforward packages built for gyms at different stages of growth.
              </p>
            </div>
          </div>
        </section>

        {/* Foundation Offers Section */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-10 sm:mb-12">
              <h2
                className="text-[clamp(1.75rem,5vw,2.5rem)] font-black mb-4 leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
              >
                <span className="block text-white/95">Foundation</span>
                <span
                  className="block mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Packages
                </span>
              </h2>
              <p className="text-sm text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-tight">
                One-time builds. Designed to get you online or establish a professional presence. Choose based on where your gym is right now, not where you think you should be.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundationOffers.map((offer, index) => (
                <div
                  key={offer.name}
                  data-package={offer.name}
                  className="group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] hover:border-white/[0.12] transition-all duration-500 flex flex-col"
                >
                  {/* Package Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 mb-4">
                      <div className="text-[#F1464A]">
                        {offer.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white/95 mb-1 tracking-tight">
                      {offer.name}
                    </h3>
                    <p className="text-sm text-[#F1464A] font-semibold tracking-tight">
                      {offer.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/60 leading-relaxed font-light mb-6 tracking-tight">
                    {offer.description}
                  </p>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {offer.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#F1464A] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="text-sm text-white/70 leading-relaxed font-light">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What's Not Included */}
                  <div className="mb-6 pb-6 border-b border-white/[0.06]">
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
                      Does Not Include
                    </h4>
                    <ul className="space-y-2">
                      {offer.doesNotInclude.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/30 mx-auto my-1" />
                          </div>
                          <span className="text-sm text-white/50 leading-relaxed font-light">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Note (if exists) */}
                  {offer.note && (
                    <div className="mb-6 p-4 rounded-xl bg-[#F1464A]/5 border border-[#F1464A]/10">
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        <span className="font-semibold text-[#F1464A]">Note:</span> {offer.note}
                      </p>
                    </div>
                  )}

                  {/* Best For */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                      Best For
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      {offer.bestFor}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-[#F1464A]/80 uppercase tracking-wider mb-2">
                      Expected Outcome
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      {offer.outcome}
                    </p>
                  </div>


                  {/* Button wrapper for alignment */}
                  <div className="mt-auto">
                  {/* ✅ [PERSONALIZATION] CTA Button - Fixed height & selection state */}
                  <button
                    onClick={() => handlePackageInterest(offer.name)}
                    className={`w-full px-6 py-3 lg:min-h-[48px] rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      interestedPackages.includes(offer.name)
                        ? 'bg-[#F1464A] text-white border border-[#F1464A] shadow-lg shadow-[#F1464A]/30'
                        : 'bg-[#F1464A]/10 border border-[#F1464A]/20 text-[#F1464A] hover:bg-[#F1464A]/20 group-hover:border-[#F1464A]/40'
                    }`}
                  >
                    {interestedPackages.includes(offer.name) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                        <span>Selected</span>
                      </>
                    ) : (
                      'Interested in This'
                    )}
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ongoing Offers Section */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-10 sm:mb-12">
              <h2
                className="text-[clamp(1.75rem,5vw,2.5rem)] font-black mb-4 leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
              >
                <span className="block text-white/95">Ongoing</span>
                <span
                  className="block mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Partnerships
                </span>
              </h2>
              <p className="text-sm text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-tight">
                Monthly retainer-based work. For gyms that want ongoing maintenance, growth execution, or comprehensive market leadership. All require 3-month minimum commitments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingOffers.map((offer, index) => (
                <div
                  key={offer.name}
                  data-package={offer.name}
                  className="group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] hover:border-white/[0.12] transition-all duration-500 flex flex-col"
                >
                  {/* Commitment Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1.5 rounded-full bg-[#F1464A]/10 border border-[#F1464A]/20">
                      <span className="text-[10px] font-bold text-[#F1464A] uppercase tracking-wider">
                        {offer.commitment}
                      </span>
                    </div>
                  </div>

                  {/* Package Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 mb-4">
                      <div className="text-[#F1464A]">
                        {offer.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white/95 mb-1 tracking-tight">
                      {offer.name}
                    </h3>
                    <p className="text-sm text-[#F1464A] font-semibold tracking-tight">
                      {offer.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/60 leading-relaxed font-light mb-6 tracking-tight">
                    {offer.description}
                  </p>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {offer.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#F1464A] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="text-sm text-white/70 leading-relaxed font-light">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What's Not Included */}
                  <div className="mb-6 pb-6 border-b border-white/[0.06]">
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
                      Does Not Include
                    </h4>
                    <ul className="space-y-2">
                      {offer.doesNotInclude.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/30 mx-auto my-1" />
                          </div>
                          <span className="text-sm text-white/50 leading-relaxed font-light">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Note (if exists) */}
                  {offer.note && (
                    <div className="mb-6 p-4 rounded-xl bg-[#F1464A]/5 border border-[#F1464A]/10">
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        <span className="font-semibold text-[#F1464A]">Note:</span> {offer.note}
                      </p>
                    </div>
                  )}

                  {/* Best For */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                      Best For
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      {offer.bestFor}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-[#F1464A]/80 uppercase tracking-wider mb-2">
                      Expected Outcome
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      {offer.outcome}
                    </p>
                  </div>


                  {/* Button wrapper for alignment */}
                  <div className="mt-auto">
                  {/* ✅ [PERSONALIZATION] CTA Button - Fixed height & selection state */}
                  <button
                    onClick={() => handlePackageInterest(offer.name)}
                    className={`w-full px-6 py-3 lg:min-h-[48px] rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      interestedPackages.includes(offer.name)
                        ? 'bg-[#F1464A] text-white border border-[#F1464A] shadow-lg shadow-[#F1464A]/30'
                        : 'bg-[#F1464A]/10 border border-[#F1464A]/20 text-[#F1464A] hover:bg-[#F1464A]/20 group-hover:border-[#F1464A]/40'
                    }`}
                  >
                    {interestedPackages.includes(offer.name) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                        <span>Selected</span>
                      </>
                    ) : (
                      'Interested in This'
                    )}
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Combination Packages Section */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-10 sm:mb-12">
              <h2
                className="text-[clamp(1.75rem,5vw,2.5rem)] font-black mb-4 leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
              >
                <span className="block text-white/95">Popular</span>
                <span
                  className="block mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Combinations
                </span>
              </h2>
              <p className="text-sm text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-tight">
                Foundation + Ongoing bundled together. These are the most common pairings gym owners choose when they're ready to commit to serious growth.
              </p>
            </div>

            <div className="space-y-5">
              {combinationPackages.map((pkg, index) => (
                <div
                  key={pkg.name}
                  data-package={pkg.name}
                  className="group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] hover:border-white/[0.12] transition-all duration-500"
                >
                  

                  <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                    {/* Left: Package Info */}
                    <div>
                      <h3 className="text-xl font-black text-white/95 mb-2 tracking-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-[#F1464A] font-semibold mb-4">
                        {pkg.structure}
                      </p>
                      
                      {/* ✅ [PERSONALIZATION] CTA Button - Fixed height & selection state */}
                      <button
                        onClick={() => handlePackageInterest(pkg.name)}
                        className={`w-full px-6 py-3 lg:min-h-[48px] rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                          interestedPackages.includes(pkg.name)
                            ? 'bg-[#F1464A] text-white border border-[#F1464A] shadow-lg shadow-[#F1464A]/30'
                            : 'bg-[#F1464A]/10 border border-[#F1464A]/20 text-[#F1464A] hover:bg-[#F1464A]/20'
                        }`}
                      >
                        {interestedPackages.includes(pkg.name) ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                            <span>Selected</span>
                          </>
                        ) : (
                          'Discuss This'
                        )}
                      </button>
                    </div>

                    {/* Right: Details */}
                    <div className="space-y-4">
                      <p className="text-sm text-white/70 leading-relaxed font-light">
                        {pkg.description}
                      </p>

                      {pkg.note && (
                        <div className="p-4 rounded-xl bg-[#F1464A]/5 border border-[#F1464A]/10">
                          <p className="text-xs text-white/60 leading-relaxed font-light">
                            <span className="font-semibold text-[#F1464A]">Investment:</span> {pkg.note}
                          </p>
                        </div>
                      )}

                      <div>
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                          Best For
                        </h4>
                        <p className="text-sm text-white/70 leading-relaxed font-light">
                          {pkg.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Don't Do Section */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-10 sm:mb-12">
              <h2
                className="text-[clamp(1.75rem,5vw,2.5rem)] font-black mb-4 leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
              >
                <span className="block text-white/95">What We</span>
                <span
                  className="block mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Don't Do
                </span>
              </h2>
            </div>

            <div className="space-y-4">

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
                <h4 className="text-base font-bold text-white/95 mb-2 tracking-tight">
                  We Don't Use Templates
                </h4>
                <p className="text-sm text-white/55 leading-relaxed font-light tracking-tight">
                  Every website is custom-built. Not a template with your logo swapped in. Not stock photos from Unsplash. We build based on your gym, your location, and what you're trying to communicate.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
                <h4 className="text-base font-bold text-white/95 mb-2 tracking-tight">
                  We Don't Handle Everything
                </h4>
                <p className="text-sm text-white/55 leading-relaxed font-light tracking-tight">
                  We focus on websites, enquiry systems, ads, and automation. We don't do billboards, TV ads, or daily Instagram content. If it doesn't directly impact whether someone contacts you or converts, it's outside our scope.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
                <h4 className="text-base font-bold text-white/95 mb-2 tracking-tight">
                  We Don't Work With Everyone
                </h4>
                <p className="text-sm text-white/55 leading-relaxed font-light tracking-tight">
                  If you're looking for the cheapest possible option, we're not the right fit. If you want to argue over every design decision, we're probably incompatible. We work best with gym owners who value quality and understand it costs more than bargain-basement alternatives.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ✅ [PERSONALIZATION] Dynamic CTA based on engagement */}
        <section className="relative py-16 sm:py-20 px-5 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-4xl mx-auto text-center">

            <h2
              className="text-[clamp(1.75rem,5.5vw,3rem)] font-black mb-5 sm:mb-6 leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
            >
              <span className="block text-white/95">{ctaMessage.heading.split(' ').slice(0, -2).join(' ')}</span>
              <span className="block text-white/95 mt-1.5">{ctaMessage.heading.split(' ').slice(-2, -1).join(' ')}</span>
              <span
                className="block mt-2"
                style={{
                  background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {ctaMessage.heading.split(' ').slice(-1).join(' ')}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light tracking-tight">
              {ctaMessage.subheading}
            </p>

            <Link
              to="/gym/contact"
              onClick={handleContactInteraction}
              className="group relative overflow-hidden w-full sm:w-auto mb-8 inline-block"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A] to-[#FF5252] rounded-2xl opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-br from-[#F1464A] to-[#d63942] rounded-2xl text-base sm:text-lg font-bold flex items-center justify-center gap-3 transition-all group-hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#F1464A]/25">
                <span className="tracking-tight">{ctaMessage.cta}</span>
                <ArrowRight
                  className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-300"
                  strokeWidth={2.5}
                />
              </div>

              {!reducedMotion && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 rounded-2xl" />
              )}
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/35">
              {['Free 30-Min Call', 'No Pressure', 'Honest Advice'].map((item, i, arr) => (
                <div key={item} className="flex items-center gap-4 sm:gap-6">
                  <span className="tracking-tight font-medium">{item}</span>
                  {i < arr.length - 1 && <span className="hidden sm:block w-1 h-1 rounded-full bg-white/25" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Package Selection Modal with Smooth Animation */}
        {showPackageModal && interestedPackages.length > 0 && (
          <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
              modalAnimating ? 'bg-black/80' : 'bg-black/0'
            }`}
            style={{ backdropFilter: modalAnimating ? 'blur(8px)' : 'blur(0px)' }}
            onClick={closeModal}
          >
            <div 
              className={`relative max-w-md w-full p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.12] shadow-2xl transition-all duration-300 ${
                modalAnimating 
                  ? 'scale-100 opacity-100 translate-y-0' 
                  : 'scale-95 opacity-0 translate-y-4'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/70" strokeWidth={2} />
              </button>

              {/* Modal Content */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#F1464A]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-black text-white/95 tracking-tight">
                    Package{interestedPackages.length > 1 ? 's' : ''} Selected
                  </h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  You've selected <span className="font-bold text-[#F1464A]">{interestedPackages.join(', ')}</span>. Feel free to select more packages or contact us directly on WhatsApp.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={closeModal}
                  className="w-full py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] text-white/80 font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue Browsing</span>
                </button>
                
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white font-bold text-sm tracking-tight shadow-lg shadow-[#25D366]/30 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" strokeWidth={2.5} />
                  <span>Contact on WhatsApp</span>
                </button>
              </div>

              {/* Selected Packages Summary */}
              <div className="mt-5 pt-5 border-t border-white/[0.06]">
                <p className="text-xs text-white/40 text-center">
                  {interestedPackages.length} package{interestedPackages.length > 1 ? 's' : ''} selected for discussion
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="h-12" />

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

        .will-change-transform {
          will-change: transform;
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
