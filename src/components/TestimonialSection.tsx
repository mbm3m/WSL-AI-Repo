
import React from "react";

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">What Early Users Say</h2>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-8">
              <span className="text-xl font-semibold text-white">AB</span>
            </div>
            <blockquote className="text-2xl font-light italic text-gray-700 mb-6">
              "MedAI helped us reduce our approval delays drastically — can't wait for the full release!"
            </blockquote>
            <cite className="font-medium text-gray-900 not-italic">— Dr. Ahmed B., Internal Medicine, Riyadh</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
