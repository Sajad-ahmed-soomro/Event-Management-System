// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  registerSponsor,
} = require("../controllers/userController");

router.post("/register", registerUser); // for normal users
router.post("/register/sponsor", registerSponsor); // for sponsors

module.exports = router;
