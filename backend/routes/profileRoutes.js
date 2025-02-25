// routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const profileController = require("../controllers/profileController");

router.use(protect);

// View user profile
router.get("/", profileController.getProfile);

// Update user profile (e.g., update details, resume URL)
router.patch("/", profileController.updateProfile);

module.exports = router;
