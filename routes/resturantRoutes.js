const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createResturantController,
  GetAllResturantController,
  GetResturantController,
} = require("../controllers/resturantController");

const router = express.Router();

// routes
// Create Resturant || PUSH

router.post("/create", authMiddleware, createResturantController);

// Get all Resturant || GET
router.get("/getAll", authMiddleware, GetAllResturantController);

// Get  A Resturant

router.get("/get/:id", authMiddleware, GetResturantController);

// Delete A Resturant || DELETE
router.get("/deleteResturant/:id", authMiddleware);

module.exports = router;
