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

    const { data: allUsersData, error } = await supabase
        .from('profiles')
        .select('id, name, institute, codeforces_id');

    if (error) {
        console.log('Error fetching users data from DB: ', error.message);
        throw new Error(`DB Error: ${error.message}`);
    }

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

            if (userData) {
                const questions_status: Record<string, string> = {};
                ranklistRow.problemResults.forEach((pr: any, index: number) => {
                    if (pr.points > 0) {
                        questions_status[(index + 1).toString()] = "SOLVED";
                    }
                });

                dbUpdates.push(
                    supabase.from('profiles')
                        .update({ questions_status })
                        .eq('id', userData.id)
                );
            }

            standings.push({
                rank,
                name: userData ? userData.name : cfHandle,
                institute: userData ? userData.institute : 'N/A',
                cfHandle,
                points,
                penalty,
                problemsSolved
            });
        }
    }

    await Promise.all(dbUpdates);

    standings.sort((a, b) => a.rank - b.rank);
    return standings;
}

export default fetchStandings