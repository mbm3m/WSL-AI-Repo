
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, AlertTriangle, FileWarning } from "lucide-react";

const ChallengesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 mb-16">
          Common Challenges We Solve
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Delays in Manual Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Eliminate bottlenecks in the approval process with streamlined 
                digital workflows.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">High Error Rates & Rejections</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Reduce mistakes and improve accuracy with automated validation checks.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <FileWarning className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Mismatch with Insurance Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ensure compliance with real-time policy verification and updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
