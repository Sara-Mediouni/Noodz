import React from 'react'
import image from '../assets/spencer-davis-dnQ5sauaFz0-unsplash.jpg'

const FinalSection = () => {
  return (
    <div className="final-section grid md:grid-cols-2 gap-10 items-center mt-20 px-10 py-16 bg-orange-100 rounded-xl shadow-lg">
      
      <div className="image-container">
        <img
          src={image}
          alt="Restaurant"
          className="w-full h-auto rounded-3xl shadow-xl"
        />
      </div>

      <div className="text-content space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          About Our <span className="!text-orange-400">Restaurant</span>
        </h1>
        <p className="text-gray-700 text-lg">
          Discover the heart of culinary excellence with our expertly crafted dishes,
          warm ambiance, and dedication to quality. Whether you're here for a casual
          bite or a fine dining experience, we’ve got something for every taste.
        </p>
        <button className="bg-orange-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-orange-300 transition duration-300">
          Learn More
        </button>
      </div>

    </div>
  )
}

export default FinalSection
