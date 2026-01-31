"use server";

import { createClient } from "@supabase/supabase-js";
import { canAccessContest, isAdminOrTester, getContestStatus, ContestState } from "@/lib/contest-state";

// Problem visibility status in DB
// DRAFT: Only admins (work in progress)
// TEST: Admins and testers (ready for testing)
// PRACTICE: Available to everyone before contest (dummy questions)
// ACTIVE: Contest problems (visible during LIVE and after ENDED)
// HIDDEN: Hidden from everyone
export type ProblemVisibility = "DRAFT" | "TEST" | "PRACTICE" | "ACTIVE" | "HIDDEN";

export interface Problem {
  id: string;
  name: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  status: "ACTIVE" | "SOLVED";
  objective: string;
  constraints: Record<string, string>;
  intel: string;
  cf_link?: string;
  isPractice?: boolean; // flag to identify practice problems
}

export interface GetProblemsResult {
  problems: Problem[];
  accessDenied: boolean;
  reason?: string;
}

// Get visibility filter based on contest state and user role
function getVisibilityFilter(status: ContestState, privileged: boolean): string[] {
  if (privileged) {
    // admins/testers see everything except HIDDEN
    return ["DRAFT", "TEST", "PRACTICE", "ACTIVE"];
  }

  switch (status) {
    case "UPCOMING":
      // before contest: only practice problems
      return ["PRACTICE"];
    case "LIVE":
      // during contest: only active contest problems
      return ["ACTIVE"];
    case "ENDED":
      // after contest: show all contest problems + practice for review
      return ["ACTIVE", "PRACTICE"];
    default:
      return [];
  }
}


// - Admins/Testers: See all problems (DRAFT, TEST, PRACTICE, ACTIVE)
// - Regular users UPCOMING: See only PRACTICE problems
// - Regular users LIVE: See only ACTIVE problems
// - Regular users ENDED: See ACTIVE + PRACTICE problems
export async function getProblems(): Promise<Problem[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [status, privileged] = await Promise.all([
    getContestStatus(),
    isAdminOrTester(),
  ]);

  const allowedVisibility = getVisibilityFilter(status, privileged);

  if (allowedVisibility.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("problems")
    .select("id, title, difficulty, status, visibility, description, intel, constraints, cf_contest_id, cf_index")
    .in("visibility", allowedVisibility)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching problems:", error);
    return [];
  }

  const problems: Problem[] = (data || []).map((problem) => {
    let cf_link: string | undefined;
    if (problem.cf_contest_id && problem.cf_index) {
      cf_link = `https://codeforces.com/contest/${problem.cf_contest_id}/problem/${problem.cf_index}`;
    }

    return {
      id: String(problem.id),
      name: problem.title,
      difficulty: problem.difficulty || "MEDIUM",
      status: problem.status || "ACTIVE",
      objective: problem.description,
      constraints: problem.constraints || {},
      intel: problem.intel || "",
      cf_link,
      isPractice: problem.visibility === "PRACTICE",
    };
  });

  return problems;
}


// get problems with full access control information
// when need to know WHY access was denied
export async function getProblemsWithAccessControl(): Promise<GetProblemsResult> {
  const accessResult = await canAccessContest();

  if (!accessResult.canAccess) {
    return {
      problems: [],
      accessDenied: true,
      reason: accessResult.reason,
    };
  }

  const problems = await getProblems();
  return {
    problems,
    accessDenied: false,
  };
}
