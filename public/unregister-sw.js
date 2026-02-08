// Unregister all service workers - Brancha
// This script ensures clean state by removing any legacy service workers

(function() {
  'use strict';

  // Only run if service workers are supported
  if (!('serviceWorker' in navigator)) {
    return;
  }

  // Unregister all service workers
  navigator.serviceWorker.getRegistrations()
    .then(function(registrations) {
      if (registrations.length === 0) {
        return;
      }
      
      // Unregister each service worker
      const unregisterPromises = registrations.map(function(registration) {
        return registration.unregister()
          .then(function(success) {
            if (success) {
              console.info('Service worker unregistered successfully');
            }
            return success;
          })
          .catch(function(error) {
            console.error('Failed to unregister service worker:', error);
            return false;
          });
      });
      
      return Promise.all(unregisterPromises);
    })
    .catch(function(error) {
      console.error('Error getting service worker registrations:', error);
    });
  
  // Clear all caches
  if ('caches' in window) {
    caches.keys()
      .then(function(cacheNames) {
        if (cacheNames.length === 0) {
          return;
        }
        
        // Delete each cache
        const deletePromises = cacheNames.map(function(cacheName) {
          return caches.delete(cacheName)
            .then(function(success) {
              if (success) {
                console.info('Cache deleted successfully:', cacheName);
              }
              return success;
            })
            .catch(function(error) {
              console.error('Failed to delete cache:', cacheName, error);
              return false;
            });
        });
        
        return Promise.all(deletePromises);
      })
      .catch(function(error) {
        console.error('Error clearing caches:', error);
      });
  }
})();
