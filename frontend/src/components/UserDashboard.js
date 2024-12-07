// src/components/UserDashboard.js
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile from the backend
    fetch("/api/profile/profile")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name}</h1>
      <p>You're a regular user! Enjoy your time here.</p>
    </div>
  );
};

export default UserDashboard;
