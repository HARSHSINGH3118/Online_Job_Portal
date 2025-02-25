import React, { useState, useEffect } from "react";
import api from "../services/api";

function Profile() {
  const [profile, setProfile] = useState({});
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch the user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  // Handle form submission to update profile with resume upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      // Append file with field name 'file' as expected by the backend
      if (resume) {
        formData.append("file", resume);
      }
      // Optionally append additional profile fields (e.g., name, email)
      // formData.append('name', profile.name);

      const res = await api.patch("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(res.data);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed", error);
      setMessage("Profile update failed!");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>Resume Upload:</strong>
          </label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="application/pdf,image/*"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
      {profile.file && (
        <div>
          <p>Uploaded File:</p>
          <a
            href={`http://localhost:5000/${profile.file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View File
          </a>
        </div>
      )}
    </div>
  );
}

export default Profile;
