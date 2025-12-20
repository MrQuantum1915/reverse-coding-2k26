export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../lib/supabaseServer";

export async function GET(request: Request) {
   console.log("CALLBACK URL:", request.url);
  const supabase = await createSupabaseServerClient();

  const {data,error}=await supabase.auth.exchangeCodeForSession(request.url);
console.log("EXCHANGE RESULT:", { data, error });
  return NextResponse.redirect(new URL("/", request.url));
}
