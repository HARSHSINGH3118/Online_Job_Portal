// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["admin", "employer", "jobseeker"],
      default: "jobseeker",
    },
    googleId: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // Add this field for profile picture
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password if modified
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
