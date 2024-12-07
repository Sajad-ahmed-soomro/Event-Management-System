import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../Styles/EditEventPage.css'; // Ensure this CSS file exists and is applied

const EditEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    managerName: '',
    sponsorsNames: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Set loading state to true initially
  const navigate = useNavigate();
  const { id } = useParams(); // Getting event ID from the URL

  // Fetch the event data when the component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);

        // Convert the date to the required format "yyyy-MM-dd"
        const formattedDate = formatDate(response.data.date);

        // Update formData with fetched data
        setFormData({
          title: response.data.title || '',
          category: response.data.category || '',
          date: formattedDate,  // Set the formatted date
          location: response.data.location || '',
          managerName: response.data.managerName || '',
          sponsorsNames: response.data.sponsorsNames || [], // Default to an empty array if undefined
        });

        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching event data');
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchEventData();
  }, [id]);

  // Helper function to format date to "yyyy-MM-dd"
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero if month < 10
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero if day < 10
    return `${year}-${month}-${day}`;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${id}`, formData);
      console.log(response.data);
      alert('Event updated successfully');
      navigate('/events'); // Navigate back to event management page
    } catch (error) {
      setError('Error updating event');
      setLoading(false);
    }
  };

  // Display loading state while waiting for event data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.editEventContainer}>
      <h1>Edit Event</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.eventForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sponsorsNames">Sponsors (Comma Separated)</label>
          <input
            type="text"
            id="sponsorsNames"
            name="sponsorsNames"
            value={formData.sponsorsNames.join(', ')} // Ensure sponsorsNames is not undefined
            onChange={(e) => setFormData({ ...formData, sponsorsNames: e.target.value.split(', ') })}
            required
          />
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button type="submit" className={styles.submitButton}>
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEventPage;
