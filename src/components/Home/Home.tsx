import React, { useState, useEffect } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import useTypingEffect from "../../hooks/useTypingEffect";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import "./Home.css";
import LaptopSVG from "./LaptopSVG";

interface HomeProps {
  hasTyped: boolean;
  setHasTyped: (hasTyped: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ hasTyped, setHasTyped }) => {
  const [isDarkMode] = useDarkMode();
  const [name] = useState(
    "Hey, I am Kuldeep, <br /> Front End Developer based in India"
  );
  const displayedText = useTypingEffect(name, 75, !hasTyped);

  useEffect(() => {
    if (displayedText.length === name.length) {
      setHasTyped(true);
    }
  }, [displayedText, name.length, setHasTyped]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <header className="mb-4 flex flex-col px-4 md:px-0">
          <div className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            <span
              dangerouslySetInnerHTML={{
                __html: displayedText.split("<br />")[0],
              }}
            ></span>
          </div>
          <div className="flex items-center">
            <div
              className="text-4xl md:text-5xl font-medium tracking-tight leading-tight"
              dangerouslySetInnerHTML={{
                __html: displayedText.split("<br />")[1] || "",
              }}
            ></div>
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
          <a
            href="https://github.com/vansadiak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`${
              isDarkMode
                ? "text-[#4ECDC4] hover:text-[#45b8b0]"
                : "text-[#FF6B6B] hover:text-[#ff5252]"
            }`}
          >
            <FaGithub className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
          </a>
          <a
            href="https://www.linkedin.com/in/kuldeep-vansadia-34b7631a6/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`${
              isDarkMode
                ? "text-[#4ECDC4] hover:text-[#45b8b0]"
                : "text-[#FF6B6B] hover:text-[#ff5252]"
            }`}
          >
            <FaLinkedin className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
          </a>
          <a
            href="https://drive.google.com/file/d/1IthRqKms_w5I5xOij96YFUd2WfxoQYlb/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
            className={`${
              isDarkMode
                ? "text-[#4ECDC4] hover:text-[#45b8b0]"
                : "text-[#FF6B6B] hover:text-[#ff5252]"
            }`}
          >
            <FaFileAlt className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
