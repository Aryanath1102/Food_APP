const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  placeOrderControoler,
  orderStatusController,
} = require("../controllers/orderController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Place Order  || POST
router.post("/placeOrder", authMiddleware, placeOrderControoler);
// Order status || POST
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController,
);
module.exports = router;
