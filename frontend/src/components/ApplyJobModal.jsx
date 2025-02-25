// src/components/ApplyJobModal.jsx
import React, { useState } from "react";
import api from "../services/api";

function ApplyJobModal({ jobId, show, onClose, onSubmitted }) {
  const [resume, setResume] = useState("");
  const [why, setWhy] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/jobs/${jobId}/apply`, { resume, why, experience });
      alert("Application submitted successfully!");
      onSubmitted();
      onClose();
    } catch (error) {
      console.error("Application submission failed:", error);
      alert("Failed to submit application.");
    }
    setLoading(false);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Apply for Job</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Resume URL:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Why do you want this job?</strong>
                </label>
                <textarea
                  className="form-control"
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Previous Job/Internship Experience:</strong>
                </label>
                <textarea
                  className="form-control"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyJobModal;
