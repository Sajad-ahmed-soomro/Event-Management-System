const express = require("express");
const {
  registerSponsor,
  loginSponsor,
  getSponsorshipRequests,
  makePayment,
  getPaymentStatus,
} = require("../controllers/sponsorController");
const { Sponsorprotect } = require("../middleware/sponsorMiddleware");
const router = express.Router();
router.post("/login", loginSponsor);
router.get("/requests", Sponsorprotect, getSponsorshipRequests);
router.post("/make-payment", Sponsorprotect, makePayment);
router.get("/payment-status", Sponsorprotect, getPaymentStatus);
module.exports = router;
