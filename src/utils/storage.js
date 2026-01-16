// src/utils/storage.js
/**
 * Storage Utility for Brancha Website
 * Enhanced with better error handling, performance optimization, and user experience features
 */

// ==================== COOKIE UTILITIES ====================

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiry in days (default: 365)
 * @param {object} options - Additional options (path, domain, secure, sameSite)
 */
export const setCookie = (name, value, days = 365, options = {}) => {
  try {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    
    const expires = `expires=${date.toUTCString()}`;
    const path = options.path || 'path=/';
    const domain = options.domain ? `domain=${options.domain}` : '';
    const secure = options.secure ? 'secure' : '';
    const sameSite = options.sameSite ? `SameSite=${options.sameSite}` : 'SameSite=Lax';
    
    const cookieString = [
      `${name}=${encodeURIComponent(value)}`,
      expires,
      path,
      domain,
      secure,
      sameSite
    ].filter(Boolean).join('; ');
    
    document.cookie = cookieString;
    return true;
  } catch (error) {
    console.error('Error setting cookie:', error);
    return false;
  }
};

/**
 * Get a cookie value
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null
 */
export const getCookie = (name) => {
  try {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      let c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 * @param {object} options - Options (path, domain)
 */
export const deleteCookie = (name, options = {}) => {
  try {
    setCookie(name, '', -1, options);
    return true;
  } catch (error) {
    console.error('Error deleting cookie:', error);
    return false;
  }
};

// ==================== LOCAL STORAGE UTILITIES ====================

/**
 * Check if localStorage is available
 */
const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Set item in localStorage with expiry
 * @param {string} key - Storage key
 * @param {any} value - Value to store (will be JSON stringified)
 * @param {number} expiryDays - Days until expiry (optional)
 */
export const setLocalStorage = (key, value, expiryDays = null) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available');
    return false;
  }
  
  try {
    const item = {
      value: value,
      timestamp: Date.now(),
      expiry: expiryDays ? Date.now() + (expiryDays * 24 * 60 * 60 * 1000) : null
    };
    localStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error('Error setting localStorage:', error);
    // Try to clear old items if quota exceeded
    if (error.name === 'QuotaExceededError') {
      cleanupExpiredStorage();
      try {
        const item = {
          value: value,
          timestamp: Date.now(),
          expiry: expiryDays ? Date.now() + (expiryDays * 24 * 60 * 60 * 1000) : null
        };
        localStorage.setItem(key, JSON.stringify(item));
        return true;
      } catch (retryError) {
        console.error('Error setting localStorage after cleanup:', retryError);
        return false;
      }
    }
    return false;
  }
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @returns {any|null} Stored value or null
 */
export const getLocalStorage = (key) => {
  if (!isLocalStorageAvailable()) {
    return null;
  }
  
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    
    // Check if expired
    if (item.expiry && Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  } catch (error) {
    console.error('Error getting localStorage:', error);
    return null;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeLocalStorage = (key) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing localStorage:', error);
    return false;
  }
};

/**
 * Clear all localStorage
 */
export const clearLocalStorage = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// ==================== SESSION STORAGE UTILITIES ====================

/**
 * Check if sessionStorage is available
 */
const isSessionStorageAvailable = () => {
  try {
    const test = '__sessionStorage_test__';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Set item in sessionStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const setSessionStorage = (key, value) => {
  if (!isSessionStorageAvailable()) {
    console.warn('sessionStorage not available');
    return false;
  }
  
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error setting sessionStorage:', error);
    return false;
  }
};

/**
 * Get item from sessionStorage
 * @param {string} key - Storage key
 * @returns {any|null} Stored value or null
 */
export const getSessionStorage = (key) => {
  if (!isSessionStorageAvailable()) {
    return null;
  }
  
  try {
    const itemStr = sessionStorage.getItem(key);
    return itemStr ? JSON.parse(itemStr) : null;
  } catch (error) {
    console.error('Error getting sessionStorage:', error);
    return null;
  }
};

/**
 * Remove item from sessionStorage
 * @param {string} key - Storage key
 */
export const removeSessionStorage = (key) => {
  if (!isSessionStorageAvailable()) {
    return false;
  }
  
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing sessionStorage:', error);
    return false;
  }
};

// ==================== BRANCHA SPECIFIC UTILITIES ====================

/**
 * User preferences storage
 */
export const userPreferences = {
  set: (preferences) => setLocalStorage('brancha_user_preferences', preferences),
  get: () => getLocalStorage('brancha_user_preferences') || {},
  update: (key, value) => {
    const prefs = userPreferences.get();
    prefs[key] = value;
    prefs.lastUpdated = Date.now();
    userPreferences.set(prefs);
  },
  remove: () => removeLocalStorage('brancha_user_preferences')
};

/**
 * Contact form draft storage
 */
export const contactFormDraft = {
  save: (formData) => {
    const draft = {
      ...formData,
      savedAt: Date.now()
    };
    return setLocalStorage('brancha_contact_draft', draft, 7); // 7 days expiry
  },
  get: () => {
    const draft = getLocalStorage('brancha_contact_draft');
    // Only return if saved within last 7 days
    if (draft && draft.savedAt && (Date.now() - draft.savedAt) < (7 * 24 * 60 * 60 * 1000)) {
      return draft;
    }
    return null;
  },
  clear: () => removeLocalStorage('brancha_contact_draft')
};

/**
 * Recently viewed blog posts with better tracking
 */
export const recentlyViewedPosts = {
  add: (postSlug, postTitle) => {
    try {
      const recent = recentlyViewedPosts.get();
      const newPost = { 
        slug: postSlug, 
        title: postTitle, 
        timestamp: Date.now(),
        viewCount: 1
      };
      
      // Check if post already exists
      const existingIndex = recent.findIndex(p => p.slug === postSlug);
      
      if (existingIndex !== -1) {
        // Update view count and timestamp
        recent[existingIndex].timestamp = Date.now();
        recent[existingIndex].viewCount += 1;
        // Move to front
        const updated = recent[existingIndex];
        recent.splice(existingIndex, 1);
        recent.unshift(updated);
      } else {
        // Add to beginning
        recent.unshift(newPost);
      }
      
      // Keep only last 10
      const updated = recent.slice(0, 10);
      
      setLocalStorage('brancha_recent_posts', updated, 30);
      return true;
    } catch (error) {
      console.error('Error adding recent post:', error);
      return false;
    }
  },
  get: () => getLocalStorage('brancha_recent_posts') || [],
  clear: () => removeLocalStorage('brancha_recent_posts'),
  getMostViewed: () => {
    const posts = recentlyViewedPosts.get();
    return posts.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  }
};

/**
 * Enhanced visitor tracking with persistent visit counting
 */
export const visitorTracking = {
  markVisit: () => {
    try {
      const data = visitorTracking.getData();
      const now = Date.now();
      const lastVisit = data.lastVisit || 0;
      const timeSinceLastVisit = now - lastVisit;
      
      // Count as new visit if more than 30 minutes since last visit
      const isNewSession = timeSinceLastVisit > (30 * 60 * 1000);
      
      const updated = {
        visitCount: data.visitCount + 1,
        sessionCount: isNewSession ? (data.sessionCount || 0) + 1 : (data.sessionCount || 1),
        lastVisit: now,
        firstVisit: data.firstVisit || now,
        visits: [
          ...(data.visits || []),
          { timestamp: now, isNewSession }
        ].slice(-50) // Keep last 50 visits
      };
      
      setLocalStorage('brancha_visitor_data', updated);
      
      // Also set a cookie for cross-session tracking
      setCookie('brancha_visitor_id', data.visitorId || generateVisitorId(), 365);
      
      return updated;
    } catch (error) {
      console.error('Error marking visit:', error);
      return null;
    }
  },
  
  getData: () => {
    const data = getLocalStorage('brancha_visitor_data');
    if (data) {
      return data;
    }
    
    // Initialize new visitor
    return {
      visitCount: 0,
      sessionCount: 0,
      lastVisit: null,
      firstVisit: null,
      visitorId: generateVisitorId(),
      visits: []
    };
  },
  
  getVisitCount: () => {
    const data = visitorTracking.getData();
    return data.visitCount || 0;
  },
  
  getSessionCount: () => {
    const data = visitorTracking.getData();
    return data.sessionCount || 0;
  },
  
  getFirstVisit: () => {
    const data = visitorTracking.getData();
    return data.firstVisit;
  },
  
  isReturning: () => visitorTracking.getSessionCount() > 1,
  
  getDaysSinceFirstVisit: () => {
    const firstVisit = visitorTracking.getFirstVisit();
    if (!firstVisit) return 0;
    return Math.floor((Date.now() - firstVisit) / (24 * 60 * 60 * 1000));
  }
};

/**
 * Generate a unique visitor ID
 */
function generateVisitorId() {
  return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Cookie consent management with visit-based re-prompting
 */
export const cookieConsent = {
  set: (consent) => {
    try {
      const consentData = {
        ...consent,
        timestamp: Date.now(),
        version: '1.0'
      };
      
      setCookie('brancha_cookie_consent', JSON.stringify(consentData), 365);
      setLocalStorage('brancha_cookie_consent', consentData);
      
      // Reset the prompt counter since they've made a choice
      removeLocalStorage('brancha_consent_prompts');
      
      return true;
    } catch (error) {
      console.error('Error setting cookie consent:', error);
      return false;
    }
  },
  
  get: () => {
    // Check cookie first (more persistent)
    const cookie = getCookie('brancha_cookie_consent');
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
      }
    }
    
    // Fallback to localStorage
    return getLocalStorage('brancha_cookie_consent');
  },
  
  hasConsented: () => {
    const consent = cookieConsent.get();
    return consent && consent.necessary === true;
  },
  
  shouldShowBanner: () => {
    // If they've already consented, don't show
    if (cookieConsent.hasConsented()) {
      return false;
    }
    
    // Track how many times we've shown the banner
    const prompts = getLocalStorage('brancha_consent_prompts') || { count: 0, lastShown: 0 };
    const sessionCount = visitorTracking.getSessionCount();
    
    // Show on first visit
    if (sessionCount <= 1) {
      return true;
    }
    
    // Show every 4-5 visits after initial decline
    // Random between 4 and 5 to feel more natural
    const showInterval = Math.random() > 0.5 ? 4 : 5;
    const shouldShow = sessionCount % showInterval === 0;
    
    if (shouldShow) {
      // Update prompt counter
      setLocalStorage('brancha_consent_prompts', {
        count: prompts.count + 1,
        lastShown: Date.now()
      }, 365);
      
      return true;
    }
    
    return false;
  },
  
  clear: () => {
    deleteCookie('brancha_cookie_consent');
    removeLocalStorage('brancha_cookie_consent');
    removeLocalStorage('brancha_consent_prompts');
  }
};

/**
 * Service package interest tracking
 */
export const packageInterest = {
  track: (packageName) => {
    try {
      const interests = packageInterest.get();
      const updated = {
        ...interests,
        [packageName]: {
          views: (interests[packageName]?.views || 0) + 1,
          lastViewed: Date.now(),
          firstViewed: interests[packageName]?.firstViewed || Date.now()
        }
      };
      setLocalStorage('brancha_package_interest', updated, 90); // 90 days
      return true;
    } catch (error) {
      console.error('Error tracking package interest:', error);
      return false;
    }
  },
  
  get: () => getLocalStorage('brancha_package_interest') || {},
  
  getMostInterested: () => {
    const interests = packageInterest.get();
    const packages = Object.entries(interests)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => (b.views || 0) - (a.views || 0));
    
    return packages.length > 0 ? packages[0].name : null;
  },
  
  clear: () => removeLocalStorage('brancha_package_interest')
};

/**
 * Newsletter subscription status
 */
export const newsletterStatus = {
  set: (email, subscribed = true) => {
    const status = {
      email: email,
      subscribed: subscribed,
      timestamp: Date.now()
    };
    setLocalStorage('brancha_newsletter', status, 365);
    return true;
  },
  
  get: () => getLocalStorage('brancha_newsletter'),
  
  isSubscribed: () => {
    const status = newsletterStatus.get();
    return status && status.subscribed === true;
  },
  
  clear: () => removeLocalStorage('brancha_newsletter')
};

/**
 * User journey tracking with enhanced analytics
 */
export const journeyTracking = {
  addPage: (pageName, pageUrl) => {
    try {
      const journey = journeyTracking.get();
      const page = {
        name: pageName,
        url: pageUrl,
        timestamp: Date.now(),
        referrer: document.referrer || 'direct'
      };
      
      // Don't add duplicate consecutive pages
      const lastPage = journey[journey.length - 1];
      if (lastPage && lastPage.url === pageUrl) {
        return false;
      }
      
      const updated = [...journey, page].slice(-20); // Keep last 20 pages
      setSessionStorage('brancha_journey', updated);
      
      // Also save to localStorage for cross-session analysis
      const allJourneys = getLocalStorage('brancha_all_journeys') || [];
      allJourneys.push(page);
      setLocalStorage('brancha_all_journeys', allJourneys.slice(-100), 30); // Keep last 100
      
      return true;
    } catch (error) {
      console.error('Error adding page to journey:', error);
      return false;
    }
  },
  
  get: () => getSessionStorage('brancha_journey') || [],
  
  getAll: () => getLocalStorage('brancha_all_journeys') || [],
  
  getMostVisitedPages: () => {
    const pages = journeyTracking.getAll();
    const counts = {};
    
    pages.forEach(page => {
      counts[page.url] = (counts[page.url] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  },
  
  clear: () => {
    removeSessionStorage('brancha_journey');
    removeLocalStorage('brancha_all_journeys');
  }
};

/**
 * Scroll position memory for better UX
 */
export const scrollMemory = {
  save: (pageUrl, position) => {
    try {
      const positions = scrollMemory.getAll();
      positions[pageUrl] = {
        position,
        timestamp: Date.now()
      };
      setSessionStorage('brancha_scroll_positions', positions);
      return true;
    } catch (error) {
      console.error('Error saving scroll position:', error);
      return false;
    }
  },
  
  get: (pageUrl) => {
    try {
      const positions = scrollMemory.getAll();
      const data = positions[pageUrl];
      
      // Only restore if saved within last 5 minutes
      if (data && (Date.now() - data.timestamp) < (5 * 60 * 1000)) {
        return data.position;
      }
      
      return 0;
    } catch (error) {
      console.error('Error getting scroll position:', error);
      return 0;
    }
  },
  
  getAll: () => getSessionStorage('brancha_scroll_positions') || {},
  
  clear: () => removeSessionStorage('brancha_scroll_positions')
};

/**
 * Page performance tracking
 */
export const performanceTracking = {
  track: (pageName, metrics) => {
    try {
      const tracking = performanceTracking.get();
      
      if (!tracking[pageName]) {
        tracking[pageName] = {
          loads: [],
          avgLoadTime: 0
        };
      }
      
      tracking[pageName].loads.push({
        ...metrics,
        timestamp: Date.now()
      });
      
      // Keep last 10 loads per page
      tracking[pageName].loads = tracking[pageName].loads.slice(-10);
      
      // Calculate average
      const loads = tracking[pageName].loads;
      tracking[pageName].avgLoadTime = 
        loads.reduce((sum, load) => sum + (load.loadTime || 0), 0) / loads.length;
      
      setLocalStorage('brancha_performance', tracking, 7);
      return true;
    } catch (error) {
      console.error('Error tracking performance:', error);
      return false;
    }
  },
  
  get: () => getLocalStorage('brancha_performance') || {},
  
  clear: () => removeLocalStorage('brancha_performance')
};

// ==================== CLEANUP UTILITIES ====================

/**
 * Clean up expired items from localStorage
 */
export const cleanupExpiredStorage = () => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    const keys = Object.keys(localStorage);
    let cleanedCount = 0;
    
    keys.forEach(key => {
      if (key.startsWith('brancha_')) {
        const item = getLocalStorage(key);
        // getLocalStorage will auto-remove expired items
        if (item === null) {
          cleanedCount++;
        }
      }
    });
    
    if (cleanedCount > 0) {
      console.log(`Cleaned up ${cleanedCount} expired storage items`);
    }
  } catch (error) {
    console.error('Error cleaning up storage:', error);
  }
};

/**
 * Get storage usage statistics
 */
export const getStorageStats = () => {
  if (!isLocalStorageAvailable()) {
    return null;
  }
  
  try {
    let totalSize = 0;
    let branchaSize = 0;
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      const itemSize = key.length + (value ? value.length : 0);
      totalSize += itemSize;
      
      if (key.startsWith('brancha_')) {
        branchaSize += itemSize;
      }
    });
    
    return {
      items: keys.length,
      branchaItems: keys.filter(k => k.startsWith('brancha_')).length,
      totalSizeBytes: totalSize,
      branchaSizeBytes: branchaSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      branchaSizeKB: (branchaSize / 1024).toFixed(2),
      percentUsed: ((totalSize / (5 * 1024 * 1024)) * 100).toFixed(2) // Assuming 5MB limit
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);
    return null;
  }
};

/**
 * Initialize storage - call this on app start
 */
export const initializeStorage = () => {
  try {
    // Clean up expired items
    cleanupExpiredStorage();
    
    // Mark visit
    visitorTracking.markVisit();
    
    // Log storage stats in development
    if (process.env.NODE_ENV === 'development') {
      const stats = getStorageStats();
      if (stats) {
        console.log('Storage Stats:', stats);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing storage:', error);
    return false;
  }
};

// ==================== EXPORT DEFAULT ====================

export default {
  // Cookie methods
  setCookie,
  getCookie,
  deleteCookie,
  
  // LocalStorage methods
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  
  // SessionStorage methods
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  
  // Brancha specific
  userPreferences,
  contactFormDraft,
  recentlyViewedPosts,
  visitorTracking,
  cookieConsent,
  packageInterest,
  newsletterStatus,
  journeyTracking,
  scrollMemory,
  performanceTracking,
  
  // Utilities
  cleanupExpiredStorage,
  getStorageStats,
  initializeStorage
};
