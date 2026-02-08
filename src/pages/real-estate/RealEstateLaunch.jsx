import { useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { 
  formStorage, 
  leadIntent, 
  session, 
  userPreferences,
  storage
} from '../../utils/storage';
import SEO from '../../components/SEO';

export default function RealEstateLaunch() {
  // Performance: Check returning user status once at mount
  const isReturningUser = useMemo(() => session.isReturningUser(), []);
  const hasVisitedBefore = useMemo(() => session.hasVisited('/real-estate'), []);
  const reducedMotion = useMemo(() => userPreferences.get('reducedMotion', false), []);
  
  // Storage: Restore email from previous session if available
  const [email, setEmail] = useState(() => {
    const savedDraft = formStorage.load('real_estate_notify');
    return savedDraft?.email || '';
  });
  
  const [isSubmitted, setIsSubmitted] = useState(() => {
    // Check if user already submitted in this session
    return storage.get('real_estate_notified', { temporary: true }) === true;
  });
  
  const [isFocused, setIsFocused] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  // Personalization: Show subtle welcome back message for returning users
  useEffect(() => {
    if (isReturningUser && hasVisitedBefore && !isSubmitted) {
      // Delay to avoid overwhelming first paint
      const timer = setTimeout(() => {
        setShowWelcomeBack(true);
        // Auto-hide after 4 seconds
        const hideTimer = setTimeout(() => setShowWelcomeBack(false), 4000);
        return () => clearTimeout(hideTimer);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isReturningUser, hasVisitedBefore, isSubmitted]);

  // Storage: Auto-save email draft as user types (debounced)
  useEffect(() => {
    if (email && !isSubmitted) {
      const saveTimer = setTimeout(() => {
        formStorage.save('real_estate_notify', { email, timestamp: Date.now() });
      }, 500);
      return () => clearTimeout(saveTimer);
    }
  }, [email, isSubmitted]);

  // Storage: Track interest in real estate vertical
  useEffect(() => {
    leadIntent.markInterest('real-estate');
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (email) {
      // Mark as submitted
      setIsSubmitted(true);
      
      // Storage: Persist submission state for this session
      storage.set('real_estate_notified', true, { temporary: true });
      
      // Storage: Save email to lead list (permanent)
      const leadList = storage.get('real_estate_leads') || [];
      if (!leadList.includes(email)) {
        leadList.push(email);
        storage.set('real_estate_leads', leadList);
      }
      
      // Clear form draft
      formStorage.clear('real_estate_notify');
      
      // Performance: Clear form after animation completes
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  }, [email]);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // Performance: Memoize animation class names based on motion preference
  const animationClasses = useMemo(() => {
    if (reducedMotion) {
      return {
        fadeInUp1: '',
        fadeInUp2: '',
        fadeInUp3: '',
        fadeInUp4: '',
        fadeIn1: '',
        fadeIn2: '',
        fadeIn3: '',
        fadeIn4: '',
        slideLine: '',
        rotateDiamond: ''
      };
    }
    return {
      fadeInUp1: 'animate-fade-in-up-1',
      fadeInUp2: 'animate-fade-in-up-2',
      fadeInUp3: 'animate-fade-in-up-3',
      fadeInUp4: 'animate-fade-in-up-4',
      fadeIn1: 'animate-fade-in-1',
      fadeIn2: 'animate-fade-in-2',
      fadeIn3: 'animate-fade-in-3',
      fadeIn4: 'animate-fade-in-4',
      slideLine: 'animate-slide-line',
      rotateDiamond: 'animate-rotate-diamond'
    };
  }, [reducedMotion]);

  // Performance: Skip expensive font preload if returning user (fonts likely cached)
  const shouldPreloadFonts = useMemo(() => !isReturningUser, [isReturningUser]);

  return (
    <>
      <SEO
        title="Real Estate Division"
        description="A new standard in property, investment, and spaces. Brancha Real Estate launching in 2026 - be the first to know."
        canonical="/real-estate"
        keywords="real estate marketing, property marketing, real estate branding, investment properties"
      />

      <style>{`
        ${shouldPreloadFonts ? "@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200;300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');" : ''}
        
        ${!reducedMotion ? `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        
        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(45deg) scale(0);
          }
          to {
            opacity: 1;
            transform: rotate(45deg) scale(1);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up-1 {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-up-2 {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }
        
        .animate-fade-in-up-3 {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }
        
        .animate-fade-in-up-4 {
          animation: fadeInUp 0.8s ease-out 1s both;
        }
        
        .animate-fade-in-1 {
          animation: fadeIn 0.6s ease-out 0.2s both;
        }
        
        .animate-fade-in-2 {
          animation: fadeIn 0.6s ease-out 0.4s both;
        }
        
        .animate-fade-in-3 {
          animation: fadeIn 0.6s ease-out 0.6s both;
        }
        
        .animate-fade-in-4 {
          animation: fadeIn 0.6s ease-out 1.2s both;
        }
        
        .animate-slide-line {
          animation: slideIn 0.8s ease-out 0.4s both;
        }
        
        .animate-rotate-diamond {
          animation: rotateIn 0.8s ease-out 1s both;
        }
        
        .animate-slide-down {
          animation: slideDown 0.4s ease-out both;
        }
        ` : ''}
        
        .notify-button {
          position: relative;
          overflow: hidden;
        }
        
        .notify-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201, 162, 77, 0.2), transparent);
          transition: left 0.6s ease;
        }
        
        .notify-button:hover::before {
          left: 100%;
        }
        
        .notify-button .arrow-icon {
          transition: transform 0.3s ease;
        }
        
        .notify-button:hover .arrow-icon {
          transform: translateX(4px);
        }
        
        .email-input-wrapper {
          position: relative;
        }
        
        .email-input-wrapper::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #C9A24D, transparent);
          transition: width 0.4s ease;
        }
        
        .email-input-wrapper:focus-within::after {
          width: 100%;
        }

        .welcome-message {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .welcome-message.fade-out {
          opacity: 0;
          transform: translateY(-5px);
        }
      `}</style>

      <main className="relative min-h-screen bg-[#1C1F26] overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div 
          className={`absolute inset-0 pointer-events-none ${animationClasses.fadeIn1}`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 162, 77, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 162, 77, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Geometric Corner Accents */}
        <div 
          className={`absolute top-0 left-0 w-[300px] h-[300px] border border-[#C9A24D]/15 -translate-x-1/2 -translate-y-1/2 rounded-br-full pointer-events-none transition-all duration-500 hover:border-[#C9A24D]/25 ${animationClasses.fadeIn2}`}
        />
        <div 
          className={`absolute bottom-0 right-0 w-[300px] h-[300px] border border-[#C9A24D]/15 translate-x-1/2 translate-y-1/2 rounded-tl-full pointer-events-none transition-all duration-500 hover:border-[#C9A24D]/25 ${animationClasses.fadeIn3}`}
        />

        {/* Personalization: Welcome Back Message - Subtle, Professional */}
        {showWelcomeBack && (
          <div 
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-20 welcome-message ${!reducedMotion ? 'animate-slide-down' : ''}`}
          >
            <div className="bg-[#2E3440]/90 backdrop-blur-sm border border-[#C9A24D]/30 px-6 py-3 rounded-sm">
              <p 
                className="text-[13px] font-light text-white/80 tracking-[0.02em]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Welcome back to Real Estate
              </p>
            </div>
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-8 py-32">
          <div className="w-full max-w-[800px] text-center">
            
            {/* Status Badge */}
            <div className={`flex items-center justify-center gap-4 mb-12 sm:mb-16 ${animationClasses.fadeInUp1}`}>
              <div className={`w-8 h-px bg-[#C9A24D] ${animationClasses.slideLine}`} />
              <span 
                className="text-[11px] font-medium tracking-[2.5px] uppercase text-[#C9A24D]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Launching Soon
              </span>
              <div className={`w-8 h-px bg-[#C9A24D] ${animationClasses.slideLine}`} />
            </div>

            {/* Main Heading */}
            <div className={`mb-8 sm:mb-10 ${animationClasses.fadeInUp2}`}>
              <h1 
                className="text-[56px] sm:text-[72px] lg:text-[88px] leading-[1.2] font-light tracking-tight text-white transition-all duration-500 hover:tracking-[-0.02em]"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                <span className="block font-medium">Brancha</span>
                <span className="block text-[16px] sm:text-[20px] font-light tracking-[0.3em] text-[#C9A24D]/70 my-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  FOR
                </span>
                <span className="block font-extralight tracking-[0.05em] text-white/85">
                  Real Estate
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p 
              className={`text-base sm:text-lg lg:text-[19px] font-light leading-[1.7] text-white/65 max-w-[520px] mx-auto mb-14 sm:mb-16 tracking-[0.01em] ${animationClasses.fadeInUp3}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A new standard in property, investment, and spaces.
            </p>

            {/* Architectural Divider */}
            <div className={`flex items-center justify-center gap-3 mb-14 sm:mb-16 max-w-[400px] mx-auto ${animationClasses.fadeInUp3}`}>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A24D]/30" />
              <div className={`w-1.5 h-1.5 bg-[#C9A24D] rotate-45 ${animationClasses.rotateDiamond}`} />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A24D]/30" />
            </div>

            {/* Notify Form */}
            <div className={`max-w-[500px] mx-auto mb-12 sm:mb-14 ${animationClasses.fadeInUp4}`}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="email-input-wrapper relative flex-1">
                    <Mail 
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none transition-all duration-300"
                      style={{ color: isFocused ? 'rgba(201, 162, 77, 0.7)' : 'rgba(255, 255, 255, 0.3)' }}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Enter your email"
                      required
                      className="w-full h-[58px] pl-[52px] pr-5 bg-[#2E3440]/50 border border-[#C9A24D]/20 text-white text-[15px] font-light tracking-[0.01em] placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-[#C9A24D]/60 focus:bg-[#2E3440]/70 hover:bg-[#2E3440]/60"
                      style={{ 
                        fontFamily: "'Inter', sans-serif",
                        borderRadius: '2px'
                      }}
                      autoComplete="email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="notify-button h-[58px] px-8 flex items-center justify-center gap-2.5 bg-transparent border border-[#C9A24D] text-[#C9A24D] text-[14px] font-medium tracking-[1px] uppercase transition-all duration-400 hover:bg-[#C9A24D] hover:text-[#1C1F26] hover:shadow-[0_0_20px_rgba(201,162,77,0.3)] whitespace-nowrap active:scale-95"
                    style={{ 
                      fontFamily: "'Inter', sans-serif",
                      borderRadius: '2px'
                    }}
                    aria-label="Subscribe to real estate launch notifications"
                  >
                    <span>Notify Me</span>
                    <ArrowRight className="arrow-icon w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-3 h-[58px] bg-[#C9A24D]/10 border border-[#C9A24D]/30 px-6" style={{ borderRadius: '2px' }}>
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C9A24D] text-[#1C1F26] text-sm font-semibold" aria-hidden="true">
                    ✓
                  </div>
                  <span 
                    className="text-[15px] font-light text-white/90 tracking-[0.01em]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    role="status"
                    aria-live="polite"
                  >
                    You'll be notified at launch
                  </span>
                </div>
              )}
            </div>

            {/* Launch Year Indicator */}
            <div className={`flex items-center justify-center gap-3 ${animationClasses.fadeIn4}`}>
              <span 
                className="text-[13px] font-light tracking-[0.5px] text-white/40 transition-all duration-300 hover:text-white/60"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Expected
              </span>
              <span 
                className="text-[15px] font-medium tracking-[1px] text-[#C9A24D] transition-all duration-300 hover:tracking-[1.5px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                2026
              </span>
            </div>

          </div>
        </div>

        {/* Subtle Bottom Accent Line */}
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24D]/20 to-transparent ${animationClasses.fadeIn4}`} />
      </main>
    </>
  );
}
