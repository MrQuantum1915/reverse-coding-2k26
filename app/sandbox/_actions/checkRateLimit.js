import { LRUCache } from "lru-cache";

// LRUcache<string, number>

const RateLimitCache = new LRUCache({
    max: 1000, // max 1000 users tracked in RAM
    ttl: 1000, // 1 sec - if user makes another request within 1 sec, block it
    ttlResolution: 1,
});
export async function checkRateLimit(userId) {
 
    if(RateLimitCache.has(userId)){
        return false;
    }
    else{
        RateLimitCache.set(userId, 1);
        return true;
    }
}