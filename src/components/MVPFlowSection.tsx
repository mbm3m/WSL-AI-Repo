
import React, { useEffect, useRef } from "react";
import { FileText, Shield, Cpu, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const MVPFlowSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            
            // Animate children with simple transitions
            const steps = entry.target.querySelectorAll('.flow-step');
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('opacity-100');
                step.classList.remove('opacity-0');
              }, index * 150);
            });
            
            const arrows = entry.target.querySelectorAll('.flow-arrow');
            arrows.forEach((arrow, index) => {
              setTimeout(() => {
                arrow.classList.add('opacity-100');
                arrow.classList.remove('opacity-0');
              }, (index + 1) * 150);
            });
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
      className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} opacity-0 transition-opacity duration-500`}
      id="workflow-section"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className={`text-2xl md:text-3xl font-display font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            How Our System Works
          </h3>
          <p className={`mt-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          } font-light max-w-2xl mx-auto`}>
            This is a limited demo simulating part of our full system
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flow-step flex flex-col items-center text-center p-6 opacity-0 transition-opacity duration-300 md:w-1/3">
            <div className={`${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-md rounded-full p-4 mb-4 transition-transform duration-300 hover:scale-105`}>
              <FileText size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className={`font-medium text-lg mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Upload Medical Report</h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            } text-sm font-light`}>PDF or Word files from hospital systems</p>
          </div>
          
          {/* Arrow 1 */}
          <div className="flow-arrow hidden md:block opacity-0 transition-opacity duration-300">
            <ArrowRight size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          
          {/* Step 2 */}
          <div className="flow-step flex flex-col items-center text-center p-6 opacity-0 transition-opacity duration-300 md:w-1/3">
            <div className={`${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-md rounded-full p-4 mb-4 transition-transform duration-300 hover:scale-105`}>
              <Shield size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className={`font-medium text-lg mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Upload Insurance Policy</h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            } text-sm font-light`}>Choose payer's document to validate against</p>
          </div>
          
          {/* Arrow 2 */}
          <div className="flow-arrow hidden md:block opacity-0 transition-opacity duration-300">
            <ArrowRight size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          
          {/* Step 3 */}
          <div className="flow-step flex flex-col items-center text-center p-6 opacity-0 transition-opacity duration-300 md:w-1/3">
            <div className={`${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-md rounded-full p-4 mb-4 transition-transform duration-300 hover:scale-105`}>
              <Cpu size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className={`font-medium text-lg mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>AI Analysis</h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            } text-sm font-light`}>Get instant compliance feedback using AI-based engine</p>
          </div>
        </div>
        
        {/* Mobile flow arrows (visible only on mobile) */}
        <div className="md:hidden flex flex-col items-center mt-2 mb-2">
          <div className="flow-arrow opacity-0 transition-opacity duration-300">
            <ArrowRight size={24} className="text-blue-600 dark:text-blue-400 transform rotate-90" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MVPFlowSection;
