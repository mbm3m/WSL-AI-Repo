import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/use-theme";
import { trackViewedContact } from "@/utils/analytics";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Track contact page view
    trackViewedContact();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Store data in Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name,
          email,
          message
        });
      
      if (error) {
        console.error("Error submitting form:", error);
        toast.error("There was a problem submitting your message. Please try again.");
      } else {
        toast.success("Thank you for contacting us. We'll respond shortly.");
        
        // Reset form
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-2xl pt-24">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-6 font-display tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Contact Us</h1>
          <p className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          } max-w-lg mx-auto text-lg`}>
            Have questions about MedAI? We'd love to hear from you. Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>
        
        <div className="relative">
          <div className={`absolute -inset-1 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
              : 'bg-gradient-to-r from-gray-100 to-gray-200'
          } rounded-xl blur-lg opacity-30`}></div>
          <div className={`relative ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-100'
          } rounded-2xl p-8 md:p-12 border shadow-sm`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className={`w-full border ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/10' 
                      : 'border-gray-200 focus:border-black focus:ring-0'
                  } transition-all duration-300`}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email"
                  className={`w-full border ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/10' 
                      : 'border-gray-200 focus:border-black focus:ring-0'
                  } transition-all duration-300`}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="How can we help you?"
                  className={`w-full border ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/10' 
                      : 'border-gray-200 focus:border-black focus:ring-0'
                  } transition-all duration-300`}
                />
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-6 text-white rounded-full transition-all duration-300 bg-blue-600 hover:bg-blue-500"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
