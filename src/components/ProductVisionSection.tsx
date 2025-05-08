
import React, { useEffect, useRef } from "react";
import { FileText, ShieldCheck, Network, Lock, ChartBar } from "lucide-react";

const features = [
  {
    icon: <FileText size={28} className="text-gray-800" />,
    title: "Smart Report Generation",
    description: "AI-assisted medical report writing from within the hospital"
  },
  {
    icon: <ShieldCheck size={28} className="text-gray-800" />,
    title: "Real-Time Policy Validation",
    description: "Instant insurer policy checks to reduce rejections"
  },
  {
    icon: <Network size={28} className="text-gray-800" />,
    title: "Hospital–Insurer Sync",
    description: "In-platform communication for case review & updates"
  },
  {
    icon: <Lock size={28} className="text-gray-800" />,
    title: "Secure Data Handling",
    description: "All data encrypted and PDPL-ready"
  },
  {
    icon: <ChartBar size={28} className="text-gray-800" />,
    title: "Approval Insights Dashboard",
    description: "Analytics for hospital and insurer decision-makers"
  }
];

const ProductVisionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            
            // If the heading becomes visible, animate the feature items
            if (entry.target === headingRef.current) {
              const items = document.querySelectorAll('.vision-feature');
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('opacity-100', 'translate-y-0');
                  item.classList.remove('opacity-0', 'translate-y-10');
                }, 300 + index * 100);
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
      className="py-32 bg-gray-50 transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div 
          ref={headingRef}
          className="text-center mb-16 transition-all duration-700 opacity-0 translate-y-10"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">How MedAI Will Work</h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">Our complete platform connecting hospitals and insurers</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="vision-feature flex flex-col items-center text-center p-6 transition-all duration-500 opacity-0 translate-y-10"
            >
              <div className="p-5 bg-white rounded-full shadow-sm mb-6 transition-all duration-300 hover:shadow-md">
                {feature.icon}
              </div>
              <h3 className="font-display font-medium text-lg mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm font-light">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 transition-all duration-700 opacity-0 translate-y-10 delay-700">
          <p className="text-sm font-display font-medium text-gray-600">Launching full version in 2025</p>
        </div>
      </div>
    </section>
  );
};

export default ProductVisionSection;
