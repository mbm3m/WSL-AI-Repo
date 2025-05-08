
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
    
    // Make sure ALL elements (including footer) are fully visible
    document.querySelectorAll('section, footer').forEach(element => {
      element.classList.add('opacity-100');
      element.classList.remove('opacity-0', 'translate-y-10');
    });
    
    // Apply theme change using RAF for smoother transition
    requestAnimationFrame(() => {
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      
      // Save theme preference
      localStorage.setItem("theme", theme);
      
      // Additional RAF to ensure DOM is fully updated
      requestAnimationFrame(() => {
        // Force footer to be visible
        const footer = document.querySelector('footer');
        if (footer) {
          footer.style.opacity = '1';
          footer.classList.add('opacity-100');
          footer.classList.remove('opacity-0');
        }
      });
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
