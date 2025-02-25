// src/components/EmployerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

function EmployerDashboard() {
  // State for posted jobs and job posting form data
  const [jobs, setJobs] = useState([]);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  // State for viewing applicants for a selected job
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [showApplicants, setShowApplicants] = useState(false);

  // Fetch posted jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/employers/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employers/jobs", jobData);
      alert("Job posted successfully!");
      setJobData({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
      });
      fetchJobs();
    } catch (error) {
      console.error("Failed to post job", error);
      alert("Failed to post job.");
    }
  };

  // Fetch applicants for a given job id
  const fetchApplicants = async (jobId) => {
    try {
      const res = await api.get("/employers/applications");
      // Filter applications for the selected job
      const filtered = res.data.filter((app) => app.job._id === jobId);
      setApplicants(filtered);
      setSelectedJobId(jobId);
      setShowApplicants(true);
    } catch (error) {
      console.error("Failed to fetch applicants", error);
    }
  };

  // Handle calling an applicant for an interview (update status to "interview")
  const handleCallForInterview = async (applicationId) => {
    try {
      await api.patch(`/employers/applications/${applicationId}`, {
        status: "interview",
      });
      alert("Interview call sent!");
      // Refresh the applicants list for the selected job
      fetchApplicants(selectedJobId);
    } catch (error) {
      console.error("Failed to update application status", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div>
      <h2 className="mb-4">Employer Dashboard</h2>

      {/* Job Posting Form */}
      <div className="mb-5">
        <h4>Post a New Job</h4>
        <form onSubmit={handleJobPost}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Job Title:</strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Description:</strong>
            </label>
            <textarea
              className="form-control"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Company:</strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="company"
              value={jobData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Location:</strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Salary:</strong>
            </label>
            <input
              type="number"
              className="form-control"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Post Job
          </button>
        </form>
      </div>

      {/* Display Posted Jobs */}
      <h4>Jobs Posted by You</h4>
      {jobs.length ? (
        <div className="row">
          {jobs.map((job) => (
            <div key={job._id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">{job.description}</p>
                  <p className="card-text">
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="card-text">
                    <strong>Salary:</strong> ${job.salary}
                  </p>
                  <button
                    className="btn btn-secondary btn-sm mt-2"
                    onClick={() => fetchApplicants(job._id)}
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't posted any jobs yet.</p>
      )}

      {/* Applicants List for Selected Job */}
      {showApplicants && (
        <div className="mt-4">
          <h5>Applicants for Selected Job</h5>
          {applicants.length ? (
            <ul className="list-group">
              {applicants.map((app) => (
                <li key={app._id} className="list-group-item">
                  <p>
                    <strong>Resume:</strong> {app.resume}
                  </p>
                  <p>
                    <strong>Why:</strong> {app.why}
                  </p>
                  <p>
                    <strong>Experience:</strong> {app.experience}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {app.status === "applied" ? (
                      "Applied"
                    ) : (
                      <span className="badge bg-success">Interview Call</span>
                    )}
                  </p>
                  {app.status === "applied" && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleCallForInterview(app._id)}
                    >
                      Call for Interview
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No applicants for this job.</p>
          )}
          <button
            className="btn btn-link mt-2"
            onClick={() => setShowApplicants(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;
