"use client";

import { useState, useEffect } from "react";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-02-01T14:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center py-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 max-w-[1400px] w-full px-4 md:px-8 mx-auto">
        <div className="flex flex-col shrink-0 items-center lg:items-start">
          <div className="text-white uppercase text-2xl sm:text-3xl md:text-5xl tracking-wider mb-6 font-normal text-center lg:text-left">
            SYSTEM BREACH IN:
          </div>

          <div className="flex gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center lg:justify-start">
            <div className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/20 rounded-2xl bg-black/40 backdrop-blur-sm">
              <div className="text-purple-500 text-2xl sm:text-3xl md:text-5xl font-bold leading-none mb-1 sm:mb-2">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-light uppercase tracking-widest">
                DAYS
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/20 rounded-2xl bg-black/40 backdrop-blur-sm">
              <div className="text-cyan-400 text-2xl sm:text-3xl md:text-5xl font-bold leading-none mb-1 sm:mb-2">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-light uppercase tracking-widest">
                HRS
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/20 rounded-2xl bg-black/40 backdrop-blur-sm">
              <div className="text-cyan-400 text-2xl sm:text-3xl md:text-5xl font-bold leading-none mb-1 sm:mb-2">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-light uppercase tracking-widest">
                MIN
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/20 rounded-2xl bg-black/40 backdrop-blur-sm">
              <div className="text-purple-500 text-2xl sm:text-3xl md:text-5xl font-bold leading-none mb-1 sm:mb-2">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-light uppercase tracking-widest">
                SEC
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 h-full lg:border-t-0 lg:border-l-4   border-cyan-400 mt-6 lg:mt-0 pt-8 lg:pt-2 lg:pl-10 flex flex-col max-w-2xl items-start justify-center">
          <div className="text-white font-bold text-xl sm:text-2xl md:text-3xl mb-4 text-center lg:text-left">
            Prepare your environment.
          </div>
          <div className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed text-center lg:text-left">
            The black boxes are being compiled. The logic is being obfuscated.
            Only those who can think mathematically and code surgically will
            survive the compilation.
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
