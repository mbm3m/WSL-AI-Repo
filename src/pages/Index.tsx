
import React, { useEffect, useRef, useState } from "react";
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
import { trackPageVisit, trackViewedPolicies } from "@/utils/analytics";
import { lazy, Suspense } from "react";

// Prepare loading state placeholder for deferred sections
const SectionPlaceholder = () => (
  <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
);

const Index = () => {
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();
  const policiesRef = useRef<HTMLDivElement>(null);
  const policiesObserved = useRef(false);
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    challenges: false,
    mvpFlow: false,
    solutions: false,
    productVision: false,
    testimonial: false,
    benefits: false,
    earlyAccess: false
  });
  
  useEffect(() => {
    // Track page visit on component mount
    trackPageVisit();
    
    // Ensure sections AND footer are visible regardless of theme changes
    const makeAllElementsVisible = () => {
      document.querySelectorAll('section, footer').forEach(element => {
        element.classList.add('opacity-100');
        element.classList.remove('opacity-0', 'translate-y-10');
      });
    };
    
    // Run immediately and also when theme changes
    makeAllElementsVisible();
    
    // Handle scroll to registration if param is present
    if (searchParams.get('scrollToRegistration') === 'true') {
      const registrationSection = document.getElementById('early-access-section');
      if (registrationSection) {
        setTimeout(() => {
          registrationSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
    
    // Set up intersection observer for policy section tracking
    const policyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !policiesObserved.current) {
            trackViewedPolicies();
            policiesObserved.current = true;
            policyObserver.disconnect(); // Only track once
          }
        });
      },
      { threshold: 0.5 }
    );
    
    // Observe solutions section for policy viewing
    if (policiesRef.current) {
      policyObserver.observe(policiesRef.current);
    }
    
    // Use IntersectionObserver with optimized animation settings and progressive loading
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add animation classes but maintain visibility
            entry.target.classList.add('animate-viewed');
            
            // Update visibility state for the section
            const sectionId = entry.target.id;
            if (sectionId) {
              setVisibleSections(prev => ({
                ...prev,
                [sectionId.replace('-section', '')]: true
              }));
            }
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -5% 0px" 
      }
    );
    
    // Observe sections for animations and progressive loading
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      // Add ID if missing for visibility tracking
      if (!section.id && section.className.includes('min-h-screen')) {
        const index = Array.from(sections).indexOf(section);
        section.id = `section-${index}`;
      }
      sectionObserver.observe(section);
    });
    
    // Preload critical hero image with high priority
    const preloadImages = () => {
      const imagePreload = new Image();
      imagePreload.fetchPriority = 'high';
      imagePreload.src = "/lovable-uploads/3765665d-0866-4731-a246-f10a9c4c2a2d.png"; // Logo
      
      // Preload hero image with medium priority after logo
      setTimeout(() => {
        const heroImagePreload = new Image();
        heroImagePreload.fetchPriority = 'medium';
        heroImagePreload.src = "/lovable-uploads/6f4b5419-4357-428a-bd7d-2269d59ce1ba.png"; // Hero image
      }, 100);
    };
    
    // Call preload function
    preloadImages();
    
    return () => {
      sectionObserver.disconnect();
      policyObserver.disconnect();
    };
  }, [searchParams, theme]); // Add theme dependency to trigger effect on theme change

  return (
    <div className={`flex flex-col min-h-screen will-change-auto ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    } transition-colors duration-300`}>
      <Header />
      <main className="flex-1">
        <HeroSection />
        
        {visibleSections.challenges ? (
          <ChallengesSection />
        ) : (
          <SectionPlaceholder />
        )}
        
        {visibleSections.mvpFlow ? (
          <MVPFlowSection />
        ) : (
          <SectionPlaceholder />
        )}
        
        <div ref={policiesRef}>
          {visibleSections.solutions ? (
            <SolutionsSection />
          ) : (
            <SectionPlaceholder />
          )}
        </div>
        
        {visibleSections.productVision ? (
          <ProductVisionSection />
        ) : (
          <SectionPlaceholder />
        )}
        
        {visibleSections.testimonial ? (
          <TestimonialSection />
        ) : (
          <SectionPlaceholder />
        )}
        
        {visibleSections.benefits ? (
          <BenefitsSection />
        ) : (
          <SectionPlaceholder />
        )}
        
        <EarlyAccessSection />
      </main>
      
      {/* Sticky Mobile CTA with improved glass effect */}
      <div className="fixed bottom-4 left-0 right-0 md:hidden z-50 px-4">
        <div className="relative">
          <div className={`absolute inset-0 ${
            theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'
          } backdrop-blur-sm rounded-full`}></div>
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
