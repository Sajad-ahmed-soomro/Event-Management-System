const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

router.post("/", async (req, res) => {
  try {
    const { eventId, userId, ticketType } = req.body;

    // Create a booking in the database
    const booking = await Booking.create({
      eventId,
      userId,
      ticketType,
      paymentStatus: "Pending",
      bookingStatus: "Pending",
    });

    // Generate a Stripe payment session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Ticket for Event ID: ${eventId}`,
            },
            unit_amount: ticketType === "VIP" ? 5000 : 2000, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?bookingId=${booking._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel?bookingId=${booking._id}`,
    });

    // Return payment URL
    res.status(201).json({ paymentUrl: session.url });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
