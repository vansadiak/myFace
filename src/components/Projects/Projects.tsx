import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import useDarkMode from "../../hooks/useDarkMode";
import {
  projectData,
  TextWithLinks,
  LinkObject,
  Project,
} from "../../types/project";

// Component for rendering a single link
const Link: React.FC<LinkObject> = ({ href, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline"
  >
    {text}
  </a>
);

// Component for rendering mixed content (array of strings and links)
const MixedContent: React.FC<{ content: Array<string | LinkObject> }> = ({
  content,
}) => (
  <span>
    {content.map((item, index) => (
      <React.Fragment key={index}>
        {typeof item === "string" ? item : <Link {...item} />}
      </React.Fragment>
    ))}
  </span>
);

// Component for rendering any type of TextWithLinks content
const TextContent: React.FC<{ content: TextWithLinks }> = ({ content }) => {
  if (typeof content === "string") {
    return <span>{content}</span>;
  }
  if (Array.isArray(content)) {
    return <MixedContent content={content} />;
  }
  return <Link {...content} />;
};

// Achievement component
const Achievement: React.FC<{
  achievement: TextWithLinks;
  isDarkMode: boolean;
}> = ({ achievement, isDarkMode }) => (
  <p
    className={`text-sm md:text-base leading-relaxed ${
      isDarkMode ? "text-gray-300" : "text-gray-700"
    }`}
  >
    <TextContent content={achievement} />
  </p>
);

export const Projects: React.FC = () => {
  const [isDarkMode] = useDarkMode();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen relative ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } py-20 px-4 md:px-8 overflow-hidden`}
    >
      {/* Background GIF */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="https://media.giphy.com/media/xT5LMDYj4kvKNlGDHq/giphy.gif"
          alt="Background animation"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isScrolled ? "opacity-5" : "opacity-0"
          }`}
        />
      </div>

      {/* Content container with relative positioning to appear above the background */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          className={`text-2xl md:text-5xl font-medium tracking-tight leading-tight mb-6 md:mb-16 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>

        <div className="space-y-8 md:space-y-24">
          {projectData.map((project, index) => (
            <ProjectCard
              key={`${project.company}-${project.period.start}`}
              project={project}
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ProjectCard component
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  isDarkMode: boolean;
}> = ({ project, index, isDarkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-col space-y-3 md:space-y-6">
        <div className="flex flex-col space-y-1 md:space-y-2">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-0">
            <h3
              className={`text-lg md:text-2xl font-medium ${
                isDarkMode ? "text-[#4ECDC4]" : "text-[#FF6B6B]"
              }`}
            >
              {project.role}
            </h3>
            <span
              className={`text-[0.7rem] md:text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {project.period.start} — {project.period.end}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2">
            <span
              className={`text-sm md:text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <TextContent content={project.company} />
            </span>
            <span
              className={`text-[0.7rem] md:text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              · {project.location}
            </span>
          </div>
        </div>

        <div className="space-y-2 md:space-y-4">
          {project.achievements.map((achievement, i) => (
            <Achievement
              key={i}
              achievement={achievement}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-1 md:gap-2 mt-1 md:mt-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className={`px-1.5 md:px-3 py-0.5 md:py-1 text-[0.65rem] md:text-sm rounded-full transform transition-transform duration-200 hover:scale-110 ${
                isDarkMode
                  ? "bg-gray-800 text-[#4ECDC4] border border-[#4ECDC4]/20"
                  : "bg-gray-50 text-[#FF6B6B] border border-[#FF6B6B]/20"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
