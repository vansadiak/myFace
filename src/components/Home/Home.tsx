import React, { useState } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import useTypingEffect from "../../hooks/useTypingEffect";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { HashLink } from "react-router-hash-link";
import "./Home.css";
import LaptopSVG from "./LaptopSVG"; // Import the new component
import { AppRoutes } from "../App/AppRoutes";

const Home: React.FC = () => {
  const [isDarkMode] = useDarkMode();
  const [name, setName] = useState(
    "Hey, I am Kuldeep, <br /> Front End Developer based in India"
  );
  const displayedText = useTypingEffect(name, 75);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <header className="mb-4 flex items-center px-4 md:px-0">
          <h1
            className="text-4xl font-bold typing retro-text"
            dangerouslySetInnerHTML={{ __html: displayedText }}
          ></h1>
          {displayedText.length === name.length && (
            <LaptopSVG isDarkMode={isDarkMode} /> // Use the new component
          )}
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
          >
            <FaGithub className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
          </a>
          <a
            href="https://www.linkedin.com/in/kuldeep-vansadia-34b7631a6/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
          </a>
          <a
            href="https://drive.google.com/file/d/1IthRqKms_w5I5xOij96YFUd2WfxoQYlb/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
          >
            <FaFileAlt className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
