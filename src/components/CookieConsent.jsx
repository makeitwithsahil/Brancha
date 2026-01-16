// src/components/CookieConsent.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import { cookieConsent, visitorTracking } from '../utils/storage';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if we should show the banner
    const shouldShow = cookieConsent.shouldShowBanner();
    
    if (shouldShow) {
      // Show banner after 1.5 seconds to not be intrusive
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    };
    cookieConsent.set(fullConsent);
    setShowBanner(false);
    
    // Initialize analytics if accepted
    initializeAnalytics(fullConsent);
  };

  const handleAcceptNecessary = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    };
    cookieConsent.set(minimalConsent);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const customConsent = {
      ...preferences,
      timestamp: Date.now()
    };
    cookieConsent.set(customConsent);
    setShowBanner(false);
    setShowSettings(false);
    
    // Initialize analytics if accepted
    initializeAnalytics(customConsent);
  };

  const handleClose = () => {
    // User dismissed without choosing - will see again on next qualifying visit
    setShowBanner(false);
  };

  const initializeAnalytics = (consent) => {
    if (consent.analytics && window.gtag) {
      // Enable Google Analytics
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
    
    if (consent.marketing && window.gtag) {
      // Enable marketing cookies
      window.gtag('consent', 'update', {
        ad_storage: 'granted'
      });
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
            onClick={handleClose}
          />

          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
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

                {!showSettings ? (
                  // Main Banner
                  <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-[#e2493b]/10 flex items-center justify-center flex-shrink-0">
                        <Cookie className="w-6 h-6 text-[#e2493b]" />
                      </div>
                      
                      <div className="flex-1 pr-8">
                        <h3 className="text-lg font-medium text-[#1F1F1F] mb-2" style={{ fontWeight: 500 }}>
                          We Value Your Privacy
                        </h3>
                        <p className="text-sm text-[#6B6B6B] leading-relaxed" style={{ fontWeight: 400 }}>
                          We use cookies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. 
                          By clicking "Accept All", you consent to our use of cookies.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                      <button
                        onClick={() => setShowSettings(true)}
                        className="px-5 py-2.5 text-sm font-medium text-[#1F1F1F] bg-[#EFEDE9] rounded-full transition-all duration-200 hover:bg-[#e2493b]/10 hover:text-[#e2493b] flex items-center justify-center gap-2"
                        style={{ fontWeight: 500 }}
                      >
                        <Settings className="w-4 h-4" />
                        Preferences
                      </button>
                      
                      <button
                        onClick={handleAcceptNecessary}
                        className="px-5 py-2.5 text-sm font-medium text-[#6B6B6B] bg-white border-2 border-[#EFEDE9] rounded-full transition-all duration-200 hover:border-[#e2493b] hover:text-[#e2493b]"
                        style={{ fontWeight: 500 }}
                      >
                        Necessary Only
                      </button>
                      
                      <button
                        onClick={handleAcceptAll}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-[#e2493b] rounded-full transition-all duration-200 hover:bg-[#C94A3F] hover:shadow-lg hover:shadow-[#e2493b]/30"
                        style={{ fontWeight: 500 }}
                      >
                        Accept All
                      </button>
                    </div>
                  </div>
                ) : (
                  // Settings Panel
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#e2493b]/10 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-[#e2493b]" />
                        </div>
                        <h3 className="text-lg font-medium text-[#1F1F1F]" style={{ fontWeight: 500 }}>
                          Cookie Preferences
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="w-8 h-8 rounded-full bg-[#EFEDE9] flex items-center justify-center transition-colors duration-200 hover:bg-[#e2493b]/10 hover:text-[#e2493b]"
                        aria-label="Back to main view"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      {/* Necessary Cookies */}
                      <div className="flex items-start justify-between p-4 bg-[#FAF9F7] rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-[#1F1F1F]" style={{ fontWeight: 500 }}>
                              Necessary Cookies
                            </h4>
                            <span className="px-2 py-0.5 text-xs font-semibold text-[#e2493b] bg-[#e2493b]/10 rounded-full" style={{ fontWeight: 600 }}>
                              Required
                            </span>
                          </div>
                          <p className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                            Essential for the website to function. Cannot be disabled.
                          </p>
                        </div>
                        <div className="ml-4">
                          <div className="w-10 h-5 bg-[#e2493b] rounded-full cursor-not-allowed opacity-50 relative">
                            <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-start justify-between p-4 bg-[#FAF9F7] rounded-xl">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-[#1F1F1F] mb-1" style={{ fontWeight: 500 }}>
                            Analytics Cookies
                          </h4>
                          <p className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                            Help us understand how visitors interact with our website.
                          </p>
                        </div>
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                          className="ml-4"
                          aria-label={`Toggle analytics cookies ${preferences.analytics ? 'off' : 'on'}`}
                        >
                          <div className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${preferences.analytics ? 'bg-[#e2493b]' : 'bg-[#EFEDE9]'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 absolute top-0.5 ${preferences.analytics ? 'right-0.5' : 'left-0.5'}`} />
                          </div>
                        </button>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-start justify-between p-4 bg-[#FAF9F7] rounded-xl">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-[#1F1F1F] mb-1" style={{ fontWeight: 500 }}>
                            Marketing Cookies
                          </h4>
                          <p className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                            Used to deliver relevant advertisements and measure campaign effectiveness.
                          </p>
                        </div>
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                          className="ml-4"
                          aria-label={`Toggle marketing cookies ${preferences.marketing ? 'off' : 'on'}`}
                        >
                          <div className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${preferences.marketing ? 'bg-[#e2493b]' : 'bg-[#EFEDE9]'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 absolute top-0.5 ${preferences.marketing ? 'right-0.5' : 'left-0.5'}`} />
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowSettings(false)}
                        className="flex-1 px-5 py-2.5 text-sm font-medium text-[#6B6B6B] bg-white border-2 border-[#EFEDE9] rounded-full transition-all duration-200 hover:border-[#e2493b] hover:text-[#e2493b]"
                        style={{ fontWeight: 500 }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSavePreferences}
                        className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-[#e2493b] rounded-full transition-all duration-200 hover:bg-[#C94A3F] hover:shadow-lg hover:shadow-[#e2493b]/30"
                        style={{ fontWeight: 500 }}
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
