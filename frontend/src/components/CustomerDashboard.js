import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CustomerDashboard.css"; // Include custom styling
import Logo from "../images/webProject_Logo.png";
const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId } = location.state || {}; // Retrieve customerId from state

  const handleNavigate = (path) => {
    navigate(path, { state: { customerId } });
  };

  return (
    <div>
      <div className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <h2>Customer Panel</h2>
        </div>
        <ul className="nav-links">
          <li>
            <a onClick={() => handleNavigate("/events")}>
              <i className="fas fa-calendar-alt"></i>Events
            </a>
          </li>
          <li>
            <a onClick={() => handleNavigate("/events")}>
              <i className="fas fa-calendar-alt"></i>My booked Events
            </a>
          </li>
          <li>
            <a href="#contact">
              <i className="fas fa-envelope"></i>Contact Us
            </a>
          </li>
          <li>
            <a href="#reviews">
              <i className="fas fa-star"></i>Reviews
            </a>
          </li>
          <li>
            <a href="#favorites">
              <i className="fas fa-heart"></i>Favorites
            </a>
          </li>
        </ul>
      </div>

      <main className="content">
        <div className="top-bar">
          <img src={Logo} alt="Logo" width="100px" height="100px" />
          <h1>SAS Event Management</h1>
        </div>

        <section className="welcome-message">
          <h2>Welcome to SAS Event Management!</h2>
          <p>
            Find events, book tickets, and enjoy a seamless experience all in
            one place. Use our platform to discover exciting events, make
            bookings, view your booking history, and connect with event
            managers.
          </p>
        </section>

        <footer className="footer">
          <p>© Copyright SAS Event Management. All Rights Reserved</p>
        </footer>
      </main>
    </div>
  );
};

export default CustomerDashboard;
