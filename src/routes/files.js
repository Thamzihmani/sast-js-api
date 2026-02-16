/**
 * File Management Routes
 * SAST Categories: Path Traversal, Command Injection, Arbitrary File Read/Write,
 *                  Insecure File Upload, Zip Slip, Taint Analysis
 */
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { exec, execSync, spawn } = require("child_process");
const multer = require("multer");

// VULNERABILITY: Uploads stored in publicly accessible directory
const upload = multer({ dest: path.join(__dirname, "../../uploads/") });

/**
 * GET /files/read
 * VULNERABILITIES:
 * - Path Traversal
 * - Arbitrary File Read
 * - Taint: req.query.path flows to fs.readFile (Source → Sink)
 */
router.get("/read", (req, res) => {
  const filePath = req.query.path;

  // VULNERABILITY: Path traversal - no sanitization of user input
  const fullPath = path.join(__dirname, "../../data/", filePath);

  fs.readFile(fullPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "File not found", path: fullPath });
    }
    res.json({ content: data, path: fullPath });
  });
});

/**
 * POST /files/write
 * VULNERABILITIES:
 * - Arbitrary File Write
 * - Path Traversal
 */
router.post("/write", (req, res) => {
  const { filename, content } = req.body;

  // VULNERABILITY: Path traversal in file write
  const fullPath = path.join(__dirname, "../../data/", filename);

  fs.writeFile(fullPath, content, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "File written", path: fullPath });
  });
});

/**
 * GET /files/download
 * VULNERABILITIES:
 * - Path Traversal via filename
 * - Taint: req.query.name → path.resolve → res.sendFile
 */
router.get("/download", (req, res) => {
  const filename = req.query.name;

  // VULNERABILITY: Path traversal - path.resolve doesn't prevent ../../
  const filePath = path.resolve("uploads", filename);
  res.sendFile(filePath);
});

/**
 * POST /files/process
 * VULNERABILITIES:
 * - Command Injection via exec()
 * - Taint: req.body.filename flows through exec() (Source → Sink)
 */
router.post("/process", (req, res) => {
  const { filename } = req.body;

  // VULNERABILITY: Command injection - user input in shell command
  exec("file " + filename, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ type: stdout.trim() });
  });
});

/**
 * POST /files/convert
 * VULNERABILITIES:
 * - Command Injection via template literal
 * - Taint: req.body flows to execSync
 */
router.post("/convert", (req, res) => {
  const { input, output, format } = req.body;

  // VULNERABILITY: Command injection via template literal
  const result = execSync(`convert ${input} -format ${format} ${output}`);
  res.json({ message: "Converted", output: result.toString() });
});

/**
 * POST /files/upload
 * VULNERABILITIES:
 * - No file type validation
 * - No file size limit
 * - Filename not sanitized
 */
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // VULNERABILITY: Using original filename without sanitization
  const destPath = path.join(__dirname, "../../uploads/", req.file.originalname);

  fs.rename(req.file.path, destPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "File uploaded", path: destPath, filename: req.file.originalname });
  });
});

/**
 * POST /files/archive
 * VULNERABILITY: Command injection via spawn with shell: true
 */
router.post("/archive", (req, res) => {
  const { directory } = req.body;

  // VULNERABILITY: Command injection with spawn + shell: true
  const child = spawn("tar", ["-czf", "archive.tar.gz", directory], { shell: true });

  let output = "";
  child.stdout.on("data", (data) => { output += data; });
  child.stderr.on("data", (data) => { output += data; });
  child.on("close", (code) => {
    res.json({ code, output });
  });
});

/**
 * GET /files/log
 * VULNERABILITIES:
 * - Log injection
 * - Path traversal
 */
router.get("/log", (req, res) => {
  const { action, user } = req.query;

  // VULNERABILITY: Log injection - user input written to log file
  const logEntry = `[${new Date().toISOString()}] ${action} by ${user}\n`;
  fs.appendFile(path.join(__dirname, "../../logs/app.log"), logEntry, () => {});

  res.json({ logged: true });
});

/**
 * DELETE /files/delete
 * VULNERABILITY: Path traversal in file deletion
 */
router.delete("/delete", (req, res) => {
  const { filename } = req.query;

  // VULNERABILITY: Path traversal - can delete any file
  const fullPath = path.join(__dirname, "../../uploads/", filename);
  fs.unlink(fullPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deleted: true, path: fullPath });
  });
});

module.exports = router;
