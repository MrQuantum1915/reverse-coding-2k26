"use client";

import Link from "next/link";
import { Audiowide } from "next/font/google";
import "./navbar.css";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

function Navbar() {
  return (
    <div className="fixed  z-10000 w-full">
    <nav className="sticky top-0 z-50 w-full  bg-black border-b border-white/50 py-3 md:py-4 transition-all duration-300 ease-out">
      <div className="w-full mx-auto h-fit flex flex-col md:flex-row items-center justify-between max-w-6xl gap-3 md:gap-5 px-3 md:px-6 transition-all duration-300 ease-out">

        {/* Left links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-5">
          <Link
            href="/"
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-white text-sm sm:text-base md:text-lg opacity-70 hover:opacity-100 hover:underline transition-all duration-200 ease-out"
          >
            HOME
          </Link>

          <Link
            href="/team"
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-white text-sm sm:text-base md:text-lg opacity-70 hover:opacity-100 hover:underline transition-all duration-200 ease-out"
          >
            TEAM
          </Link>
        </div>

        {/* Center logo */}
        <Link
          href="/"
          className={`text-black text-2xl sm:text-3xl md:text-4xl px-6 sm:px-10 md:px-14 py-2 bg-white logo ${audiowide.className} font-black tracking-[0.35em] hover:text-cyan-400 hover:scale-102 transition-all duration-300 ease-out`}
        >
          TESSERACT
        </Link>

        {/* Right links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-5">
          <Link
            href="/team"
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-white text-sm sm:text-base md:text-lg opacity-70 hover:opacity-100 hover:underline transition-all duration-200 ease-out"
          >
            RULES
          </Link>

          <Link
            href="/login"
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-white text-sm sm:text-base md:text-lg opacity-70 hover:opacity-100 hover:underline transition-all duration-200 ease-out"
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
