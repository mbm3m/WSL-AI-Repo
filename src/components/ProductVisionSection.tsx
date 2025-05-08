
import React from "react";
import { FileText, ShieldCheck, Network, Lock, ChartBar } from "lucide-react";

const features = [
  {
    icon: <FileText size={24} className="text-gray-800" />,
    title: "Smart Report Generation",
    description: "AI-assisted medical report writing from within the hospital"
  },
  {
    icon: <ShieldCheck size={24} className="text-gray-800" />,
    title: "Real-Time Policy Validation",
    description: "Instant insurer policy checks to reduce rejections"
  },
  {
    icon: <Network size={24} className="text-gray-800" />,
    title: "Hospital–Insurer Sync",
    description: "In-platform communication for case review & updates"
  },
  {
    icon: <Lock size={24} className="text-gray-800" />,
    title: "Secure Data Handling",
    description: "All data encrypted and PDPL-ready"
  },
  {
    icon: <ChartBar size={24} className="text-gray-800" />,
    title: "Approval Insights Dashboard",
    description: "Analytics for hospital and insurer decision-makers"
  }
];

const ProductVisionSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">How MedAI Will Work</h2>
          <p className="text-xl text-gray-600">Our complete platform connecting hospitals and insurers</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <div className="p-4 bg-white rounded-full shadow-sm mb-6">
                {feature.icon}
              </div>
              <h3 className="font-medium text-lg mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-sm font-medium text-gray-600">Launching full version in 2025</p>
        </div>
      </div>
    </section>
  );
};

export default ProductVisionSection;
