import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/domain/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)"
      },
      borderRadius: {
        theme: "var(--radius-theme)"
      },
      boxShadow: {
        theme: "var(--shadow-theme)"
      },
      transitionTimingFunction: {
        theme: "var(--ease-theme)"
      },
      transitionDuration: {
        theme: "var(--duration-theme)"
      }
    }
  },
  plugins: []
};

export default config;
