import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

interface ConfettiProps {
  onComplete?: () => void;
  isDarkMode: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ onComplete, isDarkMode }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = isDarkMode
    ? ["#4ECDC4", "#45b8b0", "#5EE4D9", "#3A9F98", "#6EEEE6"]
    : ["#FF6B6B", "#ff5252", "#FF8E8E", "#FF4C4C", "#FFAAAA"];

  useEffect(() => {
    const confettiCount = 50;
    const newPieces: ConfettiPiece[] = [];

    for (let i = 0; i < confettiCount; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
      });
    }

    setPieces(newPieces);

    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [colors, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            boxShadow: `0 0 6px ${piece.color}`,
          }}
          initial={{
            y: piece.y,
            rotate: piece.rotation,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: piece.rotation + 720,
            x: piece.x + (Math.random() - 0.5) * 200,
            opacity: [1, 1, 0],
            scale: [1, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: piece.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;

