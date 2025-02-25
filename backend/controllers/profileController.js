// controllers/profileController.js
const User = require("../models/User");

// View user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      // On Windows, replace backslashes with forward slashes
      const normalizedPath = req.file.path.replace(/\\/g, "/");
      updates.profilePic = normalizedPath;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
};
