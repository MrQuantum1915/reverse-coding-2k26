"use client";
import { useEffect, useState } from "react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

const HACKER_TEXTS = [
  "INITIALIZING HYPER-CUBE...",
  "DECRYPTING NEURAL PATHWAYS...",
  "SYCHRONIZING QUANTUM STATES...",
  "COMPILING REALITY ENGINE...",
  "BREACHING FIREWALL...",
  "ACCESS GRANTED."
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 800);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 15) + 5, 100);
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const index = Math.min(
      Math.floor((progress / 100) * HACKER_TEXTS.length),
      HACKER_TEXTS.length - 1
    );
    setTextIndex(index);
  }, [progress]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-all duration-1000 ${progress === 100 ? "opacity-0 scale-150 pointer-events-none" : "opacity-100 scale-100"}`}>
      
      <div className="cube-wrapper">
        <div className="cube">
          <div className="face front" />
          <div className="face back" />
          <div className="face right" />
          <div className="face left" />
          <div className="face top" />
          <div className="face bottom" />
          
          <div className="inner-cube">
             <div className="face front" />
             <div className="face back" />
             <div className="face right" />
             <div className="face left" />
             <div className="face top" />
             <div className="face bottom" />
          </div>
        </div>
      </div>

      <div className="mt-20 relative z-10 text-center">
        <h1 className={`${orbitron.className} text-6xl font-black text-white tracking-widest drop-shadow-[0_0_15px_#00ffff]`}>
          {progress}%
        </h1>
        <p className={`${orbitron.className} mt-2 text-cyan-400 text-sm tracking-[0.4em] animate-pulse`}>
          {HACKER_TEXTS[textIndex]}
        </p>
      </div>

      <div className="absolute bottom-10 w-full max-w-md h-1 bg-gray-900 overflow-hidden">
        <div 
          className="h-full bg-cyan-500 shadow-[0_0_20px_#00ffff]"
          style={{ width: `${progress}%`, transition: 'width 0.2s ease-out' }}
        />
      </div>

      <style jsx>{`
        .cube-wrapper {
          perspective: 800px;
          width: 100px;
          height: 100px;
          position: relative;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin-cube 4s infinite linear;
        }

        /* OUTER CUBE FACES */
        .face {
          position: absolute;
          width: 100px;
          height: 100px;
          border: 2px solid #00ffff;
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
        }

        .front  { transform: rotateY(0deg) translateZ(50px); }
        .back   { transform: rotateY(180deg) translateZ(50px); }
        .right  { transform: rotateY(90deg) translateZ(50px); }
        .left   { transform: rotateY(-90deg) translateZ(50px); }
        .top    { transform: rotateX(90deg) translateZ(50px); }
        .bottom { transform: rotateX(-90deg) translateZ(50px); }

        /* INNER CORE CUBE (Smaller & Faster) */
        .inner-cube {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 25px;
          left: 25px;
          transform-style: preserve-3d;
          animation: spin-cube-reverse 2s infinite linear;
        }

        .inner-cube .face {
          width: 50px;
          height: 50px;
          border: 2px solid #ff00ff; /* Magenta Core */
          background: rgba(255, 0, 255, 0.3);
          box-shadow: 0 0 20px #ff00ff;
        }

        .inner-cube .front  { transform: rotateY(0deg) translateZ(25px); }
        .inner-cube .back   { transform: rotateY(180deg) translateZ(25px); }
        .inner-cube .right  { transform: rotateY(90deg) translateZ(25px); }
        .inner-cube .left   { transform: rotateY(-90deg) translateZ(25px); }
        .inner-cube .top    { transform: rotateX(90deg) translateZ(25px); }
        .inner-cube .bottom { transform: rotateX(-90deg) translateZ(25px); }

        @keyframes spin-cube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        @keyframes spin-cube-reverse {
          0% { transform: rotateX(360deg) rotateY(360deg); }
          100% { transform: rotateX(0deg) rotateY(0deg); }
        }
      `}</style>
    </div>
  );
}