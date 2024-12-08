import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({ content: "", rating: 5 });
  const [selectedEventId, setSelectedEventId] = useState(null);
  const location = useLocation();
  const { userId } = location.state || {}; // Retrieve customerId from state
  const navigate = useNavigate();

  // Fetch booked events from the API
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}/booked-events`)
        .then((response) => {
          // Ensure that feedbacks are always an array
          const eventsWithFeedbacks = response.data.bookedEvents.map(
            (event) => ({
              ...event,
              feedbacks: event.feedbacks || [], // Default to empty array if feedbacks are undefined
            })
          );
          setBookedEvents(eventsWithFeedbacks);
          alert("FeedBack added successfully");
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load booked events.");
          setLoading(false);
        });
    }
  }, [userId]);

  // Handle feedback submission
  const handleFeedbackSubmit = (eventId) => {
    axios
      .post(
        `http://localhost:5000/api/users/${userId}/event/${eventId}/feedback`,
        {
          content: feedback.content,
          rating: feedback.rating,
        }
      )
      .then((response) => {
        console.log("Feedback added:", response.data);
        setFeedback({ content: "", rating: 5 });
        setSelectedEventId(null);
        // Refresh the booked events to show the updated feedback
        setBookedEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? {
                  ...event,
                  feedbacks: [...event.feedbacks, response.data.feedback],
                }
              : event
          )
        );
      })
      .catch((error) => {
        console.error("Error adding feedback:", error);
        setError("Failed to add feedback");
      });
  };

  // Handle the back button
  const handleBack = () => {
    navigate("/user-dashboard", { state: { userId } });
  };

  return (
    <div className="my-bookings">
      <div className="top-bar">
        <button onClick={handleBack}>Back to Dashboard</button>
        <h1>My Bookings</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="booked-events-list">
          {bookedEvents.length > 0 ? (
            bookedEvents.map((event) => (
              <div key={event._id} className="booked-event">
                <h3>{event.name}</h3>
                <p>{event.date}</p>
                <p>{event.location}</p>

                <button onClick={() => setSelectedEventId(event._id)}>
                  Add Feedback
                </button>

                {selectedEventId === event._id && (
                  <div className="feedback-form">
                    <textarea
                      value={feedback.content}
                      onChange={(e) =>
                        setFeedback({ ...feedback, content: e.target.value })
                      }
                      placeholder="Write your feedback here..."
                    />
                    <select
                      value={feedback.rating}
                      onChange={(e) =>
                        setFeedback({ ...feedback, rating: e.target.value })
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button onClick={() => handleFeedbackSubmit(event._id)}>
                      Submit Feedback
                    </button>
                  </div>
                )}

                {/* Display event feedback */}
                <div className="feedbacks">
                  {event.feedbacks.map((feedback) => (
                    <div key={feedback._id} className="feedback">
                      <p>{feedback.content}</p>
                      <p>Rating: {feedback.rating}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
