
import React from "react";
import { FileText, ShieldCheck, Network, Lock, ChartBar } from "lucide-react";

const ProductVisionSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">How MedAI Will Work</h2>
          <p className="mt-4 text-lg text-gray-600">Our complete platform connecting hospitals and insurers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <FileText size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Smart Report Generation</h3>
            <p className="text-gray-600 text-sm">AI-assisted medical report writing from within the hospital</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <ShieldCheck size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Real-Time Policy Validation</h3>
            <p className="text-gray-600 text-sm">Instant insurer policy checks to reduce rejections</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Network size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Hospital–Insurer Sync</h3>
            <p className="text-gray-600 text-sm">In-platform communication for case review & updates</p>
          </div>
          
          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Lock size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Secure Data Handling</h3>
            <p className="text-gray-600 text-sm">All data encrypted and PDPL-ready</p>
          </div>
          
          {/* Feature 5 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <ChartBar size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Approval Insights Dashboard</h3>
            <p className="text-gray-600 text-sm">Analytics for hospital and insurer decision-makers</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm font-medium text-blue-600">Launching full version in 2025</p>
        </div>
      </div>
    </section>
  );
};

export default ProductVisionSection;
