// routes/employerRoutes.js
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const employerController = require("../controllers/employerController");

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

// View applications for jobs posted by the employer
router.get("/applications", employerController.getApplications);

module.exports = router;
