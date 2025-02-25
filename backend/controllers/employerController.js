// controllers/employerController.js
const Job = require("../models/Job");
const Application = require("../models/Application");

// Create a job listing
exports.createJob = async (req, res, next) => {
  try {
    // Destructure the fields that match your model
    const { title, description, company, location, salary } = req.body;

    // Create the job with all required fields
    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      employer: req.user.id, // from JWT auth
    });

    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

// Get all jobs posted by the employer
exports.getEmployerJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ employer: req.user.id });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

// Update job listing
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, employer: req.user.id },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

// Delete job listing
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      employer: req.user.id,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// View applications for ALL jobs posted by employer
exports.getApplications = async (req, res, next) => {
  try {
    // Find all jobs by this employer
    const jobs = await Job.find({ employer: req.user.id });
    const jobIds = jobs.map((job) => job._id);

    // Find all applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    }).populate("applicant job");
    res.json(applications);
  } catch (err) {
    next(err);
  }
};

// Update application status (e.g., "interview")
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (err) {
    next(err);
  }
};

/**
 * NEW CONTROLLER FUNCTIONS:
 * getJobApplicants - fetch all applications for a single job
 * cloneJob - duplicate an existing job
 */

// Get applicants for a specific job
exports.getJobApplicants = async (req, res, next) => {
  try {
    // Check if the job belongs to this employer
    const job = await Job.findOne({
      _id: req.params.jobId,
      employer: req.user.id,
    });
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized" });
    }

    // Find all applications for that job
    const applications = await Application.find({ job: job._id }).populate(
      "applicant job"
    );
    res.json(applications);
  } catch (err) {
    next(err);
  }
};

// Clone a job posting
exports.cloneJob = async (req, res, next) => {
  try {
    // Ensure the job belongs to this employer
    const job = await Job.findOne({
      _id: req.params.id,
      employer: req.user.id,
    });
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized" });
    }

    // Create a duplicate job, you can tweak the fields
    const clonedJob = await Job.create({
      title: job.title + " (Clone)",
      description: job.description,
      company: job.company,
      location: job.location,
      salary: job.salary,
      employer: job.employer, // same employer
    });

    res.status(201).json(clonedJob);
  } catch (err) {
    next(err);
  }
};
