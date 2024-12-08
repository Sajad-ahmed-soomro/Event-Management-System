const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User"); // Import User model
const Event = require("../models/Event"); // Import Event model
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

// POST route to handle event booking
router.post("/", async (req, res) => {
  console.log("Request received from frontend:");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  try {
    const { eventId, userId, ticketType } = req.body;
    const user1 = await User.findById(userId).populate("profile.bookedEvents");
    console.log("USER KIIII IDDD", user1.profile.bookedEvents);
    // Find the event by eventId
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a booking in the database
    const booking = await Booking.create({
      eventId,
      userId,
      ticketType,
      paymentStatus: "Pending",
      bookingStatus: "Pending",
    });

    // Add event to user's bookedEvents array
    user.profile.bookedEvents.push(eventId);

    // Save the updated user document
    await user.save();

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
