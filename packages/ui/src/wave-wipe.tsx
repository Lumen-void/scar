"use client";

import { useEffect, useState } from "react";
import { useScarTheme } from "./theme-provider";

export function WaveWipe() {
  const { theme } = useScarTheme();
  const [activeTheme, setActiveTheme] = useState(theme);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (theme === activeTheme) {
      return;
    }

    setActiveTheme(theme);
    setIsAnimating(true);
    const timer = window.setTimeout(() => setIsAnimating(false), 720);
    return () => window.clearTimeout(timer);
  }, [activeTheme, theme]);

  return (
    <div className={`theme-wipe ${isAnimating ? "theme-wipe--active" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none" focusable="false">
        <path d="M0 92L80 78C160 64 320 36 480 49.3C640 63 800 117 960 126.7C1120 136 1280 100 1360 82L1440 64V180H0V92Z" />
      </svg>
    </div>
  );
}
