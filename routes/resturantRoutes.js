const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createResturantController,
  GetAllResturantController,
  GetResturantController,
  DeleteResturantController,
} = require("../controllers/resturantController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// routes
// Create Resturant || PUSH

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  createResturantController,
);

// Get all Resturant || GET
router.get(
  "/getAll",
  authMiddleware,
  adminMiddleware,
  GetAllResturantController,
);

// Get  A Resturant

router.get("/get/:id", authMiddleware, adminMiddleware, GetResturantController);

// Delete A Resturant || DELETE
router.delete(
  "/deleteResturant/:id",
  authMiddleware,
  adminMiddleware,
  DeleteResturantController,
);

module.exports = router;
