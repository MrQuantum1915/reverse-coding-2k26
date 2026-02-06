import React from "react";
import BountyCard from "./BountyCard";

const Bounty_board = () => {
  return (
    <div className="mt-12 sm:mt-20 mx-4 md:mx-10 mb-16 sm:mb-20 dark:bg-black">

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          BOUNTY BOARD
        </h1>
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[rgb(0,255,251)] [text-shadow:_0_0_15px_rgba(0,255,251,0.7)]">
          POOL : ₹10,000
        </h1>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-16 xl:gap-25">

        <div className="mt-6 md:mt-20">
          <BountyCard
            title="RUNNER UP"
            prize={
              <div className="flex items-center justify-center gap-2 text-3xl font-extrabold">
                <span>₹</span>
                <span>2,700</span>
              </div>
            }
            color="rgb(0,255,251)"
          />
        </div>

        <div>
          <BountyCard
            title="CHAMPION"
            prize={
              <div className="flex items-center justify-center gap-2 text-3xl font-extrabold">
                <span>₹</span>
                <span>3,300</span>
              </div>
            }
            color="#FF8A00"
            badge="MVP"
          />
        </div>

        <div className="mt-6 md:mt-20">
          <BountyCard
            title="SPECIAL OPS"
            prize={
              <div className="text-lg">
                ₹2,300 (IIITV)
                <br />
                ₹1,700 (IIITV FY)
              </div>
            }
            color="rgb(166,0,255)"
          />
        </div>

      </div>
    </div>
  );
};

export default Bounty_board;
