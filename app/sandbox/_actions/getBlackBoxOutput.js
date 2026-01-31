'use server';
import { createClient_server } from "@/utils/supabaseServer";
import { checkRateLimit } from "./checkRateLimit";
import { runBlackBox } from "./runBlackBox";
import { canAccessContest, getContestStatus } from "@/lib/contest-state";
import { createClient } from "@supabase/supabase-js";

export async function getBlackBoxOutput(input, problemId) {
    const supabase = await createClient_server();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.id) {
        return { error: "Unauthorized: Please Login" };
    }

    // check contest access (time-gating + role check)
    const accessResult = await canAccessContest();
    if (!accessResult.canAccess) {
        const messages = {
            MAINTENANCE: "System is under maintenance. Please try again later.",
        };
        return { error: messages[accessResult.reason] || "Access denied" };
    }

    // get current contest status to validate problem access
    const status = await getContestStatus();
    
    // verify the problem is accessible based on contest state
    const serviceClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { data: problem } = await serviceClient
        .from("problems")
        .select("visibility")
        .eq("id", problemId)
        .single();

    if (!problem) {
        return { error: "Problem not found" };
    }

    // validate access based on contest state and problem visibility
    const visibility = problem.visibility;
    
    if (!accessResult.isPrivileged) {
        if (status === "UPCOMING" && visibility !== "PRACTICE") {
            return { error: "This problem is not available for practice. Contest has not started yet." };
        }
        if (status === "LIVE" && visibility !== "ACTIVE") {
            return { error: "This problem is not part of the active contest." };
        }
        if (status === "ENDED" && !['ACTIVE', 'PRACTICE'].includes(visibility)) {
            return { error: "This problem is not available." };
        }
    }

    // rate limiting
    const allowed = await checkRateLimit(session.user.id);
    if (!allowed) {
        return { error: "Rate limit exceeded. Please try again later." };
    }

    // execute black box
    const output = await runBlackBox(input, problemId);
    return { output };
}
