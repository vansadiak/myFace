import React, { useState, useEffect } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Home.css"; // Import the CSS file

interface HomeProps {
  message: string;
}

const Home: React.FC<HomeProps> = ({ message }) => {
  const [isDarkMode] = useDarkMode();
  const [name, setName] = useState("Kuldeep Here!");
  const [displayedName, setDisplayedName] = useState("");
  const [showIcons, setShowIcons] = useState(false); // New state variable

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedName((prev) => prev + name[index]);
      index++;
      if (index === name.length) {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed here
    return () => clearInterval(interval);
  }, [name]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcons(true);
    }, 1000); // Show icons after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } flex items-center justify-center`}
    >
      <div className="">
        <header className="mb-4">
          <h1 className="text-4xl font-bold typing">{displayedName}</h1>
        </header>
        <div
          className={`flex justify-center space-x-4 mt-8 transition-opacity duration-1000 ${
            showIcons ? "opacity-100" : "opacity-0"
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
        </div>
        <main></main>
      </div>
    </div>
  );
};

export default Home;
