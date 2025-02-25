// routes/employerRoutes.js
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const employerController = require("../controllers/employerController");

// Protect all routes, and only "employer" role can access
router.use(protect);
router.use(authorize("employer"));

// Create a job listing
router.post("/jobs", employerController.createJob);

// Get jobs posted by employer
router.get("/jobs", employerController.getEmployerJobs);

// Update a job listing
router.patch("/jobs/:id", employerController.updateJob);

// Delete a job listing
router.delete("/jobs/:id", employerController.deleteJob);

// View all applications for *all* jobs posted by employer
router.get("/applications", employerController.getApplications);

// Update application status (e.g. call for interview)
router.patch("/applications/:id", employerController.updateApplicationStatus);

/**
 * NEW ENDPOINTS:
 * Get applicants for a single job
 * Clone a job
 */

// Get applicants for a specific job (by jobId)
router.get("/jobs/:jobId/applicants", employerController.getJobApplicants);

// Clone a job posting
router.post("/jobs/:id/clone", employerController.cloneJob);

module.exports = router;
