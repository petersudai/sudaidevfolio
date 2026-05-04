import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans:    ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        heading: ["Syne", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      colors: {
        teal: {
          300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6",
          600: "#0d9488", 700: "#0f766e",
        },
        gold: { 400: "#fbbf24", 500: "#f59e0b" },
        surface: {
          0: "#03080e", 1: "#070f18", 2: "#0c1824",
          3: "#111f2e", 4: "#172538", 5: "#1d2f44",
        },
        ink: {
          1: "#f0f6ff", 2: "#8eafc8", 3: "#4d6f88", 4: "#2a4155",
        },
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "1.5", letterSpacing: "0.08em" }],
        "xs":  ["12px", { lineHeight: "1.6" }],
        "sm":  ["14px", { lineHeight: "1.65" }],
        "base":["15px", { lineHeight: "1.75" }],
        "md":  ["16px", { lineHeight: "1.7" }],
        "lg":  ["18px", { lineHeight: "1.5" }],
        "xl":  ["20px", { lineHeight: "1.4" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["30px", { lineHeight: "1.2" }],
        "4xl": ["36px", { lineHeight: "1.1" }],
        "5xl": ["48px", { lineHeight: "1.05" }],
        "6xl": ["60px", { lineHeight: "1.02" }],
        "7xl": ["72px", { lineHeight: "1.0" }],
      },
      spacing: {
        "18": "4.5rem", "22": "5.5rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "live-pulse": {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.25" },
        },
        "border-flow": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.65s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":    "fade-in 0.45s ease both",
        "live-pulse": "live-pulse 2s ease-in-out infinite",
        "float":      "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
