
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      // Check if theme was previously stored
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      // Check system preference
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      return savedTheme || systemPreference;
    }
    return "light"; // Default theme
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    // Important: Set all sections to visible BEFORE changing theme to avoid flicker
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('opacity-100');
      section.classList.remove('opacity-0');
    });
    
    // Add a small delay to ensure DOM is ready before theme switch
    requestAnimationFrame(() => {
      // Apply theme change
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      
      // Save theme preference
      localStorage.setItem("theme", theme);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
