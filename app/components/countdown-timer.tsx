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
    const targetDate = new Date("2026-01-18T21:00:00").getTime();

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
    <div className="w-full flex justify-center">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 max-w-[1200px] w-full px-4 md:px-8 mx-auto">
        <div className="flex flex-col shrink-0 items-center md:items-start">
          <div className="text-white uppercase font-mono text-2xl sm:text-3xl md:text-4xl tracking-wider mb-4 min-h-6 flex items-center font-bold text-center md:text-left">
            SYSTEM BREACH IN:
          </div>

          <div className="flex gap-2 sm:gap-3 mt-3 flex-nowrap justify-center max-w-[320px] sm:max-w-none mx-auto">
            <div className="border border-cyan-300/80 px-3 sm:px-4 py-3 sm:py-4 text-center shadow-[0_0_8px_rgba(103,232,249,0.6),inset_0_0_8px_rgba(103,232,249,0.1)] flex flex-col items-center justify-center flex-1 min-w-0">
              <div className="text-purple-400 text-3xl sm:text-4xl font-bold font-mono leading-tight">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <div className="text-white text-xs sm:text-sm font-mono uppercase mt-2 tracking-wider">
                DAYS
              </div>
            </div>

            <div className="border border-cyan-300/80 px-3 sm:px-4 py-3 sm:py-4 text-center shadow-[0_0_8px_rgba(103,232,249,0.6),inset_0_0_8px_rgba(103,232,249,0.1)] flex flex-col items-center justify-center flex-1 min-w-0">
              <div className="text-[rgb(0,255,255)] text-3xl sm:text-4xl font-bold font-mono leading-tight">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-white text-xs sm:text-sm font-mono uppercase mt-2 tracking-wider">
                HRS
              </div>
            </div>

            <div className="border border-cyan-300/80 px-3 sm:px-4 py-3 sm:py-4 text-center shadow-[0_0_8px_rgba(103,232,249,0.6),inset_0_0_8px_rgba(103,232,249,0.1)] flex flex-col items-center justify-center flex-1 min-w-0">
              <div className="text-[rgb(0,255,255)] text-3xl sm:text-4xl font-bold font-mono leading-tight">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-white text-xs sm:text-sm font-mono uppercase mt-2 tracking-wider">
                MIN
              </div>
            </div>

            <div className="border border-cyan-300/80 px-3 sm:px-4 py-3 sm:py-4 text-center shadow-[0_0_8px_rgba(103,232,249,0.6),inset_0_0_8px_rgba(103,232,249,0.1)] flex flex-col items-center justify-center flex-1 min-w-0">
              <div className="text-purple-400 text-3xl sm:text-4xl font-bold font-mono leading-tight">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-white text-xs sm:text-sm font-mono uppercase mt-2 tracking-wider">
                SEC
              </div>
            </div>
          </div>
        </div>
        <div className="border-t md:border-t-0 md:border-l border-cyan-300/80 mt-6 md:mt-0 pt-6 md:pt-0 md:pl-8 flex-1 ">
          <div className="text-white font-mono font-bold text-lg sm:text-xl md:text-2xl uppercase mb-2 min-h-6 flex items-center md:whitespace-nowrap">
            Prepare your environment.
          </div>
          <div className="text-[rgb(127,127,127)] font-mono text-sm sm:text-base md:text-xl leading-relaxed">
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
