const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

// routes
// Create Category || POST
router.post(
  "/createCategory",
  authMiddleware,
  adminMiddleware,
  createCategoryController,
);

// GET Category || GET
router.get(
  "/getCategory",
  authMiddleware,
  adminMiddleware,
  getCategoryController,
);

// Update Category || PUT
router.put(
  "/updateCategory/:id",
  authMiddleware,
  adminMiddleware,
  updateCategoryController,
);

// Delete category || DELETE
router.delete(
  "/deleteCategory/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategoryController,
);

module.exports = router;
