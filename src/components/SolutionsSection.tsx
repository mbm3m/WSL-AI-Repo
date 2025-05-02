
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
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 mb-16">
          How Our Platform Solves It
        </h2>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <ul className="space-y-8">
              {features.map((feature, index) => (
                <li key={index} className="flex">
                  <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-gray-600">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="/lovable-uploads/264c83a3-5c25-4d00-836b-043abd625c7e.png"
              alt="Platform solution illustration"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
