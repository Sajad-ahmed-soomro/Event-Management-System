import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Note the import change
// import EventManagementPage from './components/EventManagementPage';
// import AddEventPage from './components/AddEventPage';
// import EditEventPage from './components/EditEventPage';
import ManageEvents from './components/ManageEvents';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Change Switch to Routes */}
          <Route path="/" element={<ManageEvents />} /> {/* Change component prop to element */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
