import isBrowser from "@lib/isBrowser";
import React, { createContext, useContext, useState, useEffect } from "react";

let initialTheme = "";
let initialThemeMode = "";

if (isBrowser()) {
  initialThemeMode = localStorage.getItem("theme");
  if (!initialThemeMode) {
    initialThemeMode = "auto";
    localStorage.setItem("theme", "auto");
  }
  if (initialThemeMode == "auto")
    initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  else initialTheme = initialThemeMode;
}

const Context = createContext();

export default function useTheme() {
  const context = useContext(Context);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);
  const [themeMode, setThemeMode] = useState(initialThemeMode);

  useEffect(() => {
    if (theme == "dark") document.documentElement.setAttribute("theme", "dark");
    else document.documentElement.setAttribute("theme", "light");
  }, [theme]);

  useEffect(() => {
    const event = (e) => {
      if (themeMode != "auto") return;
      const isDark = e.matches;
      if (isDark) setTheme("dark");
      else setTheme("light");
    };
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    matchMedia.addEventListener("change", event);

    return () => {
      matchMedia.removeEventListener("change", event);
    };
  }, [themeMode]);

  const setThemeFunc = (arg) => {
    if (!["light", "dark", "auto"].some((t) => t === arg))
      throw Error("SetTheme takes only light, dark or auto string");

    if (arg == "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
      else setTheme("light");
    } else {
      setTheme(arg);
    }

    setThemeMode(arg);
    localStorage.setItem("theme", arg);
  };

  return <Context.Provider value={{ theme, themeMode, setTheme: setThemeFunc }}>{children}</Context.Provider>;
};
