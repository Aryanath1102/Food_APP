const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// routes
// Get User || GET

router.get("/getUser", authMiddleware, getUserController);

// Update User || PUT

router.put("/updateUser", authMiddleware, updateUserController);

// Update Password || PUT

router.put("/updatePassword", authMiddleware, updateUserController);

// Reset Password || POST

router.put("/resetPassword", authMiddleware, resetPasswordController);

//  Delete User || DELETE

router.put("/deletePassword", authMiddleware, deleteUserController);

module.exports = router;
