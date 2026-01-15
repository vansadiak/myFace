import { themeColors } from "./src/utils/theme-utils";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          dark: themeColors.primary.dark,
          light: themeColors.primary.light,
          "hover-dark": themeColors.primary.hoverDark,
          "hover-light": themeColors.primary.hoverLight,
        },
        background: {
          dark: themeColors.background.dark,
          light: themeColors.background.light,
        },
        secondary: {
          dark: themeColors.secondary.dark,
          light: themeColors.secondary.light,
        },
        accent: {
          dark: themeColors.accent.dark,
          light: themeColors.accent.light,
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
