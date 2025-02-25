import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { default as jwtDecode } from "jwt-decode";

function GoogleSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Decode the token to extract user role
      const decoded = jwtDecode(token);
      const user = { role: decoded.role };
      localStorage.setItem("user", JSON.stringify(user));
      // Redirect based on role
      if (decoded.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/jobseeker-dashboard");
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
}

export default GoogleSuccess;
