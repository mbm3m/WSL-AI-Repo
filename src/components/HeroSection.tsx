
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => {
      observer.observe(el as Element);
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

  const scrollToNextSection = () => {
    const challengesSection = document.getElementById('challenges-section');
    challengesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-80"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
            Modern Medical Approvals for Saudi Healthcare
          </h1>
          
          <p className="font-light text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-500">
            Transform the approval journey between hospitals and insurers with a reliable, accurate, 
            and fast digital process tailored to the local healthcare system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-700">
            <Button 
              onClick={navigateToDemoApp}
              className="bg-black hover:bg-gray-800 px-8 py-6 rounded-full text-white transition-all duration-300"
              size="lg"
            >
              Try Limited Version <ArrowRight className="ml-2" />
            </Button>
            
            <Button 
              onClick={scrollToRegistration} 
              variant="outline"
              className="border-gray-300 text-gray-800 hover:bg-gray-50 px-8 py-6 rounded-full transition-all duration-300"
              size="lg"
            >
              Join Early Access
            </Button>
          </div>
          
          <div className="mt-24 w-full animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-900">
            <div className="relative w-full max-w-5xl mx-auto">
              <img
                src="/lovable-uploads/db2869cc-5cbe-4bec-a246-66fdf2c412b1.png"
                alt="Doctor using smartphone"
                className="w-full rounded-2xl shadow-2xl animate-float"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>
          
          <button 
            onClick={scrollToNextSection}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center animate-bounce mt-12 transition-all hover:shadow-lg"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
