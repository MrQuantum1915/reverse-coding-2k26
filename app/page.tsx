import Image from 'next/image';
import CountdownTimer from './components/countdown-timer';
import Button from './components/neon-button';
// import Flowchart from './components/flowchart';

export default function Home() {
    return (
        <>
            <div className="relative text-white min-h-screen">
                <Image
                    src="/tesseract-bg.jpg"
                    alt="Background"
                    fill
                    priority
                    className="object-cover object-center -z-20"
                />
                <div className="absolute inset-0 bg-black -z-10 animate-overlay-fade" />
                <div className="absolute left-6 bottom-4 md:left-24 md:bottom-20 flex justify-between items-end w-full pr-6 md:pr-24">
                    <div className="text-left leading-tight">
                        <p className="text-xl md:text-4xl font-semibold tracking-[0.2em] uppercase">
                            18th , January, 2026
                        </p>
                        <p className="text-xl md:text-4xl font-semibold tracking-[0.2em] uppercase mt-1 md:mt-2">
                            SUNDAY
                        </p>
                        <p className="text-xl md:text-4xl font-semibold tracking-[0.2em] uppercase mt-1 md:mt-2">
                            21:00 - 23:00
                        </p>
                    </div>
                    <Button text="Register.exe" width={220} height={56} />

                </div>
            </div>
            <div className="bg-black px-8 py-6 flex justify-center">
                <CountdownTimer />
            </div>
            <div className='bg-black px-8 py-6 flex justify-center mt-6'>
            {/* <Flowchart /> */}
            </div>
        </>
    )
}