import React from "react";
import "./AboutUs.css"; // Dedicated CSS file for About Us
import Logo from "../images/webProject_Logo.png"; // Ensure the path to the logo is correct

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div
        style={{ height: "100vh" }}
        className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#fff] to-[#a649a6] animate-gradient blur-2xl -z-10"
      ></div>
      <div className="about-us-header">
        <img src={Logo} alt="Logo" className="about-us-logo" />
      </div>
      <div className="about-us-content">
        <section className="about-us-intro">
          <p>
            Welcome to SAS Event Management! We strive to bring people together
            through well-organized and unforgettable events. Let us help you
            make your dreams a reality!
          </p>
        </section>
        <section className="about-us-sections">
          <div className="about-us-section">
            <h2>Our Vision</h2>
            <p>
              To be a leading event management platform that creates memorable
              experiences and connects communities worldwide.
            </p>
          </div>
          <div className="about-us-section">
            <h2>Our Mission</h2>
            <p>
              To provide exceptional services, foster creativity, and bring
              value to every event we organize. We aim to transform ideas into
              impactful experiences.
            </p>
          </div>
          <div className="about-us-section">
            <h2>Our Value</h2>
            <p>
              Integrity, innovation, and customer satisfaction drive everything
              we do. We are committed to excellence and building strong
              relationships.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
