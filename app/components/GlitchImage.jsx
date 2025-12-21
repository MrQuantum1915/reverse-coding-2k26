"use client";
import Image from "next/image";

export default function GlitchImage({ src, alt, width, height, className = "" }) {
  return (
    <div className={`glitch-image-wrapper ${className}`}>
      
      <div className="relative z-10 base-img">
        <Image src={src} alt={alt} width={width} height={height} priority />
      </div>

      <div className="glitch-layer cyan">
        <Image src={src} alt={alt} width={width} height={height} />
      </div>

      <div className="glitch-layer magenta">
        <Image src={src} alt={alt} width={width} height={height} />
      </div>

      <style jsx>{`
        .glitch-image-wrapper {
          position: relative;
          display: inline-block;
          overflow: hidden;
        }

        .base-img {
          /* Very subtle shake, mostly stable */
          animation: subtle-shake 2.5s infinite;
        }

        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 20;
          mix-blend-mode: hard-light;
          background: transparent;
        }

        .cyan {
          filter: drop-shadow(3px 0 0px #00ffff) hue-rotate(90deg) contrast(1.2);
          /* 0.6s total loop = 0.4s glitch + 0.2s pause */
          animation: glitch-cyan 0.6s infinite linear; 
        }

        .magenta {
          filter: drop-shadow(-3px 0 0px #ff00ff) hue-rotate(-90deg) contrast(1.2);
          /* Slightly offset timing for chaos */
          animation: glitch-magenta 0.6s infinite linear 0.1s; 
        }

        /* KEYFRAME LOGIC:
           0% to 70% -> Glitch Activity
           70% to 100% -> The 0.2s Pause (Reset to normal)
        */

        @keyframes glitch-cyan {
          0% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 1px) skew(2deg); opacity: 0.7; }
          10% { clip-path: inset(10% 0 10% 0); transform: translate(3px, -1px) skew(-2deg); opacity: 0.8; }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-4px, 2px) skew(3deg); opacity: 0.5; }
          30% { clip-path: inset(40% 0 40% 0); transform: translate(4px, -2px) skew(-3deg); opacity: 0.9; }
          40% { clip-path: inset(0 0 60% 0); transform: translate(-3px, 0) skew(0deg); opacity: 0.6; }
          50% { clip-path: inset(50% 0 10% 0); transform: translate(3px, 3px) skew(5deg); opacity: 0.4; }
          60% { clip-path: inset(10% 0 85% 0); transform: translate(-2px, -2px) skew(-5deg); opacity: 0.8; }
          
          /* START PAUSE */
          70% { clip-path: inset(0 0 0 0); transform: translate(0, 0); opacity: 0; }
          100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); opacity: 0; }
        }

        @keyframes glitch-magenta {
          0% { clip-path: inset(10% 0 70% 0); transform: translate(3px, -2px) skew(-2deg); opacity: 0.8; }
          15% { clip-path: inset(85% 0 0 0); transform: translate(-4px, 3px) skew(2deg); opacity: 0.6; }
          30% { clip-path: inset(5% 0 80% 0); transform: translate(4px, 4px) skew(5deg); opacity: 0.9; }
          45% { clip-path: inset(40% 0 20% 0); transform: translate(-5px, -3px) skew(-5deg); opacity: 0.5; }
          60% { clip-path: inset(0 0 0 0); transform: translate(0, 0) skew(0); opacity: 0.2; }
          
          /* START PAUSE */
          75% { clip-path: inset(0 0 0 0); transform: translate(0, 0); opacity: 0; }
          100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); opacity: 0; }
        }

        @keyframes subtle-shake {
          0%, 100% { transform: translate(0,0); }
          5% { transform: translate(-1px, 0); }
          10% { transform: translate(1px, 0); }
          15% { transform: translate(0, 0); } /* Long pause for base image */
        }
      `}</style>
    </div>
  );
}