import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../Styles/AddResourcePage.module.css';

const AddStaffPage = () => {
  const { id } = useParams(); // Event ID from the URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the backend to add new staff
      const response = await axios.post(`http://localhost:5000/api/resources/staff`, {
        name,
        role,
        contactInfo,
        eventId: id,  // Passing eventId to associate staff with the event
      });

      console.log('Staff added:', response.data);
      navigate(`/manage-resources/${id}`); // Redirect to Manage Resources page
    } catch (err) {
      setError('Error adding staff');
      console.error(err);
    }
  };

  return (
    <div className={styles.addResourcePage}>
      <h1>Add Staff to Event</h1>
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
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Info:</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default AddStaffPage;
