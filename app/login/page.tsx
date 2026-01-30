"use client";

import Image from "next/image";
import { createClient_client } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { Orbitron } from "next/font/google"; 
import VoidParticles from "../components/VoidParticles";

import NeonButton from "../components/neon-button";
import Snowfall from "react-snowfall";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const supabase = createClient_client();

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    institute: "",
    // institute_email: "",
    codeforces_id: "",
  });
  const [profileExists, setProfileExists] = useState(false);
  const [profileLoading, setprofileloading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const setUserCookies = (data: any) => {
    document.cookie = `name=${data.name}; path=/; max-age=31536000`;
    document.cookie = `institute=${data.institute}; path=/; max-age=31536000`;
    document.cookie = `codeforces_id=${data.codeforces_id}; path=/; max-age=31536000`;
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: any) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setForm({
        name: data.name || "",
        institute: data.institute || "",
        // institute_email: data.institute_email || "",
        codeforces_id: data.codeforces_id || "",
      });
      setProfileExists(true);
      setUserCookies(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    }
  }, [user]);
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitProfile = async () => {
    if (!user) return;
    if (
      !form.name.trim() ||
      !form.institute.trim() ||
      // !form.institute_email.trim() ||
      !form.codeforces_id.trim()
    ) {
      alert("Please fill all details");
      return;
    }
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...form,
    });

    if (error) {
      alert(error.message);
    } else {
      setUserCookies(form);
      setProfileExists(true);
      setEditMode(false);
      alert("Registration successful!");
      redirect("/");
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    if (
      !form.name.trim() ||
      !form.institute.trim() ||
      // !form.institute_email.trim() ||
      !form.codeforces_id.trim()
    ) {
      alert("Please fill all details");
      return;
    }
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...form,
    });

    if (error) {
      alert(error.message);
    } else {
      setUserCookies(form);
      setProfileExists(true);
      setEditMode(false);
    }
  };

  if (loading) {
    return (
      <main className="h-screen w-full flex items-center justify-center bg-black text-white relative overflow-hidden">
        <VoidParticles />
        <div className="flex flex-col items-center gap-4 z-10">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <span className={`${orbitron.className} text-xl text-cyan-400 animate-pulse`}>INITIALIZING...</span>
        </div>
      </main>
    );
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <main className={`relative h-screen w-full overflow-hidden bg-black ${orbitron.className}`}>
           
      <VoidParticles />
      <div className="absolute inset-0 z-0 pointer-events-none">
          <Snowfall
            color="#808080"
            snowflakeCount={100}
            style={{
              opacity: 0.3,
              width: "100vw",
              height: "100vh",
            }}
          />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      

      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, black 100%) pointer-events-none" />


      <div className="absolute inset-0 z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-15 text-white p-4">
        <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left point">
           <h1 className="pointer-events-none text-5xl md:text-7xl lg:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 drop-shadow-[0_0_25px_rgba(0,255,255,0.6)]">
             TESSERACT
           </h1>
           <div className="pointer-events-none text-2xl md:text-3xl lg:text-4xl mt-2 lg:mt-4 tracking-[0.8em] lg:tracking-[1em] text-cyan-200/80 lg:pl-4">2K26</div>
        </div>

        {user ? (
          <div className="w-full max-w-md bg-black/60 backdrop-blur-xl p-8 rounded-none border border-cyan-500/30 relative group">

            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

            {profileExists ? (
              editMode ? (
                <h2 className="text-2xl font-semibold mb-6 text-cyan-400 tracking-widest uppercase">Edit Protocol</h2>
              ) : (
                <h2 className="text-2xl font-semibold mb-6 text-cyan-400 tracking-widest uppercase">Identity Verified</h2>
              )
            ) : (
                <h2 className="text-2xl font-semibold mb-6 text-cyan-400 tracking-widest uppercase">Initialize Profile</h2>
            )}

            <div className="space-y-5">
                <div className="flex flex-col gap-2 text-left group/input">
                <label className="text-xs font-bold text-cyan-600 uppercase tracking-widest group-focus-within/input:text-cyan-400 transition-colors">
                    Full Name
                </label>
                <input
                    name="name"
                    placeholder="ENTER DESIGNATION"
                    value={form.name}
                    disabled={profileExists && !editMode}
                    onChange={handleChange}
                    className={`w-full p-3 bg-black/50 border-b border-cyan-900 focus:border-cyan-400 outline-none text-cyan-100 placeholder-cyan-900/50 transition-all duration-300 font-mono ${
                    profileExists && !editMode
                        ? "opacity-50 cursor-not-allowed border-none text-gray-400"
                        : "focus:bg-cyan-950/20"
                    }`}
                />
                </div>

                <div className="flex flex-col gap-2 text-left group/input">
                <label className="text-xs font-bold text-cyan-600 uppercase tracking-widest group-focus-within/input:text-cyan-400 transition-colors">
                    Institute
                </label>
                <input
                    name="institute"
                    placeholder="AFFILIATION"
                    disabled={profileExists && !editMode}
                    onChange={handleChange}
                    value={form.institute}
                    className={`w-full p-3 bg-black/50 border-b border-cyan-900 focus:border-cyan-400 outline-none text-cyan-100 placeholder-cyan-900/50 transition-all duration-300 font-mono ${
                    profileExists && !editMode
                        ? "opacity-50 cursor-not-allowed border-none text-gray-400"
                        : "focus:bg-cyan-950/20"
                    }`}
                />
                </div>

                <div className="flex flex-col gap-2 text-left group/input">
                <label className="text-xs font-bold text-cyan-600 uppercase tracking-widest group-focus-within/input:text-cyan-400 transition-colors">
                    Codeforces ID
                </label>
                <input
                    name="codeforces_id"
                    placeholder="HANDLE"
                    disabled={profileExists && !editMode}
                    value={form.codeforces_id}
                    onChange={handleChange}
                    className={`w-full p-3 bg-black/50 border-b border-cyan-900 focus:border-cyan-400 outline-none text-cyan-100 placeholder-cyan-900/50 transition-all duration-300 font-mono ${
                    profileExists && !editMode
                        ? "opacity-50 cursor-not-allowed border-none text-gray-400"
                        : "focus:bg-cyan-950/20"
                    }`}
                />
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-6 w-full">
                {!profileExists || editMode ? (
                    <NeonButton 
                        onClick={editMode ? updateProfile : submitProfile}
                        text="EXECUTE"
                        width="200px"
                        borderColor="#00ff00"
                        textColor="#00ff00"
                        fillColor="rgba(0, 20, 0, 0.9)"
                    />
                ) : (
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex justify-center items-center gap-2 text-sm text-green-400 bg-green-950/30 p-2 border border-green-400/30 rounded px-6">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        STATUS: REGISTERED
                    </div>

                    <NeonButton 
                        onClick={() => setEditMode(true)}
                        text="MODIFY DATA"
                        size="md"
                        width="180px"
                        borderColor="#00ffff"
                        textColor="#00ffff"
                    />
                </div>
                )}
                
                <div className="relative flex items-center gap-4 opacity-50 my-2 w-full">
                    <div className="h-px bg-cyan-900 flex-1"></div>
                    <div className="w-2 h-2 rotate-45 bg-cyan-900"></div>
                    <div className="h-px bg-cyan-900 flex-1"></div>
                </div>

                <NeonButton 
                    onClick={logout}
                    text="TERMINATE SESSION"
                    size="md"
                    width="220px"
                    borderColor="#ff0000"
                    textColor="#ff0000"
                    fillColor="rgba(20, 0, 0, 0.9)"
                />
            </div>
          </div>
        ) : (
          <div className="relative group w-full max-w-md lg:mx-0 mx-auto">
            <div
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-xl"
                style={{ backgroundColor: "#00fffb" }}
            />
            <div
                className="relative bg-[#050a14] p-[1px] transition-transform duration-300"
                style={{
                    clipPath:
                        "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                }}
            >
                 <div
                    className="absolute inset-0 bg-[#00fffb] opacity-30"
                />

                <div
                    className="relative bg-[#06080c] p-10 flex flex-col items-center justify-center gap-8"
                    style={{
                        clipPath:
                            "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                    }}
                >
                     <p 
                        className="text-xl font-bold tracking-widest uppercase text-center"
                        style={{ color: "#00fffb", textShadow: "0 0 10px #00fffb" }}
                    >
                        AUTHENTICATION REQUIRED
                    </p>

                    <div
                        className="w-32 h-[2px] rounded-full bg-[#00fffb]"
                        style={{
                            boxShadow: `0 0 10px #00fffb`,
                        }}
                    />

                    <button
                        onClick={signInWithGoogle}
                        className="group/btn relative px-8 py-4 bg-white text-black font-bold tracking-widest flex items-center gap-4 transition-all hover:scale-101 active:scale-99 overflow-hidden mt-2"
                        style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover/btn:animate-shimmer"></div>
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-6 h-6"
                        />
                        ACCESS WITH GOOGLE
                    </button>
                </div>
            </div>

            <svg
                className="absolute top-0 left-0 w-[60px] h-[60px] pointer-events-none overflow-visible z-10  transition-transform duration-300"
                style={{ filter: `drop-shadow(0 0 5px #00fffb)` }}
            >
                <path
                    d="M 0 30 V 20 L 20 0 H 50"
                    fill="none"
                    stroke="#00fffb"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>

            <svg
                className="absolute bottom-0 right-0 w-[60px] h-[60px] pointer-events-none overflow-visible z-10 transition-transform duration-300"
                style={{ filter: `drop-shadow(0 0 5px #00fffb)` }}
            >
                <path
                    d="M 60 30 V 40 L 40 60 H 10"
                    fill="none"
                    stroke="#00fffb"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
          </div>
        )}
      </div>

        <style jsx global>{`
            @keyframes shimmer {
                100% { transform: translateX(100%); }
            }
            .animate-shimmer {
                animation: shimmer 1s infinite;
            }
        `}</style>
    </main>
);
}