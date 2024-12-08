import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import styles from '../Styles/EventManagementPage.module.css'; // Correct CSS Module import

const EventManagementPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events'); 
        setEvents(response.data); 
      } catch (error) {
        setError('Error fetching events');
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

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

  const handleCardClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles['event-management-page']}>
      <div className={styles.header}>
        <h1>Event Management</h1>
        <div className={styles['search-bar']}>
          <input
            type="text"
            placeholder="Search Events..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles['header-actions']}>
          <button className={styles['add-event-btn']} onClick={() => navigate('/add-event')}>
            <FaPlus size={24} />
          </button>
          <button className={styles['register-manager-btn']} onClick={() => navigate('/register-event-manager')}>
            Register Event Manager
          </button>
        </div>
      </div>

      {error && <p>{error}</p>}

      <div className={styles['events-container']}>
        {filteredEvents.length === 0 ? (
          <p>No events available</p>
        ) : (
          filteredEvents.map((event) => (
            <div 
              key={event._id} 
              className={styles['event-card']} 
              onClick={() => handleCardClick(event._id)} 
            >
              <div className={styles['event-info']}>
                <h2>{event.title}</h2>
                <p>{event.category}</p>
                <p>{formatDate(event.date)}</p>
              </div>
              <div className={styles['event-actions']}>
                <button onClick={(e) => { e.stopPropagation(); handleEdit(event._id); }} className={styles['edit-btn']}>
                  <FaEdit size={20} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(event._id); }} className={styles['delete-btn']}>
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
