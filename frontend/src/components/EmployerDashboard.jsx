// src/components/employer/EmployerDashboard.jsx
import React, { useState } from "react";
import PostJob from "../components/employer/PostJob";
import MyJobs from "../components/employer/MyJobs";

function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("post");

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("post")}
          className={`px-4 py-2 rounded ${
            activeTab === "post"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Post a Job
        </button>
        <button
          onClick={() => setActiveTab("myjobs")}
          className={`px-4 py-2 rounded ${
            activeTab === "myjobs"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          My Jobs
        </button>
      </div>

      {activeTab === "post" && <PostJob />}
      {activeTab === "myjobs" && <MyJobs />}
    </div>
  );
}

export default EmployerDashboard;
