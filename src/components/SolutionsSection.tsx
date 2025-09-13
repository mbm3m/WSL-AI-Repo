import React, { useEffect, useRef } from "react";
import { FileText, Shield, Users, Lock } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "react-i18next";

const SolutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  const features = [
    {
      title: t("solutions.smartDrafting.title"),
      description: t("solutions.smartDrafting.description"),
      icon: FileText
    }, 
    {
      title: t("solutions.policyChecks.title"),
      description: t("solutions.policyChecks.description"),
      icon: Shield
    }, 
    {
      title: t("solutions.collaboration.title"),
      description: t("solutions.collaboration.description"),
      icon: Users
    }, 
    {
      title: t("solutions.security.title"),
      description: t("solutions.security.description"),
      icon: Lock
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate list items if the section is visible
          if (entry.target === sectionRef.current) {
            const items = entry.target.querySelectorAll(".feature-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("opacity-100");
              }, 150 + index * 150);
            });
          }
        }
      });
    }, {
      threshold: 0.1
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`py-16 sm:py-24 md:py-32 ${theme === "dark" ? "bg-gray-800" : "bg-white"} transition-colors duration-300 opacity-100`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          <div ref={contentRef} className="md:w-1/2">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4 sm:mb-6`}>
              {t("solutions.title")}
            </h2>
            
            <p className={`text-base sm:text-lg md:text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-6 sm:mb-8 md:mb-12 font-light`}>
              {t("solutions.subtitle")}
            </p>
            
            <ul className="space-y-6 sm:space-y-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <li 
                    key={index} 
                    className="feature-item flex items-start transition-opacity duration-300 opacity-100"
                  >
                    <div className={`mr-4 p-2 ${theme === "dark" ? "bg-gray-700" : "bg-white"} shadow-md rounded-full transition-transform duration-300 hover:scale-105`}>
                      <IconComponent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className={`text-base sm:text-lg font-display font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {feature.title}
                      </h3>
                      <p className={`mt-1 text-sm sm:text-base ${theme === "dark" ? "text-gray-300" : "text-gray-600"} font-light`}>
                        {feature.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div ref={imageRef} className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative">
              <div className={`absolute -inset-1 ${theme === "dark" ? "bg-gradient-to-r from-gray-700 to-gray-600" : "bg-gradient-to-r from-blue-100 to-gray-100"} rounded-2xl blur opacity-30`}></div>
              <img 
                alt="Medical staff using laptop" 
                className="relative w-full rounded-2xl shadow-xl" 
                loading="lazy"
                src="/lovable-uploads/3fc1f935-c2ae-4dd2-8ff4-042798f22e02.png" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
