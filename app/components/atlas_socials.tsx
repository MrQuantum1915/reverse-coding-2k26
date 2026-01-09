"use client";
import { useState } from "react";
import Image from "next/image";

const SOCIAL_LINKS = [
  {
    id: "insta", name: "Instagram", icon: "/insta.svg", color: "#E1306C",
    d_path: "M 0 50 L 30 50 L 60 15 L 100 15",
    subOptions: [{ label: "CC", href: "https://www.instagram.com/codingclub_iiitv/" }, { label: "Enigma", href: "https://www.instagram.com/enigma_iiitv/" }]
  },
  {
    id: "mail", name: "Gmail", icon: "/gmail.svg", color: "#EA4335",
    d_path: "M 0 50 L 30 50 L 60 85 L 100 85",
    subOptions: [{ label: "CC", href: "mailto:codingclub@iiitvadodara.ac.in" }, { label: "Enigma", href: "#" }]
  },
  {
    id: "disc", name: "Discord", icon: "/discord.svg", color: "#5865F2",
    d_path: "M 0 50 L 30 50 L 60 15 L 100 15",
    subOptions: [{ label: "CC", href: "https://discord.com/invite/EuRGyYCcwe" }, { label: "Enigma", href: "https://discord.gg/aZ2xHmQUX8" }]
  },
  {
    id: "link", name: "LinkedIn", icon: "/linkedin.svg", color: "#0077B5",
    d_path: "M 0 50 L 30 50 L 60 85 L 100 85",
    subOptions: [{ label: "CC", href: "https://www.linkedin.com/company/iiitvcc/" }, { label: "Enigma", href: "https://www.linkedin.com/company/enigma-mathematics-club-iiit-vadodara/" }]
  },
];

const SubOption = ({ label, href, isVisible, delay }: { label: string; href: string; isVisible: boolean; delay: number }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    className={`
      px-4 py-1.5 border text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-md cursor-pointer
      ${isVisible
        ? 'opacity-100 translate-x-0 border-white/20 text-white hover:bg-white hover:text-black hover:border-white'
        : 'opacity-0 -translate-x-4 pointer-events-none border-transparent text-transparent'}
    `}
  >
    {label}
  </a>
);

const CircuitBranch = ({ item, activeId, setActiveId, index, side = "right" }: {
  item: typeof SOCIAL_LINKS[0];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  index: number;
  side?: "left" | "right";
}) => {
  const isHovered = activeId === item.id;
  const isDimmed = activeId !== null && activeId !== item.id;
  const isLeft = side === "left";

  return (
    <div
      className={`group relative flex ${isLeft ? 'min-[1600px]:flex-row-reverse' : 'flex-row'} justify-center items-center h-20 min-[1600px]:h-24 cursor-pointer w-full min-[1600px]:w-auto transition-opacity duration-500 ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}
      onMouseEnter={() => setActiveId(item.id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={() => setActiveId(activeId === item.id ? null : item.id)}
    >
      <div className={`hidden min-[1600px]:block absolute ${isLeft ? 'right-[-100px]' : 'left-[-100px]'} w-[100px] h-full pointer-events-none`}>
        <svg viewBox="0 0 100 100" className={`w-full h-full fill-none overflow-visible ${isLeft ? 'scale-x-[-1]' : ''}`}>
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

      <div className="min-[1600px]:hidden absolute left-1/2 -translate-x-1/2 -top-6 w-[1px] h-6 bg-gradient-to-b from-white/30 to-transparent" />


      <div
        className="relative z-20"
        style={{ animation: isHovered ? 'none' : `float 6s ease-in-out infinite ${index * 0.5}s` }}
      >
        <div className={`
          relative w-16 h-16 border transition-all duration-500 flex items-center justify-center overflow-hidden
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

          <div className={`relative w-8 h-8 transition-all duration-500 ${isHovered ? 'rotate-0 scale-110' : 'min-[1600px]:-rotate-45 rotate-0'}`}>
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

      <div className={`${isLeft ? 'min-[1600px]:mr-8 min-[1600px]:ml-0' : 'min-[1600px]:ml-8'} ml-6 flex flex-col justify-center items-center`}>
        <h3 className={`text-center text-xl min-[1600px]:text-2xl font-black tracking-tighter italic transition-all duration-500 ${isHovered ? (isLeft ? '-translate-x-3' : 'translate-x-3') + ' text-white' : 'text-white/50'}`}>
          {item.name}
        </h3>
        <div className="mt-2 flex gap-3 items-center justify-center h-8">
          {item.subOptions.map((opt, idx) => (
            <SubOption key={opt.label} label={opt.label} href={opt.href} isVisible={isHovered} delay={idx * 100} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Atlas_socials = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const leftLinks = SOCIAL_LINKS.slice(0, 2);
  const rightLinks = SOCIAL_LINKS.slice(2);

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-black font-mono overflow-x-hidden  cursor-default">

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

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative flex flex-col min-[1600px]:flex-row items-center gap-10 min-[1600px]:gap-20 w-full max-w-7xl">

        {/* Left Column */}
        <div className="relative flex flex-col gap-6 w-full min-[1600px]:w-auto items-center min-[1600px]:items-end order-2 min-[1600px]:order-1">
          <div className="hidden min-[1600px]:block absolute right-[-100px] top-12 bottom-12 border-r border-dashed border-white/30" />
          {leftLinks.map((link, idx) => (
            <CircuitBranch key={link.id} item={link} index={idx} activeId={activeId} setActiveId={setActiveId} side="left" />
          ))}
        </div>

        {/* Center Label */}
        <div className="relative group flex justify-center w-full min-[1600px]:w-auto order-1 min-[1600px]:order-2">
          <div className="relative bg-black border-2 border-white/30 p-2 z-30 transition-all duration-500 group-hover:border-white/60 animate-[float_8s_ease-in-out_infinite]">

            <h2 className="text-xl sm:text-2xl p-2 font-black text-white tracking-[0.3em] uppercase text-center min-[1600px]:text-left">
              SOCIAL
            </h2>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative flex flex-col gap-6 w-full min-[1600px]:w-auto items-center min-[1600px]:items-start order-3">
          <div className="hidden min-[1600px]:block absolute left-[-100px] top-12 bottom-12 border-l border-dashed border-white/30" />
          {rightLinks.map((link, idx) => (
            <CircuitBranch key={link.id} item={link} index={idx + 2} activeId={activeId} setActiveId={setActiveId} side="right" />
          ))}
        </div>
      </div>


    </div>
  );
};

export default Atlas_socials;