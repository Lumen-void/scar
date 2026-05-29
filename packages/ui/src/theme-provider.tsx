"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { scarThemes, type ScarTheme, type ThemeConfig } from "@scar/domain";

type ThemeContextValue = {
  theme: ScarTheme;
  config: ThemeConfig;
  setTheme: (theme: ScarTheme) => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  initialTheme,
  children
}: {
  initialTheme: ScarTheme;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<ScarTheme>(initialTheme);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.setProperty("--theme-audio-ambient", `"${scarThemes[theme].audio.ambient}"`);
    root.style.setProperty("--theme-audio-cue", `"${scarThemes[theme].audio.cue}"`);
  }, [theme]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  const value = useMemo(
    () => ({
      theme,
      config: scarThemes[theme],
      setTheme,
      audioEnabled,
      setAudioEnabled
    }),
    [audioEnabled, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useScarTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useScarTheme must be used inside ThemeProvider");
  }

  return context;
}
