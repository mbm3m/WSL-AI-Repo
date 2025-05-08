
import React from "react";
import { FileText, Shield, Cpu } from "lucide-react";

const MVPFlowSection = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-blue-600">This is a limited demo simulating part of our full system</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <FileText size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Upload Medical Report</h3>
            <p className="text-gray-600 text-sm">PDF or Word files from hospital systems</p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Upload Insurance Policy</h3>
            <p className="text-gray-600 text-sm">Choose payer's document to validate against</p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Cpu size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">AI Analysis</h3>
            <p className="text-gray-600 text-sm">Get instant compliance feedback using AI-based engine</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MVPFlowSection;
