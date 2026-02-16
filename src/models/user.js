/**
 * User Model (Mongoose)
 * SAST Categories: Mass Assignment, Information Disclosure, Insecure Defaults
 */
const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },

  // VULNERABILITY: Storing password as MD5 hash
  password: { type: String, required: true },

  // VULNERABILITY: Role with default "user" but can be set to "admin" via mass assignment
  role: { type: String, default: "user", enum: ["user", "admin", "superadmin"] },

  // VULNERABILITY: API key stored in plain text
  apiKey: { type: String },

  // VULNERABILITY: Reset token stored without expiration
  resetToken: { type: String },

  // Sensitive fields that should not be exposed
  ssn: { type: String },
  creditCard: { type: String },
});

/**
 * Pre-save hook
 * VULNERABILITY: Using MD5 for password hashing
 */
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    // VULNERABILITY: MD5 is not suitable for password hashing
    this.password = crypto.createHash("md5").update(this.password).digest("hex");
  }
  next();
});

/**
 * Instance method to compare password
 * VULNERABILITY: Timing attack in comparison
 */
userSchema.methods.comparePassword = function (candidatePassword) {
  const hash = crypto.createHash("md5").update(candidatePassword).digest("hex");
  // VULNERABILITY: Non-constant-time comparison
  return this.password === hash;
};

/**
 * Convert to JSON
 * VULNERABILITY: Does NOT strip sensitive fields (password, ssn, creditCard)
 */
userSchema.methods.toJSON = function () {
  // VULNERABILITY: Returning all fields including sensitive ones
  return this.toObject();
};

module.exports = mongoose.model("User", userSchema);
