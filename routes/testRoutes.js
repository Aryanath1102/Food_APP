const express = require("express");
const { testUserController } = require("../controllers/testController");

// Router object
const router = express.Router();

// Routes GET | POST | PUT | DELETE
router.get("/test-user", testUserController);

module.exports = router;
