"use client";
import React, { useState, useEffect, useRef } from "react";
import { Orbitron } from "next/font/google";
import { redirect } from "next/navigation";

const orbitron = Orbitron({ subsets: ["latin"] });

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&[]/\\";

export default function Main_button({ text = "REGISTER.EXE", width = 290, height = 80 ,onClick="/login"}) {
  const [displayText, setDisplayText] = useState(text);
  const [active, setActive] = useState(false);
  const intervalRef = useRef(null);
  const autoLoopRef = useRef(null);

  const scramble = () => {
    let pos = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text.split("").map((char, index) => {
          if (index < pos) return text[index];
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join("")
      );
      
      if (pos >= text.length) {
        clearInterval(intervalRef.current);
      }
      pos += 1 / 2;
    }, 40);
  };

  // Update displayText when prop changes
  useEffect(() => {
    setDisplayText(text);
    scramble(); 
  }, [text]);

  useEffect(() => {
    // Clear any existing loop on mount/update
    clearInterval(autoLoopRef.current);
    
    autoLoopRef.current = setInterval(() => {
      scramble();
    }, 4000);

    return () => clearInterval(autoLoopRef.current);
  }, [text]); // Re-run effect when text changes to capture new closure

 
  const handleInteraction = () => {
    setActive(true);
    scramble(); 
    setTimeout(() => setActive(false), 200);
    setTimeout(() => {
      if(onClick!==""){
          redirect(onClick);
      }
    }, 300);
  };

  return (
    <button
      onClick={handleInteraction}
      className={`
        relative group bg-transparent outline-none border-none cursor-pointer select-none
        transition-transform duration-100 ease-out
        ${active ? "scale-95" : "scale-100"} /* Physical Press Effect */
      `}
      style={{ width, height, WebkitTapHighlightColor: "transparent" }}
    >
      
    
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 290 80" fill="none">
         
          <path d="M20 0H290V60L270 80H0V20L20 0Z" fill="#000000" fillOpacity="1.0" />
          
          <path 
            d="M20 0H290V60L270 80H0V20L20 0Z" 
            stroke="#00ffff" 
            strokeWidth="2"
            strokeDasharray="200 50" 
            strokeDashoffset="0"
            className="opacity-50"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-250" dur="3s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

 
      <div 
        className={`
          absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300
          ${active ? "opacity-30" : "opacity-10"} 
        `}
        style={{ clipPath: "polygon(20px 0, 100% 0, 100% 60px, calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
      >
  
        <div 
          className="w-full h-[200%] absolute top-0 left-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-scan-vertical"
          style={{ backgroundSize: "cover" }}
        />
     
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]" />
      </div>  

 
      <span 
        className={`
          absolute inset-0 flex items-center justify-center
          ${orbitron.className} text-xl tracking-[0.2em] font-bold 
          transition-all duration-300
          ${active ? "text-white tracking-[0.3em] drop-shadow-[0_0_15px_rgba(255,255,255,1)]" : "text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.2)]"}
        `}
      >
        {displayText}
      </span>

      
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-500 opacity-50 animate-pulse" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-500 opacity-50 animate-pulse delay-75" />

   
      <style jsx>{`
        @keyframes scan-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scan-vertical {
          animation: scan-vertical 3s linear infinite;
        }
      `}</style>
    </button>
  );
}