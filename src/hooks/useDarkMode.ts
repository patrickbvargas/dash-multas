import React from "react";
import { useLocalStorage } from "./useLocalStorage";

interface DarkModeOutput {
  isDarkMode: boolean;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
  system: () => void;
}

export function useDarkMode(): DarkModeOutput {
  const isDarkOS = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>("dark-mode", isDarkOS);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return {
    isDarkMode,
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
    toggle: () => setDarkMode((prev) => !prev),
    system: () => setDarkMode(isDarkOS),
  };
}
