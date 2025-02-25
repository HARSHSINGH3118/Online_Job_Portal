// src/components/GoogleSuccess.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function GoogleSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const user = { role: decoded.role };
      localStorage.setItem("user", JSON.stringify(user));
      if (decoded.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/jobseeker-dashboard");
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Loading...</p>
    </div>
  );
}

export default GoogleSuccess;
