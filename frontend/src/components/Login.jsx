import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/webProject_Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Tracks whether the user is a sponsor or not
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Determine payload based on user type
      const payload = userType === "sponsor" ? { email } : { email, password };

      const response = await axios.post(
        userType === "sponsor"
          ? "http://localhost:5000/api/sponsors/login"
          : "http://localhost:5000/api/users/login",
        payload
      );
      console.log("Backend Response:", response.data);
      if (response.data.success) {
        alert(
          `Login successful as ${userType === "sponsor" ? "Sponsor" : "User"}!`
        );

        if (userType === "sponsor") {
          localStorage.setItem("sponsorId", response.data.sponsorId); // Assuming response contains sponsorId

          // Pass sponsorId to the Sponsor Dashboard
          navigate("/sponsor-dashboard", {
            state: { sponsorId: response.data.sponsorId },
          });
        }

        if (userType === "user") {
          console.log("User id:", response.data);
          console.log("User id:", response.data.userId);
          localStorage.setItem("userId", response.data.userId); // Assuming response includes userId
          navigate("/user-dashboard");
        }
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage(
          "You don't have an account with us. Please create an account first."
        );
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={{ width: "100vh", height: "100vh" }}>
      {/* Animated Background */}
      <div
        style={{ height: "100vh" }}
        className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#fff] to-[#a649a6] animate-gradient blur-2xl -z-10"
      ></div>

      {/* Logo on Left */}
      <div className="fixed top-0 left-0">
        <img src={logo} alt="Logo" className="object-cover" />
      </div>

      {/* Centered Login Form */}
      <div>
        <div
          style={{ marginLeft: "70%", width: "70%", marginTop: "4%" }}
          className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Sign in</h2>
          <p className="text-gray-500 text-center mb-6">
            Welcome Back To SAS Events!
          </p>
          <p className="text-gray-500 text-center mb-6">
            Please sign in to continue.
          </p>

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <div className="mb-6">
            <a href="http://localhost:5000/api/auth/google">
              <button className="w-full bg-[#1abc9c] text-white py-2 px-4 rounded-md hover:bg-[#16a085] hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 focus:outline-none">
                Sign In With Google
              </button>
            </a>
          </div>

          <hr className="my-6" />

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Conditionally render the password field */}
            {userType === "user" && (
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-gray-600">
                Remember me
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="user-type" className="block text-gray-700">
                User Type
              </label>
              <select
                id="user-type"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3498db] text-white py-2 px-4 rounded-md hover:bg-[#3498db99] hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 focus:outline-none"
            >
              Sign In
            </button>
          </form>

          <p className="text-gray-500 text-center mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Create an Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
