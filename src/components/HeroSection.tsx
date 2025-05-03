
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Faster Medical Approvals, Less Paperwork — Built for Saudi Hospitals & Insurance Companies
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Transform the approval journey with a reliable, accurate, and fast digital process tailored to the local healthcare system.
            </p>
            <div className="mt-10 flex gap-4">
              <Button 
                onClick={scrollToRegistration} 
                className="bg-blue-500 hover:bg-blue-600 px-6"
              >
                Join the Waitlist
              </Button>
              <Button 
                onClick={navigateToDemoApp}
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50 px-6"
              >
                Try Limited Version
              </Button>
            </div>
          </div>
          <div>
            <img
              src="/lovable-uploads/db2869cc-5cbe-4bec-a246-66fdf2c412b1.png"
              alt="Doctor using smartphone"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
