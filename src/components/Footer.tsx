
import React from "react";
import { Link } from "react-router-dom";

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <Link to="/" className="text-2xl font-bold">
              MedAI
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-12 mb-8">
            <FooterLink to="/demo">Try Demo</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/terms">Terms of Use</FooterLink>
            <FooterLink to="/privacy">Privacy Notice</FooterLink>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MedAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
