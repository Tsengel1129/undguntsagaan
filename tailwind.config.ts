import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette — deep red accent + warm editorial neutrals
        ivory: "#F7F3EC",
        cream: "#FBF8F2",
        charcoal: "#1A1714",
        ink: "#2B2622",
        red: {
          DEFAULT: "#C8102E",
          deep: "#A30C24",
          soft: "#E23A52",
        },
        gold: {
          DEFAULT: "#B08D3A",
          soft: "#CBAA5C",
          deep: "#8A6E27",
        },
      },
      fontFamily: {
        // Bound to next/font CSS variables (see app/layout.tsx)
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1240px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
