import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, FileSearch, Pencil, Rocket, BarChart3, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { journeyTracking, userPreferences, session, storage, leadIntent } from '../../utils/storage';
import SEO from '../../components/SEO';

export default function GymProcess() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);

  // ✅ [PERSONALIZATION] Track which process stages user viewed
  const [viewedStages, setViewedStages] = useState(() => {
    return storage.get('gym_process_viewed_stages', { temporary: true, consent: false }) || [];
  });

  // ✅ [PERSONALIZATION] User context from journey
  const userContext = useMemo(() => {
    const journey = journeyTracking.getJourney();
    const hasVisitedServices = journeyTracking.hasVisited('Gym > Services');
    const hasVisitedPortfolio = journeyTracking.hasVisited('Gym > Portfolio');
    const hasVisitedContact = journeyTracking.hasVisited('Gym > Contact');
    const isReturningUser = session.isReturningUser();
    const hasVisitedProcessBefore = session.hasVisited('/gym/process');
    
    return {
      journey,
      hasVisitedServices,
      hasVisitedPortfolio,
      hasVisitedContact,
      isReturningUser,
      hasVisitedProcessBefore,
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

  // ✅ [PERSONALIZATION] Track stage views using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stageName = entry.target.getAttribute('data-stage');
            if (stageName && !viewedStages.includes(stageName)) {
              const updated = [...viewedStages, stageName];
              setViewedStages(updated);
              storage.set('gym_process_viewed_stages', updated, { temporary: true, consent: false });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const stageElements = document.querySelectorAll('[data-stage]');
    stageElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [viewedStages]);

  // ✅ [PERSONALIZATION] Mark lead intent
  const handleContactInteraction = () => {
    leadIntent.markInterest('gym');
    storage.set('gym_process_contact_intent', Date.now(), { temporary: true, consent: false });
  };

  const processStages = [
    {
      number: "01",
      name: "Conversation",
      icon: <MessageSquare className="w-6 h-6" strokeWidth={2} />,
      headline: "We Talk. You Explain. We Listen.",
      description: "No pitch deck. No templated questions. Just a real conversation about your gym—what's working, what's breaking, and what's keeping you up at night.",
      whatHappens: [
        "You tell us what's frustrating you about your current setup",
        "We ask questions to understand your actual situation",
        "We explain whether we're the right fit or not",
        "You decide if this makes sense for you"
      ],
      whyItMatters: "Most agencies start selling before they start listening. We need to understand your specific problem before we can solve it. If we're not the right fit, we'll tell you that too."
    },
    {
      number: "02",
      name: "Diagnosis",
      icon: <FileSearch className="w-6 h-6" strokeWidth={2} />,
      headline: "We Map What's Actually Broken.",
      description: "We don't assume your problem is the same as the last gym we worked with. We look at your specific setup and figure out where things are falling apart.",
      whatHappens: [
        "We review your current website or online presence",
        "We check how enquiries are being handled right now",
        "We identify what's working and what's quietly failing",
        "We document exactly where people are dropping off"
      ],
      whyItMatters: "You can't fix what you haven't identified. Most gyms don't realize how many enquiries they're losing until someone actually maps the process. We find the leaks before we try to plug them."
    },
    {
      number: "03",
      name: "Build",
      icon: <Pencil className="w-6 h-6" strokeWidth={2} />,
      headline: "We Create. You Review. We Refine.",
      description: "No templates. No stock photos. We build your website and enquiry system from scratch based on your gym, your members, and what you're actually trying to communicate.",
      whatHappens: [
        "We design and build a website specific to your gym",
        "We set up the enquiry flow so nothing gets missed",
        "We share progress with you regularly",
        "We adjust based on your feedback until it's right"
      ],
      whyItMatters: "Generic doesn't convert. People can tell when a website was built for 'gyms in general' instead of their local gym. We build for your specific situation, not a category."
    },
    {
      number: "04",
      name: "Launch",
      icon: <Rocket className="w-6 h-6" strokeWidth={2} />,
      headline: "We Go Live. Together.",
      description: "Launch isn't the end—it's the beginning. We don't just hand you the keys and disappear. We stay involved to make sure everything actually works in the real world.",
      whatHappens: [
        "We launch your website and enquiry systems",
        "We monitor everything closely in the first few days",
        "We fix anything that breaks immediately",
        "We make sure you know how to use everything"
      ],
      whyItMatters: "Things break. Forms fail. Messages get missed. The difference between us and everyone else is that we're still there when it happens. Launch is when the real work begins."
    },
    {
      number: "05",
      name: "Track",
      icon: <BarChart3 className="w-6 h-6" strokeWidth={2} />,
      headline: "We Measure What Actually Matters.",
      description: "We track the things that tell you whether this is working or not—enquiries, trial bookings, show-up rates. Not vanity metrics that sound impressive but mean nothing.",
      whatHappens: [
        "We set up tracking for enquiries and trial bookings",
        "We monitor what's converting and what's not",
        "We share clear reports on what's happening",
        "We identify patterns that weren't obvious before"
      ],
      whyItMatters: "You can't improve what you don't measure. Most gym owners have no idea how many enquiries they're getting, how many trials they're booking, or why people aren't showing up. We fix that."
    },
    {
      number: "06",
      name: "Adjust",
      icon: <RefreshCw className="w-6 h-6" strokeWidth={2} />,
      headline: "We Learn. We Adapt. We Improve.",
      description: "Nothing works perfectly on day one. We look at what's actually happening, figure out what's working and what's not, and make changes based on reality.",
      whatHappens: [
        "We review performance data regularly",
        "We identify what's breaking or underperforming",
        "We make adjustments based on real behavior",
        "We test changes and measure the impact"
      ],
      whyItMatters: "Launch is not the finish line. The first version is never the final version. We stick around to fix what's broken and improve what's working. That's how systems get better."
    }
  ];

  const principles = [
    {
      icon: <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />,
      title: "We Don't Rush",
      description: "Good work takes time. We'd rather do it right than do it fast. If something needs more time to be done properly, we take that time."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />,
      title: "We Don't Disappear",
      description: "When something breaks after launch, we're still there. When you have a question three weeks later, we answer it. We don't hand off and vanish."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />,
      title: "We Don't Overcomplicate",
      description: "Systems should make your life easier, not harder. If something feels complicated or confusing, we simplify it until it doesn't."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />,
      title: "We Don't Assume",
      description: "Every gym is different. We don't assume your problem is the same as the last one we solved. We ask, we listen, we learn."
    }
  ];

  // ✅ [PERSONALIZATION] WhatsApp pre-filled message based on viewed stages
  const whatsappMessage = useMemo(() => {
    if (viewedStages.length >= 3) {
      return "Hi, I've reviewed your process and I'm interested in discussing how it would work for my gym";
    }
    
    if (userContext.hasVisitedServices) {
      return "Hi, I've reviewed your services and process. I'd like to discuss next steps";
    }

    return "Hi, I'm interested in learning more about your services";
  }, [viewedStages.length, userContext.hasVisitedServices]);

  // ✅ [PERSONALIZATION] Dynamic CTA based on user journey
  const ctaMessage = useMemo(() => {
    // High-intent user (visited services + process)
    if (userContext.hasVisitedServices && userContext.hasVisitedProcessBefore) {
      return {
        heading: "Ready to Start?",
        subheading: "You understand how we work. Let's discuss whether we're the right fit for your gym.",
        cta: "Book a Call"
      };
    }

    // Returning user who's researching
    if (userContext.isReturningUser && userContext.visitCount >= 4) {
      return {
        heading: "Have Questions?",
        subheading: "You've explored our approach. Let's have a conversation about your specific situation.",
        cta: "Let's Talk"
      };
    }

    // Default
    return {
      heading: "Ready to Start the Conversation?",
      subheading: "First step is a call. No pressure, no pitch. Just a conversation about your gym and whether we're the right people to help.",
      cta: "Let's Talk"
    };
  }, [userContext]);

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
        title="Our Process - How We Work with Gyms"
        description="A transparent look at our 6-stage process for helping gyms build effective websites and enquiry systems. From conversation to ongoing optimization."
        canonical="/gym/process"
        keywords="gym marketing process, fitness center website process, gym digital marketing workflow, how we work with gyms"
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
                  Our Process
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
                  <span className="block text-white/95">How We</span>
                  <span className="block text-white/95 mt-1">Work with</span>
                  <span
                    className="block mt-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 50%, #F1464A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Gyms
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-tight">
                No shortcuts. No templates. No hand-off-and-disappear. This is exactly how we approach building and maintaining digital systems for gyms.
              </p>
            </div>
          </div>
        </section>

        {/* ✅ [PERSONALIZATION] Process Stages with view tracking */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
            {processStages.map((stage, index) => (
              <div
                key={stage.number}
                data-stage={stage.name}
                className="group relative"
              >
                <div className="grid lg:grid-cols-[120px_1fr] gap-6 lg:gap-8">
                  
                  {/* Stage Number & Icon */}
                  <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                    <div className="relative">
                      <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#F1464A]/20 to-[#F1464A]/5 leading-none">
                        {stage.number}
                      </div>
                    </div>
                    
                    <div className="lg:mt-4 w-12 h-12 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 flex items-center justify-center text-[#F1464A]">
                      {stage.icon}
                    </div>
                  </div>

                  {/* Stage Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white/95 mb-2 tracking-tight">
                        {stage.headline}
                      </h3>
                      <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
                        {stage.description}
                      </p>
                    </div>

                    {/* What Happens */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.06]">
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">
                        What Happens
                      </h4>
                      <ul className="space-y-3">
                        {stage.whatHappens.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#F1464A] mt-2" />
                            <span className="text-sm text-white/70 leading-relaxed font-light flex-1">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Why It Matters */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F1464A]/5 to-transparent border border-[#F1464A]/10">
                      <h4 className="text-xs font-bold text-[#F1464A]/80 uppercase tracking-wider mb-3">
                        Why It Matters
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed font-light">
                        {stage.whyItMatters}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connector Line (not on last item) */}
                {index < processStages.length - 1 && (
                  <div className="hidden lg:block absolute left-[60px] top-[120px] bottom-[-48px] w-[2px] bg-gradient-to-b from-[#F1464A]/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Principles Section */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 sm:mb-12 text-center">
              <h2
                className="text-[clamp(1.75rem,5.5vw,2.75rem)] font-black mb-4 leading-[1.05] tracking-[-0.02em]"
                style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
              >
                <span className="block text-white/95">Our Operating</span>
                <span
                  className="block mt-1.5"
                  style={{
                    background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Principles
                </span>
              </h2>
              <p className="text-sm text-white/50 max-w-xl mx-auto leading-relaxed font-light tracking-tight">
                These aren't marketing copy. They're commitments we hold ourselves to on every project.
              </p>
            </div>

            {principles.map((principle, index) => (
              <div
                key={index}
                className="mb-5 p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 flex items-center justify-center">
                    <div className="text-[#F1464A]">
                      {principle.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white/95 mb-2 tracking-tight">
                      {principle.title}
                    </h4>
                    <p className="text-sm text-white/55 leading-relaxed font-light">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* What This Actually Means Section */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#F1464A]" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white/95 mb-2 tracking-tight">
                    What This Actually Means
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-sm text-white/60 leading-relaxed font-light">
                <p>
                  This process isn't fast. It's not automated. It's not a formula we apply to every gym the same way.
                </p>
                <p>
                  It requires time from you—to answer questions, review what we build, give feedback, and stay involved. If you're looking for someone to handle everything without your input, we're not the right fit.
                </p>
                <p>
                  It also requires patience. Results don't show up overnight. Systems need time to work. Data needs time to accumulate. We're building something that lasts, not something that looks impressive on day one and falls apart by week three.
                </p>
                <p className="text-white/70 font-medium">
                  If that sounds like what you need, let's talk. If it doesn't, that's fine too—better to know now than waste each other's time.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ✅ [PERSONALIZATION] Dynamic CTA based on user journey */}
        <section className="relative py-16 sm:py-20 px-5 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-4xl mx-auto text-center">

            <h2
              className="text-[clamp(1.75rem,5.5vw,3rem)] font-black mb-5 sm:mb-6 leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
            >
              <span className="block text-white/95">{ctaMessage.heading.split(' ').slice(0, -1).join(' ')}</span>
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
              {['30-Minute Call', 'No Sales Pitch', 'Honest Assessment'].map((item, i, arr) => (
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
