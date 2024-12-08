// src/components/EventDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./EventDetails.css"; // Add your styles here

const EventDetails = () => {
  const [events, setEvent] = useState([]);

  useEffect(() => {
    // Fetch available events
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        console.log("Events fetched:", response.data);

        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-list">
      <div
        style={{ height: "100vh" }}
        className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#fff] to-[#a649a6] animate-gradient blur-2xl -z-10"
      ></div>
      <h1>Events </h1>
      <div className="events-container">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-item">
              <h2>{event.title}</h2> {/* Display event title */}
              <p>Category: {event.category}</p> {/* Display event category */}
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
