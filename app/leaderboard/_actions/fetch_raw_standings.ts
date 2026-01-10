import 'server-only'; //safety-> no client can import this file/call function from this file
import crypto from 'crypto';

const BASE_URL = 'https://codeforces.com/api';

export async function fetchRawStandings() {

    const API_KEY = process.env.CODEFORCES_API_KEY;
    const API_SECRET = process.env.CODEFORCES_API_SECRET;
    const contest_id = process.env.NEXT_PUBLIC_CONTEST_ID;

    const time = Math.floor(Date.now() / 1000);

    const rand = Math.floor(Math.random() * 1000000);

    const hash = crypto.createHash('sha512');
    hash.update(rand + '/' + 'contest.standings?' + 'apiKey=' + API_KEY + '&contestId=' + contest_id + '&time=' + time + '#' + API_SECRET);

    const apiSig = rand + hash.digest('hex');

    // console.log('rand: ',rand);
    // console.log('apiSig: ',apiSig);

    const data = await fetch(`${BASE_URL}/contest.standings?contestId=${contest_id}&apiKey=${API_KEY}&time=${time}&apiSig=${apiSig}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!data.ok) {
        console.error('Error fetching CF API: ', data.statusText);
        return [];
    }

    const data1 = await data.json();
    if (data1.status !== 'OK') {
        console.error(`CF API Error: ${data1.comment}`);
        return [];
    }
    return data1;
}