import Atlas from "./atlas"

function Footer() {
  return (
    <div className={`flex flex-col gap-5 bg-black`}>
      <Atlas />
      <div className="bg-white/10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-around items-center text-base sm:text-xl md:text-3xl font-black text-white/60 py-6 md:py-10 px-4">
        <div className="hover:text-green-500 transition-all ease-in-out duration-500 cursor-pointer text-center">&lt;/&gt; Sponsor</div>
        <div className="hover:text-cyan-300 transition-all ease-in-out duration-500 cursor-pointer text-center">&lt;/&gt; IIITV Coding CLUB</div>
        <div className="hover:text-purple-600 transition-all ease-in-out duration-500 cursor-pointer text-center">&divide; ENIGMA</div>
      </div>
      <div className="flex flex-col">
        <div className="text-xs sm:text-sm md:text-md text-white/30 font-bold mx-4 sm:mx-10 md:mx-24 my-2 md:my-0 p-0 text-center sm:text-left">&copy; All Systems Operational</div>
        <div className='text-3xl sm:text-5xl md:text-8xl font-black text-white/30 text-center m-0 p-0'>CCxENIGMA / TESSERACT</div>
      </div>
    </div>
  )
}

export default Footer