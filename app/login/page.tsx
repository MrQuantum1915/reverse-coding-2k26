"use client";

import Image from "next/image";
import { createClient_client } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
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
      setProfileExists(true);
      setEditMode(false);
      alert("Profile updated successfully!");
      redirect("/");
    }
  };
  if (loading) {
    return (
      <main className="h-screen w-full flex items-center justify-center bg-black text-white">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
            />
          </svg>
          <span className="text-lg">Loading...</span>
        </div>
      </main>
    );
  }
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div className="relative h-full w-full">
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

        {user ? (
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-lg space-y-4">
            {profileExists ? (
              editMode ? (
                <h2 className="text-2xl font-semibold">Edit Profile details</h2>
              ) : (
                <h2 className="text-2xl font-semibold"> Profile details</h2>
              )
            ) : (
              <h2 className="text-2xl font-semibold">Complete your profile</h2>
            )}

            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm font-medium opacity-80">
                Full Name
              </label>
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                disabled={profileExists && !editMode}
                onChange={handleChange}
                className={`w-full p-2 rounded bg-black/40 outline-none ${
                  profileExists && !editMode
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm font-medium opacity-80">
                Institute Name
              </label>
              <input
                name="institute"
                placeholder="Institute Name"
                disabled={profileExists && !editMode}
                onChange={handleChange}
                value={form.institute}
                className={`w-full p-2 rounded bg-black/40 outline-none ${
                  profileExists && !editMode
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm font-medium opacity-80">
                Codeforces id
              </label>
              <input
                name="codeforces_id"
                placeholder="Codeforces ID"
                disabled={profileExists && !editMode}
                value={form.codeforces_id}
                onChange={handleChange}
                className={`w-full p-2 rounded bg-black/40 outline-none ${
                  profileExists && !editMode
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>

            {/* <input
              name="institute_email"
              placeholder="Institute Email"
              disabled={profileExists && !editMode}
              onChange={handleChange}
              value={form.institute_email}
              className={`w-full p-2 rounded bg-black/40 outline-none ${
                (profileExists && !editMode) ? "opacity-60 cursor-not-allowed" : ""
              }`}
            /> */}

            {!profileExists || editMode ? (
              <button
                onClick={editMode ? updateProfile : submitProfile}
                className="w-full py-2 rounded bg-green-500 text-black font-semibold"
              >
                Submit Details
              </button>
            ) : (
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-400 font-semibold">Registered</span>

                <button
                  onClick={() => setEditMode(true)}
                  className="text-blue-400 hover:underline"
                >
                  Edit Details
                </button>
              </div>
            )}
            <div className="text-xl font-semibold">OR</div>
            <button
              disabled={editMode}
              className={`w-full py-2 rounded border ${
                editMode
                  ? "opacity-50 cursor-not-allowed"
                  : "border-red-500 text-red-400 hover:bg-red-500/10"
              }`}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg opacity-80">
              Login to register for the event
            </p>
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
          </>
        )}
      </div>
    </main>
  );
}
