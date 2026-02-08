import { useState, useEffect, useCallback, useMemo } from 'react';
import { Mail, CheckCircle2, Award, BookOpen, Lightbulb } from 'lucide-react';
import SEO from '../../components/SEO';
import { 
  formStorage, 
  leadIntent, 
  session, 
  userPreferences,
  performanceTracking 
} from '../../utils/storage';

export default function EducationLaunch() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasReturned, setHasReturned] = useState(false);

  // Check if user has already submitted from this device
  const previousSubmission = useMemo(() => {
    return formStorage.load('education_waitlist');
  }, []);

  // Check if user prefers reduced motion (accessibility)
  const reducedMotion = useMemo(() => {
    return userPreferences.get('reducedMotion', false);
  }, []);

  // Initialize: restore form state and mark department interest
  useEffect(() => {
    const startTime = performance.now();

    // Mark user interest in education department
    leadIntent.markInterest('education');

    // Check if returning user
    const isReturning = session.isReturningUser();
    setHasReturned(isReturning);

    // Restore email if previously entered (but not submitted)
    if (!previousSubmission) {
      const savedEmail = formStorage.load('education_email_draft');
      if (savedEmail?.email) {
        setEmail(savedEmail.email);
      }
    } else {
      // User already submitted - show success state
      setIsSubmitted(true);
      setEmail(previousSubmission.email || '');
    }

    // Track page load performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const endTime = performance.now();
        performanceTracking.track('Education Launch', {
          loadTime: Math.round(endTime - startTime),
          hasReturned: isReturning,
          previousSubmission: !!previousSubmission
        });
      });
    }
  }, [previousSubmission]);

  // Auto-save email draft as user types (debounced via onChange)
  const handleEmailChange = useCallback((e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Save draft only if not already submitted
    if (!isSubmitted && newEmail.length > 3) {
      // Use setTimeout to debounce (will be cleared on next keystroke)
      const timer = setTimeout(() => {
        formStorage.save('education_email_draft', { email: newEmail });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (email) {
      // Save submission to prevent duplicate submissions
      formStorage.save('education_waitlist', {
        email,
        timestamp: Date.now(),
        department: 'education'
      });

      // Mark as submitted
      setIsSubmitted(true);

      // Clear draft
      formStorage.clear('education_email_draft');

      // Track conversion
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          performanceTracking.track('Education Waitlist Signup', {
            email_length: email.length,
            was_returning: hasReturned
          });
        });
      }

      // Auto-clear after 5 seconds (but keep in storage)
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 5000);
    }
  }, [email, hasReturned]);

  // Animation classes based on reduced motion preference
  const animationClass = useCallback((baseClass) => {
    return reducedMotion ? '' : baseClass;
  }, [reducedMotion]);

  return (
    <>
      <SEO
        title="Education Marketing Solutions - Launching Soon"
        description="Brancha's specialized education marketing is launching soon. Join the waitlist to be notified when we launch comprehensive marketing solutions for educational institutions."
        canonical="/education"
        keywords="education marketing, school marketing, university marketing, student enrollment, education branding"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Brancha Education - Launching Soon",
          "description": "Building knowledge, skills, and future leaders through specialized education marketing.",
          "url": "https://brancha.in/education",
          "publisher": {
            "@type": "Organization",
            "name": "Brancha",
            "url": "https://brancha.in"
          }
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Open+Sans:wght@300;400;600;700&display=swap');
        
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
        
        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 80px;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }
        
        .animate-fade-in-up-5 {
          animation: fadeInUp 0.8s ease-out 1s both;
        }
        
        .animate-slide-left {
          animation: slideFromLeft 0.8s ease-out 0.5s both;
        }
        
        .animate-slide-right {
          animation: slideFromRight 0.8s ease-out 0.5s both;
        }
        
        .animate-expand {
          animation: expandWidth 0.8s ease-out 0.3s both;
        }
        
        .animate-scale {
          animation: scaleIn 0.6s ease-out 0.2s both;
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up-1,
          .animate-fade-in-up-2,
          .animate-fade-in-up-3,
          .animate-fade-in-up-4,
          .animate-fade-in-up-5,
          .animate-slide-left,
          .animate-slide-right,
          .animate-expand,
          .animate-scale {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
        
        .education-button {
          position: relative;
          overflow: hidden;
        }
        
        .education-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .education-button:hover::after {
          left: 100%;
        }
        
        .laurel-left {
          position: absolute;
          left: -40px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.08;
        }
        
        .laurel-right {
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%) scaleX(-1);
          opacity: 0.08;
        }
        
        .academic-border {
          position: relative;
          padding: 2rem;
        }
        
        .academic-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid #1F3C88;
          opacity: 0.15;
          pointer-events: none;
        }
        
        .academic-border::after {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          bottom: 8px;
          border: 1px solid #1F3C88;
          opacity: 0.1;
          pointer-events: none;
        }
        
        .serif-number {
          font-family: 'Merriweather', serif;
          font-weight: 900;
          font-feature-settings: 'lnum' 1;
        }
      `}</style>

      <main className="relative mt-4 min-h-screen bg-[#E4E7EC] overflow-hidden">
        {/* Subtle Academic Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #1F3C88 0px, #1F3C88 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(90deg, #1F3C88 0px, #1F3C88 1px, transparent 1px, transparent 40px)
            `,
          }}
        />

        {/* Decorative Academic Corners */}
        <div className="absolute top-8 left-8 w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#1F3C88]/20" />
          <div className="absolute top-0 left-0 w-[2px] h-full bg-[#1F3C88]/20" />
          <div className="absolute top-0 left-0 w-3 h-3 border-2 border-[#4CAF50]/40 rotate-45" />
        </div>
        <div className="absolute bottom-8 right-8 w-20 h-20">
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#1F3C88]/20" />
          <div className="absolute bottom-0 right-0 w-[2px] h-full bg-[#1F3C88]/20" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-[#F1464A]/40 rotate-45" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-8 py-24">
          <div className="w-full max-w-[800px]">
            
            {/* Header Section with Academic Crest Style */}
            <div className="text-center mb-16 relative">
              
              {/* Academic Shield/Crest */}
              <div className={`flex justify-center mb-10 ${animationClass('animate-scale')}`}>
                <div className="relative">
                  <svg width="80" height="90" viewBox="0 0 80 90" className="text-[#1F3C88]">
                    <path 
                      d="M40 5 L75 20 L75 45 Q75 65 40 85 Q5 65 5 45 L5 20 Z" 
                      fill="white" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      opacity="0.9"
                    />
                    <path 
                      d="M40 15 L65 25 L65 45 Q65 60 40 75 Q15 60 15 45 L15 25 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                      opacity="0.4"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-2">
                    <BookOpen className="w-7 h-7 text-[#1F3C88]" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Status with Academic Styling */}
              <div className={`flex items-center justify-center gap-3 mb-8 ${animationClass('animate-fade-in-up-1')}`}>
                <div className={`h-[1px] w-16 bg-[#1F3C88]/30 ${animationClass('animate-expand')}`} />
                <span 
                  className="text-[11px] font-semibold tracking-[3px] uppercase text-[#1F3C88]/70"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Launching Soon
                </span>
                <div className={`h-[1px] w-16 bg-[#1F3C88]/30 ${animationClass('animate-expand')}`} />
              </div>

              {/* Main Title with Scholarly Typography */}
              <div className={`mb-8 ${animationClass('animate-fade-in-up-2')}`}>
                <h1 
                  className="text-[56px] sm:text-[72px] lg:text-[84px] leading-[0.95] font-black text-[#1F3C88] mb-4"
                  style={{ 
                    fontFamily: "'Merriweather', serif",
                    letterSpacing: '-0.02em'
                  }}
                >
                  BRANCHA
                </h1>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="h-[2px] w-12 bg-[#4CAF50]/50" />
                  <h2 
                    className="text-[20px] sm:text-[24px] font-light tracking-[0.08em] text-[#1F3C88]/70"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    FOR
                  </h2>
                  <div className="h-[2px] w-12 bg-[#4CAF50]/50" />
                </div>
                <h2 
                  className="text-[28px] sm:text-[36px] font-light tracking-[0.15em] text-[#1F3C88]/90"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  EDUCATION
                </h2>
              </div>

              {/* Latin Motto Style Tagline */}
              <div className={`mb-6 ${animationClass('animate-fade-in-up-3')}`}>
                <p 
                  className="text-[15px] sm:text-[17px] font-normal leading-[1.8] text-[#1F3C88] max-w-[600px] mx-auto tracking-[0.02em] italic"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  "Building knowledge, skills, and future leaders."
                </p>
              </div>

              {/* Academic Seal Elements */}
              <div className={`flex items-center justify-center gap-6 mb-12 ${animationClass('animate-fade-in-up-3')}`}>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#4CAF50]/60" strokeWidth={2} />
                  <span 
                    className="text-[10px] font-semibold tracking-[2px] uppercase text-[#1F3C88]/60"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Excellence
                  </span>
                </div>
                <div className="w-1 h-1 bg-[#1F3C88]/30 rotate-45" />
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#F1464A]/60" strokeWidth={2} />
                  <span 
                    className="text-[10px] font-semibold tracking-[2px] uppercase text-[#1F3C88]/60"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Innovation
                  </span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className={`max-w-[560px] mx-auto mb-16 ${animationClass('animate-fade-in-up-4')}`}>
              <div className="bg-white p-8 shadow-[0_2px_24px_rgba(31,60,136,0.08)]" style={{ borderRadius: '4px' }}>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                      <label 
                        className="block text-[12px] font-semibold tracking-[1.5px] uppercase text-[#1F3C88]/70 mb-3"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                      >
                        Be Notified at Launch
                      </label>
                      <div className="relative">
                        <Mail 
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors duration-300"
                          style={{ color: isFocused ? '#1F3C88' : 'rgba(31, 60, 136, 0.4)' }}
                          strokeWidth={2}
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          placeholder="Your email address"
                          required
                          className="w-full h-[56px] pl-14 pr-4 bg-[#E4E7EC]/30 border-2 border-[#1F3C88]/15 text-[#1F3C88] text-[15px] font-normal tracking-[0.01em] placeholder:text-[#1F3C88]/40 transition-all duration-300 focus:outline-none focus:border-[#1F3C88] focus:bg-white hover:border-[#1F3C88]/30"
                          style={{ 
                            fontFamily: "'Open Sans', sans-serif",
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="education-button w-full h-[56px] flex items-center justify-center gap-2 bg-[#1F3C88] text-white text-[14px] font-bold tracking-[1.5px] uppercase transition-all duration-300 hover:bg-[#152d6b] hover:shadow-[0_8px_24px_rgba(31,60,136,0.25)] active:scale-[0.99]"
                      style={{ 
                        fontFamily: "'Open Sans', sans-serif",
                        borderRadius: '4px'
                      }}
                    >
                      <span>Notify Me</span>
                    </button>
                  </form>
                ) : (
                  <div 
                    className="flex items-center justify-center gap-3 h-[56px] bg-[#4CAF50]/10 border-2 border-[#4CAF50]/30 px-6"
                    style={{ 
                      animation: reducedMotion ? 'none' : 'scaleIn 0.4s ease-out',
                      borderRadius: '4px'
                    }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-[#4CAF50]" strokeWidth={2.5} />
                    <span 
                      className="text-[15px] font-semibold text-[#1F3C88] tracking-[0.02em]"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      You'll be notified at launch
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Section */}
            <div className={`text-center ${animationClass('animate-fade-in-up-5')}`}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="text-center">
                  <div 
                    className="serif-number text-[32px] font-black text-[#1F3C88] leading-none"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    2026
                  </div>
                  <div 
                    className="text-[10px] font-semibold tracking-[2px] uppercase text-[#1F3C88]/60 mt-1"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Expected Launch
                  </div>
                </div>
              </div>

              {/* Academic Footer */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-[#1F3C88]/20" />
                <span 
                  className="text-[9px] font-medium tracking-[2.5px] uppercase text-[#1F3C88]/50"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Excellence in Education
                </span>
                <div className="h-[1px] w-8 bg-[#1F3C88]/20" />
              </div>
            </div>

          </div>
        </div>

        {/* Subtle Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1F3C88]/20 to-transparent" />
      </main>
    </>
  );
}
