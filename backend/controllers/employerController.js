// controllers/employerController.js
const Job = require("../models/Job");
const Application = require("../models/Application");

// Create a job listing
exports.createJob = async (req, res, next) => {
  try {
    const { title, description, requirements, salary } = req.body;
    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      employer: req.user.id,
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

// View applications for jobs posted by employer
exports.getApplications = async (req, res, next) => {
  try {
    const jobs = await Job.find({ employer: req.user.id });
    const jobIds = jobs.map((job) => job._id);
    const applications = await Application.find({
      job: { $in: jobIds },
    }).populate("applicant job");
    res.json(applications);
  } catch (err) {
    next(err);
  }
};
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body; // status should be 'interview'
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
