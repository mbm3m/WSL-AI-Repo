
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Faster Medical Approvals, Less Paperwork — Built for Saudi Hospitals & Insurance Companies
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Transform the approval journey with a reliable, accurate, and fast digital process tailored to the local healthcare system.
            </p>
            <div className="mt-10 flex gap-4">
              <Button asChild className="bg-blue-500 hover:bg-blue-600 px-6">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
          <div className="lg:relative lg:h-full">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3"
              alt="Doctor using MedAI"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
