import React, { useEffect, useState } from "react";
import axios from "axios";

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
          // {
          //   headers: {
          //     Authorization: `Bearer ${localStorage.getItem("token")}`,
          //   },
          // }
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
    <div>
      <h2>Sponsored Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.eventId.title}</h3>
            <p>
              <strong>Category:</strong> {event.eventId.category}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.eventId.date).toDateString()}
            </p>
            <p>
              <strong>Location:</strong> {event.eventId.location}
            </p>
            <p>
              <strong>Status:</strong> {event.status}
            </p>
            <p>
              <strong>Approval Status:</strong> {event.eventId.approvalStatus}
            </p>
            <p>
              <strong>Popularity:</strong> {event.eventId.popularity}
            </p>
            <p>
              <strong>Ticket Availability:</strong>{" "}
              {event.eventId.ticketAvailability ? "Available" : "Sold Out"}
            </p>
            <p>
              <strong>Sponsors:</strong>{" "}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SponsoredEventsList;
