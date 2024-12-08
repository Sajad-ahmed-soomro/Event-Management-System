import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../Styles/ManageResourcesPage.module.css';

const ManageResourcesPage = () => {
  const { id } = useParams(); // Event ID
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const [staffResponse, equipmentResponse, venuesResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/resources/staff/event/${id}`),
          axios.get(`http://localhost:5000/api/resources/equipment/event/${id}`),
          axios.get(`http://localhost:5000/api/resources/venues/event/${id}`),
        ]);
        setStaff(staffResponse.data);
        setEquipment(equipmentResponse.data);
        setVenues(venuesResponse.data);
      } catch (err) {
        setError('Error fetching resources');
        console.error(err);
      }
    };

    fetchResources();
  }, [id]);

  const handleAddStaff = () => {
    navigate(`/add-staff/${id}`);
  };

  const handleAddEquipment = () => {
    navigate(`/add-equipment/${id}`);
  };

  const handleAddVenue = () => {
    navigate(`/add-venue/${id}`);
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/staff/${staffId}`);
      setStaff(staff.filter((member) => member._id !== staffId));
    } catch (err) {
      console.error('Error deleting staff', err);
      setError('Error deleting staff');
    }
  };

  const handleDeleteEquipment = async (equipmentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/equipment/${equipmentId}`);
      setEquipment(equipment.filter((item) => item._id !== equipmentId));
    } catch (err) {
      console.error('Error deleting equipment', err);
      setError('Error deleting equipment');
    }
  };

  const handleDeleteVenue = async (venueId) => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/venue/${venueId}`);
      setVenues(venues.filter((venue) => venue._id !== venueId));
    } catch (err) {
      console.error('Error deleting venue', err);
      setError('Error deleting venue');
    }
  };

  const handleGoBack = () => {
    navigate(`/event/${id}`);
  };

  return (
    <div className={styles.manageResourcesPage}>
      <h1>Manage Resources for Event</h1>
      {error && <p>{error}</p>}

      <div className={styles.resourceSection}>
        {/* Staff Section */}
        <div className={styles.resourceCardContainer}>
          <h2>Staff</h2>
          <button onClick={handleAddStaff} className={styles.addButton}>Add Staff</button>
          <div className={styles.resourceList}>
            {staff.map((member) => (
              <div key={member._id} className={styles.resourceCard}>
                <p>{member.name} ({member.role})</p>
                <button onClick={() => handleDeleteStaff(member._id)} className={styles.deleteButton}>🗑️</button>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Section */}
        <div className={styles.resourceCardContainer}>
          <h2>Equipment</h2>
          <button onClick={handleAddEquipment} className={styles.addButton}>Add Equipment</button>
          <div className={styles.resourceList}>
            {equipment.map((item) => (
              <div key={item._id} className={styles.resourceCard}>
                <p>{item.name} - {item.type}</p>
                <button onClick={() => handleDeleteEquipment(item._id)} className={styles.deleteButton}>🗑️</button>
              </div>
            ))}
          </div>
        </div>

        {/* Venues Section */}
        <div className={styles.resourceCardContainer}>
          <h2>Venues</h2>
          <button onClick={handleAddVenue} className={styles.addButton}>Add Venue</button>
          <div className={styles.resourceList}>
            {venues.map((venue) => (
              <div key={venue._id} className={styles.resourceCard}>
                <p>{venue.name} - Capacity: {venue.capacity}</p>
                <button onClick={() => handleDeleteVenue(venue._id)} className={styles.deleteButton}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Go Back Button */}
      <div className={styles.goBackButtonContainer}>
        <button onClick={handleGoBack} className={styles.goBackButton}>Back to Event</button>
      </div>
    </div>
  );
};

export default ManageResourcesPage;
