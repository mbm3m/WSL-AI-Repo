import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackGAPageView } from '@/utils/monitoring';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view with Google Analytics
    trackGAPageView(location.pathname, document.title);
  }, [location]);
};