"use client";
import { useState, useEffect } from "react";
import NeonButton from "./neon-button";
import { redirect } from "next/navigation";

const Crack_the_box = () => {
  const [activeTarget, setActiveTarget] = useState(null);

  const [btnSize, setBtnSize] = useState({ width: 220, height: 75 });
  const [layout, setLayout] = useState({
    svgWidth: 150,
    svgHeight: 200,
    strokeWidth: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setBtnSize({ width: 140, height: 50 });
        setLayout({ svgWidth: 80, svgHeight: 140, strokeWidth: 0.5 });
      } else {
        setBtnSize({ width: 220, height: 75 });
        setLayout({ svgWidth: 150, svgHeight: 200, strokeWidth: 1 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const isWebsiteActive = activeTarget === "register" || activeTarget === "website";
  const isUnstopActive = activeTarget === "register" || activeTarget === "unstop";
  const isRegisterActive = activeTarget !== null;

  const pathYTop = ((btnSize.height / 2) / layout.svgHeight) * 100;
  const pathYBottom = 100 - pathYTop;

  return (

    <div className="mt-20 mb-20 flex flex-col justify-center items-center py-10 overflow-hidden relative gap-8 w-full">


      <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-white uppercase text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        Can you crack the{" "}
        <span className="text-[#00ffff] drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">
          Black Box?
        </span>
      </h1>

      <div className="relative flex items-center gap-0">


        <div
          className="relative z-20"
          onMouseEnter={() => setActiveTarget("register")}
          onMouseLeave={() => setActiveTarget(null)}
        >
          <div className={`transition-all duration-500 ${isRegisterActive ? "scale-105" : "animate-pulse"}`}>
            <NeonButton
              text="REGISTER"
              width={btnSize.width}
              height={btnSize.height}
            />
          </div>

        </div>

        <div className="relative" style={{ width: layout.svgWidth, height: layout.svgHeight }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            <path d={`M0,50 L50,50 L50,${pathYTop} L98,${pathYTop}`} fill="none" stroke="#333333" strokeWidth={layout.strokeWidth} />
            <path d={`M0,50 L50,50 L50,${pathYBottom} L98,${pathYBottom}`} fill="none" stroke="#333333" strokeWidth={layout.strokeWidth} />

            <path
              d={`M0,50 L50,50 L50,${pathYTop} L98,${pathYTop}`}
              fill="none"
              stroke="#00ffff"
              strokeWidth={layout.strokeWidth}
              strokeDasharray="200"
              strokeDashoffset={isWebsiteActive ? "0" : "200"}
              className="transition-all duration-500 ease-out"
              style={{ filter: "drop-shadow(0 0 5px cyan)", opacity: isWebsiteActive ? 1 : 0 }}
            />

            <path
              d={`M0,50 L50,50 L50,${pathYBottom} L95,${pathYBottom}`}
              fill="none"
              stroke="#00ffff"
              strokeWidth={layout.strokeWidth}
              strokeDasharray="200"
              strokeDashoffset={isUnstopActive ? "0" : "200"}
              className="transition-all duration-500 ease-out"
              style={{ filter: "drop-shadow(0 0 5px cyan)", opacity: isUnstopActive ? 1 : 0 }}
            />

            <rect
              x="46" y="46" width="6" height="5"
              fill={`${isRegisterActive ? "#ffffff" : "#7a7a7a"}`}
              className="translate-y-0.5 transition-colors duration-300"
            />
          </svg>
        </div>

        <div className="flex flex-col justify-between" style={{ height: layout.svgHeight }}>

          <div
            onMouseEnter={() => setActiveTarget("website")}
            onMouseLeave={() => setActiveTarget(null)}
            className={`
              transition-all duration-500 
              ${isWebsiteActive ? "opacity-100 filter-none scale-105" : "opacity-30  grayscale scale-100"}
            `}
          >
            <NeonButton
              onClick={() => redirect("/login")}
              text="WEBSITE"
              width={btnSize.width}
              height={btnSize.height}
            />
          </div>

          <div
            onMouseEnter={() => setActiveTarget("unstop")}
            onMouseLeave={() => setActiveTarget(null)}
            className={`
              transition-all duration-500 
              ${isUnstopActive ? "opacity-100 filter-none scale-105" : "opacity-30  grayscale scale-100"}
            `}
          >
            <NeonButton
              text="UNSTOP"
              width={btnSize.width}
              height={btnSize.height}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Crack_the_box;