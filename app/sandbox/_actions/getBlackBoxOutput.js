'use server';
import { createClient_server } from "@/utils/supabaseServer";
import { checkRateLimit } from "./checkRateLimit";
import { runBlackBox } from "./runBlackBox";

export async function getBlackBoxOutput(input, problemId) {
    const supabase = await createClient_server();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.id) {
        return { error: "Unauthorized: Please Login" };
    }

    // rate limiting
    const allowed = await checkRateLimit(session.user.id);
    if (!allowed) {
        return { error: "Rate limit exceeded. Please try again later." };
    }

    // exe black box
    const output = await runBlackBox(input, problemId);
    return { output };
}
