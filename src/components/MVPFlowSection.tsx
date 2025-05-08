
import React, { useEffect, useRef } from "react";
import { FileText, Shield, Cpu, ArrowRight } from "lucide-react";

const MVPFlowSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class to section
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            
            // Animate the steps
            const steps = entry.target.querySelectorAll('.flow-step');
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('opacity-100', 'translate-y-0');
                step.classList.remove('opacity-0', 'translate-y-10');
              }, 300 + index * 200);
            });
            
            // Animate the arrows
            const arrows = entry.target.querySelectorAll('.flow-arrow');
            arrows.forEach((arrow, index) => {
              setTimeout(() => {
                arrow.classList.add('opacity-100', 'scale-100');
                arrow.classList.remove('opacity-0', 'scale-0');
              }, 600 + index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gray-50 transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-600 mb-2">WORKFLOW PREVIEW</p>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
            How Our System Works
          </h3>
          <p className="mt-4 text-gray-600 font-light max-w-2xl mx-auto">
            This is a limited demo simulating part of our full system
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flow-step flex flex-col items-center text-center p-6 transition-all duration-500 opacity-0 translate-y-10 md:w-1/3">
            <div className="bg-blue-100 p-4 rounded-full mb-4 transition-all duration-300 hover:shadow-md">
              <FileText size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Upload Medical Report</h3>
            <p className="text-gray-600 text-sm font-light">PDF or Word files from hospital systems</p>
          </div>
          
          {/* Arrow 1 */}
          <div className="flow-arrow hidden md:block transition-all duration-500 opacity-0 scale-0">
            <ArrowRight size={24} className="text-gray-400" />
          </div>
          
          {/* Step 2 */}
          <div className="flow-step flex flex-col items-center text-center p-6 transition-all duration-500 opacity-0 translate-y-10 md:w-1/3">
            <div className="bg-blue-100 p-4 rounded-full mb-4 transition-all duration-300 hover:shadow-md">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Upload Insurance Policy</h3>
            <p className="text-gray-600 text-sm font-light">Choose payer's document to validate against</p>
          </div>
          
          {/* Arrow 2 */}
          <div className="flow-arrow hidden md:block transition-all duration-500 opacity-0 scale-0">
            <ArrowRight size={24} className="text-gray-400" />
          </div>
          
          {/* Step 3 */}
          <div className="flow-step flex flex-col items-center text-center p-6 transition-all duration-500 opacity-0 translate-y-10 md:w-1/3">
            <div className="bg-blue-100 p-4 rounded-full mb-4 transition-all duration-300 hover:shadow-md">
              <Cpu size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">AI Analysis</h3>
            <p className="text-gray-600 text-sm font-light">Get instant compliance feedback using AI-based engine</p>
          </div>
        </div>
        
        {/* Mobile flow arrows (visible only on mobile) */}
        <div className="md:hidden flex flex-col items-center mt-2 mb-2">
          <div className="flow-arrow h-8 transition-all duration-500 opacity-0 scale-0">
            <ArrowRight size={24} className="text-gray-400 transform rotate-90" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MVPFlowSection;
