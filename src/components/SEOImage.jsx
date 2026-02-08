import { memo, useState, useEffect, useRef } from 'react';
import { userPreferences } from '../utils/storage';

const SEOImage = memo(function SEOImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false,
  adaptive = true,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Get user preferences for adaptive loading
  const lowBandwidth = adaptive && (
    userPreferences.get('connectionType') === 'slow-2g' || 
    userPreferences.get('connectionType') === '2g'
  );
  const lowPowerMode = adaptive && userPreferences.get('lowPowerMode', false);

  useEffect(() => {
    // Priority images load immediately
    if (priority) {
      setShouldLoad(true);
      return;
    }

    // For low bandwidth or low power mode, use aggressive lazy loading
    if (lowBandwidth || lowPowerMode) {
      // Only load when image is very close to viewport
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observerRef.current?.disconnect();
            }
          });
        },
        {
          rootMargin: '20px', // Smaller margin for low bandwidth
          threshold: 0.01
        }
      );
    } else {
      // Normal lazy loading with generous margin
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observerRef.current?.disconnect();
            }
          });
        },
        {
          rootMargin: '200px', // Load well before visible
          threshold: 0.01
        }
      );
    }

    if (imgRef.current && observerRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, lowBandwidth, lowPowerMode]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    console.warn(`Failed to load image: ${src}`);
    // Fallback behavior - could set a default image here
  };

  // Determine loading strategy
  const loadingStrategy = priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : (lowBandwidth || lowPowerMode ? 'low' : 'auto');

  // For very low bandwidth, provide data-saving attribute hints
  const additionalProps = (lowBandwidth || lowPowerMode) ? {
    'data-low-bandwidth': 'true'
  } : {};

  return (
    <img
      ref={imgRef}
      src={shouldLoad ? src : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={loadingStrategy}
      decoding="async"
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      fetchpriority={fetchPriority}
      onLoad={handleLoad}
      onError={handleError}
      {...additionalProps}
      {...props}
    />
  );
});

export default SEOImage;
