// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

// Register a new user
router.post("/register", authController.register);

// Login user
router.post("/login", authController.login);

// Logout user
router.post("/logout", authController.logout);

// Forgot password
router.post("/forgot-password", authController.forgotPassword);

// Reset password
router.post("/reset-password", authController.resetPassword);

// Google Authentication - initiate
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Authentication Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generate JWT token after successful Google Auth
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // In production, you might redirect and set a cookie
    res.json({ token, user: req.user });
  }
);

module.exports = router;
