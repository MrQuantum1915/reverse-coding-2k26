"use server";

import { createClient } from "@supabase/supabase-js";
import { createClient_server } from "@/utils/supabaseServer";
import { UserRole } from "@/lib/contest-state";


// admin utils for managing contest config and user roles
// only be call from admin-protected routes
 

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// verify if the current session user is an admin
// use this as a guard before any admin action

export async function verifyAdminAccess(): Promise<boolean> {
  const supabase = await createClient_server();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (!user || authError) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return profile?.role === "admin";
}

// Update contest configuration (start time, end time, maintenance mode)

export async function updateContestConfig(config: {
  start_time?: string;
  end_time?: string;
  is_maintenance_mode?: boolean;
  registration_open?: boolean;
}): Promise<{ success: boolean; error?: string }> {
  // verify admin access first
  const isAdmin = await verifyAdminAccess();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  const supabase = getServiceClient();

  const { error } = await supabase
    .from("contest_config")
    .update(config)
    .eq("id", 1);

  if (error) {
    console.error("Error updating contest config:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// set contest to maintenance mode
export async function toggleMaintenanceMode(
  enabled: boolean
): Promise<{ success: boolean; error?: string }> {
  return updateContestConfig({ is_maintenance_mode: enabled });
}

// update a user's role
export async function updateUserRole(
  userId: string,
  role: UserRole
): Promise<{ success: boolean; error?: string }> {
  const isAdmin = await verifyAdminAccess();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  const supabase = getServiceClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// update problem visibility status
// DRAFT -> TEST -> ACTIVE -> HIDDEN
export async function updateProblemVisibility(
  problemId: string | number,
  visibility: "DRAFT" | "TEST" | "ACTIVE" | "HIDDEN"
): Promise<{ success: boolean; error?: string }> {
  const isAdmin = await verifyAdminAccess();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  const supabase = getServiceClient();

  const { error } = await supabase
    .from("problems")
    .update({ visibility })
    .eq("id", problemId);

  if (error) {
    console.error("Error updating problem visibility:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// batch update all problems to a specific visibility
// useful for contest start (set all TEST -> ACTIVE)

export async function batchUpdateProblemVisibility(
  fromVisibility: "DRAFT" | "TEST" | "ACTIVE" | "HIDDEN",
  toVisibility: "DRAFT" | "TEST" | "ACTIVE" | "HIDDEN"
): Promise<{ success: boolean; count?: number; error?: string }> {
  const isAdmin = await verifyAdminAccess();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("problems")
    .update({ visibility: toVisibility })
    .eq("visibility", fromVisibility)
    .select("id");

  if (error) {
    console.error("Error batch updating problems:", error);
    return { success: false, error: error.message };
  }

  return { success: true, count: data?.length || 0 };
}


// get all users with their roles (admin view)
export async function getAllUsers(): Promise<{
  success: boolean;
  users?: Array<{
    id: string;
    email: string;
    name: string;
    role: UserRole;
    codeforces_id: string;
  }>;
  error?: string;
}> {
  const isAdmin = await verifyAdminAccess();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, name, role, codeforces_id")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: error.message };
  }

  return { success: true, users: data };
}
