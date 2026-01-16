import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollMemory } from '../utils/storage';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if there's a saved scroll position for this path
    const savedPosition = scrollMemory.get(pathname);
    
    // If we have a saved position and it's from blog page, don't scroll to top
    // This allows back navigation to restore scroll position
    const isBackNavigation = window.performance?.navigation?.type === 2; // TYPE_BACK_FORWARD
    
    if (savedPosition > 0 && isBackNavigation) {
      // Restore saved position
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedPosition,
          left: 0,
          behavior: 'instant'
        });
      });
    } else {
      // Normal navigation - scroll to top
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      });
    }

    // Clear saved scroll position for this path after restoration
    // This ensures fresh page loads scroll to top
    const clearTimer = setTimeout(() => {
      if (savedPosition > 0) {
        scrollMemory.save(pathname, 0);
      }
    }, 1000);

    return () => {
      clearTimeout(clearTimer);
    };
  }, [pathname]);

  return null;
}
