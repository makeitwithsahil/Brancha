import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { performanceTracking, session, userPreferences } from '../utils/storage';

export default function SEO({
  title,
  description,
  canonical,
  ogImage = '/favicon.png',
  ogType = 'website',
  noindex = false,
  schema,
  keywords
}) {
  const location = useLocation();
  const renderTimeRef = useRef(Date.now());
  
  const siteName = useMemo(() => 'Brancha', []);
  const baseUrl = useMemo(() => 'https://brancha.in', []);
  
  const fullTitle = useMemo(() => 
    title ? `${title} | ${siteName}` : `${siteName} - Where Brands Grow`,
    [title, siteName]
  );
  
  const canonicalUrl = useMemo(() => 
    canonical ? `${baseUrl}${canonical}` : `${baseUrl}${location.pathname}`,
    [canonical, baseUrl, location.pathname]
  );
  
  const ogImageUrl = useMemo(() => 
    ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
    [ogImage, baseUrl]
  );

  const robotsValue = useMemo(() => 
    noindex 
      ? 'noindex, nofollow' 
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    [noindex]
  );

  useEffect(() => {
    const startTime = performance.now();

    // ✅ [SEO SAFE] Set document title
    document.title = fullTitle;

    // ✅ [SEO SAFE] Set html lang attribute
    document.documentElement.lang = 'en-IN';

    // ✅ [PERFORMANCE] Cache DOM queries for reused selectors
    const metaCache = new Map();
    const linkCache = new Map();

    // ✅ [SAFE - No visual change] Optimized helper function to set or update meta tags
    const setMetaTag = (attr, attrValue, content) => {
      const cacheKey = `${attr}:${attrValue}`;
      let element = metaCache.get(cacheKey);
      
      if (!element) {
        element = document.querySelector(`meta[${attr}="${attrValue}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attr, attrValue);
          document.head.appendChild(element);
        }
        metaCache.set(cacheKey, element);
      }
      
      // Only update if content has changed (performance optimization)
      if (element.getAttribute('content') !== content) {
        element.setAttribute('content', content);
      }
    };

    // ✅ [SAFE - No visual change] Optimized helper function to set or update link tags
    const setLinkTag = (rel, href) => {
      const cacheKey = `link:${rel}`;
      let element = linkCache.get(cacheKey);
      
      if (!element) {
        element = document.querySelector(`link[rel="${rel}"]`);
        if (!element) {
          element = document.createElement('link');
          element.setAttribute('rel', rel);
          document.head.appendChild(element);
        }
        linkCache.set(cacheKey, element);
      }
      
      // Only update if href has changed
      if (element.getAttribute('href') !== href) {
        element.setAttribute('href', href);
      }
    };

    // ✅ [SEO SAFE] Primary Meta Tags
    setMetaTag('name', 'title', fullTitle);
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // ✅ [SEO SAFE] Robots
    setMetaTag('name', 'robots', robotsValue);

    // ✅ [SEO SAFE] Canonical
    setLinkTag('canonical', canonicalUrl);

    // ✅ [SEO SAFE] Open Graph
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', ogImageUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:site_name', siteName);
    setMetaTag('property', 'og:locale', 'en_IN');

    // ✅ [SEO SAFE] Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:url', canonicalUrl);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImageUrl);
    setMetaTag('name', 'twitter:creator', '@growwithbrancha');

    // ✅ [SEO SAFE] Additional Meta Tags
    setMetaTag('name', 'format-detection', 'telephone=yes');
    setMetaTag('name', 'geo.region', 'IN-GJ');
    setMetaTag('name', 'geo.placename', 'Vadodara');
    setMetaTag('name', 'geo.position', '22.3072;73.1812');
    setMetaTag('name', 'ICBM', '22.3072, 73.1812');

    // ✅ [SEO SAFE] Structured Data
    if (schema) {
      // Remove existing schema script if present
      const existingSchema = document.querySelector('script[type="application/ld+json"][data-schema="page"]');
      if (existingSchema) {
        existingSchema.remove();
      }

      // Add new schema
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-schema', 'page');
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    // ✅ [PERFORMANCE TRACKING] Track SEO setup time
    const endTime = performance.now();
    const seoSetupTime = Math.round(endTime - startTime);
    
    // Track in performance monitoring (non-blocking)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        performanceTracking.track('SEO_Setup', {
          setupTime: seoSetupTime,
          pageUrl: location.pathname,
          hasSchema: !!schema
        });
      });
    }

    // ✅ [STORAGE] Mark page as visited for journey tracking
    session.markVisited(location.pathname);

    // ✅ [PRECONNECT] Add performance hints for external resources
    // Only on first render to avoid duplicate preconnects
    if (renderTimeRef.current && Date.now() - renderTimeRef.current < 100) {
      const lowBandwidth = userPreferences.get('connectionType') === 'slow-2g' || 
                           userPreferences.get('connectionType') === '2g';
      
      // Skip resource hints on slow connections to reduce overhead
      if (!lowBandwidth) {
        // Preconnect to Google Fonts if not already done
        if (!document.querySelector('link[rel="preconnect"][href*="fonts.googleapis"]')) {
          const preconnect1 = document.createElement('link');
          preconnect1.rel = 'preconnect';
          preconnect1.href = 'https://fonts.googleapis.com';
          document.head.appendChild(preconnect1);

          const preconnect2 = document.createElement('link');
          preconnect2.rel = 'preconnect';
          preconnect2.href = 'https://fonts.gstatic.com';
          preconnect2.crossOrigin = 'anonymous';
          document.head.appendChild(preconnect2);
        }
      }
    }

    // ✅ [SAFE - No visual change] Cleanup function
    return () => {
      // Remove page-specific schema on unmount
      const schemaScript = document.querySelector('script[type="application/ld+json"][data-schema="page"]');
      if (schemaScript) {
        schemaScript.remove();
      }
      
      // Clear caches
      metaCache.clear();
      linkCache.clear();
    };
  }, [
    title,
    description,
    canonical,
    ogImage,
    ogType,
    noindex,
    schema,
    keywords,
    fullTitle,
    canonicalUrl,
    ogImageUrl,
    location.pathname,
    siteName,
    robotsValue
  ]);

  return null;
}