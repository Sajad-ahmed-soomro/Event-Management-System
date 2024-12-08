import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import styles from '../Styles/FeedbackPage.module.css';

const FeedbackPage = () => {
  const { eventId } = useParams(); // Get event ID from the URL
  const navigate = useNavigate();  // Navigate hook
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch feedback for a specific event
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/feedback/event/${eventId}`);
        setFeedbacks(response.data); // Save feedback data
      } catch (err) {
        setError('Error fetching feedbacks');
        console.error(err);
      }
    };

    fetchFeedbacks();
  }, [eventId]);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${feedbackId}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== feedbackId));
    } catch (err) {
     console.log('error 3');
      setError('Error deleting feedback');
      console.error(err);
    }
  };

  const renderStars = (rating) => {
    // Render filled stars based on rating
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className={styles.starFilled}>★</span>);
      } else {
        stars.push(<span key={i} className={styles.starEmpty}>★</span>);
      }
    }
    return stars;
  };

  return (
    <div className={styles.feedbackPage}>
      <h1>Feedbacks for Event</h1>
      {error && <p>{error}</p>}

      <div className={styles.feedbackContainer}>
        {feedbacks.length === 0 ? (
          <p>No feedbacks available for this event</p>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback._id} className={styles.feedbackCard}>
              <h3>{feedback.userId.name}</h3>
              <p><strong>Email:</strong> {feedback.userId.email}</p>
              <p><strong>Rating:</strong> {renderStars(feedback.rating)}</p>
              <p><strong>Content:</strong> {feedback.content}</p>
              <div className={styles.feedbackActions}>
                <button onClick={() => handleDeleteFeedback(feedback._id)}>
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.backButton}>
        <button onClick={() => navigate(`/event/${eventId}`)}>Back to Event</button>
      </div>
    </div>
  );
};

export default FeedbackPage;
