const foodModel = require('../Models/Dish');


// Ajouter un plat
const addFood = async (req, res) => {
  try {  console.log(req.body)
    let image_filename=`${req.file.filename}`;
  
    const newFood = new foodModel
    ({ name:req.body.name,
       description:req.body.description,
       price:req.body.price,
       category:req.body.category,
       image:image_filename,
       bestDish:req.body.bestDish,
       recipeOfTheDay:req.body.recipeOfTheDay,
      recipe: req.body.recipeOfTheDay === 'true' ? {
  ingredients: req.body.ingredients?.split(','),
  steps: req.body.steps,
  duration: req.body.duration
} : null });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un plat
const deleteFood = async (req, res) => {
  try {
    const deletedFood = await foodModel.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.json({ message: 'Plat supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error });
  }
};

// Mettre à jour un plat
const updateFood = async (req, res) => {
  try {
    const updatedFood = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.json({ message: 'Plat mis à jour avec succès', food: updatedFood });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
};

// Récupérer tous les plats
const getAllFoods = async (req, res) => {
   try {
     const foods = await foodModel.find();
     res.json(foods);
   } catch (error) {
     res.status(500).json({ message: 'Erreur lors de la récupération des plats', error });
   }
 };
 const filterFood = async (req, res) => {
  try {
    const filter=req.params.category;
    const foods = await foodModel.find({category:filter});
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des plats', error });
  }
};
const getRecipeOfTheDay = async (req, res) => {
  try {
    const allRecipes = await foodModel.find({ recipeOfTheDay: true });

    if (!allRecipes.length) {
      return res.status(404).json({ message: "No recipe of the day available." });
    }

    // Créer un seed basé sur la date actuelle (format AAAA-MM-JJ)
    const today = new Date().toISOString().split('T')[0]; // ex: '2025-04-25'
    const hash = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Sélectionner une recette basée sur le "hash"
    const index = hash % allRecipes.length;
    const todayRecipe = allRecipes[index];

    res.json(todayRecipe);
  } catch (error) {
    console.error("Error fetching recipe of the day:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const getBest = async (req, res) => {
  try {
    const allRecipes = await foodModel.find({ bestDish: true });

    if (allRecipes.length === 0) {
      return res.status(404).json({ message: "No best dishes available." });
    }

    // Créer un seed basé sur la date (AAAA-MM-JJ)
    const today = new Date().toISOString().split('T')[0];

    // Fonction de shuffle déterministe
    function seededShuffle(array, seed) {
      let arr = [...array];
      let hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);

      for (let i = arr.length - 1; i > 0; i--) {
        const j = hash % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        hash = (hash * 16807) % 2147483647; // Random number generator (Lehmer)
      }
      return arr;
    }

    const shuffled = seededShuffle(allRecipes, today);

    const bestDishes = shuffled.slice(0, 3); // Prend les 3 premiers

    res.json(bestDishes);
  } catch (error) {
    console.error("Error fetching best dishes:", error);
    res.status(500).json({ message: "Server error." });
  }
};


const getAllCategories = async (req, res) => {
  try {
    
    
    // Utilisation de .lean() pour obtenir des objets JavaScript simples
    const dishes = await foodModel.find().lean(); 
    console.log(dishes);
    

    const uniqueCategories = dishes.reduce((acc, dish) => {
      if (dish.category && !acc.includes(dish.category)) {
        acc.push(dish.category);
      }
      return acc;
    }, []);

    res.status(200).json(uniqueCategories );
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des plats', error });
  }
};
const getFood=async(req,res)=>{
   try
   { 
    const id=req.params.id;
    const food=await foodModel.findById(id);
    res.status(200).json(food);
    }
    catch(error){
      res.status(500).json({ message: 'Error getting the dish', error });
    }
}
 module.exports = {
   addFood,
   deleteFood,
   updateFood,
   getAllFoods,
   filterFood,
   getBest,
   getAllCategories,
   getRecipeOfTheDay,
   getFood
 };