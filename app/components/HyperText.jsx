"use client";
import { useEffect, useRef, useState } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;':,./<>?";

export default function HyperText({ text, className, flame = false }) {
  const [displayText, setDisplayText] = useState(text);
  const iterations = useRef(0);

  useEffect(() => {
    let interval = null;
    const animate = () => {
      interval = setInterval(() => {
        setDisplayText((prev) =>
          prev.split("").map((letter, index) => {
              if (index < iterations.current) return text[index];
              return letters[Math.floor(Math.random() * letters.length)];
            }).join("")
        );
        if (iterations.current >= text.length) clearInterval(interval);
        iterations.current += 1 / 3; 
      }, 30);
    };
    animate();
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`${className} ${flame ? "neon-blue-glow" : ""}`}>
      {displayText}
      
      <style jsx global>{`
        .neon-blue-glow {
          /* Base text color is slightly cyan-white, not pure white */
          color: #e0f7ff; 
          text-shadow:
            /* 1. Crisp White edge */
            0 0 2px rgba(255, 255, 255, 0.9),
            /* 2. Hot Cyan Inner Glow */
            0 0 8px rgba(34, 211, 238, 1), 
            /* 3. Cyan/Blue Radiant Spread */
            0 0 20px rgba(6, 182, 212, 0.8),
            /* 4. Wide Electric Blue Aura */
            0 0 40px rgba(59, 130, 246, 0.6),
            /* 5. Deep Distant Blue Glow */
            0 0 80px rgba(29, 78, 216, 0.4);
          
          /* No animation - stable energy hum */
        }
      `}</style>
    </span>
  );
}