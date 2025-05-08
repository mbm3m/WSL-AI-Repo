
import React, { useEffect, useRef } from "react";
import { Clock, AlertTriangle, FileWarning } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const challenges = [
  {
    icon: <Clock className="h-7 w-7 text-blue-600 dark:text-blue-400" />,
    title: "Delays in Manual Reviews",
    description: "Eliminate bottlenecks in the approval process with streamlined digital workflows."
  },
  {
    icon: <AlertTriangle className="h-7 w-7 text-blue-600 dark:text-blue-400" />,
    title: "High Error Rates & Rejections",
    description: "Reduce mistakes and improve accuracy with automated validation checks."
  },
  {
    icon: <FileWarning className="h-7 w-7 text-blue-600 dark:text-blue-400" />,
    title: "Mismatch with Insurance Policies",
    description: "Ensure compliance with real-time policy verification and updates."
  }
];

const ChallengesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Simplified animation - just toggle opacity class
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            
            // Find all challenge cards within this section and mark them to be animated with CSS
            const cards = entry.target.querySelectorAll('.challenge-card');
            cards.forEach(card => card.classList.add('shown'));
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
      id="challenges-section"
      ref={sectionRef} 
      className={`py-32 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} opacity-0 transition-opacity duration-700 overflow-hidden`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className={`text-4xl md:text-5xl font-display font-bold tracking-tight text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
          Common Challenges We Solve
        </h2>
        
        <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-center mb-16 max-w-3xl mx-auto font-light`}>
          Our platform addresses key pain points in the medical approval process
        </p>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {challenges.map((challenge, index) => (
            <div 
              key={index} 
              className={`challenge-card flex flex-col items-start p-8 ${
                theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:shadow-md'
              } rounded-2xl shadow-sm transition-all duration-300 opacity-0 [&.shown]:opacity-100 delay-${index * 100}`}
            >
              <div className={`p-4 ${
                theme === 'dark' 
                  ? 'bg-gray-700' 
                  : 'bg-white'
              } shadow-md rounded-full mb-8 transition-transform duration-300 hover:scale-105`}>
                {challenge.icon}
              </div>
              <h3 className={`text-xl font-display font-semibold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{challenge.title}</h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              } font-light`}>{challenge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
