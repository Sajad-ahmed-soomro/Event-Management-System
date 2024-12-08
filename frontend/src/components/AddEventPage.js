import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/eventService';
import styles from '../Styles/AddEventPage.module.css'; 

const AddEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    managerName: '',  // Change managerId to managerName
    sponsorsNames: [],  // Change sponsors to sponsorsNames
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.date || !formData.location || !formData.managerName) {
      setError('All fields are required!');
      return;
    }

    try {
      const eventData = {
        title: formData.title,
        category: formData.category,
        date: formData.date,
        location: formData.location,
        managerName: formData.managerName,  // Send manager name
        sponsorsNames: formData.sponsorsNames,  // Send sponsors' names
      };

      console.log("Event Data:", eventData);

      const response = await createEvent(eventData);
      console.log("Response from API:", response);

      if (response.message === 'Event created and awaiting approval') {
        navigate('/manager');
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setError('Error creating event. Please try again.');
    }
  };

  // Function to navigate to /manager when the button is clicked
  const handleGoBackToManager = () => {
    navigate('/manager');
  };

  return (
    <div className={styles.addEventContainer}>
      <h1>Add New Event</h1>
      <form onSubmit={handleSubmit} className={styles.eventForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="managerName">Manager Name</label>
          <input
            type="text"
            id="managerName"
            name="managerName"
            value={formData.managerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sponsorsNames">Sponsors (Comma Separated)</label>
          <input
            type="text"
            id="sponsorsNames"
            name="sponsorsNames"
            value={formData.sponsorsNames.join(', ')}
            onChange={(e) => setFormData({ ...formData, sponsorsNames: e.target.value.split(', ') })}
          />
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button type="submit" className={styles.submitButton}>
          Create Event
        </button>
      </form>

      {/* Green Go Back Button */}
      <button
        onClick={handleGoBackToManager}
        className={styles.goBackButton}
      >
        Go Back to Events
      </button>
    </div>
  );
};

export default AddEventPage;
