import React, { useEffect, useState } from 'react'
import image from '../assets/carbonara.png'
import axios from 'axios'
const Recipes = () => {
  const [Recipe, setRecipe] = useState()
  const recipeExample = {
    name: "Spaghetti Carbonara",
    image: image,
    recipe: {
      ingredients: [
        "200g spaghetti",
        "100g smoked bacon or pancetta",
        "2 egg yolks",
        "50g grated parmesan cheese",
        "2 tablespoons heavy cream",
        "Salt",
        "Black pepper"
      ],
      steps: [
        "Cook the spaghetti in a large pot of salted boiling water according to the package instructions.",
        "Meanwhile, cook the bacon in a pan until golden and crispy.",
        "In a bowl, mix the egg yolks, heavy cream, grated parmesan, a pinch of salt, and lots of black pepper.",
        "Drain the pasta, keeping a little bit of the cooking water.",
        "Add the pasta to the pan with the bacon, remove from heat.",
        "Quickly pour the sauce over the hot pasta and mix well to create a creamy texture (add some cooking water if needed).",
        "Serve immediately with extra parmesan on top."
      ],
      duration: "20 minutes"
      
    }
  };
  
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

    { /*
      <div className="grid md:grid-cols-2 gap-12 bg-orange-100 rounded-3xl shadow-lg p-10">
        
      
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

    
        <div className="relative flex items-center justify-center">
          <div className="bg-orange-300 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full flex items-center justify-center shadow-xl">
            <img
              src={`http://localhost:4000/uploads/${Recipe?.image}`}
              alt="Fruit Tart"
              className="w-52 md:w-72 object-contain drop-shadow-lg"
            />
          </div>
        </div>
        
      </div>*/}
      <div className="grid md:grid-cols-2 gap-12 bg-orange-100 rounded-3xl shadow-lg p-10">
        
      
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-3xl md:text-4xl text-orange-400 font-bold">{recipeExample?.name}</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
           {recipeExample?.recipe?.ingredients?.map((i,index)=>(
           <li key={index}>{i}</li>))}
            
        
          </ul>
          <p>
            {recipeExample?.recipe?.steps}
          </p>
         <span>Duration: {recipeExample?.recipe?.duration}</span>
        </div>

    
        <div className="relative flex items-center justify-center">
          <div className="bg-orange-200 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full flex items-center justify-center shadow-xl">
            <img
              src={recipeExample?.image}
              alt="Recipe"
              className="w-52 md:w-100 object-contain drop-shadow-lg"
            />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Recipes
