import * as Sentry from '@sentry/react';

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Sentry for error monitoring
export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn) {
    console.warn('Sentry DSN not found - error monitoring disabled');
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.DEV ? 'development' : 'production',
    release: import.meta.env.VITE_APP_VERSION || '1.0.0',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event) {
      // Filter out development errors in production
      if (import.meta.env.DEV) return event;
      
      // Don't send cancelled network requests
      if (event.exception?.values?.[0]?.value?.includes('AbortError')) {
        return null;
      }
      
      return event;
    },
  });
};

// Initialize Google Analytics with GDPR compliance
export const initGoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics measurement ID not found');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  
  // Make gtag available globally
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true, // GDPR compliance
    cookie_flags: 'SameSite=Strict;Secure',
    allow_google_signals: false, // Disable advertising features for privacy
  });
};

// Google Analytics event tracking
export const trackGAEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    });
  }
};

// Google Analytics page view tracking
export const trackGAPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

// Health check endpoint data
export const getHealthStatus = () => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.DEV ? 'development' : 'production',
    services: {
      frontend: 'operational',
      supabase: 'operational', // You can add actual checks here
    },
  };
};

// Error boundary for Sentry
export const SentryErrorBoundary = Sentry.withErrorBoundary;

// Log errors to Sentry
export const logError = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    extra: context,
    level: 'error',
  });
};

// Log warnings to Sentry
export const logWarning = (message: string, context?: Record<string, any>) => {
  Sentry.captureMessage(message, {
    level: 'warning',
    extra: context,
  });
};

// Set user context for Sentry
export const setSentryUser = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

// Add breadcrumb for debugging
export const addBreadcrumb = (message: string, category?: string, data?: Record<string, any>) => {
  Sentry.addBreadcrumb({
    message,
    category: category || 'custom',
    data,
    level: 'info',
  });
};

// Test error for QA (use ?sentry_test=1 in URL)
export const triggerTestError = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sentry_test') === '1') {
    console.log('Triggering test error for Sentry...');
    throw new Error('Test error for Sentry monitoring - this is intentional');
  }
};