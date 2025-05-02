
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Hospital, Building, User } from "lucide-react";

const BenefitsSection = () => {
  const benefits = {
    hospitals: [
      "60% faster approval times",
      "Reduced administrative burden",
      "Better patient satisfaction"
    ],
    insurance: [
      "Streamlined evaluation process",
      "Reduced processing costs",
      "Enhanced fraud detection"
    ],
    patients: [
      "Faster treatment approvals",
      "Transparent process tracking",
      "Improved care experience"
    ]
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 mb-16">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <Hospital className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>For Hospitals & Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.hospitals.map((benefit, index) => (
                  <li key={index} className="flex">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>For Insurance Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.insurance.map((benefit, index) => (
                  <li key={index} className="flex">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>For Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.patients.map((benefit, index) => (
                  <li key={index} className="flex">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
