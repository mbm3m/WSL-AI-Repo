
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Simplified animation approach with better performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Target only essential elements for initial animation
    const animateElements = document.querySelectorAll('.hero-animate');
    animateElements.forEach(el => {
      el.classList.add('will-change-opacity');
      setTimeout(() => {
        el.classList.add('opacity-100');
        el.classList.remove('opacity-0');
        // Remove will-change after animation completes to improve performance
        setTimeout(() => el.classList.remove('will-change-opacity'), 500);
      }, 100);
    });

    return () => observer.disconnect();
  }, []);
  
  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('early-access-section');
    registrationSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToDemoApp = () => {
    navigate('/demo');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="lg:w-3/5 flex flex-col items-start text-left">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 hero-animate opacity-0 transition-opacity duration-300">
              Faster Medical Approvals, Less Paperwork — Built for Saudi Hospitals & Insurance Companies
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-2 hero-animate opacity-0 transition-opacity duration-300 delay-100">
              Part of a full platform connecting hospitals and insurers in Saudi Arabia.
            </p>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 hero-animate opacity-0 transition-opacity duration-300 delay-100">
              Transform the approval journey with a reliable, accurate, and fast digital process 
              tailored to the local healthcare system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 hero-animate opacity-0 transition-opacity duration-300 delay-150">
              <Button 
                onClick={scrollToRegistration} 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-6 rounded-full text-white transition-colors"
                size="lg"
              >
                Join Early Access
              </Button>
              
              <Button 
                onClick={navigateToDemoApp}
                variant="outline"
                className="border-gray-300 text-gray-800 hover:bg-gray-50 px-8 py-6 rounded-full transition-colors"
                size="lg"
              >
                Try Limited Version <ArrowRight className="ml-2" />
              </Button>
            </div>
            
            <div className="mt-10 hero-animate opacity-0 transition-opacity duration-300 delay-200">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                <p className="text-sm text-gray-600">
                  Coming Soon: Nahin & FIPL integration
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/5 mt-12 lg:mt-0 hero-animate opacity-0 transition-opacity duration-300 delay-200">
            <div className="relative">
              <img
                src="/lovable-uploads/db2869cc-5cbe-4bec-a246-66fdf2c412b1.png"
                alt="Doctor using smartphone"
                className="w-full rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
