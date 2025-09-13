import React, { useEffect, useRef } from "react";
import { Clock, AlertTriangle, FileWarning } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "react-i18next";

const ChallengesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const challenges = [
    {
      icon: <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />,
      title: t("challenges.delays.title"),
      description: t("challenges.delays.description")
    },
    {
      icon: <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />,
      title: t("challenges.errors.title"),
      description: t("challenges.errors.description")
    },
    {
      icon: <FileWarning className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />,
      title: t("challenges.mismatch.title"),
      description: t("challenges.mismatch.description")
    }
  ];

  useEffect(() => {
    // Only add animation classes on scroll, but keep content visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find all challenge cards within this section and mark them to be animated with CSS
            const cards = entry.target.querySelectorAll(".challenge-card");
            cards.forEach(card => card.classList.add("shown"));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="challenges-section"
      ref={sectionRef} 
      className={`py-16 sm:py-24 md:py-32 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} opacity-100 transition-colors duration-300 overflow-hidden`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-center ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4 sm:mb-6`}>
          {t("challenges.title")}
        </h2>
        
        <p className={`text-base sm:text-lg md:text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto font-light`}>
          {t("challenges.subtitle")}
        </p>
        
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {challenges.map((challenge, index) => (
            <div 
              key={index} 
              className={`challenge-card flex flex-col items-start p-6 sm:p-8 ${
                theme === "dark" 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:shadow-md"
              } rounded-2xl shadow-sm transition-all duration-300 opacity-100 [&.shown]:opacity-100 delay-${index * 100}`}
            >
              <div className={`p-3 sm:p-4 ${
                theme === "dark" 
                  ? "bg-gray-700" 
                  : "bg-white"
              } shadow-md rounded-full mb-6 sm:mb-8 transition-transform duration-300 hover:scale-105`}>
                {challenge.icon}
              </div>
              <h3 className={`text-lg sm:text-xl font-display font-semibold mb-2 sm:mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>{challenge.title}</h3>
              <p className={`text-sm sm:text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } font-light`}>{challenge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
