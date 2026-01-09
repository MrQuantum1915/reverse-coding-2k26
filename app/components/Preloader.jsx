"use client";
import { useEffect, useState } from "react";
import { Orbitron } from "next/font/google";
import './preloader.css';

const orbitron = Orbitron({ subsets: ["latin"] });

const HACKER_TEXTS = [
  "SYSTEM BOOT SEQUENCE INITIATED...",
  "LOADING SYSTEM MODULES...",
  "VERIFYING SECURITY CHECKSUMS...",
  "ALLOCATING MEMORY BUFFERS...",
  "ESTABLISHING NETWORK CONNECTIONS...",
  "SYSTEM READY."
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // smooth progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 800);
          return 100;
        }
        const increment = Math.random() > 0.7 ? Math.floor(Math.random() * 10) + 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 80);
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
    <div
      className={`fixed inset-0 z-[100] bg-black/95 flex flex-col gap-8 items-center justify-center transition-all duration-700 ${progress === 100 ? "opacity-0 pointer-events-none blur-xl scale-110" : "opacity-100 backdrop-blur-3xl"
        }`}
    >

      <div className="relative flex items-center justify-center mb-12">

        <div className="absolute w-64 h-64 border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-64 h-64 border-t-2 border-cyan-500 rounded-full animate-[spin_3s_linear_infinite]" />

        <div className="absolute w-48 h-48 border border-purple-500/30 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
        <div className="absolute w-48 h-48 border-b-2 border-purple-500 rounded-full animate-[spin_4s_linear_infinite_reverse]" />

        <div className="absolute w-32 h-32 border border-cyan-500/20 rounded-full dashed-border animate-[spin_12s_linear_infinite]" />

        <div className="relative z-10 flex flex-col items-center justify-center w-24 h-24 bg-black rounded-full border border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
          <span className={`${orbitron.className} text-xl font-bold text-white`}>
            {progress}%
          </span>
        </div>
      </div>

      <div className="relative z-10 h-8 mt-4 overflow-hidden text-center">
        <p className={`${orbitron.className} text-cyan-400 text-sm tracking-[0.2em] animate-pulse`}>
          {`> ${HACKER_TEXTS[textIndex]}`}
        </p>
      </div>

      <div className="mt-8 w-96 max-w-[80vw] h-6 border-2 border-cyan-500/50 bg-black/80 skew-x-[-20deg] p-[2px] relative shadow-[0_0_20px_rgba(0,255,255,0.2)]">
        <div className="absolute inset-0 flex justify-between px-1 opacity-20">
          {[...Array(12)].map((_, i) => (
             <div key={i} className="w-[1px] h-full bg-cyan-400" />
          ))}
        </div>
        
        <div 
          className="h-full relative overflow-hidden bg-cyan-500/10"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300" />
            
            <div className="absolute inset-0 progress-bar-stripes" />

            <div className="absolute right-0 top-0 h-full w-[4px] bg-white blur-[1px] shadow-[0_0_10px_#fff] z-10" />
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/50 animate-scanline" />
      </div>
    </div>
  );
}
