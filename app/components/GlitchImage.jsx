"use client";
import Image from "next/image";

export default function GlitchImage({ src, alt, width, height, className = "" }) {
  return (
    <div className={`glitch-image-wrapper ${className}`}>

      <div className="relative z-10 base-img">
        <Image src={src} alt={alt} width={width} height={height} priority />
      </div>

      <div className="glitch-layer layer-1">
        <Image src={src} alt={alt} width={width} height={height} />
      </div>

      <style jsx>{`
        .glitch-image-wrapper {
          position: relative;
          display: inline-block;
          overflow: hidden;
        }

        .base-img {
          position: relative;
          z-index: 10;
        }

        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 20;
          background: transparent;
        }

        .layer-1 {
          animation: glitch-1 1s infinite linear;
        }

        @keyframes glitch-1 {
          0% { clip-path: inset(0 0 30% 0); transform: translate(-15px, 0); opacity: 1; }
          20% { clip-path: inset(70% 0 100% 0); transform: translate(15px, 0); opacity: 1; }
        }
     `}</style>
    </div>
  );
}