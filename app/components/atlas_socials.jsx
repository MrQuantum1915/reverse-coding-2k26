"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const SOCIAL_LINKS = [
  { 
    id: "insta", name: "Instagram", icon: "/insta.svg", color: "#E1306C", 
    d_path: "M 0 50 L 30 50 L 60 15 L 100 15",
    subOptions: [{ label: "CC", href: "#" }, { label: "Enigma", href: "#" }]
  },
  { 
    id: "mail", name: "Gmail", icon: "/gmail.svg", color: "#EA4335", 
    d_path: "M 0 50 L 40 50 L 70 35 L 100 35",
    subOptions: [{ label: "CC", href: "#" }, { label: "Enigma", href: "#" }]
  },
  { 
    id: "disc", name: "Discord", icon: "/discord.svg", color: "#5865F2", 
    d_path: "M 0 50 L 40 50 L 70 65 L 100 65",
    subOptions: [{ label: "Server", href: "#" }]
  },
  { 
    id: "link", name: "LinkedIn", icon: "/linkedin.svg", color: "#0077B5", 
    d_path: "M 0 50 L 30 50 L 60 85 L 100 85",
    subOptions: [{ label: "CC", href: "#" }, { label: "Enigma", href: "#" }]
  },
];

const SubOption = ({ label, href, isVisible, delay }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    className={`
      px-5 py-2 border text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-md cursor-pointer
      ${isVisible 
        ? 'opacity-100 translate-x-0 border-white/20 text-white hover:bg-white hover:text-black hover:border-white' 
        : 'opacity-0 -translate-x-4 pointer-events-none border-transparent text-transparent'}
    `}
  >
    {label}
  </a>
);

const CircuitBranch = ({ item, activeId, setActiveId, index }) => {
  const isHovered = activeId === item.id;
  const isDimmed = activeId !== null && activeId !== item.id;

  return (
    <div 
      className={`group relative flex flex-row items-center h-28 min-[1600px]:h-32 cursor-pointer w-full min-[1600px]:w-auto transition-opacity duration-500 ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}
      onMouseEnter={() => setActiveId(item.id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={() => setActiveId(activeId === item.id ? null : item.id)}
    >
      <div className="hidden min-[1600px]:block absolute left-[-100px] w-[100px] h-full pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none overflow-visible">
          <path d={item.d_path} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          <path
            d={item.d_path}
            stroke={isHovered ? item.color : "white"}
            strokeWidth={isHovered ? "2" : "1"}
            strokeDasharray="4 4"
            className="transition-all duration-500 ease-out"
            style={{ 
              opacity: isHovered ? 1 : 0.3,
              filter: isHovered ? `drop-shadow(0 0 8px ${item.color})` : 'none',
              animation: isHovered ? 'none' : 'dashFlow 30s linear infinite'
            }}
          />
        </svg>
      </div>

      <div className="min-[1600px]:hidden absolute left-10 -top-6 w-[1px] h-6 bg-gradient-to-b from-white/30 to-transparent" />

  
      <div 
        className="relative z-20"
        style={{ animation: isHovered ? 'none' : `float 6s ease-in-out infinite ${index * 0.5}s` }}
      >
        <div className={`
          relative w-20 h-20 border transition-all duration-500 flex items-center justify-center overflow-hidden
          ${isHovered 
            ? 'border-white scale-110 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] rotate-0 bg-black' 
            : 'border-white/20 bg-white/5 min-[1600px]:rotate-45 rotate-0'}
        `}>
          
          {!isHovered && (
             <div 
               className="absolute top-0 left-[-150%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg]"
               style={{ animation: `glint 8s ease-in-out infinite ${index * 2}s` }}
             />
          )}

          <div className={`relative w-11 h-11 transition-all duration-500 ${isHovered ? 'rotate-0 scale-110' : 'min-[1600px]:-rotate-45 rotate-0'}`}>
            <Image 
              src={item.icon} 
              alt={item.name} 
              fill 
              className={`object-contain transition-all duration-700 
                ${isHovered ? 'brightness-125 grayscale-0 opacity-100' : 'grayscale-[0.5] opacity-80'}
              `} 
            />
          </div>
          
          <div className={`absolute -top-1 -left-1 w-3 h-3 border-t border-l transition-colors duration-300 ${isHovered ? 'border-white' : 'border-white/50 animate-pulse-slow'}`} />
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b border-r transition-colors duration-300 ${isHovered ? 'border-white' : 'border-white/50 animate-pulse-slow'}`} />
        </div>
      </div>

      <div className="ml-8 min-[1600px]:ml-12 flex flex-col justify-center">
        <h3 className={`text-2xl min-[1600px]:text-3xl font-black tracking-tighter italic transition-all duration-500 ${isHovered ? 'text-white translate-x-3' : 'text-white/50'}`}>
          {item.name}
        </h3>
        <div className="mt-3 flex gap-3 items-center h-10">
          {item.subOptions.map((opt, idx) => (
            <SubOption key={opt.label} label={opt.label} href={opt.href} isVisible={isHovered} delay={idx * 100} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Atlas_socials = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-black font-mono overflow-x-hidden py-20 px-6 cursor-default">
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -100; }
        }
        @keyframes glint {
          0%, 90% { left: -150%; }
          100% { left: 150%; }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative flex flex-col min-[1600px]:flex-row items-center gap-16 min-[1600px]:gap-56 w-full max-w-7xl">
        
        <div className="relative group flex justify-center w-full min-[1600px]:w-auto">
          <div className="relative bg-black border-x border-white/30 px-12 py-8 z-30 transition-all duration-500 group-hover:border-white/60 animate-[float_8s_ease-in-out_infinite]">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-[0.3em] uppercase text-center min-[1600px]:text-left">
              SOCIAL
            </h2>
          </div>

          <div className="hidden min-[1600px]:block absolute top-1/2 -right-24 w-24 h-[1px] bg-gradient-to-r from-white/50 to-white/10" />
          <div className="min-[1600px]:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-b from-white/50 to-transparent" />
        </div>

        <div className="flex flex-col gap-6 w-full min-[1600px]:w-auto items-center min-[1600px]:items-start">
          {SOCIAL_LINKS.map((link, idx) => (
            <CircuitBranch key={link.id} item={link} index={idx} activeId={activeId} setActiveId={setActiveId} />
          ))}
        </div>
      </div>

   
    </div>
  );
};

export default Atlas_socials;