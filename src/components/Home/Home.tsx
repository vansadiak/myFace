import React, { useState, useEffect } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import useTypingEffect from "../../hooks/useTypingEffect";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa"; // Import FaArrowDown
import { CgArrowsScrollV } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const Home: React.FC = () => {
  const [isDarkMode] = useDarkMode();
  const [name, setName] = useState(
    "Hey, I am Kuldeep, <br /> Front End Developer based in Bali"
  );
  const displayedText = useTypingEffect(name, 75); // Use the custom hook
  const navigate = useNavigate();

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        navigate("/projects");
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [navigate]);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } flex items-center justify-center relative`} // Add relative positioning
    >
      <div>
        <header className="mb-4 ">
          <h1
            className="text-4xl font-bold typing retro-text"
            dangerouslySetInnerHTML={{ __html: displayedText }}
          ></h1>
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
          >
            <FaGithub className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
          </a>
          <a
            href="https://www.linkedin.com/in/kuldeep-vansadia-34b7631a6/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
          </a>
          <a
            href="https://drive.google.com/file/d/1uxu_EqkN9jOfwqq3-7kULUpw7CVo3zno/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFileAlt className="h-6 w-6 transform transition-transform duration-200 hover:scale-125" />
          </a>
        </div>
      </div>
      <div className="absolute bottom-4 flex justify-center w-full">
        <p className="text-6xl animate-fadeInOut font-munro">
          <CgArrowsScrollV />
        </p>
        {/* Add the scroll down text with animation */}
      </div>
    </div>
  );
};

export default Home;
