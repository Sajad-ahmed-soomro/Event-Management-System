import React, { useState } from "react";
import logo from "./images/webProject_Logo.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { email, password, rememberMe });
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#fff] to-[#a649a6] animate-gradient blur-2xl -z-10"></div>
      {/* Logo on Left */}
      <div className="fixed top-0 left-0">
        <img
          src={logo} // Replace with the actual path to your logo
          alt="Logo"
          className="object-cover"
        />
      </div>

      {/* Login Form */}
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign in</h2>
        <p className="text-gray-500 text-center mb-6">
          Welcome Back To SAS Events!
        </p>
        <p className="text-gray-500 text-center mb-6">
          Please sign in to continue.
        </p>

        <div className="mb-6">
          <button
            className="w-full bg-[#1abc9c] text-white py-2 px-4 rounded-md hover:bg-[#16a085] hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 focus:outline-none"
            onClick={handleGoogleSignIn}
          >
            Sign In With Google
          </button>
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

          <button
            type="submit"
            className="w-full bg-[#3498db] text-white py-2 px-4 rounded-md hover:bg-[#3498db99] hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 focus:outline-none"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
