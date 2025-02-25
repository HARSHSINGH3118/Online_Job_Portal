// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
require("./config/passport"); // Passport (Google Auth) configuration

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Mount Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/employers", require("./routes/employerRoutes"));
app.use("/", require("./routes/jobRoutes")); // job endpoints (GET /jobs etc.)
app.use("/profile", require("./routes/profileRoutes"));
// In app.js, after initializing middlewares:
app.use("/uploads", express.static("uploads"));

// Global Error Handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
