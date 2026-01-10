'use client'
import { useState } from "react"
import { getLeaderboard } from "./_actions/getLeaderboard"

function page() {
    const [data, setdata] = useState({})
    return (
        <div className="text-4xl text-center w-full my-80">
            <button
                onClick={async () => {
                    const standings = await getLeaderboard();
                    console.log(standings);
                    setdata(standings);
                }}
                className="p-4 text-black bg-amber-50 cursor-pointer">
                Fetch Standings
            </button>


        </div>
    )
}

export default page