
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
import { useTheme } from "@/hooks/use-theme";

const Index = () => {
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();
  
  useEffect(() => {
    // Performance optimization: Only animate sections on scroll, not the hero section
    // Use lightweight CSS transitions
    
    // Handle scroll to registration if param is present
    if (searchParams.get('scrollToRegistration') === 'true') {
      const registrationSection = document.getElementById('early-access-section');
      if (registrationSection) {
        setTimeout(() => {
          registrationSection.scrollIntoView({ behavior: 'smooth' });
        }, 600);
      }
    }
    
    // Use IntersectionObserver for all sections except hero
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target); // Stop observing once shown
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    
    // Observe all sections except hero
    const sections = document.querySelectorAll('section:not(:first-child)');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Preload the logo image for better performance
    const logoPreload = new Image();
    logoPreload.src = "/lovable-uploads/3765665d-0866-4731-a246-f10a9c4c2a2d.png";
    
    return () => observer.disconnect();
  }, [searchParams]);

  return (
    <div className={`flex flex-col min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ChallengesSection />
        <MVPFlowSection />
        <SolutionsSection />
        <ProductVisionSection />
        <TestimonialSection />
        <BenefitsSection />
        <EarlyAccessSection />
      </main>
      
      {/* Sticky Mobile CTA with improved glass effect */}
      <div className="fixed bottom-4 left-0 right-0 md:hidden z-50 px-4">
        <div className="relative">
          <div className={`absolute inset-0 ${
            theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'
          } backdrop-blur-md rounded-full`}></div>
          <button
            onClick={() => {
              const registrationSection = document.getElementById('early-access-section');
              registrationSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full shadow-lg transition-colors duration-300"
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
