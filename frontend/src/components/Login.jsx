// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      if (res.data.user.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/jobseeker-dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium mb-1">Password:</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="mt-3 text-center">
        <Link to="/forgot-password" className="text-blue-600">
          Forgot Password?
        </Link>
      </p>
      <div className="mt-4">
        <GoogleLoginButton />
      </div>
      <p className="mt-3 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
