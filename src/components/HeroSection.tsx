
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('early-access-section');
    registrationSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  const navigateToDemoApp = () => {
    navigate('/demo');
  };
  
  return (
    <section className={`relative min-h-screen flex items-center justify-center pt-16 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
      <div className="absolute inset-0 z-0">
        {/* Simplified gradient without blur for better performance */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-white'}`}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="lg:w-3/5 flex flex-col items-start text-left">
            <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            } mb-6`}>
              Faster Medical Approvals, Less Paperwork — Built for Saudi Hospitals & Insurance Companies
            </h1>
            
            <p className={`text-base sm:text-lg md:text-xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            } mb-2`}>
              Part of a full platform connecting hospitals and insurers in Saudi Arabia.
            </p>
            
            <p className={`text-base sm:text-lg md:text-xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            } mb-10`}>
              Transform the approval journey with a reliable, accurate, and fast digital process 
              tailored to the local healthcare system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button 
                onClick={scrollToRegistration} 
                className="bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 py-5 sm:py-6 rounded-full text-white transition-colors w-full sm:w-auto text-sm sm:text-base" 
                size={isMobile ? "default" : "lg"}
              >
                Join Early Access
              </Button>
              
              <Button 
                onClick={navigateToDemoApp} 
                variant="outline" 
                className={`${
                  theme === 'dark' ? 'border-gray-700 text-gray-200 hover:bg-gray-800' : 'border-gray-300 text-gray-800 hover:bg-gray-50'
                } px-6 sm:px-8 py-5 sm:py-6 rounded-full transition-colors w-full sm:w-auto text-sm sm:text-base`}
                size={isMobile ? "default" : "lg"}
              >
                Try Limited Version <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            
            <div className="mt-10">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                <p className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Coming Soon: NPHIES & PDPL integration
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/5 mt-12 lg:mt-0">
            <div className="relative">
              <img 
                alt="Doctor using smartphone" 
                className="w-full rounded-2xl shadow-lg" 
                loading="lazy" 
                src="/lovable-uploads/6f4b5419-4357-428a-bd7d-2269d59ce1ba.png" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
