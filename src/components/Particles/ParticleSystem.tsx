import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

interface ParticleSystemProps {
  isDarkMode: boolean;
  particleCount?: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  isDarkMode,
  particleCount = 30,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const [particles, setParticles] = useState<Particle[]>([]);

  const colors = isDarkMode
    ? ["#4ECDC4", "#45b8b0", "#5EE4D9", "#3A9F98"]
    : ["#FF6B6B", "#ff5252", "#FF8E8E", "#FF4C4C"];

  useEffect(() => {
    const createParticle = (x: number, y: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color,
        life: 1,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create new particles at mouse position
      const newParticles: Particle[] = [];
      for (let i = 0; i < 3; i++) {
        newParticles.push(createParticle(x, y));
      }

      setParticles((prev) => {
        const combined = [...prev, ...newParticles];
        // Keep only the last particleCount particles
        return combined.slice(-particleCount);
      });
    };

    const animate = () => {
      setParticles((prev) => {
        return prev
          .map((particle) => {
            const newX = particle.x + particle.vx;
            const newY = particle.y + particle.vy;
            const newLife = particle.life - 0.02;

            // Add some friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            return {
              ...particle,
              x: newX,
              y: newY,
              life: Math.max(0, newLife),
            };
          })
          .filter((particle) => particle.life > 0);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colors, particleCount]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "hidden" }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={{ opacity: 1, scale: 0 }}
          animate={{
            opacity: particle.life,
            scale: particle.life,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;

