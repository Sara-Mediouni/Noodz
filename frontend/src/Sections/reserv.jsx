import React from 'react'
import pasta from '../assets/pexels-lina-1813504.jpg'
import {useNavigate} from 'react-router-dom'
const Reserv = () => {
  const navigate=useNavigate();
  
  const handleNavigate=()=>{
    navigate('/reservation')
  }
  return (
   <div className=' w-full mt-10 relative flex justify-center items-center text-white '>
             <img src={pasta} className='h-[400px] w-full object-cover '/>
             
             <div className='absolute px-10 flex flex-col gap-y-4 items-start justify-start w-full '>
             <h1 className='!text-white text-6xl font-extrabold'>Make A Reservation now</h1>
              <div className='items-start flex justify-start'>
                 <button onClick={handleNavigate}
                 className='rounded-full bg-yellow-950 text-white  w-[150px] h-[70px] 
                 px-2 flex justify-center items-center text-center font-bold'>
                   Reservation
                 </button>
                 </div>
   
   
   
             </div>
            </div>
  )
}

export default Reserv