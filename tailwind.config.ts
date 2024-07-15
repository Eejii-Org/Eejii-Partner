import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "var(--background)",
        backgroundSecondary: "var(--background-secondary)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          50: "rgba(60, 136, 141, 0.1)" /* 10% opacity */,
          100: "rgba(60, 136, 141, 0.2)" /* 20% opacity */,
          200: "rgba(60, 136, 141, 0.3)" /* 30% opacity */,
          300: "rgba(60, 136, 141, 0.4)" /* 30% opacity */,
          400: "rgba(60, 136, 141, 0.5)" /* 30% opacity */,
          500: "rgba(60, 136, 141, 0.6)" /* 30% opacity */,
          600: "rgba(60, 136, 141, 0.7)" /* 30% opacity */,
          700: "rgba(60, 136, 141, 0.8)" /* 30% opacity */,
          800: "rgba(60, 136, 141, 0.9)" /* 30% opacity */,
          900: "rgba(60, 136, 141, 1)" /* 30% opacity */,
          dark: "rgba(25, 66, 69, 1)" /* 30% opacity */,
          // Continue as needed
        },
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
      },
      dropShadow: {
        card: "0px 4px 40px rgba(0, 0, 0, 0.06)",
      },
    },
    fontSize: {
      xs: ["10px", "12px"],
      sm: ["12px", "16px"],
      md: ["14px", "18px"],
      lg: ["16px", "24px"],
      xl: ["20px", "24px"],
      "2xl": ["24px", "24px"],
      "3xl": ["34px", "32px"],
      "4xl": ["38px", "32px"],
      "5xl": ["40px", "44px"],
      "6xl": ["64px", "64px"],
      "9xl": ["96px", "149px"],
      logoSize: ["32px", "44px"],
      logoMobile: ["20px", "28px"],
      cartDesktop: ["28px", "40px"],
    },
    screens: {
      xs: "576px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1408px",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xs: "576px",
        sm: "768px",
        md: "992px",
        lg: "1200px",
        xl: "1408px",
      },
    },
  },
  plugins: [],
};
export default config;
