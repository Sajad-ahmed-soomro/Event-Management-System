import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddEventPage() {
  const [event, setEvent] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
  });
  const history = useHistory();

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', event);
      history.push('/');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <select
            name="category"
            value={event.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select category</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={() => history.push('/')} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit for Approval
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEventPage;

