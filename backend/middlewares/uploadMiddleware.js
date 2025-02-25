// middlewares/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

// Configure multer storage to save files in an 'uploads' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Allow only image files and PDFs (for resumes)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only images and PDFs are allowed!"),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
