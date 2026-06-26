import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rawaj design tokens (dashboard / dark mode)
        bg: "#0a0f1e", // deep navy background
        card: "#111827", // card surface
        accent: "#14b8a6", // teal accent
        "accent-dark": "#0f766e",
        ink: "#f9fafb", // primary text
        muted: "#9ca3af", // secondary / english labels
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "system-ui", "sans-serif"],
        tajawal: ["var(--font-tajawal)", "system-ui", "sans-serif"],
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
