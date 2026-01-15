/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#4ECDC4",
          light: "#FF6B6B",
          "hover-dark": "#45b8b0",
          "hover-light": "#ff5252",
        },
        background: {
          dark: "#111827", // gray-900
          light: "#F9FAFB", // gray-50
        },
        secondary: {
          dark: "#1F2937", // gray-800
          light: "#FFFFFF", // white
        },
        accent: {
          dark: "#374151", // gray-700
          light: "#F3F4F6", // gray-100
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
