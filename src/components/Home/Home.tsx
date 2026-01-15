import React, { useState, useEffect } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import useTypingEffect from "../../hooks/useTypingEffect";
import { FaGithub, FaLinkedin, FaFileAlt, FaEnvelope } from "react-icons/fa";
import { getThemeClasses } from "../../utils/theme-utils";
import LaptopSVG from "./LaptopSVG";
import { getIntroText, socialLinks, cvDownloadLink } from "../../types/me";

interface HomeProps {
  hasTyped: boolean;
  setHasTyped: (hasTyped: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ hasTyped, setHasTyped }) => {
  const [isDarkMode] = useDarkMode();
  const themeClasses = getThemeClasses(isDarkMode);
  const [name] = useState(getIntroText(isDarkMode));
  const [showGif, setShowGif] = useState(false);
  const displayedText = useTypingEffect(name, 60, !hasTyped);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = () => {
      setShowGif(true);
      setTimeout(() => setShowGif(false), 4000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Show gif when text is changing
  useEffect(() => {
    setShowGif(displayedText.length !== name.length);
  }, [displayedText, name.length]);

  useEffect(() => {
    if (displayedText.length === name.length) {
      setHasTyped(true);
    }
  }, [displayedText, name.length, setHasTyped]);

  // Split text only when needed
  const [firstLine, secondLine] = displayedText.split("<br />");

  return (
    <div
      className={`h-screen flex flex-col relative overflow-hidden ${themeClasses.background} ${themeClasses.text}`}
    >
      {showGif && (
        <div className="absolute inset-0 w-full h-full select-none">
          <img
            src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif"
            alt="Background animation"
            className="w-full h-full object-cover opacity-5"
            draggable="false"
          />
        </div>
      )}

      {/* Main Content Area - 90vh */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div>
          <header className="mb-4 flex flex-col px-4 md:px-0">
            <div
              className="text-4xl md:text-5xl font-medium tracking-tight leading-tight"
              dangerouslySetInnerHTML={{ __html: firstLine }}
            />
            <div className="flex items-center">
              <div
                className="text-4xl md:text-5xl font-medium tracking-tight leading-tight"
                dangerouslySetInnerHTML={{ __html: secondLine || "" }}
              />
              {displayedText.length === name.length && (
                <LaptopSVG isDarkMode={isDarkMode} />
              )}
            </div>
          </header>

          <div
            className={`flex justify-center space-x-4 mt-8 transition-opacity duration-1000 ${
              displayedText.length === name.length
                ? "opacity-100"
                : "opacity-25"
            }`}
          >
            {socialLinks.map(({ href, iconName, label }) => {
              const iconMap = {
                github: FaGithub,
                linkedin: FaLinkedin,
                resume: FaFileAlt,
              };
              const Icon = iconMap[iconName];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`${themeClasses.primary} ${themeClasses.primaryHover}`}
                >
                  <Icon className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer - 10vh */}
      <div className="h-[10vh] flex items-center justify-center relative z-10 mb-10">
        <a
          href={cvDownloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${themeClasses.primary} ${themeClasses.primaryHover} hover:shadow-xl border-2 ${themeClasses.primary} flex items-center space-x-3`}
        >
          <FaEnvelope className="h-5 w-5" />
          <span>Download CV/Resume</span>
        </a>
      </div>
    </div>
  );
};

export default Home;
