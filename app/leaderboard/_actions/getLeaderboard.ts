'use server'
import fetchStandings from "./fetch_standings";

export async function getLeaderboard() {
    const standings = await fetchStandings();
    return standings;
}