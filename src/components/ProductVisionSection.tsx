
import React, { useEffect, useRef } from "react";
import { FileText, ShieldCheck, Network, Lock, ChartBar } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const features = [
  {
    icon: <FileText size={24} className="text-blue-600 dark:text-blue-400" />,
    title: "Smart Report Generation",
    description: "AI-assisted medical report writing from within the hospital"
  },
  {
    icon: <ShieldCheck size={24} className="text-blue-600 dark:text-blue-400" />,
    title: "Real-Time Policy Validation",
    description: "Instant insurer policy checks to reduce rejections"
  },
  {
    icon: <Network size={24} className="text-blue-600 dark:text-blue-400" />,
    title: "Hospital–Insurer Sync",
    description: "In-platform communication for case review & updates"
  },
  {
    icon: <Lock size={24} className="text-blue-600 dark:text-blue-400" />,
    title: "Secure Data Handling",
    description: "All data encrypted and PDPL-ready"
  },
  {
    icon: <ChartBar size={24} className="text-blue-600 dark:text-blue-400" />,
    title: "Approval Insights Dashboard",
    description: "Analytics for hospital and insurer decision-makers"
  }
];

const ProductVisionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If the heading becomes visible, animate the feature items
            if (entry.target === headingRef.current) {
              const items = document.querySelectorAll('.vision-feature');
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('opacity-100');
                }, 150 + index * 100);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-16 sm:py-24 md:py-32 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      } transition-colors duration-300 opacity-100`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div 
          ref={headingRef}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } mb-3 sm:mb-4`}>How MedAI Will Work</h2>
          <p className={`text-base sm:text-lg md:text-xl ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          } font-light max-w-3xl mx-auto`}>Our complete platform connecting hospitals and insurers</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="vision-feature flex flex-col items-center text-center p-3 sm:p-4 md:p-6 transition-opacity duration-300 opacity-100"
            >
              <div className={`p-3 sm:p-4 md:p-5 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } rounded-full shadow-sm mb-4 sm:mb-6 transition-transform duration-300 hover:scale-105`}>
                {feature.icon}
              </div>
              <h3 className={`font-display font-medium text-sm sm:text-base md:text-lg mb-2 sm:mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{feature.title}</h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              } text-xs sm:text-sm font-light`}>{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 sm:mt-16">
          <p className={`text-xs sm:text-sm font-display font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Launching full version in 2025</p>
        </div>
      </div>
    </section>
  );
};

export default ProductVisionSection;
