import React, { useEffect, useState } from "react";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <h1>Welcome,</h1>
      <p>Your email is:</p>
    </div>
  );
}

export default UserDashboard;
