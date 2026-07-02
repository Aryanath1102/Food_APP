const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  updateFoodController,
  getSingleFoodByIDController,
  getSingleFoodByResturantController,
  deleteFoodController,
} = require("../controllers/FoodController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// routes
// Create Food || POST
router.post(
  "/createFood",
  authMiddleware,
  adminMiddleware,
  createFoodController,
);

// GET Food || GET
router.get("/getFood", authMiddleware, getAllFoodController);

// GET Single Food By ID || GET
router.get("/getFoodBYID/:id", authMiddleware, getSingleFoodByIDController);

// GET Single Food By Resturant || GET
router.get(
  "/getFoodByResturant/:id",
  authMiddleware,
  getSingleFoodByResturantController,
);
// Update Category || PUT
router.put(
  "/updateFood/:id",
  authMiddleware,
  adminMiddleware,
  updateFoodController,
);

// Delete category || DELETE
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteFoodController,
);

module.exports = router;
