import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import useDarkMode from "../../hooks/useDarkMode";
import { Project, TextWithLinks } from "../../types/project";
import { projectData } from "../../types/project";
import { getThemeClasses } from "../../utils/theme-utils";

// Component for rendering a single link
const Link: React.FC<{ href: string; text: string }> = ({ href, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline"
  >
    {text}
  </a>
);

// Component for rendering mixed content
const TextContent: React.FC<{ content: TextWithLinks }> = ({ content }) => {
  if (typeof content === "string") return <span>{content}</span>;
  if (Array.isArray(content)) {
    return (
      <span>
        {content.map((item, index) => (
          <React.Fragment key={index}>
            {typeof item === "string" ? item : <Link {...item} />}
          </React.Fragment>
        ))}
      </span>
    );
  }
  return <Link {...content} />;
};

const TimelineProject: React.FC<{
  project: Project;
  index: number;
  isDarkMode: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}> = ({ project, index, isDarkMode, isActive, onHover, onLeave }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const themeClasses = getThemeClasses(isDarkMode);

  return (
    <motion.div
      ref={ref}
      style={{ marginLeft: `${index * 2}rem` }}
      className="mb-16 relative"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline connector */}
      <div
        className={`absolute left-[-2rem] top-2 w-0.5 h-full ${themeClasses.accent}`}
      />

      {/* Timeline dot */}
      <motion.div
        className={`absolute left-[-2.250rem] top-0 w-3 h-3 rounded-full ${
          isActive ? themeClasses.primaryBg : themeClasses.neutralBg
        }`}
        whileHover={{ scale: 1.5 }}
        animate={{ scale: isActive ? 1.3 : 1 }}
      />

      {/* Project content */}
      <motion.div
        className={`p-6 rounded-lg relative overflow-hidden group`}
        style={{
          background: isDarkMode
            ? "rgba(31, 41, 55, 0.7)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: isDarkMode
            ? "1px solid rgba(78, 205, 196, 0.2)"
            : "1px solid rgba(255, 107, 107, 0.2)",
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(78, 205, 196, 0.1)"
            : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 107, 107, 0.1)",
        }}
        whileHover={{
          x: 10,
          scale: 1.02,
          rotateY: 5,
          rotateX: -2,
          borderColor: isDarkMode
            ? "rgba(78, 205, 196, 0.4)"
            : "rgba(255, 107, 107, 0.4)",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 rounded-lg"
          style={{
            background: isDarkMode
              ? "radial-gradient(circle at center, rgba(78, 205, 196, 0.1), transparent 70%)"
              : "radial-gradient(circle at center, rgba(255, 107, 107, 0.1), transparent 70%)",
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Project image if available */}
        {project.imageUrl && (
          <motion.div
            className="mb-4 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={project.imageUrl}
              alt={`${project.company.text} preview`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </motion.div>
        )}
        <div className="mb-4 relative z-10">
          <motion.div
            className={`text-sm font-mono mb-2 ${themeClasses.primary}`}
          >
            {project.period.start} — {project.period.end}
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">
            <TextContent content={project.company} />
          </h3>
          <div className="text-sm opacity-80">{project.role}</div>
        </div>

        {/* Achievements */}
        <motion.div className="space-y-3 relative z-10">
          {(isExpanded
            ? project.achievements
            : project.achievements.slice(0, 2)
          ).map((achievement, i) => (
            <motion.p
              key={i}
              className={`text-sm leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <TextContent content={achievement} />
            </motion.p>
          ))}
          {!isExpanded && project.achievements.length > 2 && (
            <motion.button
              onClick={() => setIsExpanded(true)}
              className={`text-sm ${themeClasses.primary} ${themeClasses.primaryHover}`}
            >
              Show more...
            </motion.button>
          )}
          {isExpanded && (
            <motion.button
              onClick={() => setIsExpanded(false)}
              className={`text-sm ${themeClasses.primary} ${themeClasses.primaryHover}`}
            >
              Show less
            </motion.button>
          )}
        </motion.div>

        {/* Tech stack */}
        <div className="mt-4 flex flex-wrap gap-2 relative z-10">
          {project.technologies.map((tech, i) => (
            <motion.span
              key={i}
              className={`px-2 py-1 text-xs rounded-full ${themeClasses.accent} ${themeClasses.primary} cursor-default relative inline-block`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              whileHover={{
                scale: [1, 1.3, 1.2],
                rotate: [0, -5, 5, 0],
                filter: isDarkMode
                  ? "drop-shadow(0 4px 12px rgba(78, 205, 196, 0.4))"
                  : "drop-shadow(0 4px 12px rgba(255, 107, 107, 0.4))",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                },
              }}
              style={{
                filter: isDarkMode
                  ? "drop-shadow(0 0 0px rgba(78, 205, 196, 0))"
                  : "drop-shadow(0 0 0px rgba(255, 107, 107, 0))",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [isDarkMode] = useDarkMode();
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const themeClasses = getThemeClasses(isDarkMode);

  return (
    <div
      className={`min-h-screen relative ${themeClasses.background} ${themeClasses.text} py-20 px-4 md:px-8`}
    >
      {/* Background GIF */}
      <div className="absolute inset-0 w-full h-full z-0 select-none">
        <img
          src="https://media.giphy.com/media/xT5LMDYj4kvKNlGDHq/giphy.gif"
          alt="Background animation"
          draggable="false"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            activeProject !== null ? "opacity-5" : "opacity-0"
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-medium mb-4">
            <span className={themeClasses.primary}>Featured Projects</span>
          </h2>
          <p className="text-lg md:text-xl opacity-80">
            Some things I've built at work
          </p>
        </motion.div>

        {/* Timeline-style projects */}
        <div className="relative">
          {projectData.map((project, index) => (
            <TimelineProject
              key={index}
              project={project}
              index={index}
              isDarkMode={isDarkMode}
              isActive={activeProject === index}
              onHover={() => setActiveProject(index)}
              onLeave={() => setActiveProject(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
