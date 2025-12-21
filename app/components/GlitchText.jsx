"use client";

export default function GlitchText({ text, className = "" }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="glitch-text relative inline-block text-white/80" data-text={text}>
        {text}
      </span>

      <style jsx>{`
        .glitch-text {
          position: relative;
        }

        /* Create the two glitch layers */
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000; /* Hides the original text behind the shift */
        }

        /* 1. THE CYAN LAYER (Top Half Glitch) */
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 #00ffff;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
        }

        /* 2. THE MAGENTA LAYER (Bottom Half Glitch) */
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 #ff00ff;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }

        /* HARD, ROBOTIC KEYFRAMES */
        @keyframes glitch-anim-1 {
          0% { clip: rect(70px, 9999px, 94px, 0); transform: skew(0.5deg) translate(-2px); }
          5% { clip: rect(32px, 9999px, 36px, 0); transform: skew(0.2deg) translate(0); }
          10% { clip: rect(65px, 9999px, 35px, 0); transform: skew(0.1deg) translate(2px); }
          15% { clip: rect(98px, 9999px, 54px, 0); transform: skew(0.8deg) translate(-1px); }
          20% { clip: rect(15px, 9999px, 86px, 0); transform: skew(0.3deg) translate(1px); }
          25% { clip: rect(84px, 9999px, 4px, 0); transform: skew(0.6deg) translate(0); }
          30% { clip: rect(21px, 9999px, 18px, 0); transform: skew(0.9deg) translate(-2px); }
          35% { clip: rect(9px, 9999px, 90px, 0); transform: skew(0.2deg) translate(2px); }
          40% { clip: rect(50px, 9999px, 60px, 0); transform: skew(0.5deg) translate(-1px); }
          45% { clip: rect(35px, 9999px, 89px, 0); transform: skew(0.1deg) translate(1px); }
          50% { clip: rect(2px, 9999px, 10px, 0); transform: skew(0.8deg) translate(0); }
          55% { clip: rect(66px, 9999px, 45px, 0); transform: skew(0.4deg) translate(-2px); }
          60% { clip: rect(100px, 9999px, 110px, 0); transform: skew(0.7deg) translate(2px); }
          65% { clip: rect(40px, 9999px, 55px, 0); transform: skew(0.3deg) translate(0); }
          70% { clip: rect(88px, 9999px, 95px, 0); transform: skew(0.6deg) translate(-1px); }
          75% { clip: rect(12px, 9999px, 20px, 0); transform: skew(0.2deg) translate(1px); }
          80% { clip: rect(56px, 9999px, 62px, 0); transform: skew(0.9deg) translate(0); }
          85% { clip: rect(33px, 9999px, 40px, 0); transform: skew(0.5deg) translate(-2px); }
          90% { clip: rect(78px, 9999px, 85px, 0); transform: skew(0.1deg) translate(2px); }
          95% { clip: rect(10px, 9999px, 15px, 0); transform: skew(0.4deg) translate(0); }
          100% { clip: rect(44px, 9999px, 50px, 0); transform: skew(0.8deg) translate(-1px); }
        }

        @keyframes glitch-anim-2 {
          0% { clip: rect(12px, 9999px, 5px, 0); transform: skew(0.7deg) translate(2px); }
          5% { clip: rect(88px, 9999px, 100px, 0); transform: skew(0.3deg) translate(-2px); }
          10% { clip: rect(4px, 9999px, 15px, 0); transform: skew(0.9deg) translate(0); }
          15% { clip: rect(60px, 9999px, 75px, 0); transform: skew(0.2deg) translate(1px); }
          20% { clip: rect(23px, 9999px, 30px, 0); transform: skew(0.6deg) translate(-1px); }
          25% { clip: rect(95px, 9999px, 85px, 0); transform: skew(0.1deg) translate(0); }
          30% { clip: rect(45px, 9999px, 50px, 0); transform: skew(0.5deg) translate(2px); }
          35% { clip: rect(10px, 9999px, 20px, 0); transform: skew(0.8deg) translate(-2px); }
          40% { clip: rect(70px, 9999px, 80px, 0); transform: skew(0.4deg) translate(1px); }
          45% { clip: rect(30px, 9999px, 35px, 0); transform: skew(0.7deg) translate(-1px); }
          50% { clip: rect(55px, 9999px, 65px, 0); transform: skew(0.3deg) translate(0); }
          55% { clip: rect(8px, 9999px, 12px, 0); transform: skew(0.9deg) translate(2px); }
          60% { clip: rect(99px, 9999px, 105px, 0); transform: skew(0.2deg) translate(-2px); }
          65% { clip: rect(33px, 9999px, 44px, 0); transform: skew(0.6deg) translate(0); }
          70% { clip: rect(66px, 9999px, 72px, 0); transform: skew(0.1deg) translate(1px); }
          75% { clip: rect(18px, 9999px, 25px, 0); transform: skew(0.5deg) translate(-1px); }
          80% { clip: rect(82px, 9999px, 90px, 0); transform: skew(0.8deg) translate(0); }
          85% { clip: rect(40px, 9999px, 48px, 0); transform: skew(0.4deg) translate(2px); }
          90% { clip: rect(2px, 9999px, 8px, 0); transform: skew(0.7deg) translate(-2px); }
          95% { clip: rect(52px, 9999px, 58px, 0); transform: skew(0.3deg) translate(1px); }
          100% { clip: rect(75px, 9999px, 80px, 0); transform: skew(0.9deg) translate(0); }
        }
      `}</style>
    </div>
  );
}