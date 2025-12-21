"use client";

import { useState } from "react";
import Link from "next/link";
import { Audiowide } from "next/font/google";
import "./navbar.css";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-[10000] w-full bg-black border-b border-white/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center py-3">

            <div className="hidden md:flex justify-center gap-20">
              <Link className="nav-link" href="/"><p className="text-2xl">HOME</p></Link>
              <Link className="nav-link" href="/team"><p className="text-2xl">TEAM</p></Link>
            </div>

            <button
              className="md:hidden justify-self-start text-white text-2xl"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>

            <Link
              href="/"
              className={`
                ${audiowide.className}
                justify-self-center
                bg-white text-black
                px-6
                py-1.5
                logo
                whitespace-nowrap
                hover:text-cyan-400
                transition
              `}
              style={{
                fontSize: "clamp(1.1rem, 3vw, 2.4rem)",
                letterSpacing: "0.35em",
              }}
            >
              TESSERACT
            </Link>

           
            <div className="hidden md:flex justify-center gap-20">
              <Link className="nav-link" href="/team"><p className="text-2xl">RULES</p></Link>
              <Link className="nav-link" href="/login"><p className="text-2xl">SIGN-IN</p></Link>
            </div>
          </div>
        </div>
      </nav>

     
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[9998]"
          onClick={() => setOpen(false)}
        />
      )}

     
      <aside
        className={`
          fixed top-0 left-0 h-full w-64
          bg-black border-r border-white/20
          z-[9999]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col p-6 gap-6">
          <button
            className="text-white text-2xl self-end"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/">HOME</Link>
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/team">TEAM</Link>
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/team">RULES</Link>
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/login">SIGN IN</Link>
        </div>
      </aside>
    </>
  );
}
