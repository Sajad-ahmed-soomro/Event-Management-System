import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import SponsorDashboard from "./components/SponsorDashboard";
import SponsoredEventsList from "./components/SponsoredEventsList";
import SponsorEventForm from "./components/SponsorEventForm";
import CustomerDashboard from "./components/CustomerDashboard";
import EventDiscovery from "./components/EventDiscovery";
import BookEvent from "./components/BookEvent";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define all routes using React Router v6 syntax */}
        <Route path="/" element={<HomePage />} />
        <Route path="/api/users/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<CustomerDashboard />} />

        <Route path="/sponsor-dashboard" element={<SponsorDashboard />} />
        <Route path="/sponsored-events" element={<SponsoredEventsList />} />
        <Route path="/sponsor-event" element={<SponsorEventForm />} />
        <Route path="/events" element={<EventDiscovery />} />
        <Route path="/book-event/:eventId" element={<BookEvent />} />
        {/* Add other routes   here */}
      </Routes>
    </Router>
  );
}

export default App;
