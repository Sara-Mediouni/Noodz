import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const id = useSelector((state) => state.auth.user);
 

   // Se déclenche uniquement lorsque le token change
const fetchReservations = async () => {
      try {
        await axios.get(`http://localhost:4000/api/reserve/get/${id}`)
       .then((response) => {
        console.log(response.data);
        setReservations(response.data);
       }).catch((err) => {
        console.log(err)
       });
        
      } catch (error) {
        console.error(error);
      }
}   

    const cancelReservation=(idr)=>{
       axios.get(`http://localhost:4000/api/reserve/cancel/${idr}`)
       .then((response)=>{ Swal.fire({
        title: 'Error!',
        text: response.data.message,
        icon: 'success',
      })})
.catch((error)=> {Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'An unexpected error occurred',  // Affichage du message d'erreur
        icon: 'error',
      })})
    }
    const endReservation=(idr)=>{
      axios.get(`http://localhost:4000/api/reserve/end/${idr}`)
      .then((response)=>{ Swal.fire({
                title: 'Error!',
                text: response.data.message,
                icon: 'success',
              })})
      .catch((error)=> {Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'An unexpected error occurred',  // Affichage du message d'erreur
                icon: 'error',
              })})
    }
  useEffect(() => {
    if (id)
    {fetchReservations();}
  }, [id]);

  return (
    <div className="min-h-screen py-10 px-5 mt-30 md:px-20">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">My Reservations</h1>

      {reservations.length === 0 ? (
        <p className="text-center text-gray-500">You have no reservations yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {reservations.map((reservation, index) => (
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
                <li><strong>Status:</strong> {reservation.status}</li>
              </ul>
        
              <div className="mt-6 flex justify-end space-x-4">
  {/* Afficher les boutons uniquement si le statut est "previewed" */}
  {reservation.status === 'planned' && (
    <>
      <button 
        onClick={() => cancelReservation(reservation._id)} 
        className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full transition duration-300"
      >
        Cancel
      </button>
      <button 
        onClick={() => endReservation(reservation._id)} 
        className="underline-black underline text-black font-bold py-2 px-5 rounded-full transition duration-300"
      >
        End
      </button>
    </>
  )}
</div>


              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
