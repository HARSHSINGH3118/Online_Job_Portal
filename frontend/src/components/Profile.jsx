// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";

function Profile() {
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image file before uploading.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.patch("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUserData(res.data);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed", error);
      setMessage("Profile update failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {message && (
        <div className="mb-3 text-center text-blue-600">{message}</div>
      )}

      <div className="mb-3">
        <strong>Name:</strong> {userData.name}
      </div>
      <div className="mb-3">
        <strong>Email:</strong> {userData.email}
      </div>
      <div className="mb-3">
        <strong>Profile Picture:</strong>
        <br />
        {userData.profilePic ? (
          <img
            src={`http://localhost:5000/${userData.profilePic}`}
            alt="Profile"
            className="w-24 h-24 rounded-full mt-2 object-cover"
          />
        ) : (
          <p className="text-gray-500 mt-2">No profile picture set.</p>
        )}
      </div>

      <div className="border-t pt-4 mt-4">
        <h4 className="text-lg font-semibold mb-2">Change Profile Picture</h4>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              mb-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
