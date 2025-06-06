import React, { useEffect, useState } from 'react'
import axios from 'axios'
import eggrolls from '../assets/egg-rolls-10-1200.jpg'
import farfalle from '../assets/farfalle.png'
import steakchcken from '../assets/chickensteak.png'
const Cards = () => {
  const [BestDishes, setBestDishes] = useState([])
  const dishesExamples=[
    {
      image:eggrolls,
      name:"Chinese Egg Rolls",
      category:"Dessert",
      price:12,
      description:"Crispy, golden egg rolls filled with a savory mix of meat and vegetables, perfect for an appetizer or snack."
    },
    {
      image:farfalle,
      name:"Pasta Farfalle",
      category:"Main Course",
      price:18,
      description:"Bow-tie shaped pasta cooked to perfection and tossed in a rich, creamy sauce with fresh herbs and vegetables.",
    },
    {
      image:steakchcken,
      name:"Chicken Steaks",
      category:"Main Course",
      price:18,
      description:"Juicy grilled chicken steaks marinated in a blend of spices for a tender and flavorful meal."
    }
  ]


  const getBestRecipes=()=>{
    axios.get('http://localhost:4000/api/food/bestdishes')
    .then((response)=>{
      console.log(response.data)
      setBestDishes(response.data)
    }).catch((error)=> 
    console.log(error))
  }
  useEffect(()=>{
    getBestRecipes()
    console.log(BestDishes)
  },[])
  return (
    <div className='w-full h-full p-10 '>
    <h1 className='text-2xl md:text-5xl font-extrabold my-10 md:my-30 px-10'>Best <span>Dishes</span></h1>
     <div className='px-10 py-10 grid md:grid-cols-3 w-full gap-20'>
 {/* {BestDishes.map((dish,index)=>(
    
      
      <div
              key={index}
              className="relative bg-orange-200 rounded-2xl p-6 pt-10 pb-24 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={`http://localhost:4000/uploads/${dish.image}`}
                alt="dish"
                className="rounded-full border-8 border-orange-300 absolute -top-16 right-6 w-28 h-28 object-cover"
              />
              <div className="flex flex-col gap-4 mt-6">
                <ul className="font-bold text-xl md:text-2xl space-y-2">
                  <li>{dish.name}</li>
                  <li className="text-gray-600 text-sm">
                  {dish.category}
                </li>
                  <li className='mb-10'>${dish.price}</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  {dish.description}
                </p>
              </div>
            {/*  <button className="absolute bottom-4 right-4 bg-orange-300 text-white font-bold rounded-2xl px-4 py-2 hover:bg-orange-400 transition-colors duration-200">
                Order now
              </button>*//*}
            </div>
 
     ))}
     */}
     
     {dishesExamples.map((dish,index)=>(
    
      
    <div
            key={index}
            className="relative bg-orange-200 rounded-2xl p-6 pt-10 pb-24 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={dish.image}
              alt="dish"
              className="rounded-full border-8 border-orange-300 absolute -top-16 right-6 w-28 h-28 object-cover"
            />
            <div className="flex flex-col gap-4 mt-6">
              <ul className="font-bold text-xl md:text-2xl space-y-2">
                <li>{dish.name}</li>
                <li className="text-gray-600 text-sm">
                {dish.category}
              </li>
                <li className='mb-10'>${dish.price}</li>
              </ul>
              <p className="text-gray-600 text-sm">
                {dish.description}
              </p>
            </div>
          {/*  <button className="absolute bottom-4 right-4 bg-orange-300 text-white font-bold rounded-2xl px-4 py-2 hover:bg-orange-400 transition-colors duration-200">
              Order now
            </button>*/}
          </div>
))}
     </div>
    </div>
  )
}

export default Cards