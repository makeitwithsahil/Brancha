import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowRight, MessageSquare, Heart, Lightbulb, Users, Target, CheckCircle2, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { 
  leadIntent, 
  session, 
  userPreferences,
  performanceTracking,
  journeyTracking 
} from '../../utils/storage';

export default function GymAbout() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);
  const [hasReturned, setHasReturned] = useState(false);

  // Check if user prefers reduced motion (accessibility)
  const reducedMotion = useMemo(() => {
    return userPreferences.get('reducedMotion', false);
  }, []);

  // Check if user came from other gym pages (journey continuity)
  const cameFromGymPages = useMemo(() => {
    const journey = journeyTracking.getJourney();
    return journey.some(entry => entry.url?.includes('/gym'));
  }, []);

  useEffect(() => {
    const startTime = performance.now();

    // Mark gym department interest
    leadIntent.markInterest('gym');

    // Check if returning user
    const isReturning = session.isReturningUser();
    setHasReturned(isReturning);

    // Track page load performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const endTime = performance.now();
        performanceTracking.track('Gym About', {
          loadTime: Math.round(endTime - startTime),
          hasReturned: isReturning,
          cameFromGym: cameFromGymPages
        });
      });
    }
  }, [cameFromGymPages]);

  // Optimize mouse and scroll handlers with passive listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Skip on reduced motion
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

    // Only add mouse tracking if not reduced motion
    if (!reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion]);

  // Track CTA click
  const handleCTAClick = useCallback(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        performanceTracking.track('Gym About CTA Click', {
          hasReturned,
          scrollDepth: Math.round((scrollY / document.body.scrollHeight) * 100)
        });
      });
    }
  }, [hasReturned, scrollY]);

  const principles = [
    {
      icon: <Users className="w-5 h-5" strokeWidth={2.5} />,
      title: "We Serve Gym Owners",
      description: "Not marketers. Not corporate decision-makers. People who wake up early, clean equipment, answer questions at midnight, and worry about whether this month's enquiries will convert. That's who we build for."
    },
    {
      icon: <Target className="w-5 h-5" strokeWidth={2.5} />,
      title: "We Fix Real Problems",
      description: "Missed WhatsApp messages. Forms that break silently. Trial bookings that never show up. These aren't edge cases—they're the daily friction that costs you members. We study them, fix them, prevent them."
    },
    {
      icon: <Clock className="w-5 h-5" strokeWidth={2.5} />,
      title: "We Respect Your Time",
      description: "You didn't start a gym to manage websites or troubleshoot lead tracking. You did it to help people get healthier. Our job is to handle the systems so you can focus on what you're actually good at."
    },
    {
      icon: <Lightbulb className="w-5 h-5" strokeWidth={2.5} />,
      title: "We Keep Learning",
      description: "Every gym is different. Every conversation teaches us something. We don't assume we know everything—we listen, observe, and build based on what actually happens in the real world, not what sounds good in a pitch deck."
    }
  ];

  return (
    <>
      <SEO
        title="About Us - Gym Marketing Specialists"
        description="We build custom websites and digital systems for gyms. No templates, no fluff—just tools that help you get more members and keep your gym full."
        canonical="/gym/about"
        keywords="gym marketing agency, fitness website design, gym lead generation, custom gym websites"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Brancha Gym Marketing",
          "description": "We build systems that help gyms stay full. Custom websites, enquiry systems, and follow-up automation for gym owners.",
          "url": "https://brancha.in/gym/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "Brancha",
            "url": "https://brancha.in",
            "description": "Digital marketing solutions for gyms and fitness businesses"
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white antialiased overflow-x-hidden">

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
          onClick={handleCTAClick}
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
                  About Us
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
                  <span className="block text-white/95">We Build Systems</span>
                  <span className="block text-white/95 mt-1">That Help Gyms</span>
                  <span
                    className="block mt-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 50%, #F1464A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Stay Full.
                  </span>
                </h1>

                <div className="hidden sm:flex items-center gap-3 mt-6 opacity-0 animate-slide-in-fade justify-center" style={{ animationDelay: '200ms' }}>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#F1464A]/60 to-transparent" />
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/35 font-semibold">Websites, Enquiry Systems, Follow-Up</span>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#F1464A]/60 to-transparent" />
                </div>
              </div>

              <div className="max-w-2xl mx-auto mb-10 opacity-0 animate-slide-in-fade" style={{ animationDelay: '300ms' }}>
                <p
                  className="text-base sm:text-lg leading-[1.6] text-white/70 mb-3 font-normal tracking-tight"
                  style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Most marketing agencies don't understand gyms. They show up with generic templates, stock photos, and strategies borrowed from industries that have nothing to do with memberships or retention.
                </p>
                <p
                  className="text-base sm:text-lg leading-[1.6] text-white/70 font-normal tracking-tight"
                  style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  <span className="text-white/95 font-semibold">We're different.</span> We only work with gyms. Every website we build, every form we design, every automation we set up is built specifically for the challenges gym owners face every day.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-12 sm:mb-16 opacity-0 animate-slide-in-fade" style={{ animationDelay: '400ms' }}>
              <h2
                className="text-[clamp(1.75rem,5.5vw,2.75rem)] font-black mb-4 leading-[1.05] tracking-[-0.02em]"
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
                  Stand For
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {principles.map((principle, index) => (
                <div
                  key={principle.title}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] hover:border-[#F1464A]/30 transition-all duration-500 opacity-0 animate-slide-in-fade"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#F1464A]/20 to-[#F1464A]/10 flex items-center justify-center text-[#F1464A] border border-[#F1464A]/20 group-hover:scale-110 transition-transform duration-300">
                      {principle.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white/95 mb-2 tracking-tight">
                        {principle.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed font-light tracking-tight">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* The Hard Truth */}
        <section className="relative py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12 opacity-0 animate-slide-in-fade" style={{ animationDelay: '900ms' }}>
              <h2
                className="text-[clamp(1.75rem,5.5vw,2.75rem)] font-black mb-4 leading-[1.05] tracking-[-0.02em]"
                style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
              >
                <span className="block text-white/95">The Hard</span>
                <span
                  className="block mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Truth
                </span>
              </h2>
              <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-tight">
                We don't believe in overselling or making promises we can't keep. Here's what you should know before working with us.
              </p>
            </div>

            <div className="space-y-6 opacity-0 animate-slide-in-fade" style={{ animationDelay: '1000ms' }}>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
                <h4 className="text-base font-bold text-white/95 mb-2 tracking-tight">
                  We Don't Use Templates
                </h4>
                <p className="text-sm text-white/55 leading-relaxed font-light tracking-tight">
                  Every gym we work with gets a custom-built website. Not a template with your logo swapped in. Not stock photos of people we found on Unsplash. We build from scratch based on your specific situation, location, and what you're trying to communicate.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
                <h4 className="text-base font-bold text-white/95 mb-2 tracking-tight">
                  We Don't Do Everything
                </h4>
                <p className="text-sm text-white/55 leading-relaxed font-light tracking-tight">
                  We don't do billboards. We don't do TV ads. We don't manage your Instagram content daily. We focus on the digital systems that directly impact whether someone contacts you and whether that contact turns into a member. Everything else is outside our scope.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
                <h4 className="text-base font-bold text-white/95 mb-2 tracking-tight">
                  We Don't Work With Everyone
                </h4>
                <p className="text-sm text-white/55 leading-relaxed font-light tracking-tight">
                  If you just want the cheapest possible website, we're not the right fit. If you want someone to argue with over every design decision, we're probably not compatible. We work best with gym owners who understand that quality costs more than bargain-basement options.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-16 sm:py-20 px-5 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-4xl mx-auto text-center">

            <h2
              className="text-[clamp(1.75rem,5.5vw,3rem)] font-black mb-5 sm:mb-6 leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
            >
              <span className="block text-white/95">Ready to Build</span>
              <span className="block text-white/95 mt-1.5">Something</span>
              <span
                className="block mt-2"
                style={{
                  background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Real?
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light tracking-tight">
              Let's talk about your gym. No sales pitch. No pressure. Just an honest conversation about what's working, what's not, and whether we're the right people to help.
            </p>

            <Link 
              to="/gym/contact" 
              onClick={handleCTAClick}
              className="group relative overflow-hidden w-full sm:w-auto mb-8 inline-block"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A] to-[#FF5252] rounded-2xl opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-br from-[#F1464A] to-[#d63942] rounded-2xl text-base sm:text-lg font-bold flex items-center justify-center gap-3 transition-all group-hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#F1464A]/25">
                <span className="tracking-tight">Let's Talk</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-300" strokeWidth={2.5} />
              </div>

              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 rounded-2xl" />
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
          
          @keyframes slide-down {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(300%);
              opacity: 0;
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
          
          .animate-slide-down {
            animation: slide-down 3s ease-in-out infinite;
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
