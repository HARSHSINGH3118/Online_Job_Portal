// src/components/GoogleLoginButton.jsx
import React from "react";

function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // Redirect to backend Google Auth endpoint
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
    >
      Login with Google
    </button>
  );
}

export default GoogleLoginButton;
