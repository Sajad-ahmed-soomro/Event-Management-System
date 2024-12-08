import React, { useState } from "react";
import "./HomeStyle.css"; // Includ styles from your current styles.css
import Logo from "../images/webProject_Logo.png"; // Correctly import the logo

const HomePage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div>
      <div className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
          {isSidebarExpanded && <h2>Events</h2>}
        </div>
        <ul className="nav-links">
          <li>
            <a href="#Home">
              <i className="fas fa-home"></i>
              {isSidebarExpanded && <span>Home</span>}
            </a>
          </li>
          <li>
            <a href="#show-gallery">
              <i className="fas fa-ticket-alt"></i>
              {isSidebarExpanded && <span>Our Events</span>}
            </a>
          </li>
          <li>
            <a href="#book-event">
              <i className="fas fa-tools"></i>
              {isSidebarExpanded && <span>Services</span>}
            </a>
          </li>
          <li>
            <a href="#about-us">
              <i className="fas fa-info-circle"></i>
              {isSidebarExpanded && <span>About Us</span>}
            </a>
          </li>
          <li>
            <a href="#contact">
              <i className="fas fa-envelope"></i>
              {isSidebarExpanded && <span>Contact</span>}
            </a>
          </li>
        </ul>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarExpanded ? "<" : ">"}
        </button>
      </div>

      <main className="content" style={{width: "calc(100vw - 280px)", float: "right"}}>
        <div className="top-bar" style={{ alignItems: "center" }}>
          <img
            src={Logo}
            alt="Logo"
            width="100px"
            height="100px"
          />
          <h1 style={{ margin: "5%" }}>SAS Event Management</h1>
          <button
            className="btn login"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
          <button
            className="btn signup"
            onClick={() => (window.location.href = "/register")}
          >
            Sign Up
          </button>
        </div>

        <section className="banner">
          <h1>We are on a mission to bring people together!</h1>
          <p>
            One Window Solution for all. Explore and learn more about what we
            do!
          </p>
          <button className="btn learn-more">Learn More</button>
        </section>

        <section className="welcome-message">
          <h2>Welcome to SAS Event Management!</h2>
          <p>
            Welcome! We are honored to let you know about our expertise,
            activities, and resources for organizing Industrial Fairs, Trade
            Exhibitions, Business Seminars, Conferences, Festivals, and
            Concerts.
          </p>
          <p style={{ fontWeight: "bold" }}>
            MAKE YOUR EVENT COME TO LIFE WITH US!
          </p>
        </section>

        <footer className="footer">
          <p>© Copyright SAS Event Management. All Rights Reserved</p>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
