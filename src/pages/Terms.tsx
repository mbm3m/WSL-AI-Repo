
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/use-theme";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackViewedTerms } from "@/utils/analytics";

const Terms = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Track terms page view
    trackViewedTerms();
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
    }`}>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 pt-24">
        <h1 className={`text-3xl font-bold mb-8 font-display tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Terms of Use</h1>
        
        <div className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-xl p-6 shadow-sm ${
          theme === 'dark' ? 'border-gray-700' : 'border border-gray-100'
        }`}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="acceptance" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>Acceptance of Terms</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                By accessing and using MedAI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="demo-limitations" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>Demo Version Limitations</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                <p>
                  The current version of MedAI is a limited demonstration of our technology and is not intended for production use. The demo version:
                </p>
                <ul className="list-disc pl-5 space-y-2 my-4">
                  <li>Should not be used with real patient data</li>
                  <li>May have limited functionality compared to the full release</li>
                  <li>Is provided "as is" without warranties of any kind</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="user-obligations" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>User Obligations</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                <p>
                  When using our demo service, you agree not to:
                </p>
                <ul className="list-disc pl-5 space-y-2 my-4">
                  <li>Upload real patient data or sensitive personal information</li>
                  <li>Use the service for any illegal purpose</li>
                  <li>Attempt to reverse engineer or breach the security of the platform</li>
                  <li>Share access credentials with unauthorized users</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="intellectual-property" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>Intellectual Property</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                All content included on this site, such as text, graphics, logos, and software, is the property of MedAI or its content suppliers and is protected by international copyright laws.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="limitation-liability" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>Limitation of Liability</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                MedAI shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the demo service.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="governing-law" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>Governing Law</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                These terms shall be governed and construed in accordance with the laws of Saudi Arabia, without regard to its conflict of law provisions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
