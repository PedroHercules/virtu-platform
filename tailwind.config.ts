import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        background: "#0A0A0B",
        foreground: "#F5F5F5",
        muted: "#1F1F23",
        primary: {
          DEFAULT: "#DC2626",
          hover: "#B91C1C",
        },
        secondary: {
          DEFAULT: "#1E40AF",
          hover: "#1E3A8A",
        },
        border: "#27272A",
        input: "#18181B",
      },
    },
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/globals.css",
  ],
  plugins: [],
};

export default config;
