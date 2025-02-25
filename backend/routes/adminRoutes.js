// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

router.use(protect);
router.use(authorize("admin"));

// Get all users
router.get("/users", adminController.getAllUsers);

// Update user role/status
router.patch("/users/:id", adminController.updateUser);

// Delete a user
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
