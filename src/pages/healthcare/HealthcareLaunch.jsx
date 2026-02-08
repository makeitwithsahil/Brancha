import { useState, useEffect, useCallback, useMemo } from 'react';
import { Heart, Mail, CheckCircle2 } from 'lucide-react';
import SEO from '../../components/SEO';
import { 
  storage, 
  formStorage, 
  session, 
  leadIntent, 
  userPreferences,
  performanceTracking,
  journeyTracking
} from '../../utils/storage';
import { websiteSchema, organizationSchema } from '../../utils/schemas';

export default function HealthcareLaunch() {
  // ✅ [STORAGE] Core state with smart restoration
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // ✅ [PERSONALIZATION] Returning user detection (privacy-safe, formal)
  const isReturningUser = useMemo(() => session.isReturningUser(), []);
  const hasVisitedHealthcare = useMemo(() => 
    session.hasVisited('/healthcare'), 
  []);
  const previousPage = useMemo(() => 
    journeyTracking.getPreviousPage(), 
  []);

  // ✅ [STORAGE] Form restoration on mount (speed optimization)
  useEffect(() => {
    const startTime = performance.now();
    
    // Restore draft email if exists (returning user continuity)
    const savedDraft = formStorage.load('healthcare_notify');
    if (savedDraft?.email && !isSubmitted) {
      setEmail(savedDraft.email);
    }

    // Track intent on page load
    leadIntent.markInterest('healthcare');
    
    // Mark as visited
    session.markVisited('/healthcare');

    // ✅ [PERFORMANCE] Track page load metrics
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const endTime = performance.now();
        performanceTracking.track('HealthcareLaunch', {
          mountTime: Math.round(endTime - startTime),
          isReturningUser,
          hasRestoredDraft: !!savedDraft?.email,
          pageUrl: '/healthcare'
        });
      });
    }
  }, [isSubmitted, isReturningUser]);

  // ✅ [STORAGE] Save draft on email change (auto-save for continuity)
  useEffect(() => {
    if (email && email.includes('@')) {
      // Debounced save using requestIdleCallback for performance
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          formStorage.save('healthcare_notify', { 
            email, 
            timestamp: Date.now(),
            page: '/healthcare'
          });
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        const timer = setTimeout(() => {
          formStorage.save('healthcare_notify', { 
            email, 
            timestamp: Date.now(),
            page: '/healthcare'
          });
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [email]);

  // ✅ [STORAGE] Handle form submission with tracking
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (email) {
      // Track successful submission
      const submissionData = {
        email,
        timestamp: Date.now(),
        vertical: 'healthcare',
        isReturningUser,
        source: previousPage?.page || 'direct'
      };

      // Store submission confirmation (prevents duplicate submissions)
      storage.set('healthcare_notify_submitted', submissionData, {
        consent: false,
        temporary: false
      });

      // Mark high intent
      leadIntent.markInterest('healthcare');

      // Clear the draft since it's submitted
      formStorage.clear('healthcare_notify');

      // Show success state
      setIsSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);

      // Track performance
      performanceTracking.track('HealthcareLaunch_Submit', {
        timeToSubmit: Date.now() - performance.timing.navigationStart,
        isReturningUser
      });
    }
  }, [email, isReturningUser, previousPage]);

  // ✅ [PERSONALIZATION] Check if already submitted (prevent duplicate)
  const hasAlreadySubmitted = useMemo(() => {
    const previousSubmission = storage.get('healthcare_notify_submitted', {
      consent: false,
      temporary: false
    });
    
    // If submitted within last 7 days, show subtle acknowledgment
    if (previousSubmission && previousSubmission.timestamp) {
      const daysSinceSubmission = (Date.now() - previousSubmission.timestamp) / (1000 * 60 * 60 * 24);
      return daysSinceSubmission < 7;
    }
    
    return false;
  }, []);

  // ✅ [PERFORMANCE] Check for reduced motion preference
  const reducedMotion = userPreferences.get('reducedMotion', false);

  // ✅ [PERSONALIZATION] Subtle welcome message for returning users
  const welcomeMessage = useMemo(() => {
    if (isReturningUser && hasVisitedHealthcare) {
      return 'Welcome back';
    }
    return null;
  }, [isReturningUser, hasVisitedHealthcare]);

  // ✅ [SEO] Healthcare department structured data
  const healthcareSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://brancha.in/healthcare#webpage',
    url: 'https://brancha.in/healthcare',
    name: 'Brancha Healthcare - DISHA-Compliant Healthcare Websites',
    description: 'Professional healthcare websites and patient management systems. DISHA-compliant websites, patient recall automation, and appointment systems for clinics and hospitals.',
    isPartOf: {
      '@id': 'https://brancha.in/#website'
    },
    about: {
      '@type': 'Service',
      name: 'Healthcare Website Design & Patient Management',
      provider: {
        '@id': 'https://brancha.in/#organization'
      },
      serviceType: 'Healthcare Digital Solutions',
      areaServed: {
        '@type': 'Country',
        name: 'India'
      }
    },
    specialty: [
      'DISHA Compliance',
      'Patient Management Systems',
      'Healthcare Website Design',
      'Appointment Automation',
      'Patient Recall Systems'
    ]
  }), []);

  return (
    <>
      {/* ✅ [SEO] Comprehensive SEO meta tags */}
      <SEO
        title="Healthcare - Launching 2026"
        description="Brancha Healthcare launches in 2026. DISHA-compliant websites and patient recall automation for clinics and hospitals. Professional healthcare digital solutions."
        canonical="/healthcare"
        keywords="healthcare websites India, DISHA compliant websites, patient management system, healthcare digital solutions, clinic websites, hospital websites"
        schema={[healthcareSchema, websiteSchema, organizationSchema]}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
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
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        @keyframes drawCircle {
          from {
            stroke-dashoffset: 157;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        /* ✅ [PERFORMANCE] Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        .animate-fade-in-up-1 {
          animation: fadeInUp 0.7s ease-out 0.2s both;
        }
        
        .animate-fade-in-up-2 {
          animation: fadeInUp 0.7s ease-out 0.4s both;
        }
        
        .animate-fade-in-up-3 {
          animation: fadeInUp 0.7s ease-out 0.6s both;
        }
        
        .animate-fade-in-up-4 {
          animation: fadeInUp 0.7s ease-out 0.8s both;
        }
        
        .animate-fade-in-up-5 {
          animation: fadeInUp 0.7s ease-out 1s both;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out 0.3s both;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .circle-svg {
          animation: drawCircle 1.5s ease-out 0.5s both;
        }
        
        .healthcare-btn {
          position: relative;
          overflow: hidden;
        }
        
        .healthcare-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          transform: translate(-50%, -50%);
          transition: width 0.5s ease, height 0.5s ease;
        }
        
        .healthcare-btn:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .healthcare-btn span,
        .healthcare-btn svg {
          position: relative;
          z-index: 1;
        }
        
        .input-container {
          position: relative;
        }
        
        .input-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #2FAF7F;
          transition: width 0.4s ease;
        }
        
        .input-container.focused::after {
          width: 100%;
        }
        
        .trust-indicator {
          position: relative;
        }
        
        .trust-indicator::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: rgba(37, 153, 112, 0.12);
          animation: pulse 2s ease-in-out infinite;
        }

        /* ✅ [PERSONALIZATION] Subtle returning user indicator */
        .returning-user-badge {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      <main className="relative min-h-screen bg-[#F7F9FA] overflow-hidden">
        {/* Subtle Background Elements */}
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #2FAF7F 0%, transparent 70%)',
            transform: 'translate(30%, -30%)'
          }}
        />
        
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #0F4C81 0%, transparent 70%)',
            transform: 'translate(-30%, 30%)'
          }}
        />

        {/* Subtle Dots Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0F4C81 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-8 py-32">
          <div className="w-full max-w-[680px] text-center">
            
            {/* ✅ [PERSONALIZATION] Subtle returning user welcome (formal, non-intrusive) */}
            {welcomeMessage && (
              <div className="returning-user-badge mb-6">
                <p 
                  className="text-[11px] font-normal tracking-[1.5px] text-[#259970]/70"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {welcomeMessage}
                </p>
              </div>
            )}

            {/* Trust Symbol */}
            <div className="flex justify-center mb-10 sm:mb-12 animate-scale-in">
              <div className="trust-indicator relative">
                <svg width="50" height="50" viewBox="0 0 50 50" className="relative z-10">
                  <circle
                    cx="25"
                    cy="25"
                    r="24"
                    fill="none"
                    stroke="#259970"
                    strokeWidth="1.5"
                    strokeDasharray="157"
                    strokeDashoffset="157"
                    className="circle-svg"
                    style={{ strokeLinecap: 'round' }}
                  />
                  <Heart 
                    className="absolute inset-0 m-auto w-6 h-6 text-[#0F4C81]"
                    fill="#0F4C81"
                    style={{ 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)' 
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center justify-center gap-3 mb-10 sm:mb-12 animate-fade-in-up-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#259970] animate-pulse-slow" />
              <span 
                className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#259970]"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Launching Soon
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#259970] animate-pulse-slow" />
            </div>

            {/* Main Heading */}
            <div className="mb-6 sm:mb-7 animate-fade-in-up-2">
              <h1 
                className="text-[48px] sm:text-[64px] lg:text-[72px] leading-[1.15] font-semibold tracking-[-0.01em] text-[#259970]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Brancha{' '}
                <span className="text-[20px] sm:text-[26px] font-light text-[#0F4C81]/60 tracking-[0.1em]" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  for
                </span>{' '}
                Healthcare
              </h1>
            </div>

            {/* Tagline */}
            <p 
              className="text-[17px] sm:text-[19px] lg:text-[21px] font-normal leading-[1.7] text-[#0F4C81] max-w-[540px] mx-auto mb-16 sm:mb-20 tracking-[0em] animate-fade-in-up-3"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Care, clarity, and confidence—reimagined.
            </p>

            {/* Notify Form */}
            <div className="max-w-[480px] mx-auto mb-14 sm:mb-16 animate-fade-in-up-4">
              {hasAlreadySubmitted ? (
                // ✅ [PERSONALIZATION] Already submitted state (formal acknowledgment)
                <div 
                  className="flex items-center justify-center gap-3 h-[56px] bg-[#259970]/10 border border-[#259970]/30 rounded-lg px-6"
                  style={{ animation: 'scaleIn 0.4s ease-out' }}
                >
                  <CheckCircle2 className="w-5 h-5 text-[#259970]" strokeWidth={2} />
                  <span 
                    className="text-[15px] font-medium text-[#0F4C81] tracking-[0em]"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    You're already on the list
                  </span>
                </div>
              ) : !isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                    <div className="relative">
                      <Mail 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors duration-300"
                        style={{ color: isFocused ? '#259970' : '#259970' }}
                        strokeWidth={1.5}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Enter your email address"
                        required
                        autoComplete="email"
                        className="w-full h-[56px] pl-[52px] pr-4 bg-white border border-[#259970]/30 text-[#0F4C81] text-[15px] font-normal tracking-[0em] placeholder:text-[#259970]/50 rounded-lg transition-all duration-300 focus:outline-none focus:border-[#259970] focus:shadow-[0_0_0_3px_rgba(37,153,112,0.15)] hover:border-[#259970]/45"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="healthcare-btn w-full h-[56px] flex items-center justify-center gap-2.5 bg-[#259970] text-white text-[15px] font-medium tracking-[0.3px] rounded-lg transition-all duration-400 hover:bg-[#208860] hover:shadow-[0_8px_24px_rgba(37,153,112,0.3)] active:scale-[0.98]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <span>Notify Me at Launch</span>
                  </button>
                </form>
              ) : (
                // ✅ [STORAGE] Success state with tracking
                <div 
                  className="flex items-center justify-center gap-3 h-[56px] bg-[#259970]/10 border border-[#259970]/30 rounded-lg px-6"
                  style={{ animation: 'scaleIn 0.4s ease-out' }}
                >
                  <CheckCircle2 className="w-5 h-5 text-[#259970]" strokeWidth={2} />
                  <span 
                    className="text-[15px] font-medium text-[#0F4C81] tracking-[0em]"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    You'll be notified at launch
                  </span>
                </div>
              )}
            </div>

            {/* Launch Year */}
            <div className="flex items-center justify-center gap-2.5 animate-fade-in-up-5">
              <span 
                className="text-[13px] font-normal tracking-[0.5px] text-[#0F4C81]/60"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Expected
              </span>
              <span 
                className="text-[15px] font-semibold tracking-[0.8px] text-[#259970]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                2026
              </span>
            </div>

            {/* Bottom Trust Elements */}
            <div className="mt-20 flex items-center justify-center gap-8 opacity-0 animate-fade-in-up-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[1px] bg-[#259970]/40" />
                <span 
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-[#259970]/70"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Trusted Care
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-[1px] bg-[#0F4C81]/40" />
                <span 
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-[#0F4C81]/60"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Modern Solutions
                </span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
