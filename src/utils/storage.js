/**
 * Storage Utility - Production-grade storage management
 * Handles localStorage, sessionStorage, and cookies with consent awareness
 * Enhanced with journey tracking, preferences, and performance monitoring
 */

// Storage keys namespace to avoid conflicts
const STORAGE_PREFIX = 'brancha_';

// Consent management
const CONSENT_KEY = `${STORAGE_PREFIX}consent`;
const INITIALIZED_KEY = `${STORAGE_PREFIX}initialized`;

/**
 * Check if storage is available
 */
export const isStorageAvailable = (type = 'localStorage') => {
  try {
    const storage = window[type];
    const test = '__storage_test__';
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Check if user has consented to storage
 */
export const hasStorageConsent = () => {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    return consent === 'true';
  } catch {
    return false;
  }
};

/**
 * Set storage consent
 */
export const setStorageConsent = (consented = true) => {
  try {
    localStorage.setItem(CONSENT_KEY, String(consented));
    if (!consented) {
      clearAllStorage();
    }
  } catch (e) {
    console.error('Failed to set consent:', e);
  }
};

/**
 * Initialize storage system
 */
export const initializeStorage = () => {
  try {
    const isInitialized = sessionStorage.getItem(INITIALIZED_KEY);
    
    if (!isInitialized) {
      // Mark as initialized for this session
      sessionStorage.setItem(INITIALIZED_KEY, 'true');
      
      // Clean up expired storage on init
      cleanupExpiredStorage();
      
      // Mark returning user if applicable
      const hasVisited = localStorage.getItem(`${STORAGE_PREFIX}returning_user`);
      if (!hasVisited) {
        localStorage.setItem(`${STORAGE_PREFIX}returning_user`, 'true');
      }
    }
    
    return true;
  } catch (e) {
    console.warn('Storage initialization failed:', e);
    return false;
  }
};

/**
 * Clean up expired storage items
 */
export const cleanupExpiredStorage = () => {
  try {
    const storageTypes = [localStorage, sessionStorage];
    
    storageTypes.forEach(storageType => {
      const keys = Object.keys(storageType);
      
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX) && key !== CONSENT_KEY) {
          try {
            const item = storageType.getItem(key);
            const data = JSON.parse(item);
            
            // Remove if expired
            if (data.expiresAt && Date.now() > data.expiresAt) {
              storageType.removeItem(key);
            }
          } catch {
            // Invalid JSON, skip
          }
        }
      });
    });
  } catch (e) {
    console.warn('Storage cleanup failed:', e);
  }
};

/**
 * Safe localStorage methods
 */
export const storage = {
  set: (key, value, options = {}) => {
    const { temporary = false, consent = true } = options;
    
    if (consent && !hasStorageConsent()) {
      return false;
    }

    try {
      const prefixedKey = `${STORAGE_PREFIX}${key}`;
      const data = {
        value,
        timestamp: Date.now(),
        ...(options.expiresIn && { expiresAt: Date.now() + options.expiresIn })
      };
      
      const storageType = temporary ? sessionStorage : localStorage;
      storageType.setItem(prefixedKey, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('Storage set failed:', e);
      return false;
    }
  },

  get: (key, options = {}) => {
    const { temporary = false, consent = true } = options;
    
    if (consent && !hasStorageConsent()) {
      return null;
    }

    try {
      const prefixedKey = `${STORAGE_PREFIX}${key}`;
      const storageType = temporary ? sessionStorage : localStorage;
      const item = storageType.getItem(prefixedKey);
      
      if (!item) return null;
      
      const data = JSON.parse(item);
      
      // Check expiration
      if (data.expiresAt && Date.now() > data.expiresAt) {
        storageType.removeItem(prefixedKey);
        return null;
      }
      
      return data.value;
    } catch (e) {
      console.warn('Storage get failed:', e);
      return null;
    }
  },

  remove: (key, options = {}) => {
    const { temporary = false } = options;
    try {
      const prefixedKey = `${STORAGE_PREFIX}${key}`;
      const storageType = temporary ? sessionStorage : localStorage;
      storageType.removeItem(prefixedKey);
      return true;
    } catch (e) {
      console.warn('Storage remove failed:', e);
      return false;
    }
  },

  clear: (options = {}) => {
    const { temporary = false } = options;
    try {
      const storageType = temporary ? sessionStorage : localStorage;
      const keys = Object.keys(storageType);
      
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX) && key !== CONSENT_KEY) {
          storageType.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.warn('Storage clear failed:', e);
      return false;
    }
  }
};

/**
 * Cookie utilities
 */
export const cookies = {
  set: (name, value, days = 365) => {
    if (!hasStorageConsent()) return false;
    
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      const cookie = `${STORAGE_PREFIX}${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
      document.cookie = cookie;
      return true;
    } catch (e) {
      console.warn('Cookie set failed:', e);
      return false;
    }
  },

  get: (name) => {
    try {
      const nameEQ = `${STORAGE_PREFIX}${name}=`;
      const ca = document.cookie.split(';');
      
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    } catch (e) {
      console.warn('Cookie get failed:', e);
      return null;
    }
  },

  remove: (name) => {
    try {
      document.cookie = `${STORAGE_PREFIX}${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      return true;
    } catch (e) {
      console.warn('Cookie remove failed:', e);
      return false;
    }
  }
};

/**
 * Clear all storage (respects consent key)
 */
const clearAllStorage = () => {
  storage.clear({ temporary: false });
  storage.clear({ temporary: true });
  
  // Clear cookies
  const allCookies = document.cookie.split(';');
  allCookies.forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    if (name.startsWith(STORAGE_PREFIX) && name !== CONSENT_KEY) {
      const cookieName = name.replace(STORAGE_PREFIX, '');
      cookies.remove(cookieName);
    }
  });
};

/**
 * Form persistence helpers
 */
export const formStorage = {
  save: (formId, data) => {
    return storage.set(`form_${formId}`, data, { temporary: true });
  },

  load: (formId) => {
    return storage.get(`form_${formId}`, { temporary: true });
  },

  clear: (formId) => {
    return storage.remove(`form_${formId}`, { temporary: true });
  }
};

/**
 * User preferences management
 */
export const userPreferences = {
  update: (key, value) => {
    return storage.set(`pref_${key}`, value, { consent: false });
  },

  get: (key, defaultValue = null) => {
    const value = storage.get(`pref_${key}`, { consent: false });
    return value !== null ? value : defaultValue;
  },

  remove: (key) => {
    return storage.remove(`pref_${key}`, { consent: false });
  },

  getAll: () => {
    try {
      const prefs = {};
      const keys = Object.keys(localStorage);
      
      keys.forEach(key => {
        if (key.startsWith(`${STORAGE_PREFIX}pref_`)) {
          const prefKey = key.replace(`${STORAGE_PREFIX}pref_`, '');
          prefs[prefKey] = storage.get(`pref_${prefKey}`, { consent: false });
        }
      });
      
      return prefs;
    } catch {
      return {};
    }
  }
};

/**
 * Journey tracking - privacy-safe page visit tracking
 */
export const journeyTracking = {
  addPage: (pageName, url) => {
    try {
      const journey = storage.get('user_journey', { temporary: true, consent: false }) || [];
      
      journey.push({
        page: pageName,
        url,
        timestamp: Date.now(),
        sessionId: getSessionId()
      });
      
      // Keep only last 20 pages to limit storage
      const recentJourney = journey.slice(-20);
      
      storage.set('user_journey', recentJourney, { temporary: true, consent: false });
      
      return true;
    } catch (e) {
      console.warn('Journey tracking failed:', e);
      return false;
    }
  },

  getJourney: () => {
    return storage.get('user_journey', { temporary: true, consent: false }) || [];
  },

  hasVisited: (pageName) => {
    const journey = journeyTracking.getJourney();
    return journey.some(entry => entry.page === pageName);
  },

  getPreviousPage: () => {
    const journey = journeyTracking.getJourney();
    return journey.length > 1 ? journey[journey.length - 2] : null;
  },

  clear: () => {
    return storage.remove('user_journey', { temporary: true, consent: false });
  }
};

/**
 * Performance tracking
 */
export const performanceTracking = {
  track: (pageName, metrics) => {
    try {
      const perfData = storage.get('perf_data', { temporary: true, consent: false }) || {};
      
      if (!perfData[pageName]) {
        perfData[pageName] = [];
      }
      
      perfData[pageName].push({
        ...metrics,
        timestamp: Date.now()
      });
      
      // Keep only last 5 measurements per page
      perfData[pageName] = perfData[pageName].slice(-5);
      
      storage.set('perf_data', perfData, { temporary: true, consent: false });
      
      return true;
    } catch (e) {
      console.warn('Performance tracking failed:', e);
      return false;
    }
  },

  getMetrics: (pageName) => {
    const perfData = storage.get('perf_data', { temporary: true, consent: false }) || {};
    return perfData[pageName] || [];
  },

  getAverageLoadTime: (pageName) => {
    const metrics = performanceTracking.getMetrics(pageName);
    if (metrics.length === 0) return null;
    
    const total = metrics.reduce((sum, m) => sum + (m.loadTime || 0), 0);
    return Math.round(total / metrics.length);
  }
};

/**
 * Session management
 */
export const session = {
  markVisited: (page) => {
    const visited = storage.get('visited_pages', { temporary: true, consent: false }) || [];
    if (!visited.includes(page)) {
      visited.push(page);
      storage.set('visited_pages', visited, { temporary: true, consent: false });
    }
  },

  getVisited: () => {
    return storage.get('visited_pages', { temporary: true, consent: false }) || [];
  },

  hasVisited: (page) => {
    const visited = session.getVisited();
    return visited.includes(page);
  },

  isReturningUser: () => {
    try {
      return localStorage.getItem(`${STORAGE_PREFIX}returning_user`) === 'true';
    } catch {
      return false;
    }
  },

  markReturningUser: () => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}returning_user`, 'true');
    } catch (e) {
      console.warn('Failed to mark returning user:', e);
    }
  }
};

/**
 * Get or create session ID
 */
function getSessionId() {
  let sessionId = sessionStorage.getItem(`${STORAGE_PREFIX}session_id`);
  
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(`${STORAGE_PREFIX}session_id`, sessionId);
  }
  
  return sessionId;
}

/**
 * Lead intent tracking (for contact forms, etc.)
 */
export const leadIntent = {
  markInterest: (vertical) => {
    const interests = storage.get('lead_interests', { consent: false }) || [];
    if (!interests.includes(vertical)) {
      interests.push(vertical);
      storage.set('lead_interests', interests, { consent: false });
    }
  },

  getInterests: () => {
    return storage.get('lead_interests', { consent: false }) || [];
  },

  hasInterest: (vertical) => {
    const interests = leadIntent.getInterests();
    return interests.includes(vertical);
  }
};

/**
 * Contact form submission status (persists in localStorage)
 */
export const contactFormStatus = {
  markSubmitted: () => {
    return storage.set('contact_submitted', true, { consent: false, temporary: false });
  },

  isSubmitted: () => {
    return storage.get('contact_submitted', { consent: false, temporary: false }) === true;
  },

  clear: () => {
    return storage.remove('contact_submitted', { consent: false, temporary: false });
  }
};

/**
 * Contact form draft management (alias for formStorage)
 */
export const contactFormDraft = {
  save: (data) => {
    return formStorage.save('contact', data);
  },

  get: () => {
    return formStorage.load('contact');
  },

  load: () => {
    return formStorage.load('contact');
  },

  clear: () => {
    return formStorage.clear('contact');
  }
};

/**
 * Package interest tracking
 */
export const packageInterest = {
  set: (packageName) => {
    return storage.set('selected_package', packageName, { consent: false, temporary: true });
  },

  get: () => {
    return storage.get('selected_package', { consent: false, temporary: true });
  },

  getMostInterested: () => {
    return storage.get('selected_package', { consent: false, temporary: true });
  },

  clear: () => {
    return storage.remove('selected_package', { consent: false, temporary: true });
  }
};

/**
 * Visitor tracking (alias for session tracking)
 */
export const visitorTracking = {
  markVisited: (page) => {
    return session.markVisited(page);
  },

  getVisited: () => {
    return session.getVisited();
  },

  hasVisited: (page) => {
    return session.hasVisited(page);
  },

  isReturningUser: () => {
    return session.isReturningUser();
  }
};
