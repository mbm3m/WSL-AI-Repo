
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChallengesSection from "@/components/ChallengesSection";
import SolutionsSection from "@/components/SolutionsSection";
import BenefitsSection from "@/components/BenefitsSection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import Footer from "@/components/Footer";
import ProductVisionSection from "@/components/ProductVisionSection";
import TestimonialSection from "@/components/TestimonialSection";
import MVPFlowSection from "@/components/MVPFlowSection";

const Index = () => {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // More efficient animation approach - just target what's visible initially
    // and let the intersection observers handle the rest
    setTimeout(() => {
      const initialElements = document.querySelectorAll('.hero-animate');
      initialElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('opacity-100');
          el.classList.remove('opacity-0');
        }, index * 150);
      });
    }, 100);
    
    // Handle scroll to registration if param is present
    if (searchParams.get('scrollToRegistration') === 'true') {
      const registrationSection = document.getElementById('early-access-section');
      if (registrationSection) {
        setTimeout(() => {
          registrationSection.scrollIntoView({ behavior: 'smooth' });
        }, 600);
      }
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 pt-16">
        <HeroSection />
        <ChallengesSection />
        <MVPFlowSection />
        <SolutionsSection />
        <ProductVisionSection />
        <TestimonialSection />
        <BenefitsSection />
        <EarlyAccessSection />
      </main>
      
      {/* Sticky Mobile CTA with glass effect */}
      <div className="fixed bottom-4 left-0 right-0 md:hidden z-50 px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-lg rounded-full"></div>
          <button
            onClick={() => {
              const registrationSection = document.getElementById('early-access-section');
              registrationSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full shadow-lg transition-colors"
          >
            Join Early Access
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
