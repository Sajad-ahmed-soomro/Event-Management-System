const express = require("express");
const {
  registerSponsor,
  loginSponsor,
} = require("../controllers/sponsorController");
const router = express.Router();
router.post("/login", loginSponsor);

module.exports = router;
