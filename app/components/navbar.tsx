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
  const [loading, setLoading] = useState(true);
   const [firstName,setfirstName]=useState("SIGN-IN");
  useEffect(() => {
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user)
    setfirstName( user?.user_metadata?.given_name || user?.user_metadata?.full_name?.split(" ")[0] )
    setLoading(false)
  }

  getUser()


}, [user])


  return (
    <>
      <nav className="fixed top-0 z-50 w-full backdrop-blur-md shadow-lg border-b border-white/10 bg-black/20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">

            <div className="hidden md:flex justify-center gap-20">
              <Link className="nav-link" href="/"><p className="text-2xl">HOME</p></Link>
              <Link className="nav-link" href="/team"><p className="text-2xl">TEAM</p></Link>
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
                font-black
                justify-self-center
                bg-white text-black
                px-14
                py-1.5
                logo
                whitespace-nowrap
                hover:scale-105
                transition
                duration-300
                ease-in-out
                letter-spacing-wide
                text-2xl
                sm:text-5xl
              `}
              // style={{
              //   letterSpacing: "0.20em",
              // }}
            >
              TESSERACT
            </Link>


            <div className="hidden md:flex justify-center gap-20">
              <Link className="nav-link" href="/rules"><p className="text-2xl">RULES</p></Link>
              <Link className="nav-link" href="/sandbox"><p className="text-2xl">SANDBOX</p></Link>
            </div>
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
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/team">RULES</Link>
          <Link onClick={() => setOpen(false)} className="sidebar-link" href="/sandbox">SANDBOX</Link>
        </div>
      </aside>
    </>
  );
}
