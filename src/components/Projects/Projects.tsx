import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Projects.css"; // Make sure to create this CSS file
import { projects } from "../../data/Projects";
import useTypingEffect from "../../hooks/useTypingEffect";

const Projects = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [title] = useState("Work Experience");
  const displayedTitle = useTypingEffect(title, 125); // Use the custom hook

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY < 0 && window.scrollY <= 20) {
        event.preventDefault();
        window.scrollTo({
          top: window.scrollY - event.deltaY / 2,
          behavior: "smooth",
        });
        if (window.scrollY === 0) {
          setIsAnimating(true);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 500); // Duration of the animation in milliseconds

      return () => clearTimeout(timer);
    }
  }, [isAnimating, navigate]);

  return (
    <div
      className={`projects-container ${
        isAnimating ? "fade-out" : ""
      } mt-32 relative flex justify-center items-center`}
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center retro-text">
          {displayedTitle}
        </h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              {/* <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              /> */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 ">
                  {project.title} | {project.position}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {project.duration} | {project.location}
                </p>
                <ul className="list-disc ml-5 space-y-2">
                  {project.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
