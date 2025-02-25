import React from "react";

function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // Redirect to backend Google Auth endpoint
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button onClick={handleGoogleLogin} className="btn btn-danger w-100">
      Login with Google
    </button>
  );
}

export default GoogleLoginButton;
