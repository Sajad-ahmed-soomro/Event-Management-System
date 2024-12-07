// routes/userRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getUserDashboard } = require("../controllers/userController");
const router = express.Router();
const {
  registerUser,
  registerSponsor,
  loginUser,
} = require("../controllers/userController");
router.post("/login", loginUser); // Add login route
router.post("/register", registerUser); // for normal users
router.post("/register/sponsor", registerSponsor); // for sponsors
router.get("/dashboard", protect, getUserDashboard);
module.exports = router;
