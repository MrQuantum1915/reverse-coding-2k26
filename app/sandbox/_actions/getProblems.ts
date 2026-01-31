"use server";

import { createClient } from "@supabase/supabase-js";

export interface Problem {
  id: string;
  name: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  status: "ACTIVE" | "SOLVED";
  objective: string;
  constraints: Record<string, string>;
  intel: string;
  cf_link?: string;
}

export async function getProblems(): Promise<Problem[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("problems")
    .select("id, title, difficulty, status, description, intel, constraints, cf_contest_id, cf_index")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching problems:", error);
    return [];
  }

  // DB schema to module format
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
    };
  });

  return problems;
}
