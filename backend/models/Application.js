// models/Application.js
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: { type: String, required: true },
    why: { type: String, required: true },
    experience: { type: String, required: true },
    status: {
      type: String,
      enum: ["applied", "withdrawn", "accepted", "rejected", "interview"],
      default: "applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
