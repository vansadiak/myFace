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
