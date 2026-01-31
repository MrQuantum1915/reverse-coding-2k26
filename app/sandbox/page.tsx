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
    <Suspense fallback={<SandboxLoading />}>
      <SandboxContent />
    </Suspense>
  );
}
