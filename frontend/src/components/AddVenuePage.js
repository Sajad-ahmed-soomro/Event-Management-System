import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../Styles/AddResourcePage.module.css';

const AddVenuePage = () => {
  const { id } = useParams(); // Event ID from the URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/resources/venues`, {
        name,
        location,
        capacity,
        eventId: id, 
      });
      console.log('Venue added:', response.data);
      navigate(`/manage-resources/${id}`);
    } catch (err) {
      setError('Error adding venue');
      console.error(err);
    }
  };

  return (
    <div className={styles.addResourcePage}>
      <h1>Add Venue to Event</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Venue</button>
      </form>
    </div>
  );
};

export default AddVenuePage;
