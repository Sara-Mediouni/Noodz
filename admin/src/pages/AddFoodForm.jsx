import React, { useState } from 'react';
import axios from 'axios';

const AddFoodForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    recipeOfTheDay: false,
    bestDish:false,
    ingredients: '',
    steps: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
  
    setFormData((prev) => {
      const updated = { ...prev, [name]: val };
      if (name === "recipeOfTheDay") {
        console.log("Checked:", checked, "| Updated Value:", updated.recipeOfTheDay);
      }
      return updated;
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        data.append(key, value);
      }
    });

    try {
      await axios.post('http://localhost:4000/api/food/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Dish Added Successfully');
    } catch (err) {
      console.error('Error uploading dish:', err);
      alert('Error uploading dish');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Dish</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champs classiques */}
        {['name', 'description', 'price'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize font-medium">{field}</label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        {/* Catégories */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
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
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Checkbox Recipe of the Day */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="recipeOfTheDay"
            checked={formData.recipeOfTheDay}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Recipe of the Day</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="bestDish"
            checked={formData.bestDish}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Best Dish</label>
        </div>
        {/* Recipe fields (conditionally visible) */}
        {formData.recipeOfTheDay && (
          <>
            <div>
              <label className="block mb-1 font-medium">Ingredients (comma separated)</label>
              <input
              
                type="text"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Steps</label>
              <textarea
              required
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 font-medium">Duration</label>
              <input
              required
                type="text"
                name="duration"
                value={formData.duration}
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
          Add Dish
        </button>
      </form>
    </div>
  );
};

export default AddFoodForm;
