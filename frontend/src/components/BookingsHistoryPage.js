import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import styles from '../Styles/BookingsPage.module.css';

const BookingsHistoryPage = () => {
  const { eventId } = useParams();  // Get the eventId from the URL
  const [bookings, setBookings] = useState([]);
  const [eventName, setEventName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bookings for a specific event
    const fetchBookings = async () => {
      try {
        // Fetch bookings for the event by eventId
        const response = await axios.get(`http://localhost:5000/api/bookings/event/${eventId}`);
        
        const bookingsWithUserDetails = await Promise.all(
          response.data.map(async (booking) => {
            const userId = booking.userId && booking.userId._id ? booking.userId._id : booking.userId;
            if (!userId) {
              throw new Error(`Missing userId for booking ${booking._id}`);
            }

            const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
            
            // Format the booking date
            const bookingDate = new Date(booking.timestamp);
            const formattedDate = bookingDate.toLocaleDateString(); // Format the date to a readable string

            return {
              ...booking,
              userName: userResponse.data.name,
              userEmail: userResponse.data.email,
              formattedDate,
            };
          })
        );

        setBookings(bookingsWithUserDetails);

        // Fetch event name by eventId
        const eventResponse = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEventName(eventResponse.data.title); // Set the event name
      } catch (error) {
        setError('Error fetching bookings');
        console.error(error);
      }
    };

    fetchBookings();
  }, [eventId]);


  const handleGoBack = () => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className={styles['bookings-page']}>
      <h1>Bookings History for Event: {eventName}</h1>
      {error && <p>{error}</p>}

      <div className={styles['bookings-container']}>
        {bookings.length === 0 ? (
          <p>No bookings available for this event</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className={styles['booking-card']}
            >
              <h3>{booking.userName}</h3>
              <p><strong>Email:</strong> {booking.userEmail}</p>
              <p><strong>Status:</strong> {booking.bookingStatus}</p>
              <p><strong>Booking Date:</strong> {booking.formattedDate}</p> {/* Display formatted date */}
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
        Back to Event
      </button>
    </div>
  );
};

export default BookingsHistoryPage;
