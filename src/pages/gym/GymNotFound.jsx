import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Home, Dumbbell, ArrowRight, Search, TrendingUp, FileText, Mail } from 'lucide-react';
import { journeyTracking, userPreferences, session } from '../../utils/storage';

export default function GymNotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  // ✅ [PERSONALIZATION] Detect user context from journey
  const userContext = useMemo(() => {
    const journey = journeyTracking.getJourney();
    const previousPage = journeyTracking.getPreviousPage();
    const hasVisitedBlog = journeyTracking.hasVisited('Gym > Blog');
    const hasVisitedServices = journeyTracking.hasVisited('Gym > Services');
    const hasVisitedPortfolio = journeyTracking.hasVisited('Gym > Portfolio');
    const isReturningUser = session.isReturningUser();
    
    return {
      journey,
      previousPage,
      hasVisitedBlog,
      hasVisitedServices,
      hasVisitedPortfolio,
      isReturningUser,
      visitCount: journey.length
    };
  }, []);

  // ✅ [PERFORMANCE] Memoized reduced motion preference
  const reducedMotion = useMemo(() => 
    userPreferences.get('reducedMotion', false),
    []
  );

  // ✅ [PERFORMANCE] Conditional mouse tracking (disabled for reduced motion)
  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 30 - 15,
        y: (e.clientY / window.innerHeight) * 30 - 15
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  const handleClick = (e) => {
    if (reducedMotion) return; // Skip ripple animation

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  // ✅ [PERSONALIZATION] Intelligent quick links based on user journey
  const quickLinks = useMemo(() => {
    const baseLinks = [
      {
        name: 'Home',
        path: '/gym',
        icon: Home,
        description: 'Back to homepage',
        priority: 1
      },
      {
        name: 'Services',
        path: '/gym/services',
        icon: Dumbbell,
        description: 'Explore our offerings',
        priority: userContext.hasVisitedServices ? 3 : 2
      },
      {
        name: 'Portfolio',
        path: '/gym/portfolio',
        icon: TrendingUp,
        description: 'View success stories',
        priority: userContext.hasVisitedPortfolio ? 3 : 2
      }
    ];

    // ✅ [PERSONALIZATION] Add blog link if user has shown interest
    if (userContext.hasVisitedBlog) {
      baseLinks.push({
        name: 'Blog',
        path: '/gym/blog',
        icon: FileText,
        description: 'Continue reading',
        priority: 2
      });
    }

    // ✅ [PERSONALIZATION] Add contact if user is engaged (3+ pages visited)
    if (userContext.visitCount >= 3 && !userContext.hasVisitedBlog) {
      baseLinks.push({
        name: 'Contact',
        path: '/gym/contact',
        icon: Mail,
        description: 'Get in touch',
        priority: 2
      });
    }

    // Sort by priority and take top 3 (or 4 for highly engaged users)
    const maxLinks = userContext.visitCount >= 5 ? 4 : 3;
    return baseLinks
      .sort((a, b) => a.priority - b.priority)
      .slice(0, maxLinks);
  }, [userContext]);

  // ✅ [PERSONALIZATION] Dynamic error message based on user state
  const errorMessage = useMemo(() => {
    if (userContext.isReturningUser) {
      return {
        title: "Looks Like You're Off Track",
        description: "The page you're looking for doesn't exist or has been moved. Let's get you back on the right path."
      };
    }
    
    return {
      title: "Looks Like You're Off Track",
      description: "The page you're looking for doesn't exist or has been moved. Let's get you back on the right path to achieve your fitness goals."
    };
  }, [userContext.isReturningUser]);

  // ✅ [PERSONALIZATION] Smart CTA based on previous page
  const smartCTA = useMemo(() => {
    if (userContext.previousPage) {
      const pagePath = userContext.previousPage.url;
      
      // If came from blog, suggest going back to blog
      if (pagePath.includes('/blog') && !pagePath.includes('/blog/')) {
        return {
          path: '/gym/blog',
          icon: FileText,
          text: 'Back to Blog',
          secondary: true
        };
      }
      
      // If came from services, suggest services
      if (pagePath.includes('/services')) {
        return {
          path: '/gym/services',
          icon: Dumbbell,
          text: 'Back to Services',
          secondary: true
        };
      }
    }
    
    // Default: Home
    return {
      path: '/gym',
      icon: Home,
      text: 'Back to Home',
      secondary: false
    };
  }, [userContext.previousPage]);

  // ✅ [PERFORMANCE] Transform styles - conditional based on reduced motion
  const orb1Transform = reducedMotion 
    ? {} 
    : {
        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
      };

  const orb2Transform = reducedMotion 
    ? {} 
    : {
        transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
      };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white antialiased overflow-hidden">
      
      {/* Advanced Background System - Responsive */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Animated Gradient Orbs - Scaled for mobile */}
        <div
          className="absolute top-[10%] sm:top-[20%] left-[5%] sm:left-[10%] w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] rounded-full opacity-[0.12] sm:opacity-[0.15] blur-[80px] sm:blur-[120px] lg:blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #F1464A 0%, #d63942 50%, transparent 70%)',
            ...orb1Transform
          }}
        />
        <div
          className="absolute bottom-[10%] sm:bottom-[20%] right-[5%] sm:right-[15%] w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] rounded-full opacity-[0.1] sm:opacity-[0.12] blur-[80px] sm:blur-[100px] lg:blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #F1464A 0%, #8B2832 60%, transparent 75%)',
            ...orb2Transform
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

        {/* Subtle Grid Pattern - Responsive sizing */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Content - Responsive padding and spacing */}
      <div className="relative sm:mt-4 mt-20 md:mt-4 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl w-full text-center">
          
          {/* 404 Visual - Responsive sizing */}
          <div className="relative mb-8 sm:mb-10 lg:mb-12">
            {/* Glowing background for 404 - Scaled for mobile */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-[200px] sm:w-[250px] lg:w-[300px] h-[200px] sm:h-[250px] lg:h-[300px] rounded-full opacity-20 blur-[60px] sm:blur-[80px] lg:blur-[100px]"
                style={{
                  background: 'radial-gradient(circle, #F1464A 0%, transparent 70%)',
                }}
              />
            </div>
            
            {/* 404 Text - Fully responsive */}
            <div className="relative">
              <h1 
                className="text-[80px] xs:text-[100px] sm:text-[140px] md:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter"
                style={{
                  background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6E 50%, #F1464A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 60px rgba(241, 70, 74, 0.3)'
                }}
              >
                404
              </h1>
            </div>
          </div>

          {/* Error Message - Responsive text with personalization */}
          <div className="mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4 px-2">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {errorMessage.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              {errorMessage.description}
            </p>
          </div>

          {/* ✅ [PERSONALIZATION] Quick Links - Intelligent, contextual navigation */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group relative overflow-hidden"
                onClick={handleClick}
              >
                {/* Ripple effects */}
                {!reducedMotion && ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/20 animate-ripple pointer-events-none"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 0,
                      height: 0,
                    }}
                  />
                ))}

                {/* Card background - Responsive padding */}
                <div className="relative bg-[#1A1A1A] border border-[#2B2B2B] rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 group-hover:border-[#F1464A]/50 group-hover:shadow-lg group-hover:shadow-[#F1464A]/10">
                  
                  {/* Hover gradient overlay */}
                  <div 
                    className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(241, 70, 74, 0.05) 0%, rgba(241, 70, 74, 0.1) 100%)'
                    }}
                  />

                  {/* Content - Responsive spacing */}
                  <div className="relative z-10">
                    <div className="mb-3 sm:mb-4 inline-flex">
                      <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-[#F1464A]/10 to-[#F1464A]/5 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <link.icon className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#F1464A]" strokeWidth={2} />
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-[#F1464A] transition-colors duration-300">
                      {link.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                      {link.description}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-[#F1464A] font-semibold text-xs sm:text-sm">
                      <span>Visit</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ✅ [PERSONALIZATION] Smart CTA - Context-aware primary action */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4">
            <Link to={smartCTA.path} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#F1464A] to-[#d63942] text-white font-bold text-sm sm:text-base rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#F1464A]/30 hover:scale-105">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <smartCTA.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  {smartCTA.text}
                </span>
                
                {/* Animated shine effect */}
                {!reducedMotion && (
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                )}
              </button>
            </Link>

            <Link to="/gym/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-[#1A1A1A] border border-[#2B2B2B] text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-300 hover:border-[#F1464A]/50 hover:bg-[#2B2B2B] hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  Contact Support
                </span>
              </button>
            </Link>
          </div>

          {/* Bottom hint - Responsive text */}
          <p className="mt-8 sm:mt-10 lg:mt-12 text-xs sm:text-sm text-gray-500">
            Error Code: 404 • Page Not Found
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
        }

        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }

        /* Extra small screens */
        @media (min-width: 475px) {
          .xs\\:text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          .xs\\:text-[100px] {
            font-size: 100px;
          }
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
