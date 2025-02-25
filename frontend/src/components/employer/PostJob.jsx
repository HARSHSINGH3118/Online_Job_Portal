// src/components/employer/PostJob.jsx
import React, { useState } from "react";
import api from "../../services/api";

function PostJob() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Debug: Log field updates
    console.log(`Updating ${name}:`, value);
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    // Debug: Log the jobData before submission
    console.log("Job Data to submit:", jobData);

    // Trim string fields
    const company = jobData.company.trim();
    const location = jobData.location.trim();
    const salary = jobData.salary;

    if (!company || !location || salary === "") {
      alert(
        "Please fill in all required fields: Company, Location, and Salary."
      );
      return;
    }

    try {
      await api.post("/employers/jobs", {
        ...jobData,
        company,
        location,
        salary: Number(salary),
      });
      alert("Job posted successfully!");
      setJobData({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
      });
    } catch (error) {
      console.error("Failed to post job", error);
      alert(
        "Failed to post job. Please ensure all fields are filled correctly."
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <h4 className="text-lg font-semibold">Post a New Job</h4>
      <form onSubmit={handleJobPost} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Title:</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium mb-1">Company:</label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location:</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium mb-1">Salary:</label>
          <input
            type="number"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;
