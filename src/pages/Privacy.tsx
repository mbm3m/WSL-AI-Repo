
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Notice</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-8 mb-4">Introduction</h2>
          <p>
            At MedAI, we respect your privacy and are committed to protecting your personal data. This privacy notice will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">The Data We Collect</h2>
          <p>
            For our demo version, we collect minimal data necessary to provide our service. This may include:
          </p>
          <ul className="list-disc pl-5 space-y-2 my-4">
            <li>Contact information (email address) if you join our waitlist</li>
            <li>Usage data to improve our services</li>
            <li>Technical data such as browser type and version, time zone setting, operating system</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Demo Data Usage</h2>
          <p>
            Files uploaded to our demo service are used only for the immediate purpose of demonstrating our technology. They are not stored permanently and are deleted after the session ends.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Contact</h2>
          <p>
            If you have any questions about this privacy notice, please contact us through our contact form.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
