
import React from "react";
import { Clock, AlertTriangle, FileWarning } from "lucide-react";

const challenges = [
  {
    icon: <Clock className="h-6 w-6 text-gray-800" />,
    title: "Delays in Manual Reviews",
    description: "Eliminate bottlenecks in the approval process with streamlined digital workflows."
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-gray-800" />,
    title: "High Error Rates & Rejections",
    description: "Reduce mistakes and improve accuracy with automated validation checks."
  },
  {
    icon: <FileWarning className="h-6 w-6 text-gray-800" />,
    title: "Mismatch with Insurance Policies",
    description: "Ensure compliance with real-time policy verification and updates."
  }
];

const ChallengesSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-4xl font-bold tracking-tight text-center text-gray-900 mb-16">
          Common Challenges We Solve
        </h2>
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {challenges.map((challenge, index) => (
            <div key={index} className="flex flex-col items-start p-6 bg-white rounded-2xl transition-all duration-300 hover:shadow-lg">
              <div className="p-3 bg-gray-100 rounded-full mb-6">
                {challenge.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{challenge.title}</h3>
              <p className="text-gray-600">{challenge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
