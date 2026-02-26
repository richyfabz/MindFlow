import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
  const root = document.documentElement;

  if (isDarkMode) {
    root.classList.add("dark");
    root.classList.remove("light");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    localStorage.setItem("theme", "light");
  }
}, [isDarkMode]);


  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}