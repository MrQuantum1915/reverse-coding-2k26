"use client";
import React, { useState, useEffect } from "react";
import Button from "./neon-button";

const COLORS = {
  cyan: "#00ffff",
  red: "#ff003c",
  green: "#00ff00",
  dim: "#1a1a1a",
  orange: "#ff7300",
  fillCyan: "rgba(0, 40, 40, 0.9)",
  fillRed: "rgba(40, 0, 0, 0.9)",
  fillGreen: "rgba(0, 40, 0, 0.9)",
  fillOrange: "rgb(33,16,0)",
};


const GlowWrapper = ({ color, children }) => (
  <div 
    className="transition-all duration-300 hover:scale-105 hover:brightness-125"
    style={{ filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}40)` }}
  >
    {children}
  </div>
);


const DataPipe = ({ 
  direction = "right", 
  color = COLORS.cyan, 
  speed = "2s", 
  active = true, 
  height = "20px",
  showDot = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  let d = "", viewBox = "0 0 100 20", width = "100%";

  if (direction === "right") { d = "M0,10 L100,10"; viewBox = "0 0 100 20"; } 
  else if (direction === "left") { d = "M100,10 L0,10"; viewBox = "0 0 100 20"; } 
  else if (direction === "down") { 
    d = "M10,0 L10,100"; 
    viewBox = "0 0 20 100"; 
    width = "20px"; 
    height = height === "20px" ? "100%" : height;
  }
  else if (direction === "up") { 
    d = "M10,100 L10,0"; 
    viewBox = "0 0 20 100"; 
    width = "20px"; 
    height = height === "20px" ? "100%" : height;
  }

  return (
    <div 
      className={`flex items-center justify-center relative overflow-visible ${direction === 'down' || direction === 'up' ? '' : 'w-full'}`}
      style={{ height: direction === 'down' || direction === 'up' ? height : 'auto' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg width={width} height="100%" viewBox={viewBox} preserveAspectRatio="none" className="overflow-visible transition-all duration-300">
        <path d={d} stroke={COLORS.dim} strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
        <path
          d={d}
          stroke={color}
          strokeWidth={isHovered ? "4" : "3"}
          fill="none"
          strokeDasharray="20 30"
          vectorEffect="non-scaling-stroke"
          className={active ? "opacity-100" : "opacity-20"}
          style={{
            animation: active ? `flow ${isHovered ? "0.5s" : speed} linear infinite` : "none",
            filter: `drop-shadow(0 0 ${isHovered ? "8px" : "5px"} ${color})`,
            transition: "stroke-width 0.3s, filter 0.3s"
          }}
        />
        {/* {showDot && direction === "right" && <circle cx="100" cy="10" r={isHovered ? "4" : "3"} fill={color} className="transition-all duration-300" />}
        {showDot && direction === "left" && <circle cx="0" cy="10" r={isHovered ? "4" : "3"} fill={color} className="transition-all duration-300" />}
        {showDot && direction === "down" && <circle cx="10" cy="100" r={isHovered ? "4" : "3"} fill={color} className="transition-all duration-300" />}
        {showDot && direction === "up" && <circle cx="10" cy="0" r={isHovered ? "4" : "3"} fill={color} className="transition-all duration-300" />} */}
      </svg>
      <style jsx>{`
        @keyframes flow { to { stroke-dashoffset: -50; } }
      `}</style>
    </div>
  );
};

const Flowchart = () => {
  const [btnSize, setBtnSize] = useState({ width: 180, height: 60 });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 600) setBtnSize({ width: 140, height: 45 });
      else if (w < 1000) setBtnSize({ width: 150, height: 50 });
      else setBtnSize({ width: 180, height: 60 });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cyanBtnProps = { 
    borderColor: COLORS.cyan, 
    glowColor: COLORS.cyan, 
    fillColor: COLORS.fillCyan, 
    cursor: "default",
    ...btnSize 
  };

  return (
    <div className="w-full flex flex-col items-center py-20 overflow-hidden relative">
      
  
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(#00ffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <h1 className="text-2xl md:text-5xl mb-12 lg:mb-20 text-center text-transparent bg-clip-text bg-white font-bold tracking-widest drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] px-4">
        THE ANSWER IS THE STARTING POINT
      </h1>

 
      <div className="flex flex-col items-center lg:hidden">
        <GlowWrapper color={COLORS.cyan}><Button text="QUERY" {...cyanBtnProps} /></GlowWrapper>
        <DataPipe direction="down" color={COLORS.cyan} height="80px" />

        <GlowWrapper color={COLORS.cyan}><Button text="OBSERVE" {...cyanBtnProps} /></GlowWrapper>
        <DataPipe direction="down" color={COLORS.cyan} height="80px" />

        <GlowWrapper color={COLORS.cyan}><Button text="DECRYPT" {...cyanBtnProps} /></GlowWrapper>
        <DataPipe direction="down" color={COLORS.cyan} height="80px" />

        <GlowWrapper color={COLORS.cyan}><Button text="CODE" {...cyanBtnProps} /></GlowWrapper>
        <DataPipe direction="down" color={COLORS.cyan} height="80px" />

        <GlowWrapper color={COLORS.cyan}><Button text="EXE" {...cyanBtnProps} /></GlowWrapper>
        <DataPipe direction="down" color={COLORS.green} height="80px" />

        <GlowWrapper color={COLORS.green}>
          <Button text="SUCCESS" borderColor={COLORS.green} glowColor={COLORS.green} fillColor={COLORS.fillGreen} cursor="default" {...btnSize} />
        </GlowWrapper>
        <DataPipe direction="down" color={COLORS.orange} height="80px" />

        <div className="relative group">
          <div className="absolute inset-0 blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity duration-500" style={{ backgroundColor: COLORS.orange }} />
          <GlowWrapper color={COLORS.orange}>
            <Button text="GOD_MODE" borderColor={COLORS.orange} glowColor={COLORS.orange} fillColor={COLORS.fillOrange} cursor="default" {...btnSize} />
          </GlowWrapper>
        </div>
      </div>



      <div className="hidden lg:block w-full max-w-[1400px] overflow-x-visible pb-10 px-4">
        <div className="min-w-[900px]">
          
          <div className="grid grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] gap-y-0 gap-x-2 items-center justify-items-center">

            
            <GlowWrapper color={COLORS.cyan}><Button text="QUERY" {...cyanBtnProps} /></GlowWrapper>
            <DataPipe direction="right" speed="1.5s" />
            <GlowWrapper color={COLORS.cyan}><Button text="OBSERVE" {...cyanBtnProps} /></GlowWrapper>
            <DataPipe direction="right" speed="1s" />
           <GlowWrapper color={COLORS.cyan}><Button text="DECRYPT" {...cyanBtnProps} /></GlowWrapper>
            <DataPipe direction="right" speed="0.5s" />
             <GlowWrapper color={COLORS.cyan}><Button text="CODE" {...cyanBtnProps} /></GlowWrapper>


           
            <div />
           <div />
            
           
            <div className="h-32 flex items-center">
              <DataPipe direction="up" color={COLORS.red} speed="3s" />
            </div>

           <div />
             <div />
            <div />

            <div className="h-32 flex items-center">
              <DataPipe direction="down" color={COLORS.cyan} speed="0.8s" />
            </div>


           <div /> <div />
            
            <GlowWrapper color={COLORS.red}>
              <Button text="FAIL" borderColor={COLORS.red} glowColor={COLORS.red} fillColor={COLORS.fillRed} cursor="default" {...btnSize} />
            </GlowWrapper>
            
            <div className="col-span-3 w-full">
               <DataPipe direction="left" color={COLORS.red} speed="2s" showDot={false} />
            </div>
            
            <GlowWrapper color={COLORS.cyan}>
              <Button text="EXE" {...cyanBtnProps} />
            </GlowWrapper>


           <div /><div /><div /><div /><div /><div />
             <div className="h-32 flex items-center"><DataPipe direction="down" color={COLORS.green} speed="0.5s" /></div>


           <div /><div /><div />
            
            <div />

            <div className="relative group">
              <div className="absolute inset-0 blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity duration-500" style={{ backgroundColor: COLORS.orange }} />
              <GlowWrapper color={COLORS.orange}>
                <Button text="GOD_MODE" borderColor={COLORS.orange} glowColor={COLORS.orange} fillColor={COLORS.fillOrange} cursor="default" {...btnSize} />
              </GlowWrapper>
            </div>

            <DataPipe direction="left" color={COLORS.orange} speed="1.5s" />
            
            <GlowWrapper color={COLORS.green}>
              <Button text="SUCCESS" borderColor={COLORS.green} glowColor={COLORS.green} fillColor={COLORS.fillGreen} cursor="default" {...btnSize} />
            </GlowWrapper>

          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Flowchart;