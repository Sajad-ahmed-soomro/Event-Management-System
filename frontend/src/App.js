import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import Routes instead of Switch
import AddEventPage from './components/AddEventPage';
import EventManagementPage from './components/EventManagementPage';
import EditEventPage from './components/EditEventPage';  // Import EditEventPage
import EventPage from './components/EventPage';
import EventManagerRegistrationForm from './components/EventManagerRegistrationForm';
import BookingsPage from './components/BookingsPage.js';  // Import BookingsPage component
import BookingDetailsPage from './components/BookingDetailsPage'; 
import BookingsHistoryPage from './components/BookingsHistoryPage';
import FeedbackPage from './components/FeedbackPage'; // Feedback Page
import ManageResourcesPage from './components/ManageResourcesPage';
import AddStaffPage from './components/AddStaffPage';
import AddEquipmentPage from './components/AddEquipmentPage';
import AddVenuePage from './components/AddVenuePage';

function App() {
  return (
    <Router>
      <Routes>  {/* Replace Switch with Routes */}
        <Route path="/add-event" element={<AddEventPage />} />  {/* Use element instead of component */}
        <Route path="/manager" element={<EventManagementPage />} />
        <Route path="/edit-event/:id" element={<EditEventPage />} />  {/* Add the route for editing an event */}
        <Route path="/event/:id" element={<EventPage />} /> {/* Add route for EventPage */}
        <Route path="/register-event-manager" element={<EventManagerRegistrationForm />} />  {/* Add route for Event Manager registration */}
          {/* Add the route for the BookingsPage */}
          <Route path="/bookings" element={<BookingsPage />} />
        
        {/* Add the route for BookingDetailsPage */}
        <Route path="/booking/:id" element={<BookingDetailsPage />} /> {/* Booking details by ID */}
        <Route path="/bookings-history/:eventId" element={<BookingsHistoryPage />} />
        <Route path="/feedback/:eventId" element={<FeedbackPage />} />
        <Route path="/manage-resources/:id" element={<ManageResourcesPage />} /> {/* New Route */}
        <Route path="/add-staff/:id" element={<AddStaffPage />} />
        <Route path="/add-equipment/:id" element={<AddEquipmentPage />} />
        <Route path="/add-venue/:id" element={<AddVenuePage />} />

      </Routes>
    </Router>
  );
}

export default App;
