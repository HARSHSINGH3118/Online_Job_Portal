// controllers/jobController.js
const Job = require("../models/Job");
const Application = require("../models/Application");

// Get all job listings
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("employer", "name email");
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

// Get a specific job listing
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "employer",
      "name email"
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

// Apply for a job
exports.applyJob = async (req, res, next) => {
  try {
    const { resume } = req.body; // assume resume is a URL or text
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    const application = await Application.create({
      job: job._id,
      applicant: req.user.id,
      resume,
    });
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
};

// View applied jobs (for job seekers)
exports.getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job");
    res.json(applications);
  } catch (err) {
    next(err);
  }
};

// Withdraw application
exports.withdrawApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      applicant: req.user.id,
    });
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application withdrawn successfully" });
  } catch (err) {
    next(err);
  }
};
