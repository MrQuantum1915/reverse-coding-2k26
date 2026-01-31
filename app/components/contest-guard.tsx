"use client";

import { useState, useEffect } from "react";
import { Orbitron } from "next/font/google";
import NeonButton from "./neon-button";
import { useRouter } from "next/navigation";
import {
  Clock,
  Shield,
  AlertTriangle,
  Trophy,
  Terminal,
} from "lucide-react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export type ContestState = "UPCOMING" | "LIVE" | "ENDED" | "MAINTENANCE";

interface ContestGuardProps {
  status: ContestState;
  startTime: string | null;
  endTime: string | null;
  isPrivileged: boolean;
  children: React.ReactNode;
  showPracticeMode?: boolean; // Show children with practice banner during UPCOMING
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownDisplay({ targetTime, label }: { targetTime: string; label: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(targetTime).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // trigger page reload at zero
        window.location.reload();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-white uppercase text-2xl sm:text-3xl md:text-4xl tracking-wider mb-6 font-normal text-center">
        {label}
      </div>

      <div className="flex gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center">
        {[
          { value: timeLeft.days, label: "DAYS", color: "text-purple-500" },
          { value: timeLeft.hours, label: "HRS", color: "text-cyan-400" },
          { value: timeLeft.minutes, label: "MIN", color: "text-cyan-400" },
          { value: timeLeft.seconds, label: "SEC", color: "text-purple-500" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border border-white/20 rounded-2xl bg-black/40 backdrop-blur-sm"
          >
            <div
              className={`${item.color} text-2xl sm:text-3xl md:text-4xl font-bold leading-none mb-1 sm:mb-2`}
            >
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-gray-400 text-[10px] sm:text-xs font-light uppercase tracking-widest">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingScreen({ startTime }: { startTime: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-full bg-black items-center justify-center px-4 font-code text-cyan-400">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
        <div className="p-4 border border-cyan-500/50 bg-cyan-950/10 rounded-lg">
          <Clock size={48} className="text-cyan-400" />
        </div>

        <h1
          className={`${orbitron.className} text-3xl md:text-4xl font-black text-cyan-400 tracking-wider text-center`}
        >
          SYSTEM BREACH PENDING
        </h1>

        <CountdownDisplay targetTime={startTime} label="ACCESS GRANTED IN:" />

        <div className="border-t border-cyan-400/30 pt-6 mt-4 text-center">
          <p className="text-gray-400 text-sm md:text-base max-w-md">
            The black boxes are being compiled. The logic is being obfuscated.
            Prepare your environment.
          </p>
        </div>

        <NeonButton onClick={() => router.push("/rules")}>
          <Terminal className="mr-2" size={18} />
          VIEW RULES
        </NeonButton>
      </div>
    </div>
  );
}

function EndedScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-full bg-black items-center justify-center px-4 font-code text-cyan-400">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-950/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
        <div className="p-4 border border-orange-500/50 bg-orange-950/10 rounded-lg">
          <Trophy size={48} className="text-orange-400" />
        </div>

        <h1
          className={`${orbitron.className} text-3xl md:text-4xl font-black text-orange-400 tracking-wider text-center`}
        >
          CONTEST CONCLUDED
        </h1>

        <p className="text-gray-400 text-center text-sm md:text-base max-w-md">
          The system breach has been neutralized. Check the leaderboard to see
          the final standings.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <NeonButton onClick={() => router.push("/leaderboard")}>
            <Trophy className="mr-2" size={18} />
            VIEW LEADERBOARD
          </NeonButton>
        </div>
      </div>
    </div>
  );
}

function MaintenanceScreen() {
  return (
    <div className="flex flex-col h-screen w-full bg-black items-center justify-center px-4 font-code text-cyan-400">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-950/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
        <div className="p-4 border border-yellow-500/50 bg-yellow-950/10 rounded-lg animate-pulse">
          <AlertTriangle size={48} className="text-yellow-400" />
        </div>

        <h1
          className={`${orbitron.className} text-3xl md:text-4xl font-black text-yellow-400 tracking-wider text-center`}
        >
          SYSTEM MAINTENANCE
        </h1>

        <p className="text-gray-400 text-center text-sm md:text-base max-w-md">
          The system is currently undergoing maintenance. Please check back
          shortly.
        </p>

        <div className="flex items-center gap-2 text-yellow-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span>Maintenance in progress...</span>
        </div>
      </div>
    </div>
  );
}

function AdminBanner({ status }: { status: ContestState }) {
  const statusColors = {
    UPCOMING: "bg-blue-500/20 border-blue-500 text-blue-400",
    LIVE: "bg-green-500/20 border-green-500 text-green-400",
    ENDED: "bg-orange-500/20 border-orange-500 text-orange-400",
    MAINTENANCE: "bg-yellow-500/20 border-yellow-500 text-yellow-400",
  };

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-50 px-4 py-2 border-b ${statusColors[status]} backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-code">
        <Shield size={16} />
        <span className="uppercase tracking-wider">
          Admin View • Contest Status: <strong>{status}</strong>
        </span>
      </div>
    </div>
  );
}

function PracticeBanner({ startTime }: { startTime: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(startTime).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        window.location.reload();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = () => {
    const parts = [];
    if (timeLeft.days > 0) parts.push(`${timeLeft.days}d`);
    if (timeLeft.hours > 0 || timeLeft.days > 0) parts.push(`${timeLeft.hours}h`);
    parts.push(`${timeLeft.minutes}m`);
    parts.push(`${timeLeft.seconds}s`);
    return parts.join(' ');
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-50 px-4 py-2 border-b bg-purple-500/20 border-purple-500 text-purple-400 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-code">
        <Terminal size={16} />
        <span className="uppercase tracking-wider">
          Practice Mode • Contest starts in: <strong className="text-cyan-400">{formatTime()}</strong>
        </span>
      </div>
    </div>
  );
}

function EndedBanner() {
  const router = useRouter();
  
  return (
    <div className="fixed top-16 left-0 right-0 z-50 px-4 py-2 border-b bg-orange-500/20 border-orange-500 text-orange-400 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm font-code">
        <div className="flex items-center gap-3">
          <Trophy size={16} />
          <span className="uppercase tracking-wider">
            Contest Ended • Problems available for review
          </span>
        </div>
        <button 
          onClick={() => router.push('/leaderboard')}
          className="flex items-center gap-2 px-3 py-1 border border-orange-500/50 hover:bg-orange-500/20 transition-colors rounded"
        >
          <Trophy size={14} />
          <span>Leaderboard</span>
        </button>
      </div>
    </div>
  );
}

export default function ContestGuard({
  status,
  startTime,
  endTime,
  isPrivileged,
  children,
  showPracticeMode = true,
}: ContestGuardProps) {
  // if privileged user show content with admin banner
  if (isPrivileged) {
    return (
      <>
        <AdminBanner status={status} />
        <div className={status !== "LIVE" ? "pt-10" : ""}>{children}</div>
      </>
    );
  }

  // regular users see state-appropriate screens
  switch (status) {
    case "UPCOMING":
      if (!startTime) {
        return <MaintenanceScreen />;
      }
      // show practice mode with countdown banner
      if (showPracticeMode) {
        return (
          <>
            <PracticeBanner startTime={startTime} />
            <div className="pt-10">{children}</div>
          </>
        );
      }
      return <UpcomingScreen startTime={startTime} />;

    case "ENDED":
      // show all problems with ended banner for review
      return (
        <>
          <EndedBanner />
          <div className="pt-10">{children}</div>
        </>
      );

    case "MAINTENANCE":
      return <MaintenanceScreen />;

    case "LIVE":
    default:
      return <>{children}</>;
  }
}
