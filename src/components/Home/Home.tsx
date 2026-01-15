import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import useDarkMode from "../../hooks/useDarkMode";
import useTypingEffect from "../../hooks/useTypingEffect";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { getThemeClasses } from "../../utils/theme-utils";
import LaptopSVG from "./LaptopSVG";
import { getIntroText, socialLinks } from "../../types/me";
import ParticleSystem from "../Particles/ParticleSystem";
import FloatingTechTags from "../Particles/FloatingTechTags";

interface HomeProps {
  hasTyped: boolean;
  setHasTyped: (hasTyped: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ hasTyped, setHasTyped }) => {
  const [isDarkMode] = useDarkMode();
  const themeClasses = getThemeClasses(isDarkMode);
  const name = useMemo(() => getIntroText(isDarkMode), [isDarkMode]);
  const [showGif, setShowGif] = useState(false);
  const displayedText = useTypingEffect(name, 60, !hasTyped);

  // Reset typing when theme changes
  useEffect(() => {
    setHasTyped(false);
  }, [isDarkMode, setHasTyped]);

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
      <ParticleSystem isDarkMode={isDarkMode} particleCount={40} />
      <FloatingTechTags isDarkMode={isDarkMode} />
      {showGif && (
        <div className="absolute inset-0 w-full h-full select-none z-0">
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

          <motion.div
            className={`flex justify-center space-x-4 mt-8 transition-opacity duration-1000 ${
              displayedText.length === name.length
                ? "opacity-100"
                : "opacity-25"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={
              displayedText.length === name.length
                ? { opacity: 1, y: 0 }
                : { opacity: 0.25, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {socialLinks
              .filter((link) => link.iconName !== "resume")
              .map(({ href, iconName, label }) => {
                const iconMap = {
                  github: FaGithub,
                  linkedin: FaLinkedin,
                  resume: FaFileAlt,
                };
                const Icon = iconMap[iconName];
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`${themeClasses.primary} ${themeClasses.primaryHover} relative`}
                    whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: isDarkMode
                          ? "0 0 20px rgba(78, 205, 196, 0.5)"
                          : "0 0 20px rgba(255, 107, 107, 0.5)",
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.5 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Icon className="h-6 w-6 relative z-10" />
                  </motion.a>
                );
              })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
