/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      colors: {
        accent: "#FF0000",
      },
      borderRadius: {
        none: "0",
      },
    },
  },
  plugins: [],
};
