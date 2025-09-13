import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "react-i18next";

const TestimonialSection = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <section 
      className={`py-16 sm:py-24 md:py-32 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } transition-colors duration-300 opacity-100 will-change-auto`}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>{t("testimonial.title")}</h2>
        </div>
        
        <div className="relative">
          {/* Reduced blur effect to eliminate blurry view */}
          <div className={`absolute -inset-1 ${
            theme === "dark" 
              ? "bg-gradient-to-r from-gray-700 to-gray-600 opacity-50" 
              : "bg-gradient-to-r from-blue-50 to-white opacity-70"
          } rounded-3xl blur-[2px]`}></div>
          <div className={`relative ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300`}>
            <div className="flex flex-col items-center text-center">
              <blockquote className={`text-xl sm:text-2xl md:text-3xl font-light ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } mb-6 sm:mb-8 font-display`}>
                "{t("testimonial.quote")}"
              </blockquote>
              <cite className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } not-italic`}>
                {t("testimonial.author")}
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
