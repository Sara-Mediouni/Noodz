import React from 'react'
import image from '../assets/pasta.png'

const FeaturedRecipe = () => {
  return (
    <div className="w-full px-6 md:px-20 py-12 bg-orange-100 rounded-3xl shadow-md my-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={image}
            alt="Tarte aux Fruits"
            className="w-52 md:w-64 rounded-full shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left max-w-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-orange-500 mb-4">
            Today's Highlight
          </h2>
          <p className="text-gray-700 mb-6">
            Savor the taste of our delicious <span className="font-semibold text-orange-600">Tarte aux Fruits</span> — a perfect blend of freshness and sweetness, crafted with love.
          </p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedRecipe
