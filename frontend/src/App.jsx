// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import EmployerDashboard from "./components/EmployerDashboard";
import JobSeekerDashboard from "./components/JobSeekerDashboard";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import GoogleSuccess from "./components/GoogleSuccess";

function App() {
  // Check authentication and user details from localStorage
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const isAuthenticated = !!token;

  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <Routes>
          {/* Root redirects to the appropriate dashboard if logged in */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                user?.role === "employer" ? (
                  <Navigate to="/employer-dashboard" />
                ) : (
                  <Navigate to="/jobseeker-dashboard" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Employer Dashboard Route */}
          <Route
            path="/employer-dashboard"
            element={
              isAuthenticated && user?.role === "employer" ? (
                <EmployerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Job Seeker Dashboard Route */}
          <Route
            path="/jobseeker-dashboard"
            element={
              isAuthenticated && user?.role === "jobseeker" ? (
                <JobSeekerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />

          {/* Google Auth Success */}
          <Route path="/google-success" element={<GoogleSuccess />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
