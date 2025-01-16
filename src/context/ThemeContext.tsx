"use client";
import { PropsTheme, ThemeProviderProps } from "@/types/context";
import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext<PropsTheme | null>(null);

export const useContextTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Please use Context Theme inside layout.");

  return context;
};

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<string>(
    typeof window !== 'undefined' ?
      localStorage.getItem("theme") || "light" : "light"
  );
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", mode);
    }
  }, [mode, setMode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
