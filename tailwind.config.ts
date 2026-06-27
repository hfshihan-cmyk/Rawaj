import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch "Desert Night" palette
        background: "#051424",
        surface: "#051424",
        "surface-container-lowest": "#010f1f",
        "surface-container-low": "#0d1c2d",
        "surface-container": "#122131",
        "surface-container-high": "#1c2b3c",
        "surface-container-highest": "#273647",
        "surface-variant": "#273647",
        "on-surface": "#d4e4fa",
        "on-surface-variant": "#c6c6cc",
        secondary: "#4fdbc8", // Oasis Teal
        "on-secondary": "#00201c",
        "secondary-container": "#04b4a2",
        tertiary: "#ffb95f", // Starlight Gold
        "on-tertiary": "#472a00",
        error: "#ffb4ab",
        outline: "#909096",
        "outline-variant": "#46464c",
        // Back-compat aliases used by reused components
        bg: "#051424",
        card: "#0f172a",
        accent: "#4fdbc8",
        "accent-dark": "#04b4a2",
        ink: "#d4e4fa",
        muted: "#c6c6cc",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "system-ui", "sans-serif"],
        geist: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg-mobile": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        gutter: "20px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pop-in": "pop-in 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
