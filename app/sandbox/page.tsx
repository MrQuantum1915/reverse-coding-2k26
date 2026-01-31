import { Suspense } from "react";
import { getProblems } from "./_actions/getProblems";
import { createClient_server } from "@/utils/supabaseServer";
import { canAccessContest, getContestConfig } from "@/lib/contest-state";
import SandboxClient from "./sandbox-client";
import ContestGuard from "../components/contest-guard";

async function SandboxContent() {
  // check contest access (handles time-gating and role checks)
  const [accessResult, config] = await Promise.all([
    canAccessContest(),
    getContestConfig(),
  ]);

  // fetch problems (will be filtered based on user role)
  const problems = await getProblems();

  // get current user's codeforces_id
  let initialUserId = "GUEST_USER";
  try {
    const supabase = await createClient_server();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("codeforces_id")
        .eq("id", session.user.id)
        .single();

      if (profile?.codeforces_id) {
        initialUserId = profile.codeforces_id;
      }
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  return (
    <ContestGuard
      status={accessResult.reason}
      startTime={config?.start_time || null}
      endTime={config?.end_time || null}
      isPrivileged={accessResult.isPrivileged}
    >
      <SandboxClient initialModules={problems} initialUserId={initialUserId} />
    </ContestGuard>
  );
}

function SandboxLoading() {
  return (
    <div className="flex h-screen w-full bg-black items-center justify-center">
      <div className="text-cyan-400 font-code text-xl animate-pulse">
        INITIALIZING SANDBOX...
      </div>
    </div>
  );
}

export default function SandboxPage() {
  return (
    <div>
      {/* hide sandbox on mobile */}
      <div className="md:hidden min-h-screen flex flex-col items-center justify-center bg-black font-code p-4">
        <div className="w-full max-w-md mx-auto border-2 border-cyan-400/80 bg-black/80 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.15)] p-6 flex flex-col items-center gap-4 relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black rounded-full border-2 border-cyan-400/80 p-3 shadow-lg">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 animate-pulse"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 tracking-widest mt-6 text-center drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">SANDBOX UNAVAILABLE</div>
          <div className="text-base sm:text-lg text-cyan-200 font-semibold text-center tracking-wide">The Sandbox is only accessible on a <span className="text-cyan-400">laptop</span> or <span className="text-cyan-400">desktop</span> device.</div>
          <div className="text-sm sm:text-md text-orange-300 text-center font-mono bg-orange-900/10 border border-orange-400/30 rounded px-3 py-2 mt-2 animate-pulse">Please open this website on a larger screen to use the <span className="font-bold text-orange-400">SANDBOX</span>.</div>
        </div>
      </div>
      
      {/* show on desktop */}
      <div className="hidden md:block">
        <Suspense fallback={<SandboxLoading />}>
          <SandboxContent />
        </Suspense>
      </div>
    </div>
  );
}
