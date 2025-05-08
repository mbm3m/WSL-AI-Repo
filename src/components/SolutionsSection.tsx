
import React from "react";
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
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-12">
              How Our Platform Solves It
            </h2>
            
            <ul className="space-y-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white mt-1">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-gray-600">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0">
            <img
              src="/lovable-uploads/fb7ed94a-cf37-497c-920e-fee0d98f4139.png"
              alt="Medical staff using laptop"
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
