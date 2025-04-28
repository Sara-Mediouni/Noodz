import React from 'react'
import croissant from '../assets/kate-tsventoukh-0gIiGLlnrNE-unsplash.jpg'
import { FaArrowDownLong } from "react-icons/fa6";

const Presentation = () => {
  return (
      <div className=' w-full mt-10 relative flex justify-center items-center text-white '>
          <img src={croissant} className='h-[400px] w-full object-cover '/>
          <div className='absolute bottom-10 px-10 md:grid grid-cols-3 justify-center w-full '>
          
         {/* Texte */}
    <p className='text-white font-bold text-sm md:text-xl max-w-md text-start'>
      The croissants are buttery and flaky. Design by Fluttertop Perfect Breakfast! They have authentic French taste and are always fresh.
    </p>

    {/* Bouton */}
    <div className='items-center flex justify-center'>
    <button className='rounded-full bg-yellow-950 text-white mx-10 w-[100px] h-[100px] px-2 flex justify-center items-center text-center'>
      Explore Dishes <FaArrowDownLong className="ml-2" />
    </button>
    </div>

    {/* Stats */}
    <div className='flex justify-center gap-5 md:gap-10'>
      <div><p><span className='md:text-5xl !text-white'>400+<br /></span>Food items</p></div>
      <div><p><span className='md:text-5xl !text-white'>400+<br /></span>Food items</p></div>
      <div><p><span className='md:text-5xl !text-white'>400+<br /></span>Food items</p></div>
    </div>
          </div>
         </div>
  )
}

export default Presentation