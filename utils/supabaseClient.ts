import { createBrowserClient } from '@supabase/ssr'

export function createClient_client() { // not a async function , not returning a promise so no need to use await on the function call
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}