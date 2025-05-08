
import React from "react";

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">What Early Users Say</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <span className="text-2xl font-semibold text-blue-600">AB</span>
            </div>
            <div className="text-center md:text-left">
              <blockquote className="text-lg italic text-gray-700 mb-4">
                "MedAI helped us reduce our approval delays drastically — can't wait for the full release!"
              </blockquote>
              <cite className="font-medium text-gray-900 not-italic">— Dr. Ahmed B., Internal Medicine, Riyadh</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
