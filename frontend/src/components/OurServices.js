import React from "react";
import "./OurServices.css"; // New CSS file specific for Our Services
import "./HomeStyle.css"; // Include styles from your current styles.css
import Logo from "../images/webProject_Logo.png"; // Correctly import the logo

const OurServices = () => {
  const services = [
    "Book your favorite events with ease.",
    "Support and sponsor events to grow your network.",
    "We value your feedback for attended events.",
    "Discover and explore upcoming events.",
    "View event stories and photo galleries.",
    "Save your favorite events for future reference.",
  ];

  return (
    <div className="services-page">
      <div
        style={{ height: "100vh" }}
        className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#fff] to-[#a649a6] animate-gradient blur-2xl -z-10"
      ></div>
      <div className="top-bar" style={{ alignItems: "center" }}>
        <img
          src={Logo} // Use the imported logo
          alt="Logo"
          width="100px"
          height="100px"
        />
        <h1 style={{ margin: "5%" }}>SAS Event Management</h1>
        <button
          className="btn login"
          onClick={() => (window.location.href = "/api/users/login")}
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
      <h1 className="services-heading">Our Services</h1>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="services-item">
            <p>{service}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
