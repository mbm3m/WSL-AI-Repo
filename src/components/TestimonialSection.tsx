
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TestimonialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-white transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 transition-all duration-700">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">What Early Users Say</h2>
        </div>
        
        <div 
          ref={testimonialRef}
          className="relative transition-all duration-700 opacity-0 translate-y-10 delay-300"
        >
          <div className="absolute -inset-1.5 bg-gradient-to-r from-gray-100 to-white rounded-3xl blur-lg opacity-70"></div>
          <div className="relative bg-white rounded-2xl p-12 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <blockquote className="text-2xl md:text-3xl font-light text-gray-700 mb-8 font-display">
                "MedAI helped us reduce our approval delays drastically — can't wait for the full release!"
              </blockquote>
              <cite className="flex items-center gap-3 font-medium text-gray-900 not-italic">
                <span>Dr. Ahmed B., Internal Medicine, Riyadh</span>
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
