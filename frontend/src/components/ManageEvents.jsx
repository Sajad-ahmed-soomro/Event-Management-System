import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationInput from './LocationInput';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [eventForm, setEventForm] = useState({ title: '', category: '', date: '', location: '', managerId: '', sponsors: [] });
    const [editEvent, setEditEvent] = useState(null);
    const navigate = useNavigate();

    // Fetch all events from the API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setEventForm({ ...eventForm, [e.target.name]: e.target.value });
    };

    // Handle location change
    const handleLocationChange = (newLocation) => {
        setEventForm({ ...eventForm, location: newLocation });
    };

    // Handle add/edit event
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!eventForm.title || !eventForm.category || !eventForm.date || !eventForm.location) {
            alert('Please fill in all required fields!');
            return;
        }

        try {
            const url = editEvent
                ? `http://localhost:5000/api/events/${editEvent._id}`
                : 'http://localhost:5000/api/events';

            const response = await fetch(url, {
                method: editEvent ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventForm),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${editEvent ? 'update' : 'create'} event!`);
            }

            const data = await response.json();
            console.log('Response:', data);

            // Reset the form and state
            setEventForm({ title: '', category: '', date: '', location: '', managerId: '', sponsors: [] });
            setEditEvent(null);
            alert(`${editEvent ? 'Event updated' : 'Event created'} successfully!`);
        } catch (error) {
            console.error('Error adding/editing event:', error.message);
            alert(`Failed to save event! ${error.message}`);
        }
    };


    // Handle delete event
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            setEvents(events.filter(event => event._id !== id));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Events</h1>

            {/* Event Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">{editEvent ? 'Edit Event' : 'Add New Event'}</h2>
                <input
                    type="text"
                    name="title"
                    value={eventForm.title}
                    onChange={handleChange}
                    placeholder="Event Title"
                    className="p-2 mb-4 border border-gray-300 rounded w-full"
                />
                <input
                    type="text"
                    name="category"
                    value={eventForm.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="p-2 mb-4 border border-gray-300 rounded w-full"
                />
                <input
                    type="date"
                    name="date"
                    value={eventForm.date}
                    onChange={handleChange}
                    className="p-2 mb-4 border border-gray-300 rounded w-full"
                />

                {/* Location Input Component */}
                <LocationInput location={eventForm.location} onLocationChange={handleLocationChange} />

                <input
                    type="text"
                    name="managerId"
                    value={eventForm.managerId}
                    onChange={handleChange}
                    placeholder="Manager ID"
                    className="p-2 mb-4 border border-gray-300 rounded w-full"
                />
                <button type="submit" className="p-2 bg-blue-600 text-white rounded w-full">
                    {editEvent ? 'Update Event' : 'Create Event'}
                </button>
            </form>

            {/* Event List */}
            <div className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Event List</h2>
                <ul>
                    {events.map(event => (
                        <li key={event._id} className="flex justify-between items-center py-2 border-b">
                            <div>
                                <p className="font-semibold">{event.title}</p>
                                <p>{event.category} | {event.date}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => { setEditEvent(event); setEventForm(event); }}
                                    className="px-4 py-2 text-white bg-yellow-500 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="px-4 py-2 text-white bg-red-600 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManageEvents;
