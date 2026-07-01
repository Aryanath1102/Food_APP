const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();

// routes
// Create Category
router.post("/createCategory", authMiddleware, createCategoryController);

module.exports = router;
