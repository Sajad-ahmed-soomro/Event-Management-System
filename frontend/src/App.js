import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/HomePage";
import AdminHome from "./pages/admin/AdminHome";
import Signup from "./Signup";
import AdminProfile from "./pages/admin/ManageProfile";
import ManageEventManagers from "./pages/admin/ManageEventManagers";
import ManageUsers from "./pages/admin/ManageUsers";
import EventPage from "./pages/admin/EventPage";
import Reports from "./pages/admin/Reports";
import Login from "./Login";
import Register from "./Register"
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:5000/api/verifyjwt", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((resp) => resp.json())
        .then((res) => {
          setIsAuthenticated(res.success);
        })
        .catch(() => setIsAuthenticated(false)); // Handle errors
    }
  }, []);

  return (
    <main>
      <Routes>
        {/* Login and Signup routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={`/${localStorage.getItem("userType")}`} /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to={`/${localStorage.getItem("userType")}`} /> : <Register />}
        />

        {/* Protected routes */}
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminHome /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/manage-managers"
          element={
            isAuthenticated ? <ManageEventManagers /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/manage-users"
          element={isAuthenticated ? <ManageUsers /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/manage-events-status"
          element={isAuthenticated ? <EventPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/manage-profile"
          element={isAuthenticated ? <AdminProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/reports"
          element={isAuthenticated ? <Reports /> : <Navigate to="/" />}
        />

        {/* Public routes */}
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
};

export default App;
