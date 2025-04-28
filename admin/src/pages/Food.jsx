import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdOutlineEditCalendar } from "react-icons/md";
import {FaTrash} from 'react-icons/fa'
const Food = () => {
  const [Dishes,setDishes]=useState([])
  const getFood=()=>{
    axios.get('http://localhost:4000/api/food/')
    .then((response)=>{
      setDishes(response.data)
    }).catch((error)=>{
      console.log('Error getting Food',error)
    })
  }
  const handleDelete=(foodId)=>{
    axios.delete(`http://localhost:4000/api/food/${foodId}`)
    .then((response)=>{
     console.log(response)
     toast.success("Table Deleted Successfully")
     getFood()
    }).catch((error)=>{
      console.log('Error getting table',error)
    })
  }
  const handleEdit=(id)=>{
    localStorage.setItem('FoodId',id)
    navigate('/editfood')
  }
  useEffect(()=>{
    getFood();
    console.log(Dishes)
  
  },[])
  const navigate=useNavigate()
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-black mb-6">List of Dishes</h1>
    <div className="flex justify-between mb-4">
      <button className="bg-orange-300 text-white px-4 py-2 rounded-md hover:bg-orange-300" onClick={() => navigate('/addfood')}>+</button>
    </div> <div  className="grid  text-black grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
    {Dishes && Dishes?.map((food,index)=>
      <div key={index} className="bg-yellow-100 flex-col flex shadow-md rounded-lg p-4 space-y-2">
      <h2 className="text-xl font-semibold text-orange-300">{food.name}</h2>
     

      <span>category: {food.category}</span>
      <span>price: {food.price}</span>
      <span>Description: {food.description}</span>
      <span>image: <img src={`http://localhost:4000/uploads/${food.image}`}/></span>
     <div className='flex  gap-5'> <button className='delete' onClick={()=>handleDelete(food._id)}> <FaTrash /></button>
         <button className='update' onClick={()=>handleEdit(food._id)}> <MdOutlineEditCalendar /></button>
         </div> </div>
    
    )}
     </div>
    </div>
  )
}

export default Food