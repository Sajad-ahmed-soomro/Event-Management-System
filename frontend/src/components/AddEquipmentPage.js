import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../Styles/AddResourcePage.module.css';

const AddEquipmentPage = () => {
  const { id } = useParams(); // Event ID from the URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/resources/equipment`, {
        name,
        quantity,
        condition,
        eventId: id, 
      });
      console.log('Equipment added:', response.data);
      navigate(`/manage-resources/${id}`);
    } catch (err) {
      setError('Error adding equipment');
      console.error(err);
    }
  };

  return (
    <div className={styles.addResourcePage}>
      <h1>Add Equipment to Event</h1>
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
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Condition:</label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Equipment</button>
      </form>
    </div>
  );
};

export default AddEquipmentPage;
