'use cache';

import { fetchRawStandings } from "./fetch_raw_standings"
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";

async function fetchStandings() {

    cacheLife('cfsafe');
    cacheTag('standings');

    // from cf
    const rawData = await fetchRawStandings();
    if (rawData.status !== 'OK') {
        throw new Error(`CF API Error: ${rawData.comment}`);
    }

    // fetch ALL user's data from DB
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch problems to get cf_index -> problem id mapping (only ACTIVE visibility problems)
    const { data: problemsData, error: problemsError } = await supabase
        .from('problems')
        .select('id, cf_index, visibility')
        .in('visibility', ['ACTIVE', 'TEST']);

    if (problemsError) {
        console.log('Error fetching problems data from DB: ', problemsError.message);
    }

    // Create mapping: cf_index (A, B, C...) -> DB problem id
    const cfIndexToDbId: Record<string, string> = {};
    const allProblemIds: string[] = [];
    (problemsData || []).forEach((p: any) => {
        allProblemIds.push(String(p.id));
        if (p.cf_index) {
            cfIndexToDbId[p.cf_index] = String(p.id);
        }
    });

    const { data: allUsersData, error } = await supabase
        .from('profiles')
        .select('id, name, institute, codeforces_id, questions_status');

    if (error) {
        console.log('Error fetching users data from DB: ', error.message);
        throw new Error(`DB Error: ${error.message}`);
    }

    const cfProblems = rawData.result.problems || [];
    const cfProblemIndices = cfProblems.map((p: any) => p.index); // ['A', 'B', 'C', ...]

    // rank, name, institute, cfhandle, 
    const standings = [];
    const dbUpdates = [];
    for (const ranklistRow of rawData.result.rows) {
        const participantType = ranklistRow.party.participantType;
        if (participantType === 'CONTESTANT') {
            const cfHandle = ranklistRow.party.members[0].handle;
            const rank = ranklistRow.rank;
            const points = ranklistRow.points;
            const penalty = ranklistRow.penalty;
            const problemsSolved = ranklistRow.problemResults.filter((pr: any) => pr.points > 0).length;

            const userData = allUsersData.find(user => user.codeforces_id === cfHandle);

            //only show registered users in leaderboard
            if (!userData) {
                continue;
            }

            // Initialize questions_status with all contest problems as ACTIVE
            const questions_status: Record<string, string> = {};
            allProblemIds.forEach(problemId => {
                // Preserve SOLVED status if already exists, otherwise set ACTIVE
                const existingStatus = userData.questions_status?.[problemId];
                questions_status[problemId] = existingStatus === "SOLVED" ? "SOLVED" : "ACTIVE";
            });
            
            // Update based on CF results using cf_index mapping
            ranklistRow.problemResults.forEach((pr: any, index: number) => {
                const cfIndex = cfProblemIndices[index];
                const dbProblemId = cfIndexToDbId[cfIndex]; 
                
                if (dbProblemId && pr.points > 0) {
                    questions_status[dbProblemId] = "SOLVED";
                }
            });

            dbUpdates.push(
                supabase.from('profiles')
                    .update({ questions_status })
                    .eq('id', userData.id)
            );

            standings.push({
                rank,
                name: userData.name,
                institute: userData.institute || 'N/A',
                cfHandle,
                points,
                penalty,
                problemsSolved
            });
        }
    }

    await Promise.all(dbUpdates);

    // sort by points (desc), then by penalty (asc) for proper ranking
    standings.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return a.penalty - b.penalty;
    });

    // dense ranking no gaps
    let currentRank = 1;
    for (let i = 0; i < standings.length; i++) {
        if (i > 0 && 
            standings[i].points === standings[i - 1].points && 
            standings[i].penalty === standings[i - 1].penalty) {
            // Same rank as previous (tie)
            standings[i].rank = standings[i - 1].rank;
        } else {
            standings[i].rank = currentRank;
            currentRank++;
        }
    }

    // console.log(standings.map(s => s.name));
    return standings;
}

export default fetchStandings