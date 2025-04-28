import React from 'react'
import image from '../assets/cheesybeeftacos.png'

const FeaturedRecipe = () => {
  return (
    <div className="bg-orange-100 rounded-3xl shadow-lg p-10 mx-20 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Image */}
        <div className="flex-shrink-0 bg-orange-100 rounded-full  shadow-lg">
          <img
            src={image}
            alt="Image"
            className="w-52 md:w-64 "
          />
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left max-w-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-orange-400 mb-4">
            Today's Highlight
          </h2>
          <p className="text-gray-700 mb-6">
            Savor the taste of our delicious <span className="font-semibold text-orange-500">Cheesy Beef Tacos</span> — Crispy taco shells filled with seasoned ground beef, melted cheese, and fresh toppings for a bold and savory bite.
          </p>
          <button className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-300 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedRecipe
