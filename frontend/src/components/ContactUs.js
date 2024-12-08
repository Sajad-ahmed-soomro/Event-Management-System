import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
          form.reset(); // Reset the form fields
        } else {
          alert("Error submitting the form. Please try again.");
        }
      })
      .catch(() => {
        alert(
          "Error submitting the form. Please check your internet connection."
        );
      });
  };

  return (
    <div className="contact-us">
      <div
        style={{ height: "100vh" }}
        className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#fff] to-[#a649a6] animate-gradient blur-2xl -z-10"
      ></div>
      <h1>Contact Us</h1>
      <p>
        Email:{" "}
        <a href="mailto:support@saseventmanagement.com">
          support@saseventmanagement.com
        </a>
      </p>
      <p>
        Instagram:{" "}
        <a
          href="https://instagram.com/saseventmanagement"
          target="_blank"
          rel="noreferrer"
        >
          @saseventmanagement
        </a>
      </p>
      <p>
        Facebook:{" "}
        <a
          href="https://facebook.com/saseventmanagement"
          target="_blank"
          rel="noreferrer"
        >
          SAS Event Management
        </a>
      </p>
      <p>Phone: +1-123-456-7890</p>

      <form
        action="https://getform.io/f/bejjzlda"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {submitted && (
        <p className="success-message">Form submitted successfully!</p>
      )}
    </div>
  );
};

export default ContactUs;
