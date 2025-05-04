
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const scrollToRegistration = () => {
    if (location.pathname === '/') {
      // If already on home page, just scroll
      const registrationSection = document.getElementById('early-access-section');
      registrationSection?.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      // Navigate to home and then scroll after page loads
      navigate('/?scrollToRegistration=true');
    }
  };

  const navigateToDemoApp = () => {
    navigate('/demo');
  };

  return <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img alt="MedAI Logo" className="h-8 w-auto" src="/lovable-uploads/2ed6d2ba-0c4f-43b0-9add-5ab55f5579bc.png" />
          <span className="ml-2 text-xl font-semibold text-gray-900">MedAI</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button onClick={scrollToRegistration} className="bg-blue-500 hover:bg-blue-600">
            Join the Waitlist
          </Button>
          <Button onClick={navigateToDemoApp} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
            Try Limited Version
          </Button>
        </div>
      </div>
    </header>;
};

export default Header;
