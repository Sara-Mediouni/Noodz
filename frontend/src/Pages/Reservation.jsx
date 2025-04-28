import React, { useEffect, useState } from "react";
import image from "../assets/max-griss-I90KYtZDi54-unsplash.jpg";
import Swal from 'sweetalert2'
import Select from 'react-select';
import SeatingPlan from "../Components/SeatingPlan";
import Dish from '../assets/pexels-valeriya-842571.jpg';
import 'rsuite/DatePicker/styles/index.css';
import {useSelector } from 'react-redux';
import axios from "axios";
import {toast} from 'react-toastify'
const Reservation = () => {

  const id = useSelector((state) => state.auth.user);
  const [Reservation, setReservation] = useState({
    tables: [],
    people: 0,
    date: '',
    time: '',
    additional: ''
  });
  const [user, setUser] = useState();
  const handleTableChange = (selectedOptions) => {
    const selectedTables = selectedOptions.map(option => option.value);
    setReservation({ ...Reservation, tables: selectedTables });
  };
  
  const getUserInfo = () => {
    try {
      axios.get(`http://localhost:4000/api/user/getuser/${id}`)
        .then((response) => setUser(response.data.user))
        .catch((error) => console.log("Error getting user", error));
    } catch (error) {
      console.log(error);
    }
  };
  const [Tables, setTables] = useState()
  const getTables=()=>{
    try{
      axios.get(`http://localhost:4000/api/tables`)
      .then((response)=>{
        setTables(response.data)
      }).catch((error)=>console.log('Error getting tables',error))

    }
    catch(error){
      console.log(error)
    }
    
  }
  const tableOptions = Tables?.map((table) => ({
    value: table._id,
    label: table.name,
  }));
  useEffect(()=>{
     getTables()
     console.log(Tables)
     
  },[])
  const createReservation=(e)=>{
       e.preventDefault()
    const today = new Date();

    // Assure-toi que Reservation.date est bien un objet Date, sinon convertis-le
    const reservationDate = new Date(Reservation.date);
    
    // Mets les heures, minutes, secondes et millisecondes à zéro pour ne comparer que la date
    today.setHours(0, 0, 0, 0);
    reservationDate.setHours(0, 0, 0, 0);
    
    if (reservationDate < today) {
      Swal.fire({
        title: 'Error!',
        text: 'The Date you entered is not available',
        icon: 'error',
      });
    }
        console.log(Reservation)
      axios.post(`http://localhost:4000/api/reserve/reserve/${id}`,
       Reservation
      )
      .then((response)=>{
        console.log(response)
        if (response.data && response.data.url) {
          toast.info("Redirecting to Paiement...")
          window.location.href = response.data.url; // 🔁 Redirige vers Stripe Checkout
        }
     
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response?.data || 'An unexpected error occurred',  // Affichage du message d'erreur
          icon: 'error',
        });
      })
  }
   const handleChange=(e)=>{
    setReservation( {...Reservation,[e.target.name]:e.target.value})
   console.log(Reservation)
  }

  useEffect(() => {
   if (id)
   { getUserInfo();}
  }, [id]);

  return (
    <div className="h-full relative">
    <div className="reservation py-10 px-6 md:px-20 w-full">
      <h1 className="mt-10 text-3xl md:text-6xl !text-white font-extrabold text-center px-6 md:px-20">
        Make A Reservation
      </h1>
    </div>
  
    {/* Section with Image */}
    <div className="relative bg-gray-100 py-20">
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${Dish})` }}></div>
      <div className="relative container mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-semibold text-white">Enjoy a Dining Experience Like No Other</h2>
        <p className="text-base md:text-lg text-white mt-4 max-w-lg mx-auto">
          Reserve a table at our restaurant and enjoy delicious meals in a cozy ambiance. Whether it's a casual meal or a special occasion, we've got you covered.
        </p>
      </div>
    </div>
  
    <div className="h-full relative px-6 md:px-20 m-10">
      <div className="flex items-center justify-start py-10">
        <h1 className="md:text-5xl text-3xl font-bold">Restaurant Seating <span>Plan</span></h1>
      </div>
  
      <SeatingPlan />
      <form className="py-5 " onSubmit={createReservation}>
        <h1 className="md:text-5xl text-3xl font-bold my-10">Reservation <span>Details</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1.2fr] rounded-2xl bg-orange-100 border-8 border-orange-300 shadow-lg">
          <div className="flex flex-col items-center justify-between py-10">
            <div className="grid md:grid-cols-2 p-10 gap-x-10 gap-y-8 w-full">
              {/* Form Inputs */}
              <div className="flex flex-col">
                <label className="text-black font-bold pb-2">First Name</label>
                <input
                  name="First Name"
                  type="text"
                  value={user?.firstname}
                  placeholder="First Name"
                  readOnly
                  className="border-gray-500 p-2 bg-orange-100 border-2 rounded-2xl w-full shadow-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-bold pb-2">Last Name</label>
                <input
                  name="Last Name"
                  type="text"
                  value={user?.lastname}
                  placeholder="Last Name"
                  readOnly
                  className="border-gray-500 p-2 bg-orange-100 border-2 rounded-2xl w-full shadow-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-bold pb-2">Tables</label>
                <div className="relative">
                  <Select
                    isMulti
                    options={tableOptions}
                    value={tableOptions?.filter(opt => Reservation?.tables.includes(opt.value))}
                    onChange={handleTableChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                  <div className="pointer-events-none absolute top-2 right-3 text-orange-400">
                    ▼
                  </div>
                </div>
              </div>
  
              <div className="flex flex-col">
                <label className="text-black font-bold pb-2">Number of People</label>
                <input
                  name="people"
                  type="number"
                  value={Reservation?.people}
                  placeholder="People"
                  onChange={handleChange}
                  className="border-gray-500 p-2 bg-orange-100 border-2 rounded-2xl w-full shadow-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-bold pb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]} // date de demain
                  value={Reservation?.date}
                  onChange={handleChange}
                  className="border-gray-500 p-2 bg-orange-100 border-2 rounded-2xl w-full shadow-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-bold pb-2">Time</label>
                <input
                  name="time"
                  type="time"
                  value={Reservation?.time}
                  onChange={handleChange}
                  className="border-gray-500 p-2 bg-orange-100 border-2 rounded-2xl w-full shadow-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-bold pb-2">Additional Requests</label>
                <textarea
                  name="additional"
                  value={Reservation?.additional}
                  onChange={handleChange}
                  placeholder="Any additional requests?"
                  className="border-gray-500 p-2 bg-orange-100 border-2 rounded-2xl w-full shadow-sm focus:outline-none"
                />
              </div>
            </div>
  
            <button type="submit" className="bg-black text-white text-xl font-bold w-60 rounded-2xl p-3 flex items-center justify-center shadow-md hover:shadow-lg transition">
              Send
            </button>
          </div>
  
          <img src={image} className="w-full h-full relative rounded-br-2xl rounded-tr-2xl object-cover" />
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Reservation;
