// src/components/Register.js
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    userType: "user",
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      formData.userType === "sponsor"
        ? "http://localhost:5000/api/users/register/sponsor"
        : "http://localhost:5000/api/users/register";

    const dataToSend =
      formData.userType === "sponsor"
        ? {
            name: formData.name,
            email: formData.email,
            contactNumber: formData.contactNumber,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

    try {
      const response = await axios.post(endpoint, dataToSend);
      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* User Type Selection */}
          <div className="mb-4">
            <label className="block mb-2">User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="user">Normal User</option>
              <option value="sponsor">Sponsor</option>
            </select>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Password Input for Normal Users */}
          {formData.userType === "user" && (
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {/* Contact Number Input for Sponsors */}
          {formData.userType === "sponsor" && (
            <div className="mb-4">
              <label className="block mb-2">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
