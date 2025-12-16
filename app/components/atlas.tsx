import './navbar.css';
import { Audiowide } from 'next/font/google';

const audiowide = Audiowide(
    {
        weight: ['400'],
        subsets: ['latin']
    }
)
function Atlas() {
    return (
        <div className="flex flex-col items-center text-center mx-4 sm:mx-10 my-5 border border-cyan-300/50 rounded-lg backdrop-blur-2xl shadow-[0_0_15px_rgba(34,211,238,0.5),0_0_30px_rgba(34,211,238,0.3)]">
            <div className={`text-black text-2xl sm:text-3xl mx-4 px-10 sm:px-16 w-fit bg-white logo ${audiowide.className} font-black tracking-widest`}
            >
                ATLAS
            </div>

            {/* add that socials here */}
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-around items-center w-full text-lg sm:text-2xl py-3'>
                {/* links */}
                <div>Links</div>
                {/* socials */}
                <div>Socials</div>
            </div>
        </div>)
}

export default Atlas