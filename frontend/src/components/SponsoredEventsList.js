import React, { useEffect, useState } from "react";
import axios from "axios";

const SponsoredEventsList = ({ sponsorId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSponsoredEvents = async () => {
      try {
        const response = await axios.get(
          `/api/sponsors/${sponsorId}/sponsored-events`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching sponsored events:", error);
      }
    };

    fetchSponsoredEvents();
  }, [sponsorId]);

  return (
    <div>
      <h2>Sponsored Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            Event ID: {event.eventId} | Contribution: {event.contributionAmount}{" "}
            | Status: {event.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SponsoredEventsList;
