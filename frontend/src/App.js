import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Routes instead of Switch
import AddEventPage from './components/AddEventPage';
import EventManagementPage from './components/EventManagementPage';

function App() {
  return (
    <Router>
      <Routes>  {/* Replace Switch with Routes */}
        <Route path="/add-event" element={<AddEventPage />} />  {/* Use element instead of component */}
        <Route path="/events" element={<EventManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
