import React, { useState, useEffect } from "react";
import axios from "axios";

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

    const eventData = {
      sponsorId,
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
      console.log("Event sponsored successfully:", response.data.message);
      console.log("Updated sponsor:", response.data.sponsor);
      console.log("Updated event:", response.data.event);
      alert("Event Sponsored Successfully!");
    } catch (err) {
      console.error("Error sponsoring event:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sponsor a New Event</h2>
      <div>
        <label>Select Event:</label>
        <select
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
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
      <div>
        <label>Contribution Amount:</label>
        <input
          type="number"
          value={contributionAmount}
          onChange={(e) => setContributionAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sponsor Event</button>
    </form>
  );
};

export default SponsorEventForm;
