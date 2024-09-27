import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Home from "../Home/Home";
import Contact from "../ContactMe/Contact";
import useDarkMode from "../../hooks/useDarkMode";

const App: React.FC = () => {
  const [isDarkMode] = useDarkMode();

  return (
    <Router>
      <div
        className={
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }
      >
        <nav className="fixed top-0 left-0 right-0 p-4 z-10">
          <HashLink smooth to="#home" className="mr-4">
            Home
          </HashLink>
          <HashLink smooth to="#contact">
            Contact
          </HashLink>
        </nav>
        <div id="home">
          <Home />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </div>
    </Router>
  );
};

export default App;
