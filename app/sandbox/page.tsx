"use client";
import React, { useState, useEffect, useRef } from "react";
import NeonButton from "../components/neon-button";
import { useRouter } from "next/navigation";
import {
  Terminal,
  ShieldCheck,
  Activity,
  ChevronRight,
  AlertTriangle,
  Zap,
  Clock,
  Wifi
} from 'lucide-react';

const START_TIME = new Date("2026-02-01T14:00:00").getTime();
const END_TIME = new Date("2026-02-01T17:00:00").getTime();

interface Log {
  type: 'sys' | 'in' | 'out' | 'info';
  msg: string;
  time?: string;
}

function Page() {
  const [activeModule, setActiveModule] = useState("box1");
  const [sysTime, setSysTime] = useState("00:00:00");
  const [isOnline, setIsOnline] = useState(true);
  const [userId, setUserId] = useState("LOADING...");
  const [inputText, setInputText] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState<Log[]>([
    { type: 'sys', msg: 'System initialized. All modules green.' },
    { type: 'sys', msg: 'Awaiting mission protocol selection...' }
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };
    const cookieUser = getCookie("codeforces_id") || "GUEST_USER";
    setUserId(cookieUser);

    // SYS_TIME
    const timerInterval = setInterval(() => {
      const now = Date.now();

      if (now < START_TIME) {
        setSysTime("03:00:00");
      } else if (now > END_TIME) {
        setSysTime("00:00:00");
      } else {
        const diff = END_TIME - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setSysTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg: string, type: 'sys' | 'in' | 'out' | 'info' = 'info') => {
    setLogs(prev => [...prev, { type, msg, time: new Date().toLocaleTimeString().split(' ')[0] }]);
  };

  const handleExecute = () => {
    if (!inputText) return;
    setIsExecuting(true);
    addLog(`${inputText}`, 'in');

    setTimeout(() => {
      const val = parseInt(inputText);
      let output = "ERR: UNKNOWN MODULE";

      if (activeModule === 'box1') {
        output = isNaN(val) ? "ERR: NAN" : String(val * val + 2 * val + 1);
      } else {
        output = isNaN(val) ? "ERR: NAN" : String(val * 2);
      }

      addLog(`${output}`, 'out');
      setIsExecuting(false);
      setInputText('');
    }, 600);
  };

  const modules = Array.from({ length: 15 }, (_, i) => ({
    id: `box${i + 1}`,
    name: `MODULE_${(i + 1).toString().padStart(2, '0')}`,
    difficulty: i < 2 ? "EASY" : i < 5 ? "MEDIUM" : "HARD",
    status: i === 0 ? 'SOLVED' : 'ACTIVE'
  }));

  return (
    <div className="flex flex-col h-screen w-full pt-10 md:pt-20 bg-black items-center justify-center px-4 pb-4 md:px-8 md:pb-8 font-mono text-cyan-400 selection:bg-cyan-900 selection:text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <div className="relative w-full h-full max-w-[1600px] border-1 border-cyan-600/80 bg-black/80 flex flex-col shadow-[0_0_50px_rgba(8,145,178,0.15)] overflow-hidden">

        <header className="shrink-0 border-b border-cyan-600/80 bg-cyan-950/20 p-4 md:px-8 flex justify-between items-center text-xs uppercase tracking-widest z-10">
          <div className="flex items-center gap-8">
            <span className="text-orange-500 font-bold text-2xl tracking-tighter flex items-center gap-3">
              <Activity size={24} /> SANDBOX
            </span>
            <div className="hidden md:flex gap-8 opacity-80 border-l border-cyan-600/80 pl-8">
              <div className="flex flex-col">
                <span className="text-xs text-cyan-600">SYS_TIME</span>
                <span className="text-cyan-300 font-bold flex items-center gap-2 text-sm">
                  <Clock size={14} /> {sysTime}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-cyan-600">NETWORK</span>
                <span className={`font-bold flex items-center gap-2 text-sm ${isOnline ? "text-green-500" : "text-red-500"}`}>
                  <Wifi size={14} /> {isOnline ? "ONLINE" : "OFFLINE"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-cyan-600">USER</span>
                <span className="text-white font-bold flex items-center gap-2 text-sm">
                  <Terminal size={14} /> {userId}
                </span>
              </div>
            </div>
          </div>
          <div>
            <NeonButton
              text="RANKINGS"
              onClick={() => router.push('/leaderboard')}
              borderColor="#f97316"
              textColor="#f97316"
              height="40px"
              width="140px"
              size="md"
            />
          </div>
        </header>

        <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-2 p-2 relative z-10">

          <section className="col-span-12 md:col-span-3 flex flex-col border border-cyan-500/50 bg-black/60 overflow-hidden h-full font-code">
            <div className="bg-cyan-950/20 border-b border-cyan-500/50 p-2 mb-1 flex items-center justify-between shrink-0">
              <span className="text-sm font-bold opacity-80 flex items-center gap-2 text-cyan-300">
                <Terminal size={14} /> MODULE_SELECTOR
              </span>
              <span className="text-[15px] text-cyan-700">{modules.length} ACTIVE</span>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto space-y-1 pr-1 cyber-scrollbar p-1">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`w-full group relative text-left p-3 border transition-all duration-200 ${activeModule === m.id
                      ? 'bg-cyan-950/40 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                      : 'bg-black border-cyan-900/30 hover:border-cyan-500 hover:bg-cyan-950/10'
                    }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-bold ${activeModule === m.id ? 'text-white' : 'text-cyan-400'}`}>
                      {m.name}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${activeModule === m.id ? 'bg-orange-500 animate-pulse' : 'bg-cyan-800'}`} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] opacity-60">{m.id}</span>
                    <div className="flex gap-2">
                      {m.status === 'SOLVED' && (
                        <span className="text-[10px] px-1 border border-green-900 text-green-500 bg-green-950/30 font-bold tracking-wider">
                          SOLVED
                        </span>
                      )}
                      <span className={`text-[10px] px-1 border ${m.difficulty === 'HARD' ? 'border-red-900 text-red-500' : m.difficulty === 'MEDIUM' ? 'border-yellow-900 text-yellow-500' : 'border-cyan-900 text-cyan-600'}`}>
                        {m.difficulty}
                      </span>
                    </div>
                  </div>
                  {activeModule === m.id && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-orange-500" />
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="col-span-12 md:col-span-5 flex flex-col border border-cyan-500/50 bg-black/60 overflow-hidden h-full relative font-code">
            <div className="flex items-center gap-2 text-cyan-200 border-b border-cyan-500/50 pb-2 m-2 mb-0 shrink-0 bg-cyan-950/10 p-2">
              <ShieldCheck size={18} className="text-orange-500" />
              <h2 className="font-bold tracking-widest text-base">MISSION_PROTOCOL</h2>
            </div>

            <div data-lenis-prevent className="flex-1 space-y-6 overflow-y-auto cyber-scrollbar p-4 min-h-0 font-code">
              <div>
                <h3 className="text-orange-500 text-xs font-bold mb-1 uppercase tracking-wider font-code">Objective</h3>
                <p className="text-sm text-cyan-100 leading-relaxed font-light">
                  Probe the underlying system architecture to reverse-engineer the hidden polynomial function <span className="text-orange-300 font-bold">f(x)</span>. The target is currently in a reactive state. Analyze inputs and outputs to deduce the formula.
                </p>
              </div>

              <div className="bg-cyan-950/30 p-3 border border-cyan-500/50">
                <h3 className="text-red-500 text-xs font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle size={14} /> Constraints
                </h3>
                <ul className="text-xs space-y-2 text-cyan-300/80">
                  <li className="flex items-center gap-2"><ChevronRight size={10} /> Input Domain: <span className="text-white">[-1000, 1000]</span></li>
                  <li className="flex items-center gap-2"><ChevronRight size={10} /> Type: <span className="text-white">Integer Only</span></li>
                  <li className="flex items-center gap-2"><ChevronRight size={10} /> Time Limit: <span className="text-white">2000ms</span></li>
                </ul>
              </div>

              <div>
                <h3 className="text-cyan-500 text-xs font-bold mb-1 uppercase tracking-wider flex items-center gap-2">
                  <Zap size={14} /> Intel
                </h3>
                <p className="text-xs italic text-cyan-400/60 leading-relaxed">
                  The sequence appears to grow quadratically. Historical logs suggest a standard parabolic form. Watch for arithmetic overflow on high-range inputs.
                </p>
              </div>
            </div>

            <div className="mt-auto p-4 border-t border-cyan-500/50 shrink-0 bg-black/40">
              <label className="text-[10px] text-cyan-500 uppercase tracking-widest px-1 mb-2 block">Enter_Input_Parameter</label>
              <div className="flex gap-2 h-[45px]">
                <div className="flex-1 bg-black border border-cyan-600/80 flex items-center px-3 focus-within:border-orange-500 transition-colors">
                  <span className="text-cyan-600 mr-2 opacity-50 font-bold">&gt;</span>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleExecute()}
                    placeholder="INPUT_VALUE"
                    className="bg-transparent border-none outline-none w-full text-white text-lg tracking-widest font-code"
                    autoComplete="off"
                  />
                </div>
                <div className="w-[120px]">
                  <NeonButton
                    text={isExecuting ? "PROC..." : "EXECUTE"}
                    onClick={handleExecute}
                    borderColor="#f97316"
                    textColor="#f97316"
                    height={45}
                    fullWidth
                    size="sm"
                    disabled={isExecuting}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="col-span-12 md:col-span-4 flex flex-col border border-cyan-500/50 bg-black/60 overflow-hidden h-full font-code">
            <div className="p-3 border-b border-cyan-500/50 flex justify-between items-center bg-cyan-950/20 shrink-0">
              <span className="text-sm font-bold tracking-widest opacity-80 flex items-center gap-2 text-cyan-400">
                <Activity size={12} className="text-green-500" /> I/O_STREAM_LOG
              </span>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto p-4 font-code text-[11px] space-y-1 cyber-scrollbar min-h-0">
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-3 leading-relaxed border-l-2 pl-2 ${log.type === 'in' ? 'border-cyan-500/50 bg-cyan-950/10 py-1' :
                    log.type === 'out' ? 'border-orange-500/50 bg-orange-950/10 py-1' :
                      'border-transparent'
                  }`}>
                  <span className="opacity-70 whitespace-nowrap text-cyan-500">[{log.time || '--:--:--'}]</span>
                  <div className="flex-1 break-all">
                    <span className={`font-bold mr-2 ${log.type === 'in' ? 'text-cyan-400' :
                        log.type === 'out' ? 'text-orange-400' :
                          'text-cyan-500'
                      }`}>
                      {log.type === 'in' ? 'IN  >>' : log.type === 'out' ? 'OUT <<' : 'SYS ::'}
                    </span>
                    <span className={log.type === 'out' ? 'text-orange-200' : 'text-cyan-100'}>
                      {log.msg}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            <div className="p-4 border-t border-cyan-500/50 bg-cyan-950/10 flex justify-center shrink-0">
              <NeonButton
                text="SUBMIT FINAL"
                onClick={() => { }}
                borderColor="#22d3ee"
                textColor="#22d3ee"
                height={50}
                fullWidth
              />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Page;
