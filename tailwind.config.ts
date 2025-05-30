import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        background: "#182038", // Azul profundo base
        foreground: "#F2F2F2",
        muted: "#1E1E3E", // Azul médio
        primary: {
          DEFAULT: "#141438", // Azul escuro
          hover: "#1a1a2e",
        },
        secondary: {
          DEFAULT: "#1E1E3E", // Azul médio
          hover: "#232348",
        },
        accent: {
          DEFAULT: "#D4AF37", // Mantendo o dourado
          hover: "#BF9F30",
          foreground: "#F2F2F2",
        },
        border: "#1E1E3E", // Azul médio para bordas
        input: "#141438", // Azul escuro para inputs
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-subtle":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },
    },
  },
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/globals.css",
  ],
  plugins: [],
};

export default config;
