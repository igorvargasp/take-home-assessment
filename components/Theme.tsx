"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";

export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "dark") {
      setIsDark(true);
    } else if (localTheme === "light") {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`${isDark ? "dark" : ""}`}>
        <div className="min-h-screen transition-colors duration-200 bg-white dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      onClick={toggleTheme}
      data-testid={"theme-toggle"}
    >
      {isDark ? (
        <LightMode
          sx={{
            color: "white",
          }}
        />
      ) : (
        <DarkMode
          sx={{
            color: "black",
          }}
        />
      )}
    </button>
  );
};
