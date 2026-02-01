"use client";
import React, { useState, useEffect, useRef } from "react";
import NeonButton from "../components/neon-button";
import { useRouter } from "next/navigation";
import { getBlackBoxOutput } from "./_actions/getBlackBoxOutput";
import { createClient_client } from "@/utils/supabaseClient";
import {
  Terminal,
  ShieldCheck,
  Activity,
  ChevronRight,
  AlertTriangle,
  Zap,
  Clock,
  Wifi,
  Cpu,
  RefreshCw,
  Trophy,
} from 'lucide-react';

const START_TIME = new Date("2026-02-01T14:00:00").getTime();
const END_TIME = new Date("2026-02-01T17:00:00").getTime();

interface Log {
  type: 'sys' | 'in' | 'out' | 'info' | 'error';
  msg: string;
  time?: string;
}

export interface Module {
  id: string;
  name: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | null;
  status: "ACTIVE" | "SOLVED";
  objective: string;
  constraints: Record<string, string>;
  intel: string;
  cf_link?: string;
  author?: string;
}

interface SandboxClientProps {
  initialModules: Module[];
  initialUserId?: string;
}

function SandboxClient({ initialModules, initialUserId = "LOADING..." }: SandboxClientProps) {
  const [activeModule, setActiveModule] = useState(initialModules[0]?.id || "1");
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [sysTime, setSysTime] = useState("00:00:00");
  const [isOnline, setIsOnline] = useState(true);
  const [userId, setUserId] = useState(initialUserId);
  const [inputText, setInputText] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState<Log[]>([
    { type: 'sys', msg: 'System initialized!' },
    { type: 'sys', msg: 'Awaiting inputs...' }
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchQuestionsStatus = async () => {
    const supabase = createClient_client();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("questions_status")
        .eq("id", session.user.id)
        .single();

      if (profile?.questions_status) {
        setModules((prev) =>
          prev.map((m) => ({
            ...m,
            status: (profile.questions_status as any)[m.id] || m.status,
          }))
        );
      }
    }
  };

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const checkUser = async () => {
      if (initialUserId !== "LOADING..." && initialUserId !== "GUEST_USER") {
           return;
      }

      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
      };

      let cookieUser = getCookie("codeforces_id");

      if (!cookieUser) {
        const supabase = createClient_client();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("codeforces_id, name, institute")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            document.cookie = `name=${profile.name}; path=/; max-age=31536000`;
            document.cookie = `institute=${profile.institute}; path=/; max-age=31536000`;
            document.cookie = `codeforces_id=${profile.codeforces_id}; path=/; max-age=31536000`;
            cookieUser = profile.codeforces_id;
            setUserId(cookieUser || "GUEST_USER");
          }
        }
      } else {
         setUserId(cookieUser);
      }
    };

    checkUser();

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
  }, [initialUserId]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg: string, type: 'sys' | 'in' | 'out' | 'info' | 'error' = 'info') => {
    setLogs(prev => [...prev, { type, msg, time: new Date().toLocaleTimeString().split(' ')[0] }]);
  };

  const handleExecute = async () => {
    if (!inputText) return;
    setIsExecuting(true);
    addLog(`${inputText}`, 'in');

    try {
      const result = await getBlackBoxOutput(inputText, activeModule);
      if (result.error) {
        addLog(`ERR: ${result.error}`, 'error');
      } else {
        const output: any = result.output?.output;
        if (Array.isArray(output)) {
          output.forEach((o: any) => addLog(`${o}`, 'out'));
        } else {
          addLog(`${output}`, 'out');
        }
      }
    } catch (error) {
      addLog('ERR: SYSTEM FAILURE', 'error');
    }

    setIsExecuting(false);
    setInputText('');
  };

  const activeModuleData = modules.find(m => m.id === activeModule) || modules[0];

  return (
    <div className="flex flex-col h-screen w-full pt-10 md:pt-20 bg-black items-center justify-center px-4 pb-4 md:px-8 md:pb-8 font-code text-cyan-400 selection:bg-cyan-900 selection:text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <div className="relative w-full h-full max-w-[1600px] border-2 border-cyan-400/80 bg-black/80 flex flex-col shadow-[0_0_50px_rgba(8,145,178,0.15)] overflow-hidden">

        <header className="shrink-0 border-b-2 border-cyan-400/80 bg-cyan-950/20 p-4 md:px-8 flex justify-between items-center text-sm uppercase tracking-widest z-10">
          <div className="flex items-center gap-8">
            <span className="text-orange-500 font-orbitron font-bold text-2xl tracking-tighter flex items-center gap-3">
              <Activity size={24} /> SANDBOX
            </span>
            <div className="hidden md:flex opacity-90 gap-8 border-l border-cyan-400/80 pl-8">
              <div className="flex flex-col">
                <span className="text-md text-cyan-400">SYS_TIME</span>
                <span className="text-orange-400 font-bold flex items-center gap-2 text-sm">
                  <Clock size={14} /> {sysTime}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-md text-cyan-400">NETWORK</span>
                <span className={`font-bold flex items-center gap-2 text-sm ${isOnline ? "text-green-400" : "text-red-500"}`}>
                  <Wifi size={14} /> {isOnline ? "ONLINE" : "OFFLINE"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-md text-cyan-400">USER</span>
                <span className="text-orange-400 font-bold flex items-center gap-2 text-sm">
                  <Terminal size={14} /> {userId}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-md text-cyan-400">Evaluation Engine</span>
                <span className="text-green-400 font-bold flex items-center gap-2 text-sm">
                  <Cpu size={14} /> CodeForces
                </span>
              </div>

            </div>
          </div>
          <div className="flex gap-4">
            <NeonButton
              onClick={fetchQuestionsStatus}
              borderColor="#22d3ee"
              textColor="#22d3ee"
              height={45}
              width="100px"
              size="sm"
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest">
                <RefreshCw size={16} />
                SYNC
              </div>
            </NeonButton>
            <NeonButton
              onClick={() => window.open('/leaderboard', '_blank')}
              borderColor="#f97316"
              textColor="#f97316"
              height={45}
              width="140px"
              size="sm"
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest">
                <Trophy size={16} />
                RANKINGS
              </div>
            </NeonButton>
          </div>
        </header>

        <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-6 p-2 bg-gray-900/30 relative z-10">
          <section className="col-span-12 md:col-span-3 flex flex-col border border-cyan-500/50 bg-black/60 overflow-hidden h-full font-code">
            <div className="p-3 border-b border-cyan-500/50 bg-cyan-950/20 flex items-center justify-between shrink-0">
              <span className="text-sm font-bold tracking-widest flex items-center gap-2 text-cyan-100">
                <Terminal size={16} className="text-cyan-500" /> MODULE_SELECTOR
              </span>
              <span className="text-sm font-mono text-cyan-400 font-bold">{modules.length} ACTIVE</span>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto space-y-1 pr-1 cyber-scrollbar p-1">
              {modules.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-cyan-400/60 p-4">
                  <Terminal size={32} className="mb-2 opacity-50" />
                  <span className="text-sm">NO MODULES AVAILABLE</span>
                </div>
              ) : (
                modules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModule(m.id)}
                    className={`w-full group relative text-left p-3 border transition-all duration-200 ${activeModule === m.id
                      ? 'bg-cyan-950/40 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                      : 'bg-black border-cyan-900/30 hover:border-cyan-500 hover:bg-cyan-950/10'
                      }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-base font-bold ${activeModule === m.id ? 'text-white' : 'text-cyan-400'}`}>
                        {m.name}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${activeModule === m.id ? 'bg-orange-500 animate-pulse' : 'bg-cyan-800'}`} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-60">{m.id}</span>
                      <div className="flex gap-2">
                        {m.status === 'SOLVED' && (
                          <span className="text-sm px-1 border border-green-900 text-green-500 bg-green-950/30 font-bold tracking-wider">
                            SOLVED
                          </span>
                        )}
                        {m.difficulty && (
                          <span className={`text-sm px-1 border ${m.difficulty === 'HARD' ? 'border-red-900 text-red-500' : m.difficulty === 'MEDIUM' ? 'border-yellow-900 text-yellow-500' : 'border-cyan-900 text-cyan-400'}`}>
                            {m.difficulty}
                          </span>
                        )}
                      </div>
                    </div>
                    {activeModule === m.id && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-orange-500" />
                    )}
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="col-span-12 md:col-span-5 flex flex-col border border-cyan-500/50 bg-black/60 overflow-hidden h-full relative font-code">
            <div className="p-3 border-b border-cyan-500/50 bg-cyan-950/20 flex items-center gap-2 shrink-0">
              <ShieldCheck size={16} className="text-orange-500" />
              <span className="text-sm font-bold tracking-widest text-cyan-100">MISSION_PROTOCOL</span>
            </div>

            <div data-lenis-prevent className="flex-1 space-y-6 overflow-y-auto cyber-scrollbar p-4 min-h-0 font-code">
              {activeModuleData ? (
                <>
                  <div>
                    <h3 className="text-orange-500 text-sm font-bold mb-1 uppercase tracking-wider font-code">Objective</h3>
                    <p className="text-base text-cyan-100 leading-relaxed font-light whitespace-pre-wrap">
                      {activeModuleData.objective.replace(/\\n/g, '\n')}
                    </p>
                  </div>

                  <div className="bg-cyan-950/30 p-3 border border-cyan-500/50">
                    <h3 className="text-red-500 text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle size={14} /> Constraints
                    </h3>
                    <ul className="text-sm space-y-2 text-cyan-300/80">
                      {Object.entries(activeModuleData.constraints || {}).map(([key, value]) => (
                        <li key={key} className="flex items-start gap-2">
                          <span className="flex items-center gap-2 shrink-0">
                            <ChevronRight size={14} className="mt-[3px] text-cyan-400" />
                            <span className="whitespace-nowrap font-bold text-cyan-500">{key}:</span>
                          </span>
                          <span className="text-white whitespace-pre-wrap">{value.replace(/\\n/g, '\n')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-cyan-500 text-sm font-bold mb-1 uppercase tracking-wider flex items-center gap-2">
                      <Zap size={14} /> Intel
                    </h3>
                    <p className="text-sm italic text-cyan-400/60 leading-relaxed whitespace-pre-wrap">
                      {activeModuleData.intel.replace(/\\n/g, '\n')}
                    </p>
                  </div>

                  {activeModuleData.author && (
                    <div className="bg-orange-950/20 p-3 border border-orange-500/30">
                      <h3 className="text-orange-500 text-sm font-bold mb-1 uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck size={14} /> Mission Handler
                      </h3>
                      <p className="text-sm text-orange-300 font-mono">
                        {activeModuleData.author}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-cyan-400/60">
                  <ShieldCheck size={32} className="mb-2 opacity-50" />
                  <span className="text-sm">SELECT A MODULE</span>
                </div>
              )}
            </div>

            <div className="mt-auto p-4 border-t border-cyan-500/50 shrink-0 bg-black/40">
              <label className="text-sm text-cyan-500 uppercase tracking-widest px-1 mb-2 block">Enter_Input_Parameter</label>
              <div className="flex gap-2 items-end">
                <div className="flex-1 bg-black border border-cyan-400/80 flex items-start px-3 py-2 focus-within:border-orange-500 transition-colors min-h-[45px]">
                  <span className="text-cyan-400 mr-2 opacity-50 font-bold mt-[2px]">&gt;</span>
                  <textarea
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleExecute();
                      }
                    }}
                    placeholder="INPUT_VALUE"
                    className="bg-transparent border-none outline-none w-full text-white text-lg tracking-widest font-code resize-none overflow-y-auto cyber-scrollbar"
                    rows={1}
                    style={{ maxHeight: '150px' }}
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
            <div className="p-3 border-b border-cyan-500/50 bg-cyan-950/20 flex items-center justify-between shrink-0">
              <span className="text-sm font-bold tracking-widest flex items-center gap-2 text-cyan-100">
                <Activity size={16} className="text-green-500" /> I/O_STREAM_LOG
              </span>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto p-4 font-code text-sm space-y-1 cyber-scrollbar min-h-0">
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-3 leading-relaxed border-l-2 pl-2 ${log.type === 'in' ? 'border-cyan-500/50 bg-cyan-950/10 py-1' :
                  log.type === 'out' ? 'border-orange-500/50 bg-orange-950/10 py-1' :
                    log.type === 'error' ? 'border-red-500/50 bg-red-950/10 py-1' :
                      'border-transparent'
                  }`}>
                  <span className="opacity-70 whitespace-nowrap text-cyan-500">[{log.time || '--:--:--'}]</span>
                  <div className="flex-1 break-all">
                    <span className={`font-bold mr-2 ${log.type === 'in' ? 'text-cyan-400' :
                      log.type === 'out' ? 'text-orange-400' :
                        log.type === 'error' ? 'text-red-500' :
                          'text-cyan-500'
                      }`}>
                      {log.type === 'in' ? 'IN  >>' : log.type === 'out' ? 'OUT <<' : log.type === 'error' ? 'ERR !!' : 'SYS ::'}
                    </span>
                    <span className={`whitespace-pre-wrap ${log.type === 'out' ? 'text-orange-200' :
                      log.type === 'error' ? 'text-red-400' :
                        'text-cyan-100'
                      }`}>
                      {log.msg}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            <div className="p-4 border-t  border-cyan-400/50 bg-cyan-800/10 flex justify-center shrink-0">
              <NeonButton
                text="SUBMIT_CODE"
                onClick={() => {
                   if (activeModuleData?.cf_link) {
                       window.open(activeModuleData.cf_link, '_blank');
                   }
                }}
                borderColor="#f97316"
                textColor="#f97316"
                height={50}
                width="160px"
              />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default SandboxClient;
