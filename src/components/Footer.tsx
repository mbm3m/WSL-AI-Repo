
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  return (
    <Link
      to={to}
      className={`text-sm ${
        theme === 'dark' 
          ? 'text-gray-400 hover:text-gray-200' 
          : 'text-gray-500 hover:text-gray-800'
      } transition-colors`}
    >
      {children}
    </Link>
  );
};

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={footerRef}
      className={`${
        theme === 'dark' 
          ? 'bg-gray-900 border-t border-gray-800' 
          : 'bg-white border-t border-gray-100'
      } py-16 opacity-0 transition-opacity duration-700`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
              <img alt="MedAI Logo" className="h-8 w-auto" src="/lovable-uploads/3765665d-0866-4731-a246-f10a9c4c2a2d.png" />
              <span className={`ml-2 text-xl font-display font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>MedAI</span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-12 mb-8">
            <FooterLink to="/demo">Try Demo</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/terms">Terms of Use</FooterLink>
            <FooterLink to="/privacy">Privacy Notice</FooterLink>
          </div>
          
          <div>
            <p className={`text-sm font-light ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              &copy; {currentYear} MedAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
