import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, CheckCircle2, Users, Zap, Globe, Clock, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { journeyTracking, userPreferences, session, storage, leadIntent } from '../../utils/storage';
import SEO from '../../components/SEO';

export default function GymPortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState({});

  // ✅ [PERSONALIZATION] Track portfolio viewing behavior
  const [viewedCapabilities, setViewedCapabilities] = useState(() => {
    return storage.get('gym_portfolio_viewed_capabilities', { temporary: true, consent: false }) || [];
  });

  // ✅ [PERSONALIZATION] User context from journey
  const userContext = useMemo(() => {
    const journey = journeyTracking.getJourney();
    const previousPage = journeyTracking.getPreviousPage();
    const hasVisitedServices = journeyTracking.hasVisited('Gym > Services');
    const hasVisitedBlog = journeyTracking.hasVisited('Gym > Blog');
    const hasVisitedContact = journeyTracking.hasVisited('Gym > Contact');
    const isReturningUser = session.isReturningUser();
    const hasVisitedPortfolioBefore = session.hasVisited('/gym/portfolio');
    
    return {
      journey,
      previousPage,
      hasVisitedServices,
      hasVisitedBlog,
      hasVisitedContact,
      isReturningUser,
      hasVisitedPortfolioBefore,
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
      setMousePosition({ x: 0, y: 0 }); // Static position
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

  // ✅ [PERSONALIZATION] Track capability views using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const capabilityTitle = entry.target.getAttribute('data-capability');
            if (capabilityTitle && !viewedCapabilities.includes(capabilityTitle)) {
              const updated = [...viewedCapabilities, capabilityTitle];
              setViewedCapabilities(updated);
              storage.set('gym_portfolio_viewed_capabilities', updated, { temporary: true, consent: false });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const capabilityElements = document.querySelectorAll('[data-capability]');
    capabilityElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [viewedCapabilities]);

  // ✅ [PERSONALIZATION] Mark lead intent when interacting with contact
  const handleContactInteraction = () => {
    leadIntent.markInterest('gym');
    storage.set('gym_portfolio_contact_intent', Date.now(), { temporary: true, consent: false });
  };

  const nextImage = (projectIndex, totalImages) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (projectIndex, totalImages) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const portfolioItems = [
    // {
    //   gymName: "IronCore Fitness",
    //   location: "Pune, Maharashtra",
    //   situation: "Small boutique gym with no website. Enquiries came through Instagram DMs and phone calls, both of which were inconsistent. Trial bookings happened verbally, and many people who expressed interest never showed up.",
    //   approach: "Built a single-page website with clear contact options. Set up WhatsApp Business with automated replies and trial confirmation messages. Created a simple tracking sheet to monitor who booked trials and who actually showed.",
    //   improved: "Trial show-up clarity improved significantly. The gym owner could now see exactly who committed to a trial and whether they showed. WhatsApp automation reduced missed messages and late-night replies.",
    //   tags: ["Website Build", "WhatsApp Setup", "Trial Tracking"],
    //   images: [
    //     "/techzon-cover.webp",
    //     "/bravish-cover.webp",
    //   ],
    //   liveUrl: "https://ironcorefitness.example.com"
    // },
  ];

  const capabilities = [
    {
      icon: <Globe className="w-5 h-5" strokeWidth={2} />,
      title: "Website Development",
      description: "Custom-built sites designed for gym environments. Not templates. Not stock photos. Built to communicate what makes each gym different."
    },
    {
      icon: <Zap className="w-5 h-5" strokeWidth={2} />,
      title: "Enquiry Flow Setup",
      description: "WhatsApp Business integration, contact form optimization, trial booking systems. Making it easier for people to reach you and for you to track them."
    },
    {
      icon: <Users className="w-5 h-5" strokeWidth={2} />,
      title: "Automation Implementation",
      description: "Trial reminders, follow-up sequences, basic lead tracking. Systems that reduce manual work without feeling robotic or impersonal."
    },
    {
      icon: <Clock className="w-5 h-5" strokeWidth={2} />,
      title: "Google Profile Management",
      description: "Profile optimization, regular posting schedules, review response guidance. Keeping your local presence active and accurate."
    }
  ];

  // ✅ [PERSONALIZATION] Dynamic CTA message based on user behavior
  const ctaMessage = useMemo(() => {
    // High-intent user (visited services + portfolio)
    if (userContext.hasVisitedServices && userContext.hasVisitedPortfolioBefore) {
      return {
        heading: "Ready to Discuss Your Gym?",
        subheading: "You've explored our work. Let's talk about how we can help your gym grow.",
        cta: "Start the Conversation"
      };
    }

    // Returning user
    if (userContext.isReturningUser) {
      return {
        heading: "Want to Know If We're the Right Fit?",
        subheading: "Let's talk about your gym. No pressure. No pitch. Just an honest conversation about what's working, what's not, and whether we can help.",
        cta: "Let's Talk"
      };
    }

    // First-time visitor
    return {
      heading: "Want to Know If We're the Right Fit?",
      subheading: "Let's talk about your gym. No pressure. No pitch. Just an honest conversation about what's working, what's not, and whether we can help.",
      cta: "Let's Talk"
    };
  }, [userContext.hasVisitedServices, userContext.hasVisitedPortfolioBefore, userContext.isReturningUser]);

  // ✅ [PERSONALIZATION] WhatsApp pre-filled message based on context
  const whatsappMessage = useMemo(() => {
    if (viewedCapabilities.length >= 2) {
      return `Hi, I'm interested in ${viewedCapabilities.slice(0, 2).join(' and ')} for my gym`;
    }
    
    if (userContext.hasVisitedServices) {
      return "Hi, I've reviewed your services and portfolio. I'd like to discuss my gym's needs";
    }

    return "Hi, I'm interested in learning more about your services";
  }, [viewedCapabilities, userContext.hasVisitedServices]);

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
        title="Gym Marketing Portfolio - Real Results"
        description="See how we've helped gyms improve their online presence, streamline enquiries, and attract more members through custom websites and smart automation."
        canonical="/gym/portfolio"
        keywords="gym marketing portfolio, fitness center website examples, gym digital marketing results, gym website case studies"
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white antialiased overflow-x-hidden">

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
          className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isWhatsAppVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
        >
          <div className="group relative">
            <div className={`absolute -inset-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500 ${reducedMotion ? '' : 'animate-pulse'}`} />

            <div className="relative w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-7 h-7 text-white" strokeWidth={2.5} fill="white" />
            </div>
          </div>
        </a>

        <section className="relative mt-20 pt-16 sm:pt-20 pb-12 sm:pb-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#F1464A]/8 to-[#F1464A]/5 border border-[#F1464A]/20 backdrop-blur-xl mb-8 fade-in relative group shadow-lg shadow-[#F1464A]/5">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A]/20 via-[#F1464A]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative flex items-center justify-center">
                  <div className={`w-1.5 h-1.5 rounded-full bg-[#F1464A] ${reducedMotion ? '' : 'animate-pulse'}`} style={{ animationDuration: '2s' }} />
                  <div className={`absolute w-1.5 h-1.5 rounded-full bg-[#F1464A] opacity-60 ${reducedMotion ? '' : ''}`} style={{ animation: reducedMotion ? 'none' : 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-white/85 tracking-wide uppercase relative z-10" style={{ letterSpacing: '0.08em' }}>
                  Portfolio
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
                  <span className="block text-white/95">Work We've</span>
                  <span className="block text-white/95 mt-1">Done for Gyms</span>
                  <span
                    className="block mt-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 50%, #F1464A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Like Yours
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-tight">
                These are real gyms with real challenges. No hypotheticals. No inflated numbers. Just direct examples of what we've built and what changed as a result.
              </p>
            </div>
          </div>
        </section>

        {portfolioItems.length === 0 ? (
          <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F1464A]/10 border border-[#F1464A]/20 mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#F1464A]" strokeWidth={2} />
                  </div>

                  <h3 className="text-2xl font-bold text-white/95 mb-4 tracking-tight">
                    Building Our Portfolio
                  </h3>

                  <p className="text-sm text-white/60 max-w-xl mx-auto leading-relaxed font-light mb-6">
                    We're currently working with our first set of gym clients. Results take time to materialize, and we don't publish incomplete work.
                  </p>

                  <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed font-medium">
                    Once we have case studies that accurately reflect the work and its outcomes, they'll be here. Until then, our process and capabilities speak for themselves.
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] hover:border-white/[0.12] transition-all duration-500"
                >
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A0A0A]">
                      {item.images && item.images.length > 0 && (
                        <>
                          <img
                            src={item.images[activeImageIndex[index] || 0]}
                            alt={`${item.gymName} - Image ${(activeImageIndex[index] || 0) + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {item.images.length > 1 && (
                            <div className="absolute inset-0 flex items-center justify-between p-4">
                              <button
                                onClick={() => prevImage(index, item.images.length)}
                                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                                aria-label="Previous image"
                              >
                                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                              </button>

                              <button
                                onClick={() => nextImage(index, item.images.length)}
                                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                                aria-label="Next image"
                              >
                                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                              </button>
                            </div>
                          )}

                          {item.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                              {item.images.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setActiveImageIndex(prev => ({ ...prev, [index]: i }))}
                                  className={`w-2 h-2 rounded-full transition-all ${i === (activeImageIndex[index] || 0)
                                      ? 'bg-white w-6'
                                      : 'bg-white/40 hover:bg-white/60'
                                    }`}
                                  aria-label={`Go to image ${i + 1}`}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white/95 mb-1 tracking-tight">
                              {item.gymName}
                            </h3>
                            <p className="text-sm text-white/40 font-light">
                              {item.location}
                            </p>
                          </div>

                          {item.liveUrl && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 text-[#F1464A] text-sm font-semibold hover:bg-[#F1464A]/20 transition-colors"
                            >
                              <span>View Live</span>
                              <ExternalLink className="w-4 h-4" strokeWidth={2} />
                            </a>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {item.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 rounded-full bg-[#F1464A]/10 border border-[#F1464A]/20 text-[#F1464A] text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                            The Situation
                          </h4>
                          <p className="text-sm text-white/70 leading-relaxed font-light">
                            {item.situation}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                            What We Built
                          </h4>
                          <p className="text-sm text-white/70 leading-relaxed font-light">
                            {item.approach}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                            What Improved
                          </h4>
                          <p className="text-sm text-white/70 leading-relaxed font-light">
                            {item.improved}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ✅ [PERSONALIZATION] Capabilities with view tracking */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 sm:mb-12 text-center">
              <h2
                className="text-[clamp(1.75rem,5.5vw,2.75rem)] font-black mb-4 leading-[1.05] tracking-[-0.02em]"
                style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
              >
                <span className="block text-white/95">What We</span>
                <span
                  className="block mt-1.5"
                  style={{
                    background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Actually Do
                </span>
              </h2>
              <p className="text-sm text-white/50 max-w-xl mx-auto leading-relaxed font-light tracking-tight">
                These are the specific things we build for gyms. Not every gym needs all of them. Some need only one. Some need a combination.
              </p>
            </div>

            {capabilities.map((capability, index) => (
              <div
                key={index}
                data-capability={capability.title}
                className="mb-5 p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 flex items-center justify-center">
                    <div className="text-[#F1464A]">
                      {capability.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white/95 mb-2 tracking-tight">
                      {capability.title}
                    </h4>
                    <p className="text-sm text-white/55 leading-relaxed font-light">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </section>

        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#F1464A]" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white/95 mb-2 tracking-tight">
                    What This Actually Means
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-sm text-white/60 leading-relaxed font-light">
                <p>
                  These gyms had different problems. We built different solutions. There's no one-size-fits-all system that works for everyone.
                </p>
                <p>
                  Some situations required full website rebuilds. Some needed better enquiry tracking. Some just needed someone to organize what was already there.
                </p>
                <p>
                  The common thread is that we don't start by selling a package—we start by understanding what's actually broken and whether we can fix it.
                </p>
                <p className="text-white/70 font-medium">
                  If your gym feels like one of these situations, we can probably help. If it doesn't, we'll tell you that too.
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
