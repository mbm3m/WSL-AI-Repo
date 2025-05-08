
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? theme === 'dark' 
            ? "bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-sm" 
            : "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
          <img alt="MedAI Logo" className="h-8 w-auto" src="/lovable-uploads/3765665d-0866-4731-a246-f10a9c4c2a2d.png" />
          <span className={`ml-2 text-xl font-display font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            MedAI
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className={`rounded-full ${theme === 'dark' ? 'text-gray-200 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button 
            onClick={scrollToRegistration} 
            variant="ghost"
            className={`font-medium ${
              theme === 'dark'
                ? 'text-gray-200 hover:bg-blue-700 hover:text-white' 
                : 'text-gray-900 hover:bg-blue-600 hover:text-white'
            } transition-all duration-300`}
          >
            Join Early Access
          </Button>
          <Button 
            onClick={navigateToDemoApp}
            className={`bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all duration-300`}
          >
            Try Limited Version
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
