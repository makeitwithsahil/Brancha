/**
 * Version Checker - Auto-detects and prompts for app updates
 * Ensures users always see the latest version without hard refresh
 */

const VERSION_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes
const VERSION_KEY = 'brancha_app_version';
const LAST_CHECK_KEY = 'brancha_last_version_check';

/**
 * Get current build timestamp from meta tag
 */
function getCurrentVersion() {
  const metaTag = document.querySelector('meta[name="build-timestamp"]');
  return metaTag ? metaTag.getAttribute('content') : null;
}

/**
 * Get stored version
 */
function getStoredVersion() {
  try {
    return sessionStorage.getItem(VERSION_KEY);
  } catch {
    return null;
  }
}

/**
 * Store current version
 */
function storeVersion(version) {
  try {
    sessionStorage.setItem(VERSION_KEY, version);
    sessionStorage.setItem(LAST_CHECK_KEY, Date.now().toString());
  } catch (e) {
    console.warn('Failed to store version:', e);
  }
}

/**
 * Check if update is available by fetching index.html
 */
async function checkForUpdate() {
  try {
    // Fetch index.html with cache-busting
    const response = await fetch(`/index.html?_=${Date.now()}`, {
      method: 'HEAD',
      cache: 'no-cache',
    });

    if (!response.ok) {
      return false;
    }

    // Check ETag or Last-Modified headers
    const etag = response.headers.get('etag');
    const lastModified = response.headers.get('last-modified');
    
    const currentEtag = sessionStorage.getItem('brancha_etag');
    const currentLastModified = sessionStorage.getItem('brancha_last_modified');

    // Store current values
    if (etag) {
      sessionStorage.setItem('brancha_etag', etag);
    }
    if (lastModified) {
      sessionStorage.setItem('brancha_last_modified', lastModified);
    }

    // If we have previous values and they changed, there's an update
    if (currentEtag && etag && currentEtag !== etag) {
      return true;
    }
    if (currentLastModified && lastModified && currentLastModified !== lastModified) {
      return true;
    }

    return false;
  } catch (error) {
    console.warn('Version check failed:', error);
    return false;
  }
}

/**
 * Show update notification
 */
function showUpdateNotification() {
  // Check if notification already exists
  if (document.getElementById('brancha-update-notification')) {
    return;
  }

  const notification = document.createElement('div');
  notification.id = 'brancha-update-notification';
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #e2493b;
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 320px;
      font-family: system-ui, -apple-system, sans-serif;
      animation: slideIn 0.3s ease-out;
    ">
      <div style="font-weight: 600; margin-bottom: 8px;">
        Update Available
      </div>
      <div style="font-size: 14px; opacity: 0.95; margin-bottom: 12px;">
        A new version is available. Refresh to get the latest updates.
      </div>
      <div style="display: flex; gap: 8px;">
        <button 
          onclick="window.location.reload(true)" 
          style="
            flex: 1;
            background: white;
            color: #e2493b;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
          "
        >
          Refresh Now
        </button>
        <button 
          onclick="this.closest('#brancha-update-notification').remove()" 
          style="
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
          "
        >
          Later
        </button>
      </div>
    </div>
    <style>
      @keyframes slideIn {
        from {
          transform: translateY(100px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    </style>
  `;

  document.body.appendChild(notification);

  // Auto-remove after 30 seconds if not interacted with
  setTimeout(() => {
    const element = document.getElementById('brancha-update-notification');
    if (element) {
      element.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => element.remove(), 300);
    }
  }, 30000);
}

/**
 * Initialize version checker
 */
export function initializeVersionChecker() {
  // Store initial version
  const currentVersion = getCurrentVersion();
  if (currentVersion && !getStoredVersion()) {
    storeVersion(currentVersion);
  }

  // Check for updates periodically
  const checkInterval = setInterval(async () => {
    const hasUpdate = await checkForUpdate();
    
    if (hasUpdate) {
      showUpdateNotification();
      clearInterval(checkInterval); // Stop checking once update is found
    }
  }, VERSION_CHECK_INTERVAL);

  // Check when page becomes visible (user switches back to tab)
  document.addEventListener('visibilitychange', async () => {
    if (!document.hidden) {
      const lastCheck = sessionStorage.getItem(LAST_CHECK_KEY);
      const now = Date.now();
      
      // Only check if last check was more than 2 minutes ago
      if (!lastCheck || now - parseInt(lastCheck) > 2 * 60 * 1000) {
        const hasUpdate = await checkForUpdate();
        if (hasUpdate) {
          showUpdateNotification();
        }
      }
    }
  });

  // Initial check after 10 seconds
  setTimeout(async () => {
    const hasUpdate = await checkForUpdate();
    if (hasUpdate) {
      showUpdateNotification();
    }
  }, 10000);
}

/**
 * Force reload with cache clear
 */
export function forceReload() {
  // Clear service worker cache if exists
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach(registration => registration.unregister());
    });
  }

  // Clear all caches
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach(name => caches.delete(name));
    });
  }

  // Hard reload
  window.location.reload(true);
}
