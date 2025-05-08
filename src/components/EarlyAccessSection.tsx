
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const EarlyAccessSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    hospital: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase.from('applications').insert({
        full_name: formData.fullName,
        email: formData.email,
        hospital: formData.hospital,
        phone: formData.phone
      });
      
      if (error) {
        console.error("Error submitting application:", error);
        toast.error("Failed to submit your application. Please try again.");
      } else {
        toast.success("Application submitted successfully! We'll be in touch soon.");
        setFormData({
          fullName: "",
          email: "",
          hospital: "",
          phone: ""
        });
      }
    } catch (err) {
      console.error("Error in submission:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="early-access-section" 
      ref={sectionRef}
      className="py-32 bg-white scroll-mt-20 transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-6">
            Join the Platform — Early Access
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Be among the first to transform your medical approval process
          </p>
        </div>

        <div 
          ref={formRef}
          className="relative transition-all duration-700 opacity-0 translate-y-10 delay-300"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl blur-lg opacity-30"></div>
          <div className="relative bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-200 focus:border-black focus:ring-0 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-200 focus:border-black focus:ring-0 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="hospital" className="text-sm font-medium text-gray-700">Hospital/Company</label>
                  <Input
                    id="hospital"
                    name="hospital"
                    placeholder="Your organization"
                    value={formData.hospital}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-200 focus:border-black focus:ring-0 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-200 focus:border-black focus:ring-0 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  className="px-8 py-6 bg-black hover:bg-gray-800 text-white rounded-full transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Apply Now"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
