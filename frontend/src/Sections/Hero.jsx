import React from "react";
import hero from "../assets/Plain-Croissant.png";

const Hero = () => {
  return (
    <div className="relative h-full w-full pt-40 ">
      <div className="grid grid-cols-[2fr_3fr] px-20 h-full gap-x-2">
        <div className="min-w-0 min-h-full relative">
          <h1 className="font-extrabold text-xl md:text-6xl py-4">
            All Food is Available at <span className="underline decoration-orange-300 underline-offset-1 decoration-8 !text-black">Noodz </span>
          </h1>
          <p className="text-gray-500">
            We are just one click away when you're craving delicious food
          </p>

          <div className="md:grid md:grid-cols-2 items-start justify-center gap-4 my-10 font-bold relative h-full">
            <button className="bg-black relative flex justify-center md:text-lg items-center text-white 
            px-auto h-10 py-auto mb-10 rounded-full w-full hover:bg-gray-800 transition">
              Order Now
            </button>
            <button className="text-black flex justify-center  items-center md:text-lg border break-words
             border-black px-auto  h-10 w-full py-auto rounded-full hover:bg-gray-100 transition">
              Reservation
            </button>
          </div>
        </div>

        <div className="h-full w-full flex justify-center transform md:-translate-y-30 md:-translate-x-20 relative">
          <img src={hero} className="w-200 absolute" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
