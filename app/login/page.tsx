"use client";

import Image from "next/image";
import { supabase } from "../lib/supabaseClient";
import {useState,useEffect} from "react";
export default function Page() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1️⃣ Get initial session AFTER cookies are restored
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // 2️⃣ Listen for future auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
useEffect(() => {
  supabase.auth.getSession().then((res) => {
    console.log("SESSION:", res);
  });
}, []);
  if (loading) return null;
const logout = async () => {
  await supabase.auth.signOut();
  setUser(null);
};

  return (
    <main className="relative h-screen w-full overflow-hidden">

      {/* ✅ Image wrapper MUST be relative */}
      <div
        className="relative h-full w-full"
      >
        <Image
          src="/tesseract-bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-white text-center">
        <h1 className="text-5xl font-bold">Reverse Coding 2K26</h1>
  <p className="text-lg opacity-80">
          Login to register for the event
        </p>
    {user ? (
  <button
    onClick={logout}
    className="
      relative px-6 py-3 rounded-md font-semibold text-red-400
      border border-red-500
      shadow-[0_0_15px_rgba(239,68,68,0.6)]
      hover:shadow-[0_0_30px_rgba(239,68,68,0.9)]
      transition-all duration-300
      active:scale-95
    "
  >
    Logout
  </button>
) : (
  <button
    onClick={signInWithGoogle}
    className="flex items-center gap-3 px-6 py-3 rounded-md bg-white text-black font-medium shadow-md hover:shadow-lg transition active:scale-[0.97]"
  >
    <img
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      alt="Google"
      className="w-5 h-5"
    />
    Continue with Google
  </button>
)}

       
      </div>

    </main>
  );
}
