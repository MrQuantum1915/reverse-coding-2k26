"use client";
import React, { useState } from "react";

const NAV_ITEMS = [
  { id: "sandbox", name: "SandBox", pos: "top", path: "M 50 100 L 50 0", m_path: "M 50 0 L 50 40" },
  { id: "home", name: "Home", pos: "left", path: "M 100 50 L 0 50", m_path: "M 50 0 L 50 40" },
  { id: "rules", name: "Rules", pos: "right", path: "M 0 50 L 100 50", m_path: "M 50 0 L 50 40" },
  { id: "team", name: "Team", pos: "bottom", path: "M 50 0 L 50 100", m_path: "M 50 0 L 50 40" },
];

const NavBranch = ({ item, activeId, onHover }) => {
  const isHovered = activeId === item.id;
  
 
  const posClasses = {
    top: "min-[1600px]:absolute min-[1600px]:-top-40 min-[1600px]:left-1/2 min-[1600px]:-translate-x-1/2 min-[1600px]:flex-col-reverse",
    bottom: "min-[1600px]:absolute min-[1600px]:-bottom-40 min-[1600px]:left-1/2 min-[1600px]:-translate-x-1/2 min-[1600px]:flex-col",
    left: "min-[1600px]:absolute min-[1600px]:-left-56 min-[1600px]:top-1/2 min-[1600px]:-translate-y-1/2 min-[1600px]:flex-row-reverse",
    right: "min-[1600px]:absolute min-[1600px]:-right-56 min-[1600px]:top-1/2 min-[1600px]:-translate-y-1/2 min-[1600px]:flex-row",
  };

  return (
    <div 
      className={`group relative flex items-center justify-center cursor-pointer transition-all duration-500 ${posClasses[item.pos]} flex-col`}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
     
      <div className={`relative pointer-events-none 
        ${(item.pos === 'top' || item.pos === 'bottom') ? 'w-[2px] h-16' : 'h-[2px] w-20'} 
        max-[1599px]:w-[2px] max-[1599px]:h-10`}
      >
        <svg className="w-full h-full overflow-visible">
          <path
            d={item.pos === 'left' || item.pos === 'right' ? "M 0 1 L 100 1" : "M 1 0 L 1 pole 100"}
            stroke={isHovered ? "rgb(0,255,251)" : "rgba(255,255,255,0.1)"}
            strokeWidth="2"
            fill="none"
            className="transition-all duration-500"
          />
          {isHovered && (
            <circle r="3" fill="rgb(0,255,251)">
              <animateMotion dur="1.5s" repeatCount="indefinite" path={item.pos === 'left' || item.pos === 'right' ? "M 0 1 L 100 1" : "M 1 0 L 1 100"} />
            </circle>
          )}
        </svg>
      </div>

    
      <div className={`
        relative px-8 py-3 border transition-all duration-500 bg-black z-10
        ${isHovered 
          ? 'border-[rgb(0,255,251)] text-[rgb(0,255,251)] shadow-[0_0_20px_rgba(0,255,251,0.3)] scale-110' 
          : 'border-white/10 text-white/20'}
      `}>
        <span className="text-xl sm:text-2xl font-black uppercase tracking-[0.2em] italic">
          {item.name}
        </span>
        
       
        <div className={`absolute -top-1 -left-1 w-2 h-2 border-t border-l transition-colors ${isHovered ? 'border-[rgb(0,255,251)]' : 'border-white/20'}`} />
        <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b border-r transition-colors ${isHovered ? 'border-[rgb(0,255,251)]' : 'border-white/20'}`} />
      </div>
    </div>
  );
};

const Atlas_links = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="relative flex items-center justify-center w-full min-h-[700px] bg-black font-mono overflow-hidden py-20 px-4">
      
    
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,251,0.05)_0%,transparent_70%)]" />

    
      <div className="relative flex flex-col min-[1600px]:block items-center">
        
      
        <div className="min-[1600px]:hidden flex flex-col items-center w-full">
           <NavBranch item={NAV_ITEMS[0]} activeId={activeId} onHover={setActiveId} />
        </div>

       
        <div className="relative group z-30 my-4 min-[1600px]:my-0">
          <div className={`
            relative bg-black border-2 px-12 py-8 transition-all duration-700
            ${activeId ? 'border-[rgb(0,255,251)] shadow-[0_0_40px_rgba(0,255,251,0.2)]' : 'border-white/20'}
          `}>
        
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-[rgb(0,255,251,0.05)] to-transparent -translate-y-full animate-[scan_3s_linear_infinite]" />
            
            <h1 className={`
              text-4xl sm:text-6xl font-black tracking-[0.2em] transition-all duration-500
              ${activeId ? 'text-[rgb(0,255,251)] [text-shadow:0_0_15px_rgba(0,255,251,0.5)]' : 'text-white'}
            `}>
              LINKS
            </h1>
            
            <div className="flex justify-between mt-4 border-t border-white/10 pt-2">
              <span className="text-[9px] text-[rgb(0,255,251)] opacity-70 animate-pulse">● Online</span>
            </div>
          </div>

          
          <div className="hidden min-[1600px]:block">
            {NAV_ITEMS.map((item) => (
              <NavBranch key={item.id} item={item} activeId={activeId} onHover={setActiveId} />
            ))}
          </div>
        </div>

        <div className="min-[1600px]:hidden flex flex-col items-center w-full gap-2">
          <NavBranch item={NAV_ITEMS[1]} activeId={activeId} onHover={setActiveId} />
          <NavBranch item={NAV_ITEMS[2]} activeId={activeId} onHover={setActiveId} />
          <NavBranch item={NAV_ITEMS[3]} activeId={activeId} onHover={setActiveId} />
        </div>

      </div>

     

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default Atlas_links;