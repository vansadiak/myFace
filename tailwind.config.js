/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        fadeInOut: "fadeInOut 3s infinite",
      },
      fontFamily: {
        munro: ['"Munro"', "monospace"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
