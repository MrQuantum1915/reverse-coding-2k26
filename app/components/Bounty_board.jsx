import React from "react";

const Bounty_board = () => {
  return (
    <div className="mt-12 sm:mt-20 mx-4 md:mx-10 mb-16 sm:mb-20 dark:bg-black">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl">
          BOUNTY BOARD
        </h1>
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[rgb(0,255,251)] [text-shadow:_0_0_15px_rgba(0,255,251,0.7)]">
          POOL : ₹10,000
        </h1>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
        
        {/* Runner Up */}
        <div className="cursor-pointer relative transition-all duration-300 ease-out [filter:drop-shadow(0_0_20px_rgba(0,255,255,0.6))] hover:[filter:drop-shadow(0_0_50px_rgba(0,255,255,1))] hover:-translate-y-1">
          <div
            className="w-[220px] h-[260px] sm:w-[260px] sm:h-[300px] md:w-72 md:h-80 bg-[rgb(0,255,251)] p-0.5"
            style={{
              clipPath:
                "polygon(12% 0, 100% 0, 100% 92%, 88% 100%, 0 100%, 0 8%)",
            }}
          >
            <div
              className="w-full h-full bg-[#050a14] flex flex-col items-center justify-center relative"
              style={{
                clipPath:
                  "polygon(12% 0, 100% 0, 100% 92%, 88% 100%, 0 100%, 0 8%)",
              }}
            >
              <h2 className="text-[rgb(0,255,255)] text-lg sm:text-xl md:text-2xl font-bold uppercase mb-4 sm:mb-6">
                RUNNER UP
              </h2>

              <div className="flex items-center gap-1 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-10">
                <span className="text-white">₹</span>
                <span className="text-white">2,700</span>
              </div>

              <div className="w-4/5 h-[3px] sm:h-[4px] bg-[rgb(0,255,251)]" />
            </div>
          </div>
        </div>

        {/* Champion */}
        <div className="cursor-pointer relative transition-all duration-300 ease-out [filter:drop-shadow(0_0_20px_rgba(255,138,0,0.6))] hover:[filter:drop-shadow(0_0_50px_rgba(255,138,0,1))] hover:-translate-y-1">
          <div
            className="w-[220px] h-[260px] sm:w-[260px] sm:h-[300px] md:w-72 md:h-80 bg-[#FF8A00] p-0.5"
            style={{
              clipPath:
                "polygon(12% 0, 100% 0, 100% 92%, 88% 100%, 0 100%, 0 8%)",
            }}
          >
            <div
              className="w-full h-full bg-[#050a14] flex flex-col items-center justify-center relative"
              style={{
                clipPath:
                  "polygon(12% 0, 100% 0, 100% 92%, 88% 100%, 0 100%, 0 8%)",
              }}
            >
              <div className="absolute top-0 right-0 bg-[#FF8A00] text-[#050a14] px-3 py-1 font-black text-[9px] sm:text-[10px] tracking-widest">
                MVP
              </div>

              <div className="mb-4 sm:mb-6">
                <h2 className="text-[#FF8A00] text-lg sm:text-xl md:text-2xl font-bold tracking-[0.35em] uppercase">
                  Champion
                </h2>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 font-extrabold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-10">
                <span className="text-white">₹</span>
                <span className="text-white">3,300</span>
              </div>

              <div className="w-4/5 h-[3px] sm:h-[4px] bg-[#FF8A00]" />
            </div>
          </div>
        </div>

        {/* Special Ops */}
        <div className="cursor-pointer relative transition-all duration-300 ease-out [filter:drop-shadow(0_0_20px_rgba(166,0,255,0.6))] hover:[filter:drop-shadow(0_0_50px_rgba(166,0,255,1))] hover:-translate-y-1">
          <div
            className="w-[220px] h-[260px] sm:w-[260px] sm:h-[300px] md:w-72 md:h-80 bg-[rgb(166,0,255)] p-0.5"
            style={{
              clipPath:
                "polygon(12% 0, 100% 0, 100% 92%, 88% 100%, 0 100%, 0 8%)",
            }}
          >
            <div
              className="w-full h-full bg-[#050a14] flex flex-col items-center justify-center relative"
              style={{
                clipPath:
                  "polygon(12% 0, 100% 0, 100% 92%, 88% 100%, 0 100%, 0 8%)",
              }}
            >
              <h2 className="text-[rgb(166,0,255)] text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-4 sm:mb-6">
                SPECIAL OPS
              </h2>

              <div className="text-white text-center text-sm sm:text-lg md:text-xl">
                ₹2,300 (IIITV)
                <br />
                ₹1,700 (IIITV FY)
              </div>

              <div className="w-4/5 h-[3px] sm:h-[4px] bg-[rgb(166,0,251)] mt-6 sm:mt-10" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Bounty_board;