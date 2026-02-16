/**
 * Main Express Application
 * SAST Test Target: Contains various vulnerability patterns
 */
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// VULNERABILITY: Overly permissive CORS
app.use(cors({ origin: "*", credentials: true }));

// VULNERABILITY: No helmet security headers
// Missing: app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// VULNERABILITY: Serving static files from root
app.use(express.static(path.join(__dirname, "..")));

// Set up EJS for template rendering (XSS testing)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const fileRoutes = require("./routes/files");
const adminRoutes = require("./routes/admin");
const searchRoutes = require("./routes/search");
const apiRoutes = require("./routes/api");

// Mount routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/files", fileRoutes);
app.use("/admin", adminRoutes);
app.use("/search", searchRoutes);
app.use("/api", apiRoutes);

// VULNERABILITY: Detailed error messages in production
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message,
    stack: err.stack,
    query: req.query,
    body: req.body,
  });
});

// VULNERABILITY: Hardcoded port, no environment variable fallback validation
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
