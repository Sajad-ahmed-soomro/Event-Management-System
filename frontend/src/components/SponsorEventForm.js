import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SponsorEventForm.css"; // Include your custom CSS for this form

const SponsorEventForm = ({ sponsorId }) => {
  const [eventId, setEventId] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch available events
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        console.log("Events fetched:", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve sponsorId from localStorage
    const storedSponsorId = localStorage.getItem("sponsorId");

    const eventData = {
      sponsorId: storedSponsorId,
      eventId,
      contributionAmount,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events/sponsor",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Event sponsored successfully from form:", response.data);
      alert("Event Sponsored Successfully!");
      console.log(storedSponsorId);
      console.log(eventId);
    } catch (err) {
      console.error("Error sponsoring event:", err);
    }
  };

  return (
    <div className="sponsor-event-form-container">
      <div
        style={{ height: "100vh" }}
        className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#fff] to-[#a649a6] animate-gradient blur-2xl -z-10"
      ></div>
      <form onSubmit={handleSubmit} className="sponsor-event-form">
        <h2 className="form-title">Sponsor a New Event</h2>
        <div className="form-group">
          <label>Select Event:</label>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            className="form-input"
          >
            <option value="" disabled>
              Select an event
            </option>
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Contribution Amount:</label>
          <input
            type="number"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Sponsor Event
        </button>
      </form>
    </div>
  );
};

export default SponsorEventForm;
