// src/components/jobseeker/JobSeekerDashboard.jsx
import React, { useState } from "react";
import AllJobs from "../components/jobseeker/AllJobs";
import AppliedJobs from "../components/jobseeker/AppliedJobs";

function JobSeekerDashboard() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          All Jobs
        </button>
        <button
          onClick={() => setActiveTab("applied")}
          className={`px-4 py-2 rounded ${
            activeTab === "applied"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Applied Jobs
        </button>
      </div>

      {activeTab === "all" && <AllJobs />}
      {activeTab === "applied" && <AppliedJobs />}
    </div>
  );
}

export default JobSeekerDashboard;
