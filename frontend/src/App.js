import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import Routes instead of Switch
import AddEventPage from './components/AddEventPage';
import EventManagementPage from './components/EventManagementPage';
import EditEventPage from './components/EditEventPage';  // Import EditEventPage
import EventPage from './components/EventPage';
import EventManagerRegistrationForm from './components/EventManagerRegistrationForm';
import BookingsPage from './components/BookingsPage';  // Import BookingsPage component
import BookingDetailsPage from './components/BookingDetailsPage'; 

function App() {
  return (
    <Router>
      <Routes>  {/* Replace Switch with Routes */}
        <Route path="/add-event" element={<AddEventPage />} />  {/* Use element instead of component */}
        <Route path="/events" element={<EventManagementPage />} />
        <Route path="/edit-event/:id" element={<EditEventPage />} />  {/* Add the route for editing an event */}
        <Route path="/event/:id" element={<EventPage />} /> {/* Add route for EventPage */}
        <Route path="/register-event-manager" element={<EventManagerRegistrationForm />} />  {/* Add route for Event Manager registration */}
          {/* Add the route for the BookingsPage */}
          <Route path="/bookings" element={<BookingsPage />} />
        
        {/* Add the route for BookingDetailsPage */}
        <Route path="/booking/:id" element={<BookingDetailsPage />} /> {/* Booking details by ID */}
      </Routes>
    </Router>
  );
}

export default App;
