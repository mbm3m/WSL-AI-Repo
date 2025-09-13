import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "react-i18next";

const EarlyAccessSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    hospital: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, {
      threshold: 0.1
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase.from("applications").insert({
        full_name: formData.fullName,
        email: formData.email,
        hospital: formData.hospital,
        phone: formData.phone
      });
      
      if (error) {
        console.error("Error submitting application:", error);
        toast.error(t("earlyAccess.form.errorMessage"));
      } else {
        toast.success(t("earlyAccess.form.successMessage"));
        setFormData({
          fullName: "",
          email: "",
          hospital: "",
          phone: ""
        });
      }
    } catch (err) {
      console.error("Error in submission:", err);
      toast.error(t("earlyAccess.form.unexpectedError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="early-access-section" 
      ref={sectionRef} 
      className={`py-32 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } scroll-mt-20 transition-all duration-700 opacity-0 translate-y-10`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-display font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } mb-6`}>
            {t("earlyAccess.title")}
          </h2>
          <p className={`text-xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          } font-light max-w-3xl mx-auto`}>
            {t("earlyAccess.subtitle")}
          </p>
        </div>

        <div ref={formRef} className="relative transition-all duration-700 opacity-0 translate-y-10 delay-300">
          <div className={`absolute -inset-1 ${
            theme === "dark" 
              ? "bg-gradient-to-r from-gray-800 to-gray-700" 
              : "bg-gradient-to-r from-gray-100 to-gray-200"
          } rounded-xl blur-lg opacity-30`}></div>
          <div className={`relative ${
            theme === "dark" 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-100"
          } rounded-2xl p-8 md:p-12 border shadow-sm`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="fullName" className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>{t("earlyAccess.form.fullName")}</label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    placeholder={t("earlyAccess.form.fullNamePlaceholder")} 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    required 
                    className={`w-full ${
                      theme === "dark" 
                        ? "border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/10" 
                        : "border-gray-200 focus:border-black focus:ring-0"
                    } transition-all duration-300`} 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>{t("earlyAccess.form.email")}</label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder={t("earlyAccess.form.emailPlaceholder")} 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className={`w-full ${
                      theme === "dark" 
                        ? "border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/10" 
                        : "border-gray-200 focus:border-black focus:ring-0"
                    } transition-all duration-300`} 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="hospital" className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>{t("earlyAccess.form.hospital")}</label>
                  <Input 
                    id="hospital" 
                    name="hospital" 
                    placeholder={t("earlyAccess.form.hospitalPlaceholder")} 
                    value={formData.hospital} 
                    onChange={handleChange} 
                    required 
                    className={`w-full ${
                      theme === "dark" 
                        ? "border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/10" 
                        : "border-gray-200 focus:border-black focus:ring-0"
                    } transition-all duration-300`} 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>{t("earlyAccess.form.phone")}</label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder={t("earlyAccess.form.phonePlaceholder")} 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    className={`w-full ${
                      theme === "dark" 
                        ? "border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/10" 
                        : "border-gray-200 focus:border-black focus:ring-0"
                    } transition-all duration-300`} 
                  />
                </div>
              </div>
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="px-8 py-6 text-white rounded-full transition-all duration-300 bg-blue-600 hover:bg-blue-500"
                >
                  {isSubmitting ? t("earlyAccess.form.processing") : t("earlyAccess.form.applyNow")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
