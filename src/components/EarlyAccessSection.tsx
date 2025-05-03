
import React, { useState } from "react";
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
    <section id="early-access-section" className="py-16 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Join the Platform — Early Access for Healthcare Teams
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Be among the first to transform your medical approval process
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                name="hospital"
                placeholder="Hospital/Company"
                value={formData.hospital}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Apply Now"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
