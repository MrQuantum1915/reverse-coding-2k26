import Image from "next/image";
import CountdownTimer from "./components/countdown-timer";
import Button from "./components/neon-button";
import { Orbitron } from "next/font/google";
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <>
      <div className="relative text-white min-h-screen">
        <Image
          src="/tesseract-bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover object-center -z-20 opacity-30"
        />
        <div className="absolute inset-0 bg-black -z-10 animate-overlay-fade" />

        {/* CC x ENIGMA PRESENTS */}
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 text-center select-none">
         <p
  className={`
    ${orbitron.className}
    text-white/90
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    tracking-[0.35em]
    font-light
  `}
  style={{ textShadow: "0 0 14px rgba(0,255,255,0.22)" }}
>
  CC × ENIGMA
</p>

<p
  className={`
    ${orbitron.className}
    text-white/60
    text-sm sm:text-base md:text-lg
    tracking-[0.45em]
    mt-2
    font-light
  `}
  style={{ textShadow: "0 0 10px rgba(0,255,255,0.14)" }}
>
  PRESENTS
</p>

        <div className="mt-6 flex justify-center">
          <Image
            src="/MainText.svg"
            alt="TESSERACT main title"
            width={800}
            height={200}
            priority
            className="max-w-full h-auto"
          />
        </div>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-4 sm:left-6 sm:right-6 bottom-8 md:left-24 md:right-24 md:bottom-20 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-start md:items-end w-auto">
          <div className="text-left leading-tight">
            <p className="text-lg sm:text-xl md:text-4xl font-semibold tracking-[0.2em] uppercase">
              18th , January, 2026
            </p>
            <p className="text-lg sm:text-xl md:text-4xl font-semibold tracking-[0.2em] uppercase mt-1 md:mt-2">
              SUNDAY
            </p>
            <p className="text-lg sm:text-xl md:text-4xl font-semibold tracking-[0.2em] uppercase mt-1 md:mt-2">
              21:00 - 23:00
            </p>
          </div>

          {/* Register Button */}
<div
  className="
    self-start md:self-auto md:mr-20 md:mb-7
    transition-all duration-500 ease-out
    hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.9)]
    hover:drop-shadow-[0_0_22px_rgba(0,255,255,0.65)]
    hover:drop-shadow-[0_0_36px_rgba(0,255,255,0.45)]
  "
>
  <Button
    text="Register.exe"
    fillColor="#003035"
    width={290}
    height={100}
    size="lg"
  />
</div>
        </div>
      </div>

      <div className="bg-black px-8 py-6 flex justify-center">
        <CountdownTimer />
      </div>

      <div className="bg-black px-8 py-6 flex justify-center mt-6">
        {/* <Flowchart /> */}
      </div>
    </>
  );
}
