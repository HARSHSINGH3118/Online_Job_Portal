// routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const jobController = require("../controllers/jobController");

// Public Routes: View all jobs or a single job
router.get("/jobs", jobController.getAllJobs);
router.get("/jobs/:id", jobController.getJobById);

// Protected Routes for job seekers
router.use(protect);

// Apply for a job
router.post("/jobs/:id/apply", jobController.applyJob);

// View applied jobs
router.get("/applications", jobController.getApplications);

// Withdraw an application
router.delete("/applications/:id", jobController.withdrawApplication);

module.exports = router;
