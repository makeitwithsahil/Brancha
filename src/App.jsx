import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/layout/ThemedNavbar';
import Footer from './components/layout/ThemedFooter';
import ScrollToTop from './components/ui/ScrollToTop';
import CookieConsent from './components/ui/CookieConsent';
import { 
  initializeStorage,
  cleanupExpiredStorage, 
  journeyTracking,
  userPreferences,
  performanceTracking
} from './utils/storage';
import './App.css';

// Lazy load pages for better performance
// Main website pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Process = lazy(() => import('./pages/Process'));
const Departments = lazy(() => import('./pages/Departments'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Gym department pages
const GymHome = lazy(() => import('./pages/gym/GymHome'));
const GymAbout = lazy(() => import('./pages/gym/GymAbout'));
const GymServices = lazy(() => import('./pages/gym/GymServices'));
const GymProcess = lazy(() => import('./pages/gym/GymProcess'));
const GymPortfolio = lazy(() => import('./pages/gym/GymPortfolio'));
const GymBlog = lazy(() => import('./pages/gym/GymBlog'));
const BlogPost = lazy(() => import('./pages/gym/BlogPost'));
const GymContact = lazy(() => import('./pages/gym/GymContact'));
const GymNotFound = lazy(() => import('./pages/gym/GymNotFound'));

// Other department pages
const RealEstateLaunch = lazy(() => import('./pages/real-estate/RealEstateLaunch'));
const HealthcareLaunch = lazy(() => import('./pages/healthcare/HealthcareLaunch'));
const EducationLaunch = lazy(() => import('./pages/education/EducationLaunch'));
const LaunchingSoon = lazy(() => import('./pages/LaunchingSoon'));

/**
 * Loading fallback component
 */
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
      <style>
        {`
          @keyframes spinLoader {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spinner-loading {
            animation: spinLoader 1s linear infinite;
          }
        `}
      </style>
      <div className="flex flex-col items-center gap-4">
        <div 
          className="spinner-loading w-12 h-12 border-4 border-[#EFEDE9] border-t-[#e2493b] rounded-full"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
          Loading...
        </p>
      </div>
    </div>
  );
}

/**
 * Journey Tracker - tracks user navigation for better UX personalization
 */
function JourneyTracker() {
  const location = useLocation();

  useEffect(() => {
    // Extract page name from path
    const pathParts = location.pathname.split('/').filter(Boolean);
    const pageName = pathParts.length === 0 
      ? 'Home' 
      : pathParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' > ');
    
    // Track page in journey
    journeyTracking.addPage(pageName, location.pathname);
    
    // Track Core Web Vitals if available
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Use requestIdleCallback for non-critical tracking
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            performanceTracking.track(pageName, {
              loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
              domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
              pageUrl: location.pathname
            });
          }
        });
      }
    }
  }, [location]);

  return null;
}

/**
 * Performance Monitor - optimizes based on device capabilities
 */
function PerformanceMonitor() {
  useEffect(() => {
    // Initialize storage system
    initializeStorage();

    // Check for reduced motion preference (accessibility)
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (shouldReduce) => {
      userPreferences.update('reducedMotion', shouldReduce);
      document.documentElement.classList.toggle('reduce-motion', shouldReduce);
    };

    // Set initial state
    handleReducedMotion(reducedMotionQuery.matches);

    // Listen for changes
    const motionListener = (e) => handleReducedMotion(e.matches);
    reducedMotionQuery.addEventListener('change', motionListener);

    // Prefetch critical pages for faster navigation
    const prefetchCriticalPages = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const criticalRoutes = ['/gym', '/contact', '/departments'];
          criticalRoutes.forEach(route => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            link.as = 'document';
            document.head.appendChild(link);
          });
        }, { timeout: 5000 });
      }
    };

    // Delay prefetching to not interfere with initial load
    const prefetchTimer = setTimeout(prefetchCriticalPages, 3000);

    // Monitor connection type for adaptive loading
    if ('connection' in navigator && navigator.connection) {
      const connection = navigator.connection;
      
      const handleConnectionChange = () => {
        const effectiveType = connection.effectiveType;
        userPreferences.update('connectionType', effectiveType);
        
        // Add class for styling adjustments on slow connections
        const isSlowConnection = effectiveType === 'slow-2g' || effectiveType === '2g';
        document.documentElement.classList.toggle('low-bandwidth', isSlowConnection);
      };

      handleConnectionChange();
      connection.addEventListener('change', handleConnectionChange);
    }

    // Monitor battery status for power-saving mode
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        const handleBatteryChange = () => {
          const isLowBattery = battery.level < 0.2 && !battery.charging;
          userPreferences.update('lowPowerMode', isLowBattery);
          document.documentElement.classList.toggle('low-power-mode', isLowBattery);
        };

        handleBatteryChange();
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);
      }).catch(() => {
        // Battery API not supported or blocked
      });
    }

    // Cleanup
    return () => {
      reducedMotionQuery.removeEventListener('change', motionListener);
      clearTimeout(prefetchTimer);
    };
  }, []);

  return null;
}

/**
 * Storage Cleanup - removes expired data periodically
 */
function StorageCleanup() {
  useEffect(() => {
    // Clean up expired storage every 5 minutes
    const cleanupInterval = setInterval(() => {
      cleanupExpiredStorage();
    }, 5 * 60 * 1000);

    // Initial cleanup
    cleanupExpiredStorage();

    return () => clearInterval(cleanupInterval);
  }, []);

  return null;
}

/**
 * App Content - Main application structure
 */
function AppContent() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <ScrollToTop />
      <JourneyTracker />
      <PerformanceMonitor />
      <StorageCleanup />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Main website routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Gym department routes */}
          <Route path="/gym" element={<GymHome />} />
          <Route path="/gym/about" element={<GymAbout />} />
          <Route path="/gym/services" element={<GymServices />} />
          <Route path="/gym/process" element={<GymProcess />} />
          <Route path="/gym/portfolio" element={<GymPortfolio />} />
          <Route path="/gym/blog" element={<GymBlog />} />
          <Route path="/gym/blog/:slug" element={<BlogPost />} />
          <Route path="/gym/contact" element={<GymContact />} />
          <Route path="/gym/*" element={<GymNotFound />} />
          
          {/* Real Estate department */}
          <Route path="/real-estate" element={<RealEstateLaunch />} />
          <Route path="/real-estate/*" element={<RealEstateLaunch />} />
          
          {/* Healthcare department */}
          <Route path="/healthcare" element={<HealthcareLaunch />} />
          <Route path="/healthcare/*" element={<HealthcareLaunch />} />
          
          {/* Education department */}
          <Route path="/education" element={<EducationLaunch />} />
          <Route path="/education/*" element={<EducationLaunch />} />
          
          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <CookieConsent />
    </div>
  );
}

/**
 * Main App Component
 */
export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}
