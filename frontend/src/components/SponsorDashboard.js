import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SponsorDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path, { state: { sponsorId } });
  };
  const location = useLocation();
  const { sponsorId } = location.state || {}; // Retrieve sponsorId from state

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sponsor Dashboard</h1>
      {sponsorId ? (
        <p>Welcome Sponsor! Your ID: {sponsorId}</p>
      ) : (
        <p>Sponsor ID not provided</p>
      )}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => handleNavigate("/sponsored-events")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View Sponsored Events
        </button>
        <button
          onClick={() => handleNavigate("/sponsor-event")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sponsor a New Event
        </button>
      </div>
    </div>
  );
};

export default SponsorDashboard;
