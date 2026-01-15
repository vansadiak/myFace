import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FloatingTag {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
}

interface FloatingTechTagsProps {
  isDarkMode: boolean;
  technologies?: string[];
}

const defaultTech = [
  "React",
  "TypeScript",
  "Angular",
  "Node.js",
  "Scala",
  "Python",
  "GraphQL",
  "MongoDB",
  "Docker",
  "AWS",
];

const FloatingTechTags: React.FC<FloatingTechTagsProps> = ({
  isDarkMode,
  technologies = defaultTech,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<FloatingTag[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Initialize tags
    const initialTags: FloatingTag[] = technologies.slice(0, 8).map((tech, i) => {
      return {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        text: tech,
      };
    });

    setTags(initialTags);

    const animate = () => {
      setTags((prev) => {
        return prev.map((tag) => {
          let newX = tag.x + tag.vx;
          let newY = tag.y + tag.vy;

          // Bounce off walls
          if (newX < 0 || newX > width) tag.vx *= -1;
          if (newY < 0 || newY > height) tag.vy *= -1;

          newX = Math.max(0, Math.min(width, newX));
          newY = Math.max(0, Math.min(height, newY));

          return {
            ...tag,
            x: newX,
            y: newY,
          };
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Update dimensions on resize
    const handleResize = () => {
      setTags((prev) =>
        prev.map((tag) => ({
          ...tag,
          x: Math.min(tag.x, container.offsetWidth),
          y: Math.min(tag.y, container.offsetHeight),
        }))
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [technologies]);

  const themeClasses = isDarkMode
    ? "text-primary-dark opacity-20"
    : "text-primary-light opacity-20";

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      {tags.map((tag) => (
        <motion.div
          key={tag.id}
          className={`absolute text-xs md:text-sm font-mono ${themeClasses} select-none`}
          style={{
            left: `${tag.x}px`,
            top: `${tag.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            y: tag.y,
            x: tag.x,
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            y: { duration: 0.1 },
            x: { duration: 0.1 },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {tag.text}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingTechTags;

