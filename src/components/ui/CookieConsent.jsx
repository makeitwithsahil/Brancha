import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import { setStorageConsent, hasStorageConsent, session, userPreferences } from '../../utils/storage';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent decision
    try {
      const consentGiven = localStorage.getItem('brancha_consent');
      
      // Don't show banner if consent already given
      if (consentGiven) {
        return;
      }

      // Check if banner was dismissed this session (without accepting)
      const dismissedThisSession = sessionStorage.getItem('brancha_banner_dismissed');
      if (dismissedThisSession === 'true') {
        return;
      }

      // Check how many times user has visited
      const isReturningUser = session.isReturningUser();
      
      // For returning users who haven't decided, show banner earlier
      // For new users, give them time to explore first
      const delay = isReturningUser ? 800 : 1500;

      // Check if user is actively engaged (has scrolled or clicked)
      let userEngaged = false;
      
      const markEngaged = () => {
        userEngaged = true;
      };

      // Listen for engagement signals
      window.addEventListener('scroll', markEngaged, { once: true, passive: true });
      window.addEventListener('click', markEngaged, { once: true, passive: true });

      const timer = setTimeout(() => {
        // For new users, only show if they're engaged
        // For returning users, show regardless (they need to decide)
        if (isReturningUser || userEngaged) {
          setShowBanner(true);
        } else {
          // If not engaged, wait a bit more and check again
          const fallbackTimer = setTimeout(() => {
            setShowBanner(true);
          }, 3000);
          
          return () => clearTimeout(fallbackTimer);
        }
      }, delay);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', markEngaged);
        window.removeEventListener('click', markEngaged);
      };
    } catch (e) {
      console.warn('Could not check consent:', e);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    setStorageConsent(true);
    setShowBanner(false);
    
    // Track that user accepted (for analytics/personalization)
    try {
      sessionStorage.setItem('brancha_banner_interacted', 'true');
    } catch (e) {
      // Silent fail
    }
  }, []);

  const handleAcceptNecessary = useCallback(() => {
    setStorageConsent(false);
    setShowBanner(false);
    
    // Track that user made a choice
    try {
      sessionStorage.setItem('brancha_banner_interacted', 'true');
    } catch (e) {
      // Silent fail
    }
  }, []);

  const handleClose = useCallback(() => {
    setShowBanner(false);
    
    // Mark as dismissed for this session
    // Will show again on next visit if they still haven't decided
    try {
      sessionStorage.setItem('brancha_banner_dismissed', 'true');
    } catch (e) {
      // Silent fail
    }
  }, []);

  // Check if user prefers reduced motion
  const reducedMotion = userPreferences.get('reducedMotion', false);

  // Adapt animation based on motion preference
  const bannerTransition = reducedMotion 
    ? { duration: 0.2 }
    : { type: 'spring', stiffness: 300, damping: 30 };

  const bannerAnimation = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 100 } };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
            onClick={handleClose}
          />

          {/* Banner */}
          <motion.div
            {...bannerAnimation}
            transition={bannerTransition}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          >
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-[#EFEDE9] p-6 sm:p-8 relative">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EFEDE9] flex items-center justify-center transition-colors duration-200 hover:bg-[#e2493b]/10 hover:text-[#e2493b] z-10"
                  aria-label="Close banner"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Main Banner */}
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#e2493b]/10 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-[#e2493b]" />
                    </div>
                    
                    <div className="flex-1 pr-8">
                      <h3 className="text-lg font-medium text-[#1F1F1F] mb-2">
                        We Value Your Privacy
                      </h3>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        We use cookies to enhance your browsing experience and analyze site traffic. 
                        By clicking "Accept All", you consent to our use of cookies.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <button
                      onClick={handleAcceptNecessary}
                      className="px-5 py-2.5 text-sm font-medium text-[#6B6B6B] bg-white border-2 border-[#EFEDE9] rounded-full transition-all duration-200 hover:border-[#e2493b] hover:text-[#e2493b]"
                    >
                      Necessary Only
                    </button>
                    
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 text-sm font-medium text-white bg-[#e2493b] rounded-full transition-all duration-200 hover:bg-[#C94A3F] hover:shadow-lg hover:shadow-[#e2493b]/30"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
