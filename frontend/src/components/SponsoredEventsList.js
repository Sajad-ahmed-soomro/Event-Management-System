import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SponsoredEventsList.css"; // Include your custom CSS for this page

const SponsoredEventsList = ({ sponsorId }) => {
  // Fallback to localStorage if sponsorId is not passed as a prop
  const resolvedSponsorId = sponsorId || localStorage.getItem("sponsorId");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSponsoredEvents = async () => {
      try {
        console.log("Resolved Sponsor ID:", resolvedSponsorId);

        const response = await axios.get(
          `http://localhost:5000/api/sponsors/${resolvedSponsorId}/sponsored-events`
        );
        console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching sponsored events:", error);
      }
    };

    if (resolvedSponsorId) {
      fetchSponsoredEvents();
    } else {
      console.error("No sponsor ID found.");
    }
  }, [resolvedSponsorId]);

  return (
    <div className="sponsored-events-container">
      <div
        style={{ height: "100vh" }}
        className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#fff] to-[#a649a6] animate-gradient blur-2xl -z-10"
      ></div>
      <h2 className="section-title">Sponsored Events</h2>
      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <h3 className="event-title">{event.eventId.title}</h3>
            <p className="event-category">
              <strong>Category:</strong> {event.eventId.category}
            </p>
            <p className="event-date">
              <strong>Date:</strong>{" "}
              {new Date(event.eventId.date).toDateString()}
            </p>
            <p className="event-location">
              <strong>Location:</strong> {event.eventId.location}
            </p>
            <p className="event-status">
              <strong>Status:</strong> {event.status}
            </p>
            <p className="event-approval-status">
              <strong>Approval Status:</strong> {event.eventId.approvalStatus}
            </p>
            <p className="event-popularity">
              <strong>Popularity:</strong> {event.eventId.popularity}
            </p>
            <p className="event-ticket-availability">
              <strong>Ticket Availability:</strong>{" "}
              {event.eventId.ticketAvailability ? "Available" : "Sold Out"}
            </p>
            <p className="event-sponsors">
              <strong>Sponsors:</strong>
              {event.eventId.sponsors && event.eventId.sponsors.length > 0 ? (
                <ul>
                  {event.eventId.sponsors.map((sponsor, index) => (
                    <li key={index}>{sponsor}</li>
                  ))}
                </ul>
              ) : (
                "No sponsors"
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsoredEventsList;
