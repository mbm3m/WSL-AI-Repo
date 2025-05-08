
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";

const TestimonialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // More efficient intersection observer implementation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
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
      ref={sectionRef}
      className={`py-32 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } opacity-0 transition-opacity duration-500`}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 transition-opacity duration-500">
          <h2 className={`text-4xl md:text-5xl font-display font-bold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>What Early Users Say</h2>
        </div>
        
        <div className="relative transition-opacity duration-500 delay-150">
          <div className={`absolute -inset-1.5 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-700 to-gray-600' 
              : 'bg-gradient-to-r from-blue-50 to-white'
          } rounded-3xl blur-lg opacity-70`}></div>
          <div className={`relative ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl p-12 shadow-sm hover:shadow-md transition-shadow duration-300`}>
            <div className="flex flex-col items-center text-center">
              <blockquote className={`text-2xl md:text-3xl font-light ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              } mb-8 font-display`}>
                "MedAI helped us reduce our approval delays drastically — can't wait for the full release!"
              </blockquote>
              <cite className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              } not-italic`}>
                Dr. Ahmed B., Internal Medicine, Riyadh
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
