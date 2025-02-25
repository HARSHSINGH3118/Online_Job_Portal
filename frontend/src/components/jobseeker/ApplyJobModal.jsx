// src/components/jobseeker/ApplyJobModal.jsx
import React, { useState } from "react";
import api from "../../services/api";

function ApplyJobModal({ jobId, show, onClose, onApplied }) {
  const [resume, setResume] = useState("");
  const [why, setWhy] = useState("");
  const [experience, setExperience] = useState("");

  if (!show) return null; // If not visible, render nothing

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // We must send resume, why, experience
      await api.post(`/jobs/${jobId}/apply`, { resume, why, experience });
      alert("Application submitted successfully!");
      if (onApplied) onApplied(); // If parent wants to refresh
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to apply:", error);
      alert("Failed to apply. Check console for details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <h3 className="text-lg font-bold mb-3">Apply for this Job</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Resume (URL or file link):
            </label>
            <input
              type="text"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Why do you want this job?
            </label>
            <textarea
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              rows="2"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Experience:
            </label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              rows="2"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex space-x-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyJobModal;
