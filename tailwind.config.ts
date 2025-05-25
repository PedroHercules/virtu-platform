import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        background: "#1E1E2E", // Azul escuro suave
        foreground: "#F2F2F2",
        muted: "#282838", // Azul escuro um pouco mais claro
        primary: {
          DEFAULT: "#C41E3A", // Vermelho profundo
          hover: "#A91B33",
        },
        secondary: {
          DEFAULT: "#2A2A3C", // Azul escuro mais claro
          hover: "#313145",
        },
        accent: {
          DEFAULT: "#D4AF37", // Dourado mais vibrante
          hover: "#BF9F30",
        },
        border: "#373750", // Azul acinzentado
        input: "#24243A", // Azul escuro para inputs
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
