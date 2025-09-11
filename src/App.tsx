
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { initSentry, initGoogleAnalytics } from "@/utils/monitoring";
import { usePageTracking } from "@/hooks/usePageTracking";
import * as Sentry from '@sentry/react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Health from "./pages/Health";

const queryClient = new QueryClient();

// Initialize monitoring tools
initSentry();
initGoogleAnalytics();

// Test error trigger for QA
import { triggerTestError } from '@/utils/monitoring';
triggerTestError();

const AppContent = () => {
  usePageTracking();
  
  return (
    <>
      <Toaster />
      <Sonner />
      <Sentry.ErrorBoundary fallback={({ error, resetError }) => (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p>{error instanceof Error ? error.message : 'An unexpected error occurred'}</p>
          <button onClick={resetError}>Try again</button>
        </div>
      )}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/health" element={<Health />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Sentry.ErrorBoundary>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
