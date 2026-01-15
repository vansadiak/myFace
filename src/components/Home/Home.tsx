import React, { useState, useEffect } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import useTypingEffect from "../../hooks/useTypingEffect";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { getThemeClasses } from "../../utils/theme-utils";
import LaptopSVG from "./LaptopSVG";

interface HomeProps {
  hasTyped: boolean;
  setHasTyped: (hasTyped: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ hasTyped, setHasTyped }) => {
  const [isDarkMode] = useDarkMode();
  const themeClasses = getThemeClasses(isDarkMode);
  const [name] = useState(
    `I am <span class="${
      isDarkMode ? "text-primary-dark" : "text-primary-light"
    }">Kuldeep</span>, <br /> <span class="${
      isDarkMode ? "text-primary-dark" : "text-primary-light"
    }">Front End Developer</span> based in India`
  );
  const [showGif, setShowGif] = useState(false);
  const displayedText = useTypingEffect(name, 60, !hasTyped);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = () => {
      setShowGif(true);
      setTimeout(() => setShowGif(false), 2500);
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
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${themeClasses.background} ${themeClasses.text}`}
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

      <div className="relative z-10">
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
            displayedText.length === name.length ? "opacity-100" : "opacity-0"
          }`}
        >
          {[
            {
              href: "https://github.com/vansadiak",
              icon: FaGithub,
              label: "GitHub",
            },
            {
              href: "https://www.linkedin.com/in/kuldeep-vansadia-34b7631a6/",
              icon: FaLinkedin,
              label: "LinkedIn",
            },
            {
              href: "https://drive.google.com/file/d/1IthRqKms_w5I5xOij96YFUd2WfxoQYlb/view?usp=sharing",
              icon: FaFileAlt,
              label: "Resume",
            },
          ].map(({ href, icon: Icon, label }) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
