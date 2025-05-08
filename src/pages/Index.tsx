
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

const Index = () => {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    if (searchParams.get('scrollToRegistration') === 'true') {
      const registrationSection = document.getElementById('early-access-section');
      if (registrationSection) {
        setTimeout(() => {
          registrationSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ChallengesSection />
        <SolutionsSection />
        <ProductVisionSection />
        <TestimonialSection />
        <BenefitsSection />
        <EarlyAccessSection />
      </main>
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-0 right-0 md:hidden z-50 px-4">
        <button
          onClick={() => {
            const registrationSection = document.getElementById('early-access-section');
            registrationSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full shadow-lg transition-all duration-300"
        >
          Join Early Access
        </button>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
