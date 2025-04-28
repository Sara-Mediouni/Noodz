import React, { useEffect, useState } from 'react';
import axios from 'axios'
import categoryImages from '../data/CategoryImage';
import { Pagination } from '../Components/Pagination';

const Menu = () => {
  const [category, setCategory] = useState("")
  const [Food, setFood] = useState([])
  const [Categories, setCategories] = useState()
  const [currentDishes, setcurrentDishes] = useState([])
  const DishesPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Food.length / DishesPerPage); // ou selon le total de tes données
  const indexOfLastDish = currentPage * DishesPerPage;
  const indexOfFirstResort = indexOfLastDish - DishesPerPage;



const handleNextPage = () => {
 if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};

const handlePrevPage = () => {
 if (currentPage > 1) setCurrentPage(currentPage - 1);
};

const handlePageChange = (page) => {
 setCurrentPage(page);
};



 const handleChange=(category)=>{
    setCategory(category);
    console.log(category)

  }  
  const getFood=()=>{
    axios.get(`http://localhost:4000/api/food/${category}`)
    .then((response)=>{
      console.log(response);
      setFood(response.data)
    }).catch((error)=>{
      console.log('Error',error)
    })
  }
  const getCategories=()=>{
    axios.get(`http://localhost:4000/api/food/getallcategories`)
    .then((response)=>{
      console.log(response);
      setCategories(response.data)
    }).catch((error)=>{
      console.log('Error',error)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      await getFood();
      await getCategories();
    };
  
    fetchData();
  }, [category]);
  
  useEffect(() => {
    // Quand Food est mis à jour
    setcurrentDishes(Food.slice(indexOfFirstResort, indexOfLastDish));
  }, [Food]);
  
  return ( 
    <div>
      <div className='menu w-full flex items-center justify-start py-50 px-30'>
        <h1 className="text-6xl font-bold p-10 !text-white text-start ">Our Menu</h1>
      </div>

      <div className="mt-40 mx-10 md:mx-20">
   
        {/* Category section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {Categories?.map((category, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center transition-transform transform hover:scale-110 duration-300"
            >
              <img
                onClick={()=>handleChange(category)}
                src={categoryImages[category]}
                alt={category}
                className="border-orange-300 border-8 w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
              />
              <h2 className="mt-4 text-xl font-semibold">{category}</h2>
              <p className="text-center mt-2 text-sm md:text-base text-gray-600">
                {category} specials and best dishes just for you.
              </p>
            </div>
          ))}
        </div>

        {/* Menu items */}
        <div className="grid md:grid-cols-3 gap-10 mt-40">
          {currentDishes?.map((item, index) => (
            <div
              key={index}
              className="relative my-10 bg-orange-200 rounded-2xl p-6 pt-10 pb-24 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={`http://localhost:4000/uploads/${item.image}`}
                alt="dish"
                className="rounded-full border-8 border-orange-300 absolute -top-16 right-6 w-28 h-28 object-cover"
              />
              <div className="flex flex-col gap-4 mt-6">
                <ul className="font-bold text-xl md:text-2xl space-y-2">
                  <li>{item.name}</li>
                  
                  <li>${item.price}</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
             {/* <button className="absolute bottom-4 right-4 bg-orange-300 text-white font-bold rounded-2xl px-4 py-2 hover:bg-orange-400 transition-colors duration-200">
                Order now
              </button>*/}
            </div>
          ))}
        </div>
      </div>
      <div className="flex  justify-center items-center relative h-full py-20  w-full">
          <Pagination
         currentPage={currentPage}
         totalPages={totalPages}
         handleNextPage={handleNextPage}
         handlePrevPage={handlePrevPage}
         handlePageChange={handlePageChange}
       />
       
       </div>
    </div>
  );
};

export default Menu;
