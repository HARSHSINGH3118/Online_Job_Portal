const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const profileController = require("../controllers/profileController");
const upload = require("../middlewares/uploadMiddleware");

router.use(protect);

// GET /profile - View user profile
router.get("/", profileController.getProfile);

// PATCH /profile - Update profile (allows file upload for resume or profile image)
router.patch("/", upload.single("file"), profileController.updateProfile);

module.exports = router;
