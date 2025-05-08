
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MedAI</h3>
            <p className="text-gray-400 text-sm">
              Transforming hospital-insurer workflows across Saudi Arabia with intelligent medical compliance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/demo" className="hover:text-white transition-colors">Try Demo</Link>
              </li>
              <li>
                <a href="#early-access-section" className="hover:text-white transition-colors">Join Waitlist</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Notice</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 MedAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
