
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChallengesSection from "@/components/ChallengesSection";
import SolutionsSection from "@/components/SolutionsSection";
import BenefitsSection from "@/components/BenefitsSection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import Footer from "@/components/Footer";

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
        <BenefitsSection />
        <EarlyAccessSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
