
import React, { useEffect, useRef } from "react";
import { Check } from "lucide-react";

const features = [
  {
    title: "Smart Report Drafting",
    description: "Generate accurate medical reports with built-in templates and guidelines."
  },
  {
    title: "Built-in Policy Checks",
    description: "Automatically verify compliance with insurance policies before submission."
  },
  {
    title: "Doctor-Insurer Collaboration",
    description: "Seamless communication between healthcare providers and insurance companies."
  },
  {
    title: "Secure Medical Data",
    description: "Enterprise-grade security ensuring patient data protection and privacy."
  }
];

const SolutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            
            // Animate list items if the section is visible
            if (entry.target === sectionRef.current) {
              const items = entry.target.querySelectorAll('.feature-item');
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('opacity-100');
                  item.classList.remove('opacity-0');
                }, 150 + index * 150);
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
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-white transition-opacity duration-500 opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center gap-16">
          <div 
            ref={contentRef}
            className="md:w-1/2 transition-opacity duration-500 opacity-0 delay-150"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-6">
              How Our Platform Solves It
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 font-light">
              We've built powerful features to transform medical approvals
            </p>
            
            <ul className="space-y-8">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="feature-item flex items-start transition-opacity duration-300 opacity-0"
                >
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white mt-1">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-gray-600 font-light">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div 
            ref={imageRef}
            className="md:w-1/2 mt-12 md:mt-0 transition-opacity duration-500 opacity-0 delay-300"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-gray-100 rounded-2xl blur opacity-30"></div>
              <img
                src="/lovable-uploads/fb7ed94a-cf37-497c-920e-fee0d98f4139.png"
                alt="Medical staff using laptop"
                className="relative w-full rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
