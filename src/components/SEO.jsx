import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component - Optimized
 * 
 * ✅ [SEO SAFE] All meta tags and structured data preserved
 * ✅ [SAFE - No visual change] Memoized computations for performance
 * ✅ [SAFE - No visual change] Efficient DOM manipulation
 */
export default function SEO({
  title,
  description,
  canonical,
  ogImage = '/og-default.jpg',
  ogType = 'website',
  noindex = false,
  schema,
  keywords
}) {
  const location = useLocation();
  
  // ✅ [SAFE - No visual change] Memoize static values
  const siteName = useMemo(() => 'Brancha', []);
  const baseUrl = useMemo(() => 'https://brancha.in', []);
  
  // ✅ [SAFE - No visual change] Memoize computed values
  const fullTitle = useMemo(() => 
    title ? `${title} | ${siteName}` : `${siteName} - Digital Design for Businesses That Care`,
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
    // ✅ [SEO SAFE] Set document title
    document.title = fullTitle;

    // ✅ [SEO SAFE] Set html lang attribute
    document.documentElement.lang = 'en-IN';

    // ✅ [SAFE - No visual change] Helper function to set or update meta tags
    const setMetaTag = (attr, attrValue, content) => {
      let element = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // ✅ [SAFE - No visual change] Helper function to set or update link tags
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
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
    setMetaTag('name', 'twitter:creator', '@brancha_in');

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

    // ✅ [SAFE - No visual change] Cleanup function
    return () => {
      // Remove page-specific schema on unmount
      const schemaScript = document.querySelector('script[type="application/ld+json"][data-schema="page"]');
      if (schemaScript) {
        schemaScript.remove();
      }
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