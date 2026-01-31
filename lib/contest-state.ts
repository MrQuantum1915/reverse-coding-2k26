"use server";

import { createClient } from "@supabase/supabase-js";
import { createClient_server } from "@/utils/supabaseServer";
import { cache } from "react";

export type ContestState = "UPCOMING" | "LIVE" | "ENDED" | "MAINTENANCE";
export type UserRole = "participant" | "admin" | "tester";

export interface ContestConfig {
  id: number;
  start_time: string;
  end_time: string;
  is_maintenance_mode: boolean;
  registration_open: boolean;
}

export interface CurrentUser {
  id: string;
  email: string;
  role: UserRole;
  codeforces_id?: string;
  name?: string;
}


//  get contest config from db
//  use react cache for request deduplication

export const getContestConfig = cache(async (): Promise<ContestConfig | null> => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("contest_config")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching contest config:", error);
    return null;
  }

  return data as ContestConfig;
});


// calc curr contest state based on config and current time
// use cache again

export const getContestStatus = cache(async (): Promise<ContestState> => {
  const config = await getContestConfig();

  if (!config) {
    console.warn("Contest config missing, defaulting to UPCOMING");
    return "UPCOMING";
  }

  if (config.is_maintenance_mode) {
    return "MAINTENANCE";
  }

  const now = new Date();
  const start = new Date(config.start_time);
  const end = new Date(config.end_time);

  if (now < start) return "UPCOMING";
  if (now > end) return "ENDED";
  return "LIVE";
});


// get curr authenticated user with their role
// use react cache 

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  try {
    const supabase = await createClient_server();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return null;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("codeforces_id, name, role")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
    }

    return {
      id: session.user.id,
      email: session.user.email || "",
      role: (profile?.role as UserRole) || "participant",
      codeforces_id: profile?.codeforces_id,
      name: profile?.name,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
});

// check if current user has admin or tester privileges
export async function isAdminOrTester(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin" || user?.role === "tester";
}

// check if current user is admin
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}


// access check for contest resources
// true if user can access the contest

export async function canAccessContest(): Promise<{
  canAccess: boolean;
  reason: ContestState;
  isPrivileged: boolean;
}> {
  const [status, privileged] = await Promise.all([
    getContestStatus(),
    isAdminOrTester(),
  ]);

  // admins and testers can always access
  if (privileged) {
    return {
      canAccess: true,
      reason: status,
      isPrivileged: true,
    };
  }

  // Regular users access:
  // - UPCOMING: Can access (practice problems only)
  // - LIVE: Can access (contest problems)
  // - ENDED: Can access (all problems for review)
  // - MAINTENANCE: No access
  const canAccess = status !== "MAINTENANCE";
  
  return {
    canAccess,
    reason: status,
    isPrivileged: false,
  };
}

// get remaining time until contest starts or ends

export async function getContestTiming(): Promise<{
  status: ContestState;
  startTime: Date | null;
  endTime: Date | null;
  remainingMs: number;
}> {
  const config = await getContestConfig();
  const status = await getContestStatus();

  if (!config) {
    return {
      status,
      startTime: null,
      endTime: null,
      remainingMs: 0,
    };
  }

  const now = new Date();
  const start = new Date(config.start_time);
  const end = new Date(config.end_time);

  let remainingMs = 0;
  if (status === "UPCOMING") {
    remainingMs = start.getTime() - now.getTime();
  } else if (status === "LIVE") {
    remainingMs = end.getTime() - now.getTime();
  }

  return {
    status,
    startTime: start,
    endTime: end,
    remainingMs,
  };
}
