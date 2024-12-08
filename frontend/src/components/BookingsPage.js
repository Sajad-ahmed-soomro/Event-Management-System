import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import styles from '../Styles/BookingsPage.module.css';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        console.log(response.data);  // Log the response data to inspect its structure
  
        const bookingsWithUserDetails = await Promise.all(
          response.data.map(async (booking) => {
            const userId = booking.userId && booking.userId._id ? booking.userId._id : booking.userId;
            if (!userId) {
              throw new Error(`Missing userId for booking ${booking._id}`);
            }
  
            const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
            return {
              ...booking,
              userName: userResponse.data.name,
              userEmail: userResponse.data.email
            };
          })
        );
        
        setBookings(bookingsWithUserDetails);
      } catch (error) {
        setError('Error fetching bookings');
        console.error(error);
      }
    };
  
    fetchBookings();
  }, []);

  const handleCardClick = (bookingId) => {
    navigate(`/booking/${bookingId}`);
  };

  const handleGoBack = () => {
    navigate('/manager');
  };

  return (
    <div className={styles['bookings-page']}>
      <h1>Bookings Management</h1>
      {error && <p>{error}</p>}

      <div className={styles['bookings-container']}>
        {bookings.length === 0 ? (
          <p>No bookings available</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className={styles['booking-card']}
              onClick={() => handleCardClick(booking._id)}
            >
              <h3>{booking.userName}</h3>
              <p>{booking.eventId ? booking.eventId.title : 'No event title available'}</p>
              <p>Status: {booking.bookingStatus}</p>
              <p>Email: {booking.userEmail}</p> {/* Display user email */}
              <div className={styles['actions']}>
                <button>
                  <FaInfoCircle size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className={styles['go-back-btn']} onClick={handleGoBack}>
        Go Back to Events
      </button>
    </div>
  );
};

export default BookingsPage;
