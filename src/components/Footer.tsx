
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            © 2023 MedAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
