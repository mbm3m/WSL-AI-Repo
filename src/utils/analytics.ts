
import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with your project token
mixpanel.init('1a88a43618cdb22b8085c76f70ea90b4', {
  debug: import.meta.env.DEV, // Enable debug mode in development
  track_pageview: false, // We'll handle page views manually
  persistence: 'localStorage',
});

// Generate a unique session ID
const generateSessionId = () => {
  const sessionId = localStorage.getItem('mixpanel_session_id');
  if (sessionId) return sessionId;
  
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  localStorage.setItem('mixpanel_session_id', newSessionId);
  return newSessionId;
};

// Get device type
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

// Get approximate location from navigator (if available)
const getLocation = async (): Promise<string> => {
  try {
    if ('geolocation' in navigator) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(`${position.coords.latitude},${position.coords.longitude}`);
          },
          () => {
            resolve('location_unavailable');
          },
          { timeout: 3000 }
        );
      });
    }
  } catch (error) {
    console.error('Error getting location:', error);
  }
  
  return 'location_unavailable';
};

// Track events with common properties
export const trackEvent = async (eventName: string, additionalProperties = {}) => {
  try {
    const location = await getLocation();
    const commonProperties = {
      user_type: 'Unknown',
      session_id: generateSessionId(),
      device_type: getDeviceType(),
      timestamp: new Date().toISOString(),
      location,
      referrer: document.referrer || 'direct',
    };

    mixpanel.track(eventName, {
      ...commonProperties,
      ...additionalProperties,
    });
  } catch (error) {
    console.error(`Error tracking event ${eventName}:`, error);
  }
};

// Specific event tracking functions
export const trackPageVisit = () => trackEvent('Visited Landing Page');

export const trackViewedPolicies = () => 
  trackEvent('Viewed Policies');

export const trackViewedTerms = () => 
  trackEvent('Viewed Terms of Use');

export const trackViewedContact = () => 
  trackEvent('Viewed Contact Us');

export const trackClickedStartValidation = (buttonLocation: string) => 
  trackEvent('Clicked Start Validation', { button_location: buttonLocation });

export default mixpanel;
