import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F0EB",
        "text-primary": "#1A1A1A",
        "text-secondary": "#6B6560",
        accent: "#C4A882",
        white: "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-tt-chocolates)", "sans-serif"],
        body:    ["var(--font-tt-chocolates)", "sans-serif"],
      },
      keyframes: {
        scrollUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        scrollUpTriple: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-33.3333%)" },
        },
      },
      animation: {
        "scroll-up":     "scrollUp 30s linear infinite",
        "scroll-up-slow":"scrollUp 42s linear infinite",
        "scroll-canvas": "scrollUpTriple 60s linear infinite",
        "scroll-canvas-b":"scrollUpTriple 80s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
