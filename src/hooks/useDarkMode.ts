import { useTheme } from "../contexts/ThemeContext";

const useDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return [isDarkMode, toggleDarkMode] as const;
};

export default useDarkMode;
