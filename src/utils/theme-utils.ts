interface ThemeColors {
  primary: {
    dark: string;
    light: string;
    hoverDark: string;
    hoverLight: string;
  };
  background: {
    dark: string;
    light: string;
  };
  secondary: {
    dark: string;
    light: string;
  };
  accent: {
    dark: string;
    light: string;
  };
}

// Single source of truth for all theme colors
export const themeColors: ThemeColors = {
  primary: {
    dark: "#4ECDC4", // teal
    light: "#FF6B6B", // coral
    hoverDark: "#45b8b0",
    hoverLight: "#ff5252",
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
} as const; // Make it readonly

export const getThemeClasses = (isDarkMode: boolean) => ({
  background: isDarkMode ? "bg-background-dark" : "bg-background-light",
  text: isDarkMode ? "text-white" : "text-black",
  primary: isDarkMode ? "text-primary-dark" : "text-primary-light",
  primaryBg: isDarkMode ? "bg-primary-dark" : "bg-primary-light",
  primaryBorder: isDarkMode ? "border-primary-dark" : "border-primary-light",
  primaryHover: isDarkMode
    ? "hover:text-primary-hover-dark"
    : "hover:text-primary-hover-light",
  secondary: isDarkMode ? "bg-secondary-dark" : "bg-secondary-light",
  accent: isDarkMode ? "bg-accent-dark" : "bg-accent-light",
  neutralBg: isDarkMode ? "bg-gray-800" : "bg-gray-200",
});
