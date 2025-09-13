import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, HeartPulse, BarChart, Clock } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "react-i18next";

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const benefits = {
    hospitals: [
      t("benefits.hospitals.fasterApproval"),
      t("benefits.hospitals.reducedBurden"),
      t("benefits.hospitals.betterSatisfaction")
    ],
    insurance: [
      t("benefits.insurance.streamlinedProcess"),
      t("benefits.insurance.reducedCosts"),
      t("benefits.insurance.enhancedDetection")
    ],
    patients: [
      t("benefits.patients.fasterTreatment"),
      t("benefits.patients.transparentTracking"),
      t("benefits.patients.improvedExperience")
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-10");
            
            // If the heading becomes visible, animate the cards
            if (entry.target === headingRef.current) {
              const cards = document.querySelectorAll(".benefit-card");
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add("opacity-100", "translate-y-0");
                  card.classList.remove("opacity-0", "translate-y-10");
                }, 150 + index * 100); // Optimized animation timing
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-16 sm:py-24 md:py-32 ${theme === "dark" ? "bg-gray-50" : "bg-white"} opacity-0 translate-y-10 transition-all duration-700`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            ref={headingRef}
            className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight ${theme === "dark" ? "text-gray-900" : "text-gray-900"} mb-4 sm:mb-6 opacity-0 translate-y-10 transition-all duration-700`}
          >
            {t("benefits.title")}
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${theme === "dark" ? "text-gray-600" : "text-gray-600"} max-w-3xl mx-auto font-light`}>
            {t("benefits.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Hospitals Card */}
          <Card className={`benefit-card opacity-0 translate-y-10 transition-all duration-700 ${
            theme === "dark" 
              ? "bg-white hover:shadow-lg" 
              : "bg-white hover:shadow-lg"
          } border-0 shadow-sm`}>
            <CardHeader className="text-center pb-4">
              <div className={`mx-auto p-4 rounded-full ${
                theme === "dark" ? "bg-blue-100" : "bg-blue-100"
              } w-fit mb-4`}>
                <HeartPulse className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className={`text-xl font-display font-semibold ${
                theme === "dark" ? "text-gray-900" : "text-gray-900"
              }`}>
                {t("benefits.hospitals.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.hospitals.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${
                      theme === "dark" ? "text-gray-600" : "text-gray-600"
                    }`}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Insurance Companies Card */}
          <Card className={`benefit-card opacity-0 translate-y-10 transition-all duration-700 ${
            theme === "dark" 
              ? "bg-white hover:shadow-lg" 
              : "bg-white hover:shadow-lg"
          } border-0 shadow-sm`}>
            <CardHeader className="text-center pb-4">
              <div className={`mx-auto p-4 rounded-full ${
                theme === "dark" ? "bg-green-100" : "bg-green-100"
              } w-fit mb-4`}>
                <BarChart className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className={`text-xl font-display font-semibold ${
                theme === "dark" ? "text-gray-900" : "text-gray-900"
              }`}>
                {t("benefits.insurance.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.insurance.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${
                      theme === "dark" ? "text-gray-600" : "text-gray-600"
                    }`}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Patients Card */}
          <Card className={`benefit-card opacity-0 translate-y-10 transition-all duration-700 ${
            theme === "dark" 
              ? "bg-white hover:shadow-lg" 
              : "bg-white hover:shadow-lg"
          } border-0 shadow-sm`}>
            <CardHeader className="text-center pb-4">
              <div className={`mx-auto p-4 rounded-full ${
                theme === "dark" ? "bg-purple-100" : "bg-purple-100"
              } w-fit mb-4`}>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className={`text-xl font-display font-semibold ${
                theme === "dark" ? "text-gray-900" : "text-gray-900"
              }`}>
                {t("benefits.patients.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.patients.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${
                      theme === "dark" ? "text-gray-600" : "text-gray-600"
                    }`}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
