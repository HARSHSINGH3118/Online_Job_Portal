// src/components/jobseeker/AppliedJobs.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";

function AppliedJobs() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
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

  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="text-lg font-semibold mb-3">My Applications</h4>
      {applications.length > 0 ? (
        <ul className="space-y-2">
          {applications.map((app) => (
            <li key={app._id} className="border border-gray-200 p-3 rounded">
              <strong>{app.job.title}</strong> - Status:{" "}
              <span className="font-medium text-blue-600">{app.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't applied for any jobs yet.</p>
      )}
    </div>
  );
}

export default AppliedJobs;
