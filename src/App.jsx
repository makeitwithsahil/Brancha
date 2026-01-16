import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import { 
  initializeStorage,
  cleanupExpiredStorage, 
  journeyTracking,
  userPreferences,
  performanceTracking
} from './utils/storage';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Process = lazy(() => import('./pages/Process'));
const Services = lazy(() => import('./pages/Services'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
      <style>
        {`
          @keyframes spinLoader {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
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
        <p className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>Loading...</p>
      </div>
    </div>
  );
}

// Journey Tracker Component with enhanced tracking
function JourneyTracker() {
  const location = useLocation();

  useEffect(() => {
    const pageName = location.pathname === '/' ? 'Home' : 
                     location.pathname.split('/')[1] || 'Unknown';
    
    // Track page in journey
    journeyTracking.addPage(pageName, location.pathname);
    
    // Track page load time
    if (window.performance && window.performance.timing) {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      if (loadTime > 0) {
        performanceTracking.track(pageName, {
          loadTime,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
          pageUrl: location.pathname
        });
      }
    }
  }, [location]);

  return null;
}

// Performance Monitor Component with enhanced capabilities
function PerformanceMonitor() {
  useEffect(() => {
    // Initialize storage system
    initializeStorage();

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shouldReduceMotion = mediaQuery.matches;

    if (shouldReduceMotion) {
      userPreferences.update('reducedMotion', true);
      document.documentElement.classList.add('reduce-motion');
    }

    // Monitor reduced motion changes
    const handleMotionChange = (e) => {
      userPreferences.update('reducedMotion', e.matches);
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    // Prefetch critical pages for better performance
    const prefetchPages = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const routes = ['/services', '/contact', '/blog'];
          routes.forEach(route => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
          });
        });
      }
    };

    // Delay prefetching to not affect initial load
    const prefetchTimer = setTimeout(prefetchPages, 3000);

    // Check connection type and adjust accordingly
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const effectiveType = connection.effectiveType;
      
      userPreferences.update('connectionType', effectiveType);
      
      // Add class for low bandwidth
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        document.documentElement.classList.add('low-bandwidth');
      }

      // Monitor connection changes
      const handleConnectionChange = () => {
        const newType = connection.effectiveType;
        userPreferences.update('connectionType', newType);
        
        if (newType === 'slow-2g' || newType === '2g') {
          document.documentElement.classList.add('low-bandwidth');
        } else {
          document.documentElement.classList.remove('low-bandwidth');
        }
      };

      connection.addEventListener('change', handleConnectionChange);
    }

    // Check battery status and enable power saving if needed
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        const handleBatteryChange = () => {
          const isLowBattery = battery.level < 0.2 && !battery.charging;
          userPreferences.update('lowPowerMode', isLowBattery);
          
          if (isLowBattery) {
            document.documentElement.classList.add('low-power-mode');
          } else {
            document.documentElement.classList.remove('low-power-mode');
          }
        };

        // Check initially
        handleBatteryChange();

        // Monitor changes
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);
      });
    }

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      clearTimeout(prefetchTimer);
    };
  }, []);

  return null;
}

// Storage Cleanup Component - runs periodically
function StorageCleanup() {
  useEffect(() => {
    // Clean up expired storage every 5 minutes
    const cleanupInterval = setInterval(() => {
      cleanupExpiredStorage();
    }, 5 * 60 * 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  return null;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FAF9F7]">
        <ScrollToTop />
        <JourneyTracker />
        <PerformanceMonitor />
        <StorageCleanup />
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}
