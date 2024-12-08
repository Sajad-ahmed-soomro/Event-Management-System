import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BookEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState(null); // Store event details
  const [ticketType, setTicketType] = useState("Regular"); // Ticket selection
  const [paymentStatus, setPaymentStatus] = useState("Pending"); // Track payment status
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch event details by ID
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${eventId}`
        );
        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const bookingData = {
        eventId,
        userId: "USER_ID_FROM_AUTH", // Replace with actual user ID from authentication
        ticketType,
        paymentStatus: "Pending",
      };

      const bookingResponse = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );
      const { paymentUrl } = bookingResponse.data; // URL to Stripe or PayPal

      setLoading(false);
      window.location.href = paymentUrl; // Redirect to the payment gateway
    } catch (error) {
      setLoading(false);
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <h1>Book Event</h1>
      {eventDetails ? (
        <div>
          <h2>{eventDetails.title}</h2>
          <p>Category: {eventDetails.category}</p>
          <p>Date: {new Date(eventDetails.date).toLocaleDateString()}</p>
          <p>Location: {eventDetails.location}</p>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}

      <div>
        <label htmlFor="ticketType">Select Ticket Type:</label>
        <select
          id="ticketType"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <button onClick={handleBooking} disabled={loading}>
        {loading ? "Processing..." : "Book Now"}
      </button>
    </div>
  );
};

export default BookEvent;
