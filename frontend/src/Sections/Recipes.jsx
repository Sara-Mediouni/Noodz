import React, { useEffect, useState } from 'react'
import image from '../assets/pasta.png'
import axios from 'axios'
const Recipes = () => {
  const [Recipe, setRecipe] = useState()
  const getRecipe=()=>{
 axios.get('http://localhost:4000/api/food/recipe')
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }
  useEffect(() => {
   getRecipe();
   console.log(Recipe)
  }, []);
  return (
    <div className="w-full px-6 md:px-20 py-16">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-14 text-center">
       Recipe <span className="text-orange-500">Of The Day</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-12 bg-orange-100 rounded-3xl shadow-lg p-10">
        
        {/* TEXT CONTENT */}
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-3xl md:text-4xl text-orange-400 font-bold">{Recipe?.name}</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
           {Recipe?.recipe?.ingredients?.map((i,index)=>(
           <li key={index}>{i}</li>))}
            
        
          </ul>
          <p>
            {Recipe?.recipe?.steps}
          </p>
         <span>Duration: {Recipe?.recipe?.duration}</span>
        </div>

        {/* IMAGE */}
        <div className="relative flex items-center justify-center">
          <div className="bg-orange-300 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full flex items-center justify-center shadow-xl">
            <img
              src={`http://localhost:4000/uploads/${Recipe?.image}`}
              alt="Fruit Tart"
              className="w-52 md:w-72 object-contain drop-shadow-lg"
            />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Recipes
