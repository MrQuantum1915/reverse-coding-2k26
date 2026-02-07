import { ratelimit } from "@/lib/redis-ratelimit";

export async function checkRateLimit(userId) {
    
    const identifier = `blackbox_limit:${userId}`;

    try {
        const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

        if (!success) {
            console.warn(`[RateLimit] BLOCKED user ${userId}. Resets in ${reset - Date.now()}ms`);
            return false;
        }

        return true;
    } catch (error) {
        // return true on error to avoid blocking users due to Redis issue
        console.error("[RateLimit] Redis Error:", error);
        return true; 
    }
}