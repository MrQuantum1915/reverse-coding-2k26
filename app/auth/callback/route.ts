import { NextResponse, NextRequest } from "next/server";
import { createClient_server } from "@/utils/supabaseServer";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/error`);
  }

  const supabase = await createClient_server();

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/auth/error`);
  }

  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from("profiles")
      .select("username")
      .eq("user_id", user.id)
      .single();
    // no redirect here
  }

  return NextResponse.redirect(`${origin}/login`);
}
