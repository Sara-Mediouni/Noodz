import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditFoodForm = () => {
  const [food, setFood] = useState();
  const foodId=localStorage.getItem('FoodId')
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFood((prev) => ({ ...prev, [name]: val }));
  };

 
  const getFood=()=>{
    axios.get(`http://localhost:4000/api/food/${foodId}`)
  .then((res)=>
    {console.log(res.data);
        setFood(res.data)})

  .catch((error)=>toast.error('Error Adding the dish',error))
  }
  const updateFood=async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:4000/api/food/${foodId}`,food)
  .then((res)=>
    {console.log(res);
        toast.success('Dish updated successfully!')})
  .catch((error)=>toast.error('Error updating the dish',error))
  }
useEffect(()=>{
getFood()
},[])
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Dish</h2>
      <form onSubmit={(e)=>updateFood(e)} className="space-y-4">
        {/* Champs classiques */}
        {['name', 'description', 'price'].map((field) => (
           
          <div key={field}> 
          {food &&
           <> <label className="block mb-1 capitalize font-medium">{field}</label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              value={food[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            /></>}
          </div>
        ))}

        {/* Catégories */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={food?.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select a category --</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Drink">Drink</option>
            <option value="Salad">Salad</option>
            <option value="Soup">Soup</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Pasta">Pasta</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <img
            
            src={`http://localhost:4000/uploads/${food?.image}`}
            className="w-[100px] px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Checkbox Recipe of the Day */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="recipeOfTheDay"
            checked={food?.recipeOfTheDay}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Recipe of the Day</label>
        </div>

        {/* Recipe fields (conditionally visible) */}
        {food?.recipeOfTheDay && (
          <>
            <div>
              <label className="block mb-1 font-medium">Ingredients (comma separated)</label>
              <input
                type="text"
                name="ingredients"
                value={food?.recipe.ingredients}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Steps</label>
              <textarea
                name="steps"
                value={food?.recipe.steps}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 font-medium">Duration</label>
              <input
                type="text"
                name="duration"
                value={food.duration}
                onChange={handleChange}
                placeholder="e.g. 25 minutes"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-orange-300 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Edit Dish
        </button>
      </form>
    </div>
  );
};

export default EditFoodForm;
