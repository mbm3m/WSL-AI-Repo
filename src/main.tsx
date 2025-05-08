
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
if (import.meta.env.PROD) {
  mixpanel.init('1a88a43618cdb22b8085c76f70ea90b4', {
    debug: false,
    track_pageview: false,
    persistence: 'localStorage',
  });
}

createRoot(document.getElementById("root")!).render(<App />);
