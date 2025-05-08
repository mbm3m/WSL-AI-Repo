
import React, { useEffect, useRef } from "react";
import { Clock, AlertTriangle, FileWarning } from "lucide-react";

const challenges = [
  {
    icon: <Clock className="h-7 w-7 text-gray-800" />,
    title: "Delays in Manual Reviews",
    description: "Eliminate bottlenecks in the approval process with streamlined digital workflows."
  },
  {
    icon: <AlertTriangle className="h-7 w-7 text-gray-800" />,
    title: "High Error Rates & Rejections",
    description: "Reduce mistakes and improve accuracy with automated validation checks."
  },
  {
    icon: <FileWarning className="h-7 w-7 text-gray-800" />,
    title: "Mismatch with Insurance Policies",
    description: "Ensure compliance with real-time policy verification and updates."
  }
];

const ChallengesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class to section
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            
            // Find all challenge cards within this section
            const cards = entry.target.querySelectorAll('.challenge-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('opacity-100', 'translate-y-0');
                card.classList.remove('opacity-0', 'translate-y-10');
              }, index * 100); // Stagger the animation
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
      id="challenges-section"
      ref={sectionRef} 
      className="py-32 bg-gray-50 transition-all duration-700 opacity-0 translate-y-10 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-center text-gray-900 mb-6">
          Common Challenges We Solve
        </h2>
        
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto font-light">
          Our platform addresses key pain points in the medical approval process
        </p>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {challenges.map((challenge, index) => (
            <div 
              key={index} 
              className="challenge-card flex flex-col items-start p-8 bg-white rounded-2xl transition-all duration-500 opacity-0 translate-y-10 shadow-sm hover:shadow-md"
            >
              <div className="p-4 bg-gray-100 rounded-2xl mb-8">
                {challenge.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{challenge.title}</h3>
              <p className="text-gray-600 font-light">{challenge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
