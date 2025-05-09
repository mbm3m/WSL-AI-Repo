
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { trackViewedTerms, trackViewedContact, trackClickedStartValidation } from "@/utils/analytics";

const FooterLink = ({ to, children, trackEvent }: { to: string; children: React.ReactNode; trackEvent?: () => void }) => {
  const { theme } = useTheme();
  
  const handleClick = () => {
    if (trackEvent) {
      trackEvent();
    }
  };
  
  return (
    <Link
      to={to}
      className={`text-sm ${
        theme === 'dark' 
          ? 'text-gray-400 hover:text-gray-200' 
          : 'text-gray-500 hover:text-gray-800'
      } transition-colors`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`${
        theme === 'dark' 
          ? 'bg-gray-900 border-t border-gray-800' 
          : 'bg-white border-t border-gray-100'
      } py-8 sm:py-16 opacity-100 transition-colors duration-300 will-change-auto`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-6 sm:mb-8">
            <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
              <img alt="WSL Logo" className="h-6 sm:h-8 w-auto" src="/lovable-uploads/3765665d-0866-4731-a246-f10a9c4c2a2d.png" />
              <span className={`ml-2 text-lg sm:text-xl font-display font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>WSL</span>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <FooterLink to="/demo" trackEvent={() => trackClickedStartValidation("footer_demo_link")}>Try Demo</FooterLink>
            <FooterLink to="/contact" trackEvent={() => trackViewedContact()}>Contact Us</FooterLink>
            <FooterLink to="/terms" trackEvent={() => trackViewedTerms()}>Terms of Use</FooterLink>
            <FooterLink to="/privacy">Privacy Notice</FooterLink>
          </div>
          
          <div>
            <p className={`text-xs sm:text-sm font-light ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              &copy; {currentYear} WSL. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
