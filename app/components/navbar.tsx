"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { Audiowide } from "next/font/google";
import { Menu, X } from "lucide-react";
import "./navbar.css";
import { createClient_client } from "@/utils/supabaseClient";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const supabase = createClient_client();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);


  return (
    <>
      <nav className="fixed top-0 z-50 w-full backdrop-blur-md shadow-lg border-b border-white/10 bg-black/20">
        <div className="mx-2 sm:mx-4 lg:mx-16 px-2 sm:px-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">

            <div className="hidden md:flex justify-end gap-4 lg:gap-8 xl:gap-12">
              <Link className="nav-link" href="/"><p className="text-sm lg:text-base xl:text-lg font-bold tracking-widest">HOME</p></Link>
              <Link className="nav-link" href="/team"><p className="text-sm lg:text-base xl:text-lg font-bold tracking-widest">TEAM</p></Link>
              <Link className="nav-link" href="/rules"><p className="text-sm lg:text-base xl:text-lg font-bold tracking-widest">RULES</p></Link>
            </div>

            <button
              className="md:hidden justify-self-start text-white"
              onClick={() => setOpen(!open)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              href="/"
              className={`
                md:mx-5
                font-black
                justify-self-center
                bg-white text-black
                px-4 sm:px-8 md:px-10 lg:px-14
                py-1 sm:py-1.5
                logo
                whitespace-nowrap
                hover:scale-105
                transition
                duration-300
                ease-in-out
                letter-spacing-wide
                text-lg
                sm:text-2xl
                md:text-4xl
                lg:text-5xl
              `}
              // style={{
              //   letterSpacing: "0.20em",
              // }}
            >
              TESSERACT
            </Link>


            <div className="hidden md:flex justify-start gap-4 lg:gap-8 xl:gap-12">
              <Link className="nav-link" href="/sandbox"><p className="text-sm lg:text-base xl:text-lg font-bold tracking-widest">SANDBOX</p></Link>
              <Link className="nav-link" href="/leaderboard"><p className="text-sm lg:text-base xl:text-lg font-bold tracking-widest">RANKS</p></Link>
              <Link className="nav-link" href="/login"><p className="text-sm lg:text-base xl:text-lg font-bold tracking-widest">{user ? "PROFILE" : "SIGN-IN"}</p></Link>
            </div>
            
            <div className="md:hidden w-6" />
          </div>
        </div>
      </nav>


      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-49"
          onClick={() => setOpen(false)}
        />
      )}


      <aside
        className={`
          fixed ${open ? "top-10" : "top-0"} left-0 h-fit w-48
          bg-black/70 border border-white/50 rounded-2xl
          z-49
          transform transition-transform duration-300
          ${open ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex flex-col items-center p-6 gap-6">
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/">HOME</Link>
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/team">TEAM</Link>
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/leaderboard">LEADERBOARD</Link>
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/rules">RULES</Link>
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/sandbox">SANDBOX</Link>
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/login">{user ? "PROFILE" : "SIGN-IN"}</Link>
        </div>
      </aside>
    </>
  );
}
