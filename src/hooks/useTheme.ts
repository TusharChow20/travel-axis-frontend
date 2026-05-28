"use client";
import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    // During SSR this won't run, but on client it reads the class
    // the blocking script already applied — no flash
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }
    return "dark"; // SSR fallback — matches your desired default
  });

  useEffect(() => {
    // Sync in case nothing was saved yet
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = saved || preferred;
    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, setTheme, toggleTheme };
};
