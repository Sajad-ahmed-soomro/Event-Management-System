import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import styles from '../Styles/BookingDetailsPage.module.css';

const BookingDetailsPage = () => {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/${id}`);
        setBooking(response.data);
      } catch (error) {
        setError('Error fetching booking details');
        console.error(error);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleUpdateStatus = async (status) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${id}`, { bookingStatus: status });
      setBooking((prev) => ({ ...prev, bookingStatus: status }));
    } catch (error) {
      setError('Error updating booking status');
    }
  };

  const handleCancelBooking = async () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await handleUpdateStatus('Cancelled');
        alert('Booking cancelled');
      } catch (error) {
        alert('Error cancelling booking');
      }
    }
  };

  const handleGoBack = () => {
    navigate('/bookings');  // Navigate back to the BookingsPage
  };

  // Format date to a readable format
  const formatDate = (date) => {
    const options = {
      weekday: 'long', // Monday
      year: 'numeric', // 2024
      month: 'long', // December
      day: 'numeric', // 8
    };

    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <div className={styles['booking-details-page']}>
      {error && <p>{error}</p>}

      {booking && (
        <div className={styles['booking-details']}>
          <h1>Booking Details</h1>
          {/* Fetch User details from the populated userId field */}
          <p><strong>User Name:</strong> {booking.userId?.name || 'Not Available'}</p>
          <p><strong>User Email:</strong> {booking.userId?.email || 'Not Available'}</p>
          <p><strong>Event:</strong> {booking.eventId?.title || 'No Event Title'}</p>
          <p><strong>Booking Date:</strong> {formatDate(booking.timestamp)}</p> {/* Formatted Date */}
          <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
          <p><strong>Booking Status:</strong> {booking.bookingStatus}</p>

          <div className={styles['actions']}>
            <button 
              onClick={() => handleUpdateStatus('Confirmed')} 
              disabled={booking.bookingStatus === 'Confirmed'}
            >
              <FaCheck size={20} /> Approve
            </button>
            <button 
              onClick={() => handleUpdateStatus('Rejected')} 
              disabled={booking.bookingStatus === 'Rejected' || booking.bookingStatus === 'Confirmed'}
            >
              <FaTimes size={20} /> Reject
            </button>
            <button onClick={handleCancelBooking} disabled={booking.bookingStatus === 'Cancelled'}>
              Cancel Booking
            </button>
          </div>

          {/* Go Back Button */}
          <button onClick={handleGoBack} className={styles['go-back-btn']}>
            Go Back to Bookings
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsPage;
