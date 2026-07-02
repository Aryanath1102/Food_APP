const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();

// routes
// Create Category || POST
router.post("/createCategory", authMiddleware, createCategoryController);

// GET Category || GET
router.get("/getCategory", authMiddleware, getCategoryController);

// Update Category || PUT
router.put("/updateCategory/:id", authMiddleware, updateCategoryController);

// Delete category || DELETE
router.delete("/deleteCategory/:id", authMiddleware, deleteCategoryController);

module.exports = router;
