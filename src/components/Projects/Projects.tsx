import React, { useState, useEffect, useCallback } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { getThemeClasses } from "../../utils/theme-utils";
import { Project, TextWithLinks, projectData } from "../../types/project";

// Render text that may contain links
const TextContent: React.FC<{ content: TextWithLinks }> = ({ content }) => {
  if (typeof content === "string") return <>{content}</>;
  if (Array.isArray(content)) {
    return (
      <>
        {content.map((item, index) =>
          typeof item === "string" ? (
            <span key={index}>{item}</span>
          ) : (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {item.text}
            </a>
          )
        )}
      </>
    );
  }
  return (
    <a
      href={content.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline"
    >
      {content.text}
    </a>
  );
};

// Format period for display
const formatPeriod = (start: string, end: string): string => {
  const endDisplay = end === "Present" ? "NOW" : end.split(" ")[1] || end;
  const startYear = start.split(" ")[1] || start;
  return `${startYear}—${endDisplay}`;
};

// Desktop table row
interface TableRowProps {
  project: Project;
  isExpanded: boolean;
  isHighlighted: boolean;
  onToggle: () => void;
  isDarkMode: boolean;
  theme: ReturnType<typeof getThemeClasses>;
}

const TableRow: React.FC<TableRowProps> = ({
  project,
  isExpanded,
  isHighlighted,
  onToggle,
  isDarkMode,
  theme,
}) => (
  <>
    <tr
      onClick={onToggle}
      className={`border-b-2 cursor-pointer hover:bg-accent hover:bg-opacity-10 transition-colors ${isHighlighted ? "border-accent text-accent" : theme.border}`}
    >
      <td className="py-4 px-4 font-medium whitespace-nowrap">
        <span className={`mr-2 ${isHighlighted ? "opacity-100" : "opacity-0"}`}>&gt;</span>
        {formatPeriod(project.period.start, project.period.end)}
      </td>
      <td className="py-4 px-4">
        <a
          href={project.company.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="hover:text-accent transition-colors"
        >
          {project.company.text} ↗
        </a>
      </td>
      <td className="py-4 px-4 text-sm">{project.role.split("|")[0].trim()}</td>
      <td className="py-4 px-4 text-sm opacity-70">
        {project.technologies.slice(0, 4).join(", ")}
        {project.technologies.length > 4 && "..."}
      </td>
    </tr>
    <tr className={`border-b-2 ${theme.border}`}>
      <td colSpan={4} className="p-0">
        <div className={`expand-content ${isExpanded ? "expanded" : ""}`}>
          <div>
            <div
              className={`border-2 ${theme.border} p-4 m-4 ${isDarkMode ? "bg-white bg-opacity-5" : "bg-black bg-opacity-5"}`}
            >
              <ul className="space-y-2 text-sm mb-4">
                {project.achievements.map((achievement, i) => (
                  <li key={i}>
                    <span className="text-accent mr-2">•</span>
                    <TextContent content={achievement} />
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 text-xs border ${theme.border}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </>
);

// Mobile card
interface CardProps {
  project: Project;
  isExpanded: boolean;
  isHighlighted: boolean;
  onToggle: () => void;
  theme: ReturnType<typeof getThemeClasses>;
}

const Card: React.FC<CardProps> = ({ project, isExpanded, isHighlighted, onToggle, theme }) => (
  <div className={`border-2 mb-4 transition-colors ${isHighlighted ? "border-accent text-accent" : theme.border}`}>
    <button
      onClick={onToggle}
      className={`w-full text-left p-4 hover:bg-accent hover:bg-opacity-10 transition-colors`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="flex items-center gap-2">
          <span className={`${isHighlighted ? "opacity-100" : "opacity-0"}`}>&gt;</span>
          <a
            href={project.company.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-bold hover:text-accent transition-colors"
          >
            {project.company.text} ↗
          </a>
        </span>
        <span className="text-sm opacity-70">
          {formatPeriod(project.period.start, project.period.end)}
        </span>
      </div>
      <p className="text-sm mb-2">{project.role.split("|")[0].trim()}</p>
      <p className="text-xs opacity-70">{project.technologies.join(" • ")}</p>
      <p className="text-xs text-accent mt-2">
        {isExpanded ? "[COLLAPSE]" : "[EXPAND]"}
      </p>
    </button>

    <div className={`expand-content ${isExpanded ? "expanded" : ""}`}>
      <div>
        <div className={`border-t-2 ${theme.border} p-4`}>
          <ul className="space-y-2 text-sm">
            {project.achievements.map((achievement, i) => (
              <li key={i}>
                <span className="text-accent mr-2">•</span>
                <TextContent content={achievement} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export const Projects: React.FC = () => {
  const [isDarkMode] = useDarkMode();
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const theme = getThemeClasses(isDarkMode);

  const toggleExpand = useCallback((index: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  // Keyboard navigation (circular)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % projectData.length);
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + projectData.length) % projectData.length);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setHighlightedIndex((current) => {
          toggleExpand(current);
          return current;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleExpand]);

  return (
    <div
      className={`h-full page-fade-in ${theme.background} ${theme.text} py-8 px-4 md:px-8 overflow-y-auto`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">EXPERIENCE</h1>
          <div className={`w-full h-0.5 ${isDarkMode ? "bg-white" : "bg-black"}`} />
        </header>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${theme.border}`}>
                <th className="py-3 px-4 text-left text-sm font-bold uppercase tracking-wide">
                  Period
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold uppercase tracking-wide">
                  Company
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold uppercase tracking-wide">
                  Role
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold uppercase tracking-wide">
                  Stack
                </th>
              </tr>
            </thead>
            <tbody>
              {projectData.map((project, index) => (
                <TableRow
                  key={index}
                  project={project}
                  isExpanded={expandedIndices.has(index)}
                  isHighlighted={highlightedIndex === index}
                  onToggle={() => toggleExpand(index)}
                  isDarkMode={isDarkMode}
                  theme={theme}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {projectData.map((project, index) => (
            <Card
              key={index}
              project={project}
              isExpanded={expandedIndices.has(index)}
              isHighlighted={highlightedIndex === index}
              onToggle={() => toggleExpand(index)}
              theme={theme}
            />
          ))}
        </div>

        {/* Keyboard hint */}
        <p className="text-xs opacity-50 mt-8 text-center">
          Click to expand · <span className="hidden md:inline">[J/K] or [↑/↓] to navigate · [Enter] or [Space] to toggle</span>
        </p>
      </div>
    </div>
  );
};

export default Projects;
