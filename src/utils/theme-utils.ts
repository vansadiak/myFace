interface ThemeColors {
  primary: string;
  background: {
    dark: string;
    light: string;
  };
  text: {
    dark: string;
    light: string;
  };
  border: {
    dark: string;
    light: string;
  };
}

// Brutalist color scheme - monochrome + red accent
export const themeColors: ThemeColors = {
  primary: "#FF0000", // red accent - same for both modes
  background: {
    dark: "#000000", // pure black
    light: "#FFFFFF", // pure white
  },
  text: {
    dark: "#FFFFFF", // white text on dark
    light: "#000000", // black text on light
  },
  border: {
    dark: "#FFFFFF", // white borders on dark
    light: "#000000", // black borders on light
  },
} as const;

export interface ThemeClasses {
  background: string;
  text: string;
  border: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentHover: string;
  inputBg: string;
}

export const getThemeClasses = (isDarkMode: boolean): ThemeClasses => ({
  background: isDarkMode ? "bg-black" : "bg-white",
  text: isDarkMode ? "text-white" : "text-black",
  border: isDarkMode ? "border-white" : "border-black",
  accent: "text-accent",
  accentBg: "bg-accent",
  accentBorder: "border-accent",
  accentHover: "hover:border-accent hover:text-accent",
  inputBg: isDarkMode ? "bg-black" : "bg-white",
});
