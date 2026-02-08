import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';

// Error boundary fallback
const renderErrorFallback = (error) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; font-family: system-ui, sans-serif; background: #FAF9F7;">
        <div style="max-width: 600px; text-align: center;">
          <h1 style="color: #e2493b; margin-bottom: 1rem; font-size: 2rem;">Application Error</h1>
          <p style="color: #6B6B6B; margin-bottom: 1.5rem;">We're sorry, but something went wrong. Please try refreshing the page.</p>
          <button 
            onclick="window.location.reload()" 
            style="background: #e2493b; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem; font-weight: 500;"
          >
            Refresh Page
          </button>
          ${import.meta.env.DEV ? `<pre style="margin-top: 2rem; padding: 1rem; background: #EFEDE9; border-radius: 0.5rem; text-align: left; overflow: auto; font-size: 0.875rem;"><code>${error.stack || error.message}</code></pre>` : ''}
        </div>
      </div>
    `;
  }
};

// Handle global errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  if (import.meta.env.DEV) {
    console.error('Error details:', event);
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  if (import.meta.env.DEV) {
    console.error('Promise:', event.promise);
  }
});

// Main render function
try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );

  // Log successful mount in development
  if (import.meta.env.DEV) {
    console.log('✅ Brancha app mounted successfully');
  }
} catch (error) {
  console.error('Failed to render app:', error);
  renderErrorFallback(error);
}
