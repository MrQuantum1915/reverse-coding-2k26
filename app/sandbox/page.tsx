import { Suspense } from "react";
import { getProblems } from "./_actions/getProblems";
import { createClient_server } from "@/utils/supabaseServer";
import SandboxClient from "./sandbox-client";

async function SandboxContent() {
  // Fetch problems server-side using service role (bypasses RLS)
  const problems = await getProblems();

  // Get current user's codeforces_id if logged in
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

  return <SandboxClient initialModules={problems} initialUserId={initialUserId} />;
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
