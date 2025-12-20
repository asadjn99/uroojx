import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    // Add all these paths to ensure it catches your files
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1933b3",
        "background-light": "#f6f6f8",
        "background-dark": "#111217",
        "surface-dark": "#1c1e26",
        "surface-highlight": "#292c38",
      },
      fontFamily: {
        display: ["var(--font-lexend)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;