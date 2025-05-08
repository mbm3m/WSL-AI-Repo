
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

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
        toast({
          title: "Error",
          description: "There was a problem submitting your message. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Message received",
          description: "Thank you for contacting us. We'll respond shortly.",
        });
        
        // Reset form
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
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
        
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700 shadow-md' 
            : 'bg-white border border-gray-100 shadow-sm'
        } rounded-xl p-8`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              } mb-1`}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-200 text-gray-900'
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              } mb-1`}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-200 text-gray-900'
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="message" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              } mb-1`}>
                Message
              </label>
              <Textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-200 text-gray-900'
                }`}
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
