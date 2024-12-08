import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/EditEventPage.css'; // Assuming you have your CSS for styling

const EditEventPage = () => {
  const [event, setEvent] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    managerName: '', // This will be the manager name
    sponsorsNames: [], // This will be the list of sponsors (initialize as an empty array)
    sponsorsIds: [] // Make sure sponsorsIds is part of the state initialization
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the event ID from the URL

  // Fetch event data when component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        console.log('Fetched Event Data:', response.data);  // Log the fetched event data for debugging
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching event data');
        setLoading(false);
      }
    };
    fetchEventData();
  }, [id]);

  // Fetch manager name and sponsor names by their IDs
  useEffect(() => {
    const fetchManagerAndSponsors = async () => {
      try {
        // Fetch Event Manager by ID (from manager's object ID)
        if (event.managerId) {
          const managerResponse = await axios.get(`http://localhost:5000/api/managers/${event.managerId}`);
          console.log('Fetched Manager Data:', managerResponse.data);
          setEvent((prevState) => ({
            ...prevState,
            managerName: managerResponse.data.name,
          }));
        }
  
        // Fetch Sponsors by their IDs
        if (event.sponsors && event.sponsors.length > 0) {
          const sponsorsResponses = await Promise.all(
            event.sponsors.map((sponsorId) =>
              axios.get(`http://localhost:5000/api/sponsors/${sponsorId}`)
            )
          );
          const sponsorsNames = sponsorsResponses.map((response) => response.data.name);
          console.log('Fetched Sponsors Names:', sponsorsNames);
          setEvent((prevState) => ({
            ...prevState,
            sponsorsNames: sponsorsNames,
          }));
        } else {
          console.log('No sponsors found');
        }
      } catch (err) {
        console.error('Error fetching manager or sponsors:', err);
        setError('Error fetching manager or sponsors.');
      }
    };
  
    fetchManagerAndSponsors();
  }, [event.managerId, event.sponsors]); // Depend on event.managerId and event.sponsors
  
  // Handle form input change
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
        managerName: event.managerName,  // Send the manager's name
        sponsorsNames: event.sponsorsNames,  // Send the sponsors' names
      };
      console.log('Before Update Data: ', updatedEvent);

      const response = await axios.put(`http://localhost:5000/api/events/${id}`, updatedEvent);
      console.log('Updated Event Response:', response.data); // Log the updated event response for debugging
      alert('Event updated successfully');
      navigate('/events'); // Redirect to the event management page
    } catch (error) {
      setError('Error updating event');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-event-page">
      <h1>Edit Event</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={event.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={event.date ? event.date.slice(0, 10) : ''} // Ensure the date is in the required format yyyy-MM-dd
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Manager Name</label>
          <input
            type="text"
            name="managerName"
            value={event.managerName} // Manager's name populated here
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
  <label>Sponsors (Comma Separated)</label>
  <input
    type="text"
    name="sponsorsNames"
    value={Array.isArray(event.sponsorsNames) ? event.sponsorsNames.join(', ') : ''} // Show sponsors names as comma-separated
    onChange={(e) => {
      setEvent((prevEvent) => ({
        ...prevEvent,
        sponsorsNames: e.target.value.split(',') // No trimming yet, just split on commas
      }));
    }}
    placeholder="Enter sponsor names separated by commas"
    
  />
</div>



        <button type="submit" className="submit-btn">Update Event</button>
      </form>
    </div>
  );
};

export default EditEventPage;
