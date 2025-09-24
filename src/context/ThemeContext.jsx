// File: src/context/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Load theme preference from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Save theme, update class & CSS variables
  useEffect(() => {
    localStorage.setItem("theme", theme);

    const root = document.documentElement;

    if (theme === "light") {
      // Remove dark mode class
      root.classList.remove("dark");

      // Light theme variables
      root.style.setProperty("--bg-color", "#f9fafb"); // light bg
      root.style.setProperty("--text-color", "#111827"); // dark text
      root.style.setProperty("--nav-bg", "#f3f4f6");
      root.style.setProperty("--nav-text", "#111827");
    } else {
      // Add dark mode class
      root.classList.add("dark");

      // Dark theme variables
      root.style.setProperty("--bg-color", "#111827"); // dark bg
      root.style.setProperty("--text-color", "#f9fafb"); // light text
      root.style.setProperty("--nav-bg", "#1f2937");
      root.style.setProperty("--nav-text", "#f9fafb");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);