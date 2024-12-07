import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Importing icons
import '../Styles/EventManagementPage.module.css'; // Import your CSS file for custom styling

const EventManagementPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter events based on the search query
  const filteredEvents = events.filter((event) => {
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Navigate to Edit Event Page
  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  // Handle Delete Event with Confirmation
  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      axios
        .delete(`http://localhost:5000/api/events/${eventId}`)
        .then((response) => {
          setEvents(events.filter((event) => event._id !== eventId));
          alert('Event deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting event', error);
        });
    }
  };

  // Helper function to format date to "yyyy-MM-dd"
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero if month < 10
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero if day < 10
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="event-management-page">
      <div className="header">
        <h1>Event Management</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Events..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button className="add-event-btn" onClick={() => navigate('/add-event')}>
          <FaPlus size={24} />
        </button>
      </div>

      {error && <p>{error}</p>}

      <div className="events-container">
        {filteredEvents.length === 0 ? (
          <p>No events available</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-info">
                <h2>{event.title}</h2>
                <p>{event.category}</p>
                <p>{formatDate(event.date)}</p> {/* Format the date here */}
              </div>
              <div className="event-actions">
                <button onClick={() => handleEdit(event._id)} className="edit-btn">
                  <FaEdit size={20} />
                </button>
                <button onClick={() => handleDelete(event._id)} className="delete-btn">
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventManagementPage;
