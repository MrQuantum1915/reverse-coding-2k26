"use client";
import React, { useState, useEffect } from "react";
import Main_button from "../components/main_button"; 

function Page() {
  const [windowWidth, setWindowWidth] = useState(0);
  
  const [activeModule, setActiveModule] = useState("box1");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buttonWidth = windowWidth < 768 ? 200 : 300; 
  const modules = [
    { 
      id: "box1", 
      label: "BOX_01", 
      difficulty: "EASY", 
      activeBg: "bg-green-400", 
      activeText: "text-blue-100",
      hoverBg: "hover:bg-green-400",
      hoverText: "hover:text-blue-100"
    },
    { 
      id: "box2", 
      label: "BOX_02", 
      difficulty: "MEDIUM", 
      activeBg: "bg-orange-400", 
      activeText: "text-white",
      hoverBg: "hover:bg-orange-400",
      hoverText: "hover:text-white"
    },
    { 
      id: "box3", 
      label: "BOX_03", 
      difficulty: "HARD", 
      activeBg: "bg-red-600", 
      activeText: "text-red-100",
      hoverBg: "hover:bg-red-600",
      hoverText: "hover:text-red-100"
    }
  ];

  const cornerBracketStyle = "absolute w-6 h-6 border-cyan-500 transition-all duration-300 hover:w-8 hover:h-8 hover:border-cyan-300";
  const boxStyle = "w-full h-full border border-cyan-800 bg-black/40 backdrop-blur-sm hover:border-cyan-400 transition-colors duration-300";
  
  const clipStyle = {
    clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
    WebkitClipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
  };

  const textGlowCyan = {
    textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #0ea5e9",
  };

  return (
    <div className="flex flex-col min-h-screen mt-[7vh] lg:mt-[vh] p-2 md:p-5 text-cyan-500 overflow-x-hidden">
      
   
      <div className="flex flex-col w-full h-auto mb-8">
        <div className="flex flex-col xl:flex-row justify-between gap-6 items-center text-center xl:text-left">
    
          <div>
            <h1
              className="text-4xl md:text-5xl text-white font-bold tracking-[0.2em]"
              style={{ textShadow: "0 0 5px #ff9f1c, 0 0 10px #ff9f1c, 0 0 20px #ff7a18, 0 0 40px #ff6a00" }}
            >
              SANDBOX
            </h1>
          </div>

      
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div>
              <h1 className="text-xl md:text-2xl text-white font-mono" style={textGlowCyan}>SYS_TIME</h1>
              <div className="text-orange-500 text-sm md:text-base">TIME</div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-bold text-white font-mono" style={textGlowCyan}>NETWORK</h1>
              <div className="text-green-400 text-sm md:text-base">CONNECTED</div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-white font-mono font-bold" style={textGlowCyan}>USER</h1>
              <div className="text-red-500 text-sm md:text-base">GUEST_026</div>
            </div>
          </div>

          <div className="mt-4 xl:mt-0">
            <Main_button text="RANKINGS" onClick="/leaderboard" width={buttonWidth} />
          </div>
        </div>
      </div>

 
      <div className="flex flex-col lg:flex-row w-full h-auto lg:min-h-[60vh] gap-6">
        
     
        <div className="w-full lg:w-1/3 flex flex-col gap-5">
          
          <div className="relative group w-full h-[500px] lg:h-[70%]">
            <span className={`${cornerBracketStyle} -top-2 -left-2 border-t-2 border-l-2 rounded-tl-sm`}></span>
            <span className={`${cornerBracketStyle} -bottom-2 -right-2 border-b-2 border-r-2 rounded-br-sm`}></span>

            <div className={boxStyle} style={clipStyle}>
              <div >
                <div className="flex flex-col justify-center items-center">
                <h1 style={textGlowCyan} className="ml-5 md:ml-10 text-xl md:text-2xl text-white mt-4">
                  MODULE SELECTOR
                </h1>
                 {activeModule === 'box3' ? (<div className="text-red-700 font-extrabold">HARD MODE ENABLED</div>) : ''}
                </div>
              </div>

              <ul className="flex flex-col gap-4 p-3 md:p-5 mt-2 h-full overflow-y-auto lg:overflow-visible">
                
                {modules.map((module) => {
                  const isActive = activeModule === module.id;

                  return (
                    <li 
                      key={module.id}
                      onClick={() => setActiveModule(module.id)} 
                      className="relative h-20 md:h-24 w-full group cursor-pointer shrink-0"
                    >
                      <div 
                        className={`
                          absolute inset-0 transition-colors duration-300
                          ${isActive ? module.activeBg : `bg-cyan-900/40 ${module.hoverBg}`}
                        `} 
                        style={clipStyle}
                      >
                        <div 
                          className={`
                            absolute inset-[1px] transition-colors duration-300 flex flex-col justify-center pl-6 md:pl-10
                            ${isActive ? 'bg-transparent' : 'bg-black hover:bg-opacity-80'}
                          `} 
                          style={clipStyle}
                        >
                          <div className="flex justify-between mr-10">
                            <h1 
                              className={`
                                text-2xl md:text-3xl font-bold transition-all
                                ${isActive ? 'text-white' : `text-white ${module.hoverText}`}
                              `}
                            >
                              {module.label}
                            </h1>
                          </div>
                          <p className={`
                            text-[10px] uppercase tracking-widest font-semibold mt-1 transition-colors
                            ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}
                          `}>
                            Difficulty: <span className="text-white font-bold">{module.difficulty}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}

              </ul>
            </div>
          </div>
          <div className="relative group w-full h-[200px] lg:h-[30%]">
            <span className={`${cornerBracketStyle} -top-2 -left-2 border-t-2 border-l-2 rounded-tl-sm`}></span>
            <span className={`${cornerBracketStyle} -bottom-2 -right-2 border-b-2 border-r-2 rounded-br-sm`}></span>
            <div className={boxStyle} style={clipStyle}>
              <div className="flex flex-col gap-6 justify-center h-full">
                <h1 className="text-xl text-gray-400 ml-4 mt-2">Powered BY:</h1>
                <div
                  className="text-center text-3xl md:text-4xl font-bold text-white"
                  style={{ textShadow: "0 0 6px #22c55e, 0 0 12px #22c55e, 0 0 24px #22c55e, 0 0 40px #4ade80" }}
                >
                  GEEKS FOR GEEKS
                </div>
                <p className="text-gray-500 text-lg text-center">Evaluation Engine</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-5">
          <div className="relative group w-full h-[300px] lg:h-[55%]">
            <span className={`${cornerBracketStyle} -top-2 -left-2 border-t-2 border-l-2 rounded-tl-sm`}></span>
            <span className={`${cornerBracketStyle} -bottom-2 -right-2 border-b-2 border-r-2 rounded-br-sm`}></span>
            <span className={`${cornerBracketStyle} -top-2 -right-2 border-t-2 border-r-2 rounded-tr-sm`}></span>
            <span className={`${cornerBracketStyle} -bottom-2 -left-2 border-b-2 border-l-2 rounded-bl-sm`}></span>

            <div className={`${boxStyle} flex flex-col justify-center`} style={clipStyle}>
              <div className="flex flex-col gap-9 items-center">
                <div className="relative">
                  <img src={"/sandbox_bg.jpg"} alt="" className="opacity-30 max-w-[80%] mx-auto" />
                  <div
                    className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl font-bold"
                    style={{
                      color: "#e5faff",
                      textShadow: "0 0 8px #22f7ff, 0 0 16px #22f7ff",
                      fontFamily: "monospace",
                      letterSpacing: "4px",
                    }}
                  >
                    3026
                  </div>
                </div>
                <div className="text-xl md:text-2xl text-center">
                  <h1 className="text-orange-500">WAITING FOR SIGNAL</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group w-full h-auto min-h-[250px] lg:h-[45%]">
            <span className={`${cornerBracketStyle} -top-2 -left-2 border-t-2 border-l-2 rounded-tl-sm`}></span>
            <span className={`${cornerBracketStyle} -bottom-2 -right-2 border-b-2 border-r-2 rounded-br-sm`}></span>
            <div className={boxStyle} style={clipStyle}>
              <div className="py-4">
                <h1 className="text-center text-xl md:text-2xl font-bold tracking-[0.2em] text-cyan-50" style={textGlowCyan}>
                  MISSION_PROTOCOL
                </h1>
                <div className="flex flex-col gap-4 p-4 md:p-6 w-full text-left font-mono text-xs md:text-sm">
                  <div>
                    <span className="font-bold text-[rgb(0,255,255)] drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                      Objective:{" "}
                    </span>
                    <span className="text-gray-300">
                      Probe the system to determine the underlying polynomial function f(x).
                    </span>
                  </div>

                  <div>
                    <h1 className="font-bold text-red-500 mb-1 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                      Constraints:
                    </h1>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 pl-1 marker:text-gray-600">
                      <li>Input range [-1000, 1000].</li>
                      <li>Integer inputs only.</li>
                      <li>
                        Time Limit: <span className="text-gray-200 bg-cyan-900/30 px-1">2s</span>.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-[rgb(0,255,255)] drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                      INTEL:{" "}
                    </span>
                    <span className="text-gray-300">
                      The sequence appears to grow quadratically. Watch for overflow on large inputs.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-5">
          <div className="relative group w-full h-[250px] lg:h-[35%]">
            <span className={`${cornerBracketStyle} -top-2 -left-2 border-t-2 border-l-2 rounded-tl-sm`}></span>
            <span className={`${cornerBracketStyle} -bottom-2 -right-2 border-b-2 border-r-2 rounded-br-sm`}></span>
            <div className={boxStyle} style={clipStyle}>
              <div className="flex flex-col justify-center items-center gap-5 md:gap-7 h-full">
                <h1 className="text-white text-center text-xl md:text-2xl" style={textGlowCyan}>
                  Enter_Input_Parameter
                </h1>
                <div className="p-2 w-3/4">
                  <div className="flex items-center border-b border-gray-700 py-2">
                    <span className="text-cyan-400 text-xl font-bold mr-4">{">"}</span>
                    <input
                      type="text"
                      placeholder="INPUT"
                      className="w-full bg-transparent border-none outline-none text-cyan-400 font-mono text-lg tracking-[0.2em] uppercase placeholder-gray-500 focus:ring-0"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div>
                  <Main_button text="EXECUTE" onClick="" width={buttonWidth * 0.7} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group w-full h-[400px] lg:h-[65%]">
            <span className={`${cornerBracketStyle} -top-2 -left-2 border-t-2 border-l-2 rounded-tl-sm`}></span>
            <span className={`${cornerBracketStyle} -bottom-2 -right-2 border-b-2 border-r-2 rounded-br-sm`}></span>
            <div className={boxStyle} style={clipStyle}>
              <div className="text-center mt-3 h-full flex flex-col">
                <h1 className="text-white text-2xl mb-4" style={textGlowCyan}>
                  I/O_STREAM_LOG
                </h1>
                <div className="flex-grow overflow-y-auto">
                  <div
                    className="w-full px-6 py-4 flex justify-between items-center font-mono text-sm md:text-lg"
                    style={{ background: "linear-gradient(180deg, #020617, #000000)" }}
                  >
                    <div style={{ color: "#22f7ff", textShadow: "0 0 6px #22f7ff, 0 0 12px #22f7ff" }}>
                      &gt; IN: 55
                    </div>
                    <div style={{ color: "#22f7ff", textShadow: "0 0 6px #22f7ff, 0 0 12px #22f7ff" }}>
                      OUT: 3026
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-white/40" />
                </div>
              </div>
            </div>
          </div>
   
          <div className="pb-10 lg:pb-0">
            <div className="flex justify-center w-full">
              <div>
                <Main_button text="SUBMIT.EXE" onClick="" width={buttonWidth} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;