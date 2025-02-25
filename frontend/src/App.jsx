// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import GoogleSuccess from "./components/GoogleSuccess";
import EmployerDashboard from "./components/EmployerDashboard";
import JobSeekerDashboard from "./components/JobSeekerDashboard";
import Profile from "./components/Profile";

function App() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const isAuthenticated = !!token;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/google-success" element={<GoogleSuccess />} />

          <Route
            path="/employer-dashboard"
            element={
              isAuthenticated && user?.role === "employer" ? (
                <EmployerDashboard />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/jobseeker-dashboard"
            element={
              isAuthenticated && user?.role === "jobseeker" ? (
                <JobSeekerDashboard />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Login />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
