
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/use-theme";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Privacy = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
    }`}>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 pt-24">
        <h1 className={`text-3xl font-bold mb-8 font-display tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Privacy Notice</h1>
        
        <div className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-xl p-6 shadow-sm ${
          theme === 'dark' ? 'border-gray-700' : 'border border-gray-100'
        }`}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="introduction" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>Introduction</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                At WSL, we respect your privacy and are committed to protecting your personal data. This privacy notice will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="data-collect" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>The Data We Collect</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                <p>
                  For our demo version, we collect minimal data necessary to provide our service. This may include:
                </p>
                <ul className="list-disc pl-5 space-y-2 my-4">
                  <li>Contact information (email address) if you join our waitlist</li>
                  <li>Usage data to improve our services</li>
                  <li>Technical data such as browser type and version, time zone setting, operating system</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="demo-data" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>Demo Data Usage</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Files uploaded to our demo service are used only for the immediate purpose of demonstrating our technology. They are not stored permanently and are deleted after the session ends.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="data-security" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>Data Security</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="contact" className={theme === 'dark' ? 'border-gray-700' : ''}>
              <AccordionTrigger className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
              }`}>Contact</AccordionTrigger>
              <AccordionContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                If you have any questions about this privacy notice, please contact us through our contact form.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
