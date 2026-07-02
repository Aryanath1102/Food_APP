const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// routes
// Create Category || POST
router.post("/createFood", authMiddleware);

// GET Category || GET

// Update Category || PUT

// Delete category || DELETE

module.exports = router;
