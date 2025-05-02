
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Application submitted successfully! We'll be in touch soon.");
      setFormData({
        fullName: "",
        email: "",
        hospital: "",
        phone: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-16">
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
