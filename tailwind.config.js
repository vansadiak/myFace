/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      colors: {
        accent: "var(--accent1)",
        accent2: "var(--accent2)",
        "theme-bg": "var(--bg)",
        "theme-text": "var(--text)",
        "theme-border": "var(--border)",
      },
      borderRadius: {
        none: "0",
      },
    },
  },
  plugins: [],
};
