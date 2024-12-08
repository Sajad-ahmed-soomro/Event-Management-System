import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./SponsorDashboardStyle.css"; // Import the stylesheet for this page
import Logo from "../images/webProject_Logo.png"; // Logo for the sidebar

const SponsorDashboard = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path, { state: { sponsorId } });
  };
  const location = useLocation();
  const { sponsorId } = location.state || {}; // Retrieve sponsorId from state

  return (
    <div>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <h2>Sponsor Dashboard</h2>
        </div>
        <ul className="nav-links">
          <li>
            <a onClick={() => handleNavigate("/sponsored-events")}>
              <i className="fas fa-ticket-alt"></i>View Sponsored Events
            </a>
          </li>
          <li>
            <a onClick={() => handleNavigate("/sponsor-event")}>
              <i className="fas fa-plus"></i>Sponsor a New Event
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="content">
        <div className="top-bar">
          <img src={Logo} alt="Logo" width="50px" height="50px" />
          <h1>Sponsor Dashboard</h1>
        </div>

        <section className="welcome-message">
          <h2>Welcome Sponsor!</h2>
          {sponsorId ? (
            <p>Your ID: {sponsorId}</p>
          ) : (
            <p>Sponsor ID not provided</p>
          )}
          <p>
            Welcome to the Sponsor Dashboard! As a valued partner, your
            contributions play a vital role in bringing events to life and
            creating unforgettable experiences. Here, you can easily manage your
            sponsored events, explore new opportunities, and track your impact.
            Together, we’re shaping memorable moments and fostering connections.
            Thank you for being an essential part of our journey!
          </p>
        </section>
        <section className="banner">
          <h1>We are on a mission to bring people together!</h1>
          <p>
            One Window Solution for all. Explore and learn more about what we
            do!
          </p>
          <button className="btn learn-more">Learn More</button>
        </section>
        <footer className="footer">
          <p>© Copyright SAS Event Management. All Rights Reserved</p>
        </footer>
      </main>
    </div>
  );
};

export default SponsorDashboard;
