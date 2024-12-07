import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

// Create Event
export const createEvent = async (eventData) => {
    try {
      const response = await axios.post(`${API_URL}/create`, eventData, {  // Concatenate "/create"
        headers: {
          'Content-Type': 'application/json',  // Ensure you're sending the correct content type
        },
      });
  
      return response.data;  // The response from the backend (event message, event object, etc.)
    } catch (error) {
      throw error;  // Throw error to be handled in handleSubmit
    }
  };
// Get All Events
export const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events', error);
    throw error;
  }
};

// Get Event by ID
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event by ID', error);
    throw error;
  }
};

// Update Event
export const updateEvent = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating event', error);
    throw error;
  }
};

// Delete Event
export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event', error);
    throw error;
  }
};
