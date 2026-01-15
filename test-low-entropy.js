/**
 * Test file for low-entropy password detection
 * This file contains intentional weak passwords to validate detection
 */

// ===================================================================
// COMMON/WEAK PASSWORDS (Should be detected as CRITICAL)
// ===================================================================

// Test 1: Common password "admin"
const password = "admin";

// Test 2: Common password "password"
const passwd = "password";

// Test 3: Common password "root"
const pwd = "root";

// Test 4: Numeric password
const pass = "123456";

// Test 5: Test credential
const db_password = "test";

// Test 6: Default password
const api_key = "default";

// Test 7: Change me
const secret = "changeme";

// Test 8: Welcome
const auth_password = "welcome";

// Test 9: Admin variation
const database_password = "admin123";

// Test 10: Password variation
const credential = "password123";

// ===================================================================
// SHORT PASSWORDS (Should be detected as HIGH)
// ===================================================================

// Test 11: 3 character password
const short_pass1 = "abc";

// Test 12: 5 character password
const short_pass2 = "12345";

// Test 13: 7 character password
const short_pass3 = "abcd123";

// Test 14: Short alphanumeric
const short_secret = "xyz789";

// ===================================================================
// ADMIN CREDENTIALS (Should be detected as CRITICAL)
// ===================================================================

// Test 15: Admin credential
const admin = "mypass";

// Test 16: Administrator credential
const administrator = "adminpass";

// Test 17: Root credential
const root = "rootpass";

// Test 18: Superuser credential
const superuser = "super";

// Test 19: Database admin
const db_admin = "dbpass";

// Test 20: MySQL root
const mysql_root = "mysqlpass";

// ===================================================================
// EMPTY/NULL PASSWORDS (Should be detected as CRITICAL)
// ===================================================================

// Test 21: Empty password
const empty_password = "";

// Test 22: Null password
const null_password = "null";

// Test 23: None password
const none_password = "none";

// Test 24: N/A password
const na_password = "n/a";

// ===================================================================
// HARDCODED USERNAMES (Should be detected as MEDIUM)
// ===================================================================

// Test 25: Username
const username = "admin";

// Test 26: User name
const user_name = "johndoe";

// Test 27: Login
const login = "root@example.com";

// Test 28: User ID
const userid = "user123";

// ===================================================================
// ADMIN USERNAME WITH PASSWORD (Should be detected as CRITICAL)
// ===================================================================

// Test 29-30: Admin username and password pair
const admin_username = "admin";
const admin_password = "secret123";

// Test 31-32: Administrator credentials
const administrator_user = "root";
const administrator_pass = "admin123";

// ===================================================================
// COMPLEX PASSWORDS (Should still be detected as HIGH - existing rule)
// ===================================================================

// Test 33: Complex but hardcoded
const complex_password = "MyC0mpl3xP@ssw0rd!";

// Test 34: Long random-looking
const api_secret = "1234567890abcdefghijklmnopqrstuv";

// ===================================================================
// EXPECTED RESULTS
// ===================================================================

/**
 * Total Expected Detections: 34+
 *
 * By Severity:
 * - CRITICAL: ~25 (common passwords, admin credentials, empty passwords)
 * - HIGH: ~7 (short passwords, complex passwords)
 * - MEDIUM: ~4 (hardcoded usernames)
 *
 * By Rule:
 * - common-weak-password: ~10
 * - short-password: ~4
 * - admin-username-password: ~2 pairs
 * - default-admin-credential: ~4
 * - database-admin-credential: ~2
 * - empty-or-null-password: ~4
 * - hardcoded-username: ~4
 * - generic-password: ~2 (existing rule)
 * - generic-secret: ~1 (existing rule)
 */

console.log('This file contains intentional weak passwords for testing secret detection.');
console.log('Expected detections: 34+ secrets across all severity levels.');

module.exports = {
  testPasswords: {
    common: password,
    short: short_pass1,
    admin: admin,
    empty: empty_password,
    username: username
  }
};
