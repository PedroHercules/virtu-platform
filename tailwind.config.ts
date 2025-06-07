import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        background: "#EEF0F2", // Cinza claro principal
        foreground: "#4C5454", // Cinza escuro para texto
        muted: "#E0E2E4", // Variação mais escura do cinza claro
        primary: {
          DEFAULT: "#4C5454", // Cinza escuro principal
          hover: "#3A4040",
        },
        secondary: {
          DEFAULT: "#EEF0F2", // Cinza claro
          hover: "#E0E2E4",
        },
        accent: {
          DEFAULT: "#CD8B76", // Coral/terracota principal
          hover: "#B7755F",
          foreground: "#ffffff",
        },
        border: "#DDE0E2", // Tom entre o cinza claro e médio
        input: "#FAFBFC", // Variação mais clara do background
        destructive: {
          DEFAULT: "#D67B6A", // Vermelho baseado no tom terracota
          hover: "#C16853",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#8CAF88", // Verde suave que combina com a paleta
          hover: "#7A9D76",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#E4A76B", // Laranja suave que harmoniza
          hover: "#D1945A",
          foreground: "#ffffff",
        },
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
