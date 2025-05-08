
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, HeartPulse, BarChart, Clock } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();

  const benefits = {
    hospitals: [
      "60% faster approval times",
      "Reduced administrative burden",
      "Better patient satisfaction"
    ],
    insurance: [
      "Streamlined evaluation process",
      "Reduced processing costs",
      "Enhanced fraud detection"
    ],
    patients: [
      "Faster treatment approvals",
      "Transparent process tracking",
      "Improved care experience"
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            
            // If the heading becomes visible, animate the cards
            if (entry.target === headingRef.current) {
              const cards = document.querySelectorAll('.benefit-card');
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('opacity-100', 'translate-y-0');
                  card.classList.remove('opacity-0', 'translate-y-10');
                }, 300 + index * 200);
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

  const cardClasses = theme === 'dark' 
    ? 'border-gray-700 bg-gray-800 shadow-md hover:shadow-lg hover:bg-gray-700' 
    : 'border-none shadow-md hover:shadow-lg';

  return (
    <section 
      ref={sectionRef}
      className={`py-32 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      } transition-all duration-700 opacity-0 translate-y-10`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          ref={headingRef}
          className={`text-4xl md:text-5xl font-display font-bold tracking-tight text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } mb-8 transition-all duration-700 opacity-0 translate-y-10`}
        >
          Why Choose Us
        </h2>
        
        <p className={`text-xl text-center ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        } font-light mb-16 max-w-3xl mx-auto transition-all duration-700 opacity-0 translate-y-10 delay-200`}>
          Our platform provides benefits across the healthcare ecosystem
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className={`transition-all duration-300 benefit-card opacity-0 translate-y-10 ${cardClasses}`}>
            <CardHeader>
              <div className={`w-12 h-12 flex items-center justify-center ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              } shadow-md rounded-full mb-4 transition-transform duration-300 hover:scale-105`}>
                <HeartPulse className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className={`font-display ${
                theme === 'dark' ? 'text-white' : ''
              }`}>For Hospitals & Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.hospitals.map((benefit, index) => (
                  <li key={index} className="flex">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className={`font-light ${
                      theme === 'dark' ? 'text-gray-300' : ''
                    }`}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className={`transition-all duration-300 benefit-card opacity-0 translate-y-10 ${cardClasses}`}>
            <CardHeader>
              <div className={`w-12 h-12 flex items-center justify-center ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              } shadow-md rounded-full mb-4 transition-transform duration-300 hover:scale-105`}>
                <BarChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className={`font-display ${
                theme === 'dark' ? 'text-white' : ''
              }`}>For Insurance Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.insurance.map((benefit, index) => (
                  <li key={index} className="flex">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className={`font-light ${
                      theme === 'dark' ? 'text-gray-300' : ''
                    }`}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className={`transition-all duration-300 benefit-card opacity-0 translate-y-10 ${cardClasses}`}>
            <CardHeader>
              <div className={`w-12 h-12 flex items-center justify-center ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              } shadow-md rounded-full mb-4 transition-transform duration-300 hover:scale-105`}>
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className={`font-display ${
                theme === 'dark' ? 'text-white' : ''
              }`}>For Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.patients.map((benefit, index) => (
                  <li key={index} className="flex">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className={`font-light ${
                      theme === 'dark' ? 'text-gray-300' : ''
                    }`}>{benefit}</span>
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
