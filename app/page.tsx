"use client";
import TesseractViewer from "./components/TesseractViewer";
import Image from "next/image";
import { useEffect, useState } from "react";
import CountdownTimer from "./components/countdown-timer";
import Button from "./components/neon-button";
import { Orbitron } from "next/font/google";
import Flowchart from "./components/Flowchart";
import Bounty_board from "./components/Bounty_board";
import Crack_the_box from "./components/crack_the_box";
import HyperText from "./components/HyperText";
import FadeIn from "./components/FadeIn";
import Preloader from "./components/Preloader";
import VoidParticles from "./components/VoidParticles";
import GlitchText from "./components/GlitchText";
import GlitchImage from "./components/GlitchImage";
import Main_button from "./components/main_button";
import Snowfall from "react-snowfall";
import { createClient_client } from "@/utils/supabaseClient";
import { AuthChangeEvent } from "@supabase/supabase-js";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const supabase = createClient_client();

const getsnowcount = (w: number) => {
  if (w < 480) {
    return 150;
  } else if (w < 768) return 300;
  return 500;
};

export default function Home() {
  const [btnSize, setBtnSize] = useState({
    width: 290,
    height: 100,
    size: "lg",
  });
  const [snowCount, setSnowCount] = useState(50);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
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

  useEffect(() => {
    const updateSizes = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setBtnSize({ width: 220, height: 70, size: "sm" });
      } else if (w < 768) {
        setBtnSize({ width: 250, height: 80, size: "md" });
      } else {
        setBtnSize({ width: 290, height: 100, size: "lg" });
      }
      setSnowCount(getsnowcount(w));
    };
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  return (
    <div className="bg-black relative">
      <Preloader />


      <div className="relative min-h-screen text-white overflow-hidden">
        <Image
          src="/tesseract-bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover z-0 object-center opacity-70 scale-120"
        />
        <VoidParticles />
        <div className="fixed inset-0 pointer-events-none">
          <Snowfall
            color="#808080"
            snowflakeCount={snowCount}
            style={{
              width: "100vw",
              height: "100vh",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

        <div className="relative z-20 min-h-screen">
          <div className="absolute top-[14%] sm:top-[25%] left-1/2 -translate-x-1/2 w-full px-4 text-center select-none">
            <div
              className={`
                ${orbitron.className}
                text-white/90
                text-2xl sm:text-4xl md:text-5xl lg:text-6xl
               
                font-light
              `}
              style={{ textShadow: "0 0 14px rgba(0,255,255,0.22)" }}
            >
              <p
                className={`
                ${orbitron.className}
                text-white/90
                text-2xl sm:text-2xl md:text-3xl lg:text-4xl
                font-light
              `}
              >
                {/* <HyperText text="CC × ENIGMA" className="" flame={true} /> */}
                CC &times; ENIGMA
              </p>
            </div>

            <div className="mt-[-1]">
              <GlitchText
                text="PRESENTS"
                className={`
                  ${orbitron.className}
                  text-white/50
                  text-xl sm:text-lg md:text-2xl
                  font-light
                `}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <div className="mt-2 flex justify-center">
                <div className="animate-[float_6s_ease-in-out_infinite]">
                  <GlitchImage
                    src="/MainText.svg"
                    alt="TESSERACT main title"
                    width={800}
                    height={200}
                    className="max-w-full h-auto drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute top-[50%] sm:top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          w-[85%] max-w-[320px] aspect-square 
                          sm:w-full sm:max-w-[500px] 
                          md:max-w-[600px] lg:max-w-[700px] 
                          z-10 pointer-events-none"
          >
            <div className="w-full h-full pointer-events-none">
              <TesseractViewer />
            </div>
          </div>

          <div className="absolute inset-x-4 sm:left-6 sm:right-6 bottom-8 md:left-24 md:right-24 md:bottom-20 flex flex-col md:flex-row gap-8 justify-between items-center md:items-end">
            <div className="space-y-2 sm:space-y-3 text-center md:text-left">
              <FadeIn delay={0.2}>
                <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light uppercase tracking-[0.18em] text-white">
                  1 February, 2026
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-base sm:text-xl md:text-3xl lg:text-4xl font-light uppercase tracking-[0.22em] text-white">
                  Sunday
                </p>
              </FadeIn>

              <p className="text-base sm:text-xl md:text-3xl lg:text-4xl font-light uppercase tracking-[0.2em] text-white">
                2:00 - 5:00 PM IST
              </p>
            </div>

            <div className="w-full md:w-auto flex justify-center md:justify-end">
              <div className="transition-all duration-500 ease-out hover:drop-shadow-[0_0_35px_rgba(0,255,255,0.6)] hover:scale-105">
                <Main_button text={user ? "PROFILE.EXE" : "REGISTER.EXE"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-20" />

      <div className="px-8 py-10 flex justify-center">
        <FadeIn className="w-full flex justify-center">
          <CountdownTimer />
        </FadeIn>
      </div>

      <div className="px-8 py-20 flex justify-center mt-6">
        <FadeIn className="w-full flex justify-center">
          <Flowchart />
        </FadeIn>
      </div>

      <FadeIn>
        <Bounty_board />
      </FadeIn>

      <div className="mt-40">
        <FadeIn>
          <Crack_the_box />
        </FadeIn>
      </div>
    </div>
  );
}
