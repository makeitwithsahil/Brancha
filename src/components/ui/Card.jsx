import { useEffect, useRef, useState } from 'react';
import { userPreferences } from '../../utils/storage';

export default function Card({ 
  children, 
  className = '', 
  lazy = false,
  threshold = 0.1,
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(!lazy);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!lazy) return;

    // Check if user is on slow connection or low power mode
    const lowBandwidth = userPreferences.get('connectionType') === 'slow-2g' || 
                         userPreferences.get('connectionType') === '2g';
    const lowPowerMode = userPreferences.get('lowPowerMode', false);

    // Skip intersection observer for users on slow connections or low power
    // Load immediately to avoid additional overhead
    if (lowBandwidth || lowPowerMode) {
      setIsVisible(true);
      return;
    }

    // Use Intersection Observer for lazy rendering
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin: '50px' // Start loading slightly before visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazy, threshold]);
  
  return (
    <div
      ref={cardRef}
      className={`bg-white border border-[#EFEDE9] rounded-2xl p-6 ${className}`}
      {...props}
    >
      {isVisible ? children : (
        <div 
          className="min-h-[200px] flex items-center justify-center"
          aria-label="Loading content"
        >
          <div className="w-8 h-8 border-2 border-[#EFEDE9] border-t-[#FF6F61] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
