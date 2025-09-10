// Environment configuration for monitoring tools
export const monitoringConfig = {
  sentry: {
    dsn: import.meta.env.VITE_SENTRY_DSN || '',
    enabled: !!import.meta.env.VITE_SENTRY_DSN,
  },
  googleAnalytics: {
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
    enabled: !!import.meta.env.VITE_GA_MEASUREMENT_ID,
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: !import.meta.env.DEV,
};

// Setup instructions for environment variables
export const setupInstructions = `
To complete monitoring setup, add these environment variables:

1. For Sentry error monitoring:
   VITE_SENTRY_DSN=your_sentry_dsn_here

2. For Google Analytics:
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

3. For UptimeRobot monitoring:
   - Set up monitoring for these endpoints:
     - Main site: ${window.location.origin}
     - Health check: ${window.location.origin}/health
   - Configure alerts to your preferred notification channel

Environment variables should be added to your deployment platform (Vercel, Netlify, etc.)
`;