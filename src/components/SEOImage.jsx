import { memo } from 'react';
const SEOImage = memo(function SEOImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false,
  ...props 
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      // ✅ [SAFE - No visual change] Add fetchpriority for LCP optimization
      fetchpriority={priority ? 'high' : 'auto'}
      {...props}
    />
  );
});

export default SEOImage;