import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    
    // Update document direction
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="icon"
      className={`rounded-full ${
        theme === "dark" 
          ? "text-gray-200 hover:text-white hover:bg-gray-700" 
          : "text-gray-700 hover:bg-gray-100"
      }`}
      aria-label="Switch language"
    >
      <Globe size={20} />
    </Button>
  );
};

export default LanguageSwitcher;
