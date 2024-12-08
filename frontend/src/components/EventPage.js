import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../Styles/EventPage.module.css'; // Add your custom styles

const EventPage = () => {
  const { id } = useParams();  // Get the event ID from the URL
  const navigate = useNavigate();  // Hook to navigate to a different page
  const [event, setEvent] = useState(null);
  const [manager, setManager] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch event details from the backend by ID
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data); // Save event details

        // Fetch manager details using managerId from event
        const managerResponse = await axios.get(`http://localhost:5000/api/managers/${response.data.managerId}`);
        setManager(managerResponse.data); // Save manager details

        // Fetch sponsor details using sponsorIds from event
        const sponsorIds = response.data.sponsors;
        const sponsorResponses = await Promise.all(
          sponsorIds.map(id => axios.get(`http://localhost:5000/api/sponsors/${id}`))
        );
        setSponsors(sponsorResponses.map(res => res.data)); // Save sponsors details
      } catch (err) {
        setError('Error fetching event details');
        console.error(err);
      }
    };

    fetchEvent();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!event || !manager || sponsors.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.eventPage}>
      <h1>{event.title}</h1>
      <div className={styles.eventDetails}>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Manager:</strong> {manager.name}</p> {/* Display Manager's Name */}
        <p><strong>Sponsors:</strong> {sponsors.map(sponsor => sponsor.name).join(', ')}</p> {/* Display Sponsors' Names */}
      </div>

      <div className={styles.actions}>
        {/* Button to View Booking History */}
        <button onClick={() => navigate(`/bookings-history/${id}`)}>View Bookings History</button>
      </div>

      <div className={styles.backButton}>
        <button onClick={() => navigate(`/events`)}>Back to Events</button>
      </div>
    </div>
  );
};

export default EventPage;
