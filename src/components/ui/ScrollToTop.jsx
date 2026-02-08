import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { storage, userPreferences } from '../../utils/storage';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Clear any pending scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Check if user prefers reduced motion
    const reducedMotion = userPreferences.get('reducedMotion', false);
    
    // For blog/article pages, restore previous scroll position if returning
    const isContentPage = pathname.includes('/blog/') || pathname.includes('/portfolio/');
    
    if (isContentPage) {
      const savedPosition = storage.get(`scroll_${pathname}`, { 
        temporary: true, 
        consent: false 
      });
      
      if (savedPosition && typeof savedPosition === 'number') {
        // Restore saved position with slight delay to ensure content is loaded
        scrollTimeoutRef.current = setTimeout(() => {
          window.scrollTo({
            top: savedPosition,
            left: 0,
            behavior: reducedMotion ? 'instant' : 'smooth'
          });
        }, 100);
        
        return;
      }
    }

    // Default behavior: scroll to top instantly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Cleanup timeout on unmount
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [pathname]);

  // Save scroll position before leaving content pages
  useEffect(() => {
    const isContentPage = pathname.includes('/blog/') || pathname.includes('/portfolio/');
    
    if (!isContentPage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Only save if user has scrolled significantly (past 200px)
      if (scrollPosition > 200) {
        storage.set(`scroll_${pathname}`, scrollPosition, { 
          temporary: true, 
          consent: false,
          expiresIn: 30 * 60 * 1000 // 30 minutes
        });
      }
    };

    // Debounce scroll events for performance
    let scrollTimeout;
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 200);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(scrollTimeout);
    };
  }, [pathname]);

  return null;
}
