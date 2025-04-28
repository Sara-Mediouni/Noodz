const express = require("express");
const router = express.Router();

const {
  addFood,
  deleteFood,
  filterFood,
  getAllCategories,
  updateFood,
  getAllFoods,
  getRecipeOfTheDay,
  getBest,
  getFood
} = require("../Controllers/FoodController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${file.originalname}`),
});

const upload = multer({ storage: storage });

router.get("/", getAllFoods);
router.get('/getallcategories',getAllCategories);
router.get("/:category", filterFood);
router.get('/recipe', getRecipeOfTheDay);
router.get('/bestdishes',getBest);
router.get("/:id", getFood);
// Ajouter un plat
router.post("/", upload.single("image"), addFood);

// Supprimer un plat
router.delete("/:id", deleteFood);



// Mettre à jour un plat
router.put("/:id", updateFood);

console.log('Routes loaded');

module.exports = router;
