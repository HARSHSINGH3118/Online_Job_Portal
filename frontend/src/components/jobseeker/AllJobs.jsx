// src/components/jobseeker/AllJobs.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ApplyJobModal from "./ApplyJobModal";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJobId(null);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">All Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.description}</p>
            <p className="text-sm">
              <strong>Company:</strong> {job.company}
            </p>
            <p className="text-sm">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-sm">
              <strong>Salary:</strong> ${job.salary}
            </p>
            <button
              onClick={() => handleApplyClick(job._id)}
              className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      {/* Modal for applying */}
      <ApplyJobModal
        jobId={selectedJobId}
        show={showModal}
        onClose={handleCloseModal}
        onApplied={fetchJobs} // optional refresh
      />
    </div>
  );
}

export default AllJobs;
