import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LaptopSVGProps {
  isDarkMode: boolean;
}

const LaptopSVG: React.FC<LaptopSVGProps> = ({ isDarkMode }) => {
  return (
    <motion.svg
      className={`ml-4 h-16 w-16 ${isDarkMode ? "svg-dark" : "svg-light"}`}
      viewBox="0 0 100 100"
      initial={{ rotate: 0, opacity: 1 }} // Initial state
      animate={{ rotate: 0, opacity: 1 }} // Animate back to initial state
      whileHover={{
        rotate: [0, 360, 800, 2000], // Rotates faster and faster
        opacity: [1, 1, 0], // Disappears
        transition: {
          duration: 2, // Total duration of the hover effect
          ease: "easeInOut",
        },
      }}
    >
      {/* Laptop base */}
      <motion.rect
        x="10"
        y="70"
        width="80"
        height="6"
        rx="2"
        fill="currentColor"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Laptop screen */}
      <motion.rect
        x="20"
        y="20"
        width="60"
        height="50"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* Animated code lines */}
      <motion.line
        x1="25"
        y1="30"
        x2="55"
        y2="30"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 2,
        }}
      />
      <motion.line
        x1="25"
        y1="40"
        x2="65"
        y2="40"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.7,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 2,
        }}
      />
      <motion.line
        x1="25"
        y1="50"
        x2="45"
        y2="50"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.3,
          delay: 1.4,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 2,
        }}
      />

      {/* Cursor */}
      <motion.rect
        x="47"
        y="48"
        width="2"
        height="4"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
      />
    </motion.svg>
  );
};

export default LaptopSVG;
