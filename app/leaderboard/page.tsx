"use client";

import { useState, useEffect } from "react";
import { getLeaderboard } from "./_actions/getLeaderboard";
import { useRouter } from "next/navigation";
import NeonButton from "../components/neon-button";
import { Orbitron } from "next/font/google";
import {
  Trophy,
  Activity,
  ArrowLeft,
  RefreshCw,
  Hash,
  User,
  School,
  Terminal,
} from 'lucide-react';

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type LeaderboardRow = {
  rank: number;
  name: string;
  cfHandle: string;
  institute: string;
  points: number;
  problemsSolved: number;
  penalty: number;
};

export default function Page() {
  const [data, setData] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Loading...");
  const router = useRouter();

  const fetchStandings = async () => {
    setLoading(true);
    try {
      const standings: LeaderboardRow[] = await getLeaderboard();
      setData(standings);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStandings();

    const intervalId = setInterval(() => {
      fetchStandings();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]";
      case 2:
        return "text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.5)]";
      case 3:
        return "text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]";
      default:
        return "text-cyan-400";
    }
  };

  return (
    <div className="mt-10 sm:mt-12 flex flex-col h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full bg-black font-code text-cyan-400 selection:bg-cyan-900 selection:text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />

      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto p-1 sm:p-2 md:p-4 h-full">

        <header className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 pb-2 sm:pb-4 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <div className="p-2 sm:p-3 border border-orange-500/50 bg-orange-950/10">
              <Trophy size={24} className="sm:w-8 sm:h-8 text-orange-500" />
            </div>
            <div>
              <h1 className={`${orbitron.className} text-base sm:text-lg md:text-xl lg:text-2xl font-black text-orange-400 tracking-wider`}>
                LEADERBOARD
              </h1>
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 mt-1 sm:mt-2 text-[10px] sm:text-xs lg:text-sm text-cyan-400 font-bold tracking-widest uppercase">
                <span className="flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400"></span>  
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
                  </span>
                  Live
                </span>
                <span className="text-cyan-800">|</span>
                <span className="flex items-center gap-1.5">
                  <Activity size={12} />
                  Updated: {lastUpdated}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-4">
            <NeonButton
              onClick={() => router.push('/sandbox')}
              borderColor="#f97316"
              textColor="#f97316"
              height={38}
              width="120px"
              size="sm"
            >
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold tracking-widest">
                <ArrowLeft size={14} />
                BACK
              </div>
            </NeonButton>
          </div>
        </header>

        <div className="flex-1 border border-cyan-400/50 bg-black/60 backdrop-blur-md  overflow-hidden flex flex-col shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-3 border-b border-cyan-400/50 bg-cyan-950/20 text-xs sm:text-sm font-bold tracking-widest text-cyan-100 uppercase sticky top-0 z-20">
            <div className="col-span-1 flex items-center gap-1 sm:gap-2"><Hash size={14} className="text-cyan-400" /> Rank</div>
            <div className="col-span-3 sm:col-span-4 flex items-center gap-1 sm:gap-2"><User size={14} className="text-cyan-400" /> Agent / Institute</div>
            <div className="col-span-2 hidden sm:col-span-2 sm:flex items-center gap-2 text-center justify-center"><Terminal size={14} className="text-cyan-400" /> Handle</div>
            <div className="col-span-2 text-center flex items-center justify-center gap-1 sm:gap-2"><Activity size={14} className="text-green-500" /> Solved</div>
            <div className="col-span-2 sm:col-span-3 text-right flex items-center justify-end gap-1 sm:gap-2"><Trophy size={14} className="text-orange-500" /> Points</div>
          </div>

          <div data-lenis-prevent className="overflow-y-auto cyber-scrollbar  flex-1 relative">
            {data.length === 0 && !loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan-400/50 gap-4">
                <Activity size={48} className="opacity- animate-pulse" />
                <span className="tracking-widest font-mono">NO DATA RETRIEVED</span>
              </div>
            ) : (
              <div className="divide-y divide-cyan-900/30">
                {data.map((row) => (
                  <div
                    key={row.cfHandle}
                    className={`grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-4 py-2 hover:bg-cyan-950/20 transition-colors items-center group relative overflow-hidden text-xs sm:text-base`}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="col-span-1 text-base sm:text-lg font-bold">
                      <span className={`${getRankStyle(row.rank)} font-orbitron`}>
                        #{row.rank}
                      </span>
                    </div>

                    <div className="col-span-3 sm:col-span-4 flex flex-col justify-center">
                      <span className="font-bold text-white group-hover:text-cyan-200 transition-colors truncate text-xs sm:text-base">
                        {row.name}
                      </span>
                      <span className="text-xs sm:text-md text-orange-400/60 truncate uppercase tracking-wider flex items-center gap-1">
                        {row.institute}
                      </span>
                    </div>

                    <div className="col-span-2 hidden sm:flex justify-center">
                      <a
                        href={`https://codeforces.com/profile/${row.cfHandle}`}
                        target="_blank"
                        className="font-mono text-xs sm:text-md text-cyan-300 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-900/50 hover:bg-cyan-900/40 hover:text-white transition-colors"
                      >
                        @{row.cfHandle}
                      </a>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="font-bold text-green-400 text-base sm:text-lg">
                        {row.problemsSolved}
                      </span>
                    </div>

                    <div className="col-span-2 sm:col-span-3 text-right font-mono">
                      <div className="flex flex-col items-end">
                        <span className="text-orange-400 font-bold text-base sm:text-lg leading-none">
                          {row.points}
                        </span>
                        <span className="text-xs sm:text-md font-semibold text-red-400/60 mt-1">
                          + {row.penalty} penalty
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {loading && data.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-30">
                <div className="flex flex-col items-center gap-4">
                  <RefreshCw size={32} className="text-cyan-400 animate-spin" />
                  <span className="text-cyan-400 tracking-widest text-sm animate-pulse">ESTABLISHING UPLINK...</span>
                </div>
              </div>
            )}

          </div>

          <div className="p-2 bg-cyan-950/30 border-t border-cyan-400/20 text-center text-md text-cyan-400 tracking-widest">
          </div>
        </div>
      </div>
    </div>
  );
}