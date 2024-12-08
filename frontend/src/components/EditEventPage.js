import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/EditEventPage.css';

const EditEventPage = () => {
  const [event, setEvent] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    managerName: '', // Manager name
    sponsorsNames: [], // List of sponsors
    sponsorsIds: [] // Sponsor IDs
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Event ID from URL

  // Fetch event data when component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching event data');
        setLoading(false);
      }
    };
    fetchEventData();
  }, [id]);

  // Fetch manager and sponsor names
  useEffect(() => {
    const fetchManagerAndSponsors = async () => {
      try {
        if (event.managerId) {
          const managerResponse = await axios.get(`http://localhost:5000/api/managers/${event.managerId}`);
          setEvent((prevState) => ({
            ...prevState,
            managerName: managerResponse.data.name,
          }));
        }
  
        if (event.sponsors && event.sponsors.length > 0) {
          const sponsorsResponses = await Promise.all(
            event.sponsors.map((sponsorId) =>
              axios.get(`http://localhost:5000/api/sponsors/${sponsorId}`)
            )
          );
          const sponsorsNames = sponsorsResponses.map((response) => response.data.name);
          setEvent((prevState) => ({
            ...prevState,
            sponsorsNames: sponsorsNames,
          }));
        }
      } catch (err) {
        setError('Error fetching manager or sponsors.');
      }
    };
  
    fetchManagerAndSponsors();
  }, [event.managerId, event.sponsors]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value
    }));
  };

  // Handle form submission for event update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedEvent = {
        title: event.title,
        category: event.category,
        date: event.date,
        location: event.location,
        managerName: event.managerName,
        sponsorsNames: event.sponsorsNames,
      };
      const response = await axios.put(`http://localhost:5000/api/events/${id}`, updatedEvent);
      console.log(response);
      alert('Event updated successfully');
      navigate('/manager'); // Redirect to the manager page
    } catch (error) {
      setError('Error updating event');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="editEventContainer">
      <h1>Edit Event</h1>
      {error && <p className="errorMessage">{error}</p>}
      <form onSubmit={handleSubmit} className="eventForm">
        <div className="formGroup">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={event.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={event.date ? event.date.slice(0, 10) : ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Manager Name</label>
          <input
            type="text"
            name="managerName"
            value={event.managerName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Sponsors (Comma Separated)</label>
          <input
            type="text"
            name="sponsorsNames"
            value={Array.isArray(event.sponsorsNames) ? event.sponsorsNames.join(', ') : ''}
            onChange={(e) => {
              setEvent((prevEvent) => ({
                ...prevEvent,
                sponsorsNames: e.target.value.split(',') // Split sponsors names by comma
              }));
            }}
            placeholder="Enter sponsor names separated by commas"
          />
        </div>

        <button type="submit" className="submitButton">Update Event</button>
      </form>
      <button 
        type="button" 
        className="goBackButton" 
        onClick={() => navigate('/manager')}>
        Go Back to Events
      </button>
    </div>
  );
};

export default EditEventPage;
