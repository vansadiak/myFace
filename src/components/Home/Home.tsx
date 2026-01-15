import React from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { getThemeClasses } from "../../utils/theme-utils";
import { introText, socialLinks } from "../../types/me";
import TypingGame from "./TypingGame";

const Home: React.FC = () => {
  const [isDarkMode] = useDarkMode();
  const theme = getThemeClasses(isDarkMode);

  return (
    <div
      className={`h-full flex flex-col items-center justify-center px-4 page-fade-in ${theme.background} ${theme.text}`}
    >
      <main className="max-w-2xl w-full">
        {/* Name */}
        <h1 className={`text-4xl md:text-6xl font-bold tracking-tight mb-2 ${theme.accent}`}>
          {introText.name.toUpperCase()}
        </h1>

        {/* Divider */}
        <div className={`w-full h-0.5 ${isDarkMode ? "bg-white" : "bg-black"} mb-4`} />

        {/* Role & Location */}
        <p className="text-lg md:text-xl mb-6">
          {introText.role} &bull; {introText.location}
        </p>

        {/* Typing Game */}
        <TypingGame isDarkMode={isDarkMode} />

        {/* Social Links */}
        <div className="flex flex-wrap gap-4">
          {socialLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 border-2 ${theme.border} hover-invert font-medium text-sm uppercase tracking-wide`}
            >
              {label}
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
