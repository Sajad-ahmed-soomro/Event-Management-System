import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManagementPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');  // Make sure the URL is correct
        setEvents(response.data);  // Assuming the response returns an array of events
      } catch (error) {
        setError('Error fetching events');
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Event Management</h1>
      {error && <p>{error}</p>}
      <div className="events-container">
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map(event => (
            <div key={event._id} className="event-card">
              <h2>{event.title}</h2>
              <p>{event.category}</p>
              <p>{event.date}</p>
              {/* Render other event details */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventManagementPage;
