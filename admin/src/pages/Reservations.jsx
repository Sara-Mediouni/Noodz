import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
const Reservations = () => {
    const [Reservations, setReservations] = useState([])
    const getAll=()=>{
       axios.get(`http://localhost:4000/api/reserve/`)
        .then((response)=>setReservations(response.data))
        .catch((error)=>console.log(error))

    }
    const deleteReservation=(id)=>{
      axios.delete(`http://localhost:4000/api/reserve/${id}`)
      .then((response)=>{toast.success(response.data.message);
        getAll()
      }
      ).catch((error)=>toast.error("An Error has Occured",error))
    }
    useEffect(()=>{
        getAll();
    },[])
  return (
    <div className="min-h-screen py-10 px-5 mt-10 md:px-20">
    <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">All Reservations</h1>

    {Reservations.length === 0 ? (
      <p className="text-center text-gray-500">No reservations yet.</p>
    ) : (
      <div className="grid md:grid-cols-2 gap-10">
        {Reservations.map((reservation, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold text-orange-300 mb-4">Reservation #{index + 1}</h2>
            
            <ul className="space-y-3 text-gray-700">
  <li><strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}</li>
  <li><strong>Time:</strong> {reservation.time}</li>
  <li>
    <strong>Tables:</strong>
    <ul className="list-disc list-inside ml-4">
      {reservation.tables?.map((table, index) => (
        <div key={index}>
        <li >
          <strong>Name:</strong> {table.name}
        </li>
        <li >
          <strong>reserved Until:</strong> {table.reservedUntil}
        </li>
       
        </div>
      ))}
    </ul>
  </li>
  <li><strong>Number of people:</strong> {reservation.people}</li>
  {reservation.additional && (
    <li><strong>Additional request:</strong> {reservation.additional}</li>
  )}
</ul>


         <div className='flex justify-end items-center'>  
       <button  className="bg-black p-3  font-bold text-white rounded-full" onClick={()=>deleteReservation(reservation._id)}>delete</button>   </div>
       </div> ))}
      </div> 
     
    )}
  </div>
  )
}

export default Reservations