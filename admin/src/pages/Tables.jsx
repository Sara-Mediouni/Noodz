import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MdOutlineEditCalendar } from "react-icons/md";
import {FaTrash} from 'react-icons/fa'
import {toast} from 'react-toastify'
const Tables = () => {
  const [Tables,setTables]=useState([])
  const gettable=()=>{
    axios.get('http://localhost:4000/api/tables/')
    .then((response)=>{
      setTables(response.data)
    }).catch((error)=>{
      console.log('Error getting table',error)
    })
  }
  const handleDelete=(tableId)=>{
    axios.delete(`http://localhost:4000/api/tables/${tableId}`)
    .then((response)=>{
     console.log(response)
     toast.success("Table Deleted Successfully")
     gettable()
    }).catch((error)=>{
      console.log('Error getting table',error)
    })
  }
  const handleEdit=(id)=>{
    localStorage.setItem('TableId',id)
    navigate('/edittable')
  }
  useEffect(()=>{
    gettable();
    console.log(Tables)
  
  },[])
  const navigate=useNavigate()
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-black mb-6">List of Tables</h1>
    <div className="flex justify-between mb-4">
      <button className="bg-orange-300 text-white px-4 py-2 rounded-md hover:bg-orange-300" onClick={() => navigate('/addtable')}>+</button>
    </div> <div  className="grid  text-black grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
    {Tables && Tables?.map((t,index)=>
      <div key={index} className="bg-yellow-100 flex-col flex shadow-md rounded-lg p-4 space-y-2">
      <h2 className="text-xl font-semibold text-orange-300">{t.name}</h2>
  

      <span>chairs: {t.chairs}</span>
      <span>CX: {t.cx}</span>
      <span>CY: {t.cy}</span>
      <span>type: {t.type}</span>
      <span>reserved: {t.reserved ? 'Yes ':'No'}</span>
     <div className='flex  gap-5'> <button className='delete' onClick={()=>handleDelete(t._id)}> <FaTrash /></button>
      <button className='update' onClick={()=>handleEdit(t._id)}> <MdOutlineEditCalendar /></button>
      </div> 
    </div>
   
    )}
     </div>
   
    </div>
  )
}

export default Tables