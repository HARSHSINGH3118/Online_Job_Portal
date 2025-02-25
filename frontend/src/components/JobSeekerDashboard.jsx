// src/components/JobSeekerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import ApplyJobModal from "./ApplyJobModal";

function JobSeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications");
      setApplications(res.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  };

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };

  return (
    <div>
      <h2 className="mb-4">Job Seeker Dashboard</h2>
      <div className="row">
        {jobs.length ? (
          jobs.map((job) => (
            <div key={job._id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">{job.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleApplyClick(job._id)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs available at the moment.</p>
        )}
      </div>

      {/* My Applications Section */}
      <h3 className="mt-5">My Applications</h3>
      {applications.length ? (
        <ul className="list-group">
          {applications.map((app) => (
            <li
              key={app._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{app.job.title}</strong> - Status:{" "}
                {app.status === "interview" ? (
                  <span className="badge bg-success">Interview Call</span>
                ) : (
                  app.status
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't applied to any jobs yet.</p>
      )}

      <ApplyJobModal
        jobId={selectedJobId}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmitted={fetchApplications}
      />
    </div>
  );
}

export default JobSeekerDashboard;
