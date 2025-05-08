
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using MedAI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Demo Version Limitations</h2>
          <p>
            The current version of MedAI is a limited demonstration of our technology and is not intended for production use. The demo version:
          </p>
          <ul className="list-disc pl-5 space-y-2 my-4">
            <li>Should not be used with real patient data</li>
            <li>May have limited functionality compared to the full release</li>
            <li>Is provided "as is" without warranties of any kind</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">User Obligations</h2>
          <p>
            When using our demo service, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2 my-4">
            <li>Upload real patient data or sensitive personal information</li>
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to reverse engineer or breach the security of the platform</li>
            <li>Share access credentials with unauthorized users</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Intellectual Property</h2>
          <p>
            All content included on this site, such as text, graphics, logos, and software, is the property of MedAI or its content suppliers and is protected by international copyright laws.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <p>
            MedAI shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the demo service.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Governing Law</h2>
          <p>
            These terms shall be governed and construed in accordance with the laws of Saudi Arabia, without regard to its conflict of law provisions.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
