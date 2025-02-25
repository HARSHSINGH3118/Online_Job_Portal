// src/components/employer/MyJobs.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);

  // For searching, sorting, pagination, etc. (omitted for brevity)
  // ...

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/employers/jobs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  // Called when user clicks "View Applicants"
  const handleViewApplicants = async (jobId) => {
    setSelectedJobId(jobId);
    try {
      const res = await api.get(`/employers/jobs/${jobId}/applicants`);
      setApplicants(res.data); // Array of Application docs
      setShowApplicantsModal(true);
    } catch (error) {
      console.error("Failed to fetch applicants", error);
      alert("Failed to fetch applicants.");
    }
  };

  // Called when user clicks "Call for Interview"
  const handleCallForInterview = async (applicationId) => {
    try {
      await api.patch(`/employers/applications/${applicationId}`, {
        status: "interview",
      });
      alert("Interview call sent!");
      // Refresh the applicants list so updated status is visible
      if (selectedJobId) {
        const res = await api.get(
          `/employers/jobs/${selectedJobId}/applicants`
        );
        setApplicants(res.data);
      }
    } catch (error) {
      console.error("Failed to update application status", error);
      alert("Failed to update status.");
    }
  };

  // Called when user closes the applicants modal
  const handleCloseApplicants = () => {
    setShowApplicantsModal(false);
    setSelectedJobId(null);
    setApplicants([]);
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <h4 className="text-lg font-semibold">My Posted Jobs</h4>
      {/* For brevity, skipping search, sort, pagination code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div key={job._id} className="border border-gray-200 p-4 rounded">
            <h5 className="font-semibold text-gray-700">{job.title}</h5>
            <p className="text-sm text-gray-600">{job.description}</p>
            <p className="text-sm">
              <strong>Company:</strong> {job.company}
            </p>
            <p className="text-sm">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-xs text-gray-400">
              Posted on: {new Date(job.createdAt).toLocaleDateString()}
            </p>

            {/* Action button to view applicants */}
            <button
              onClick={() => handleViewApplicants(job._id)}
              className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              View Applicants
            </button>
          </div>
        ))}
      </div>

      {/* Applicants Modal */}
      {showApplicantsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Applicants</h3>
            {applicants.length > 0 ? (
              <ul className="space-y-2">
                {applicants.map((app) => (
                  <li
                    key={app._id}
                    className="border border-gray-200 p-3 rounded"
                  >
                    <p>
                      <strong>Applicant Name:</strong>{" "}
                      {app.applicant?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong> {app.applicant?.email || "N/A"}
                    </p>
                    <p>
                      <strong>Resume:</strong>{" "}
                      {app.resume ? (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>Why:</strong> {app.why}
                    </p>
                    <p>
                      <strong>Experience:</strong> {app.experience}
                    </p>
                    <p>
                      <strong>Status:</strong> {app.status}
                    </p>
                    {/* Button to set status to "interview" */}
                    {app.status === "applied" && (
                      <button
                        onClick={() => handleCallForInterview(app._id)}
                        className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Call for Interview
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applicants for this job yet.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseApplicants}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyJobs;
