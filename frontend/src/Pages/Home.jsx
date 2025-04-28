import React from 'react'
import Hero from '../Sections/Hero'
import Presentation from '../Sections/Presentation'
import Cards from '../Sections/cards'
import Recipes from '../Sections/Recipes'
import Footer from '../Components/Footer'
import About from '../Sections/About'
import FinalSection from '../Sections/FinalSection'
import Reserv from '../Sections/reserv'
import FeaturedRecipe from '../Sections/FeatureRecipe'
const Home = () => {
  return (
    <div>
    <Hero/>
   <Presentation/>
   <Cards/>
   <Recipes/>
   <FeaturedRecipe/>
   <About/>
   <FinalSection/>
   <Reserv/>
    </div>
  )
}

export default Home