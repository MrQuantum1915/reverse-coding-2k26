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
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: allUsersData, error } = await supabase
        .from('profiles')
        .select('name, institute, codeforces_id');

    if (error) {
        console.log('Error fetching users data from DB: ', error.message);
        throw new Error(`DB Error: ${error.message}`);
    }

    // rank, name, institute, cfhandle, 
    const standings = [];
    for (const ranklistRow of rawData.result.rows) {
        const participantType = ranklistRow.party.participantType;
        if (participantType === 'CONTESTANT') {
            const cfHandle = ranklistRow.party.members[0].handle;
            const rank = ranklistRow.rank;
            const points = ranklistRow.points;
            const penalty = ranklistRow.penalty;
            const problemsSolved = ranklistRow.problemResults.filter((pr: any) => pr.points > 0).length;

            const userData = allUsersData.find(user => user.codeforces_id === cfHandle);

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

    standings.sort((a, b) => a.rank - b.rank);
    return standings;
}

export default fetchStandings