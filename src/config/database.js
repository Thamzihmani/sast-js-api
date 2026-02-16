/**
 * Database Configuration
 * SAST Categories: Hardcoded Credentials, Insecure Configuration
 */

// VULNERABILITY: Hardcoded database credentials
const DB_CONFIG = {
  development: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root123",
    database: "vulnerable_app",
  },
  production: {
    host: "prod-db.internal",
    port: 3306,
    user: "app_user",
    password: "Pr0d_P@ssw0rd!",
    database: "production_db",
  },
  // VULNERABILITY: Hardcoded MongoDB connection string with credentials
  mongodb: {
    uri: "mongodb://admin:mongopass123@mongo.internal:27017/app?authSource=admin",
    options: {
      // VULNERABILITY: Disabling TLS for MongoDB
      tls: false,
      // VULNERABILITY: Disabling certificate validation
      tlsAllowInvalidCertificates: true,
    },
  },
  // VULNERABILITY: Redis connection with hardcoded password
  redis: {
    host: "redis.internal",
    port: 6379,
    password: "redis_secret_123",
  },
};

/**
 * Get database config for current environment
 * VULNERABILITY: Falls back to development config (with hardcoded creds)
 */
function getConfig() {
  const env = process.env.NODE_ENV || "development";
  return DB_CONFIG[env] || DB_CONFIG.development;
}

module.exports = { DB_CONFIG, getConfig };
