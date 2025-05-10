
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
      funnel: 'validation_demo', // Add funnel property to all events
    };

    mixpanel.track(eventName, {
      ...commonProperties,
      ...additionalProperties,
    });
  } catch (error) {
    console.error(`Error tracking event ${eventName}:`, error);
  }
};

// Verify all required event tracking functions are defined and properly implemented
export const trackPageVisit = () => trackEvent('Visited Landing Page');

export const trackViewedPolicies = () => 
  trackEvent('Viewed Policies');

export const trackViewedTerms = () => 
  trackEvent('Viewed Terms of Use');

export const trackViewedContact = () => 
  trackEvent('Viewed Contact Us');

export const trackClickedStartValidation = (buttonLocation: string) => 
  trackEvent('Clicked Start Validation', { button_location: buttonLocation });

// --------- Validation Form Flow Analytics ---------

// 1. Started Validation
export const trackStartedValidation = () => 
  trackEvent('Started Validation', { 
    form_step: 'user_info',
    funnel_step: 1,
    funnel_name: 'validation_demo'
  });

// 2. Filled User Info
export const trackFilledUserInfo = (fullName: string, email: string, hasCompany: boolean) => {
  const emailParts = email.split('@');
  const emailDomain = emailParts.length > 1 ? emailParts[1] : 'unknown';
  
  return trackEvent('Filled User Info', {
    name_length: fullName.length,
    has_company: hasCompany,
    email_domain: emailDomain,
    funnel_step: 2,
    funnel_name: 'validation_demo'
  });
};

// 3. Uploaded Report
export const trackUploadedReport = (file: File) => 
  trackEvent('Uploaded Report', {
    file_name: file.name,
    file_size: `${(file.size / 1024).toFixed(2)} KB`,
    file_type: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
    funnel_step: 3,
    funnel_name: 'validation_demo'
  });

// 4. Uploaded Policy
export const trackUploadedPolicy = (file: File) => 
  trackEvent('Uploaded Policy', {
    file_name: file.name,
    file_size: `${(file.size / 1024).toFixed(2)} KB`,
    file_type: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
    funnel_step: 4,
    funnel_name: 'validation_demo'
  });

// 5. Agreed to Terms
export const trackAgreedToTerms = () => 
  trackEvent('Agreed to Terms', {
    funnel_step: 5,
    funnel_name: 'validation_demo'
  });

// 6. Submitted Validation
export const trackSubmittedValidation = (
  hasReport: boolean, 
  hasPolicy: boolean, 
  agreedTerms: boolean,
  startTime: number
) => {
  const formCompletionTime = Date.now() - startTime;
  
  return trackEvent('Submitted Validation', {
    has_report: hasReport,
    has_policy: hasPolicy,
    agreed_terms: agreedTerms,
    form_completion_time: formCompletionTime / 1000, // convert to seconds
    funnel_step: 6,
    funnel_name: 'validation_demo',
    form_action: 'analyze_report' // Explicitly link to form button click
  });
};

// 7. Viewed Validation Result
export const trackViewedValidationResult = (
  isValid: boolean,
  errorsCount: number,
  feedbackType: string,
  processingStartTime: number
) => {
  const processingTime = Date.now() - processingStartTime;
  
  return trackEvent('Viewed Validation Result', {
    valid: isValid,
    errors_count: errorsCount,
    feedback_type: feedbackType,
    processing_time: processingTime / 1000, // convert to seconds for consistency
    funnel_step: 7, // Final step in the funnel
    funnel_name: 'validation_demo',
    funnel_completion: true // Mark funnel completion
  });
};

export default mixpanel;
