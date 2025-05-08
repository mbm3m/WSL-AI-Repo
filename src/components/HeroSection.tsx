
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('early-access-section');
    registrationSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToDemoApp = () => {
    navigate('/demo');
  };

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8">
            Modern Medical Approvals for Saudi Healthcare
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">
            Transform the approval journey between hospitals and insurers with a reliable, accurate, 
            and fast digital process tailored to the local healthcare system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
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
          
          <div className="mt-24 w-full">
            <img
              src="/lovable-uploads/db2869cc-5cbe-4bec-a246-66fdf2c412b1.png"
              alt="Doctor using smartphone"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
