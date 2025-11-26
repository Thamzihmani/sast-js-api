/**
 * @fileoverview Intentionally Exposed Secrets for Secret Scanning Testing
 * @description Contains various types of hardcoded credentials for testing secret detection
 * @author Security Testing Team
 * @created 2025-01-26
 *
 * WARNING: This file contains intentional secret exposures for testing purposes.
 * DO NOT use any of these credentials in production!
 * All secrets shown here are EXAMPLES and should be detected by secret scanners.
 */

// ============================================================================
// CLOUD PROVIDER CREDENTIALS
// ============================================================================

// AWS Credentials
const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const AWS_SESSION_TOKEN = "FwoGZXIvYXdzEBQaDJKLMNOPQRSTUVWXYZab1234567890";

// AWS in configuration
const awsConfig = {
  accessKeyId: "AKIATESTKEYEXAMPLE123",
  secretAccessKey: "AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCd",
  region: "us-east-1"
};

// Google Cloud Platform (GCP)
const GCP_API_KEY = "AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe";
const GCP_SERVICE_ACCOUNT = {
  "type": "service_account",
  "project_id": "my-project-123456",
  "private_key_id": "1234567890abcdef1234567890abcdef12345678",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKj\nMzEfYyjiWA4R4/M2bS1+fWIcPm15j7A1U3x++FV8PcqQp7fBd7DH1M3V4xk1DqF\n-----END PRIVATE KEY-----",
  "client_email": "test-service-account@my-project-123456.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
};

// Microsoft Azure
const AZURE_CLIENT_SECRET = "AbC~dEf1GhI2jKl3MnO4pQr5StU6vWx7YzA8bC9";
const AZURE_STORAGE_KEY = "DefaultEndpointsProtocol=https;AccountName=mystorageaccount;AccountKey=1234567890abcdefghijklmnopqrstuvwxyz==;EndpointSuffix=core.windows.net";
const AZURE_CONNECTION_STRING = "Endpoint=sb://myservicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AbCdEfGh1234567890=";

// Digital Ocean
const DIGITALOCEAN_TOKEN = "dop_v1_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd";
const DIGITALOCEAN_SPACES_KEY = "DO00ABC123XYZ789DEF";
const DIGITALOCEAN_SPACES_SECRET = "AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCdEf";

// Heroku
const HEROKU_API_KEY = "12345678-abcd-1234-efgh-1234567890ab";
const HEROKU_OAUTH = "Bearer 12345678-90ab-cdef-1234-567890abcdef";

// IBM Cloud
const IBM_CLOUD_API_KEY = "AbCdEfGhIjKlMnOpQrStUvWxYz1234567890_AbCdEfGh";
const IBM_COS_HMAC_ACCESS_KEY = "1234567890abcdef1234567890abcdef";
const IBM_COS_HMAC_SECRET_KEY = "abcdef1234567890abcdef1234567890abcdef12";

// Alibaba Cloud
const ALIBABA_ACCESS_KEY_ID = "LTAI4GBTgk2jklmnopqrst";
const ALIBABA_ACCESS_KEY_SECRET = "AbCdEfGhIjKlMnOpQrStUvWxYz123456";

// Oracle Cloud
const OCI_USER_OCID = "ocid1.user.oc1..aaaaaaaabcdefghijklmnopqrstuvwxyz1234567890";
const OCI_TENANCY_OCID = "ocid1.tenancy.oc1..aaaaaaaabcdefghijklmnopqrstuvwxyz1234567890";
const OCI_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJ
-----END RSA PRIVATE KEY-----`;

// ============================================================================
// VERSION CONTROL & CI/CD
// ============================================================================

// GitHub
const GITHUB_TOKEN = "ghp_1234567890abcdefghijklmnopqrstuvwxyz";
const GITHUB_OAUTH = "gho_1234567890abcdefghijklmnopqrstuvwxyz";
const GITHUB_APP_TOKEN = "ghs_1234567890abcdefghijklmnopqrstuvwxyz";
const GITHUB_REFRESH_TOKEN = "ghr_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP";

// GitLab
const GITLAB_TOKEN = "glpat-1234567890abcdefghij";
const GITLAB_PERSONAL_TOKEN = "glpat-abcdefghijklmnopqrst";
const GITLAB_RUNNER_TOKEN = "GR1348941abcdefghijklmnop";

// Bitbucket
const BITBUCKET_APP_PASSWORD = "ATBB1234567890abcdefghijklmnop";
const BITBUCKET_CLIENT_ID = "1234567890abcdef1234";
const BITBUCKET_CLIENT_SECRET = "AbCdEfGhIjKlMnOpQrStUvWxYz123456";

// Jenkins
const JENKINS_API_TOKEN = "11abcdef1234567890abcdef1234567890";
const JENKINS_SECRET = "1234567890abcdef1234567890abcdef";

// CircleCI
const CIRCLECI_TOKEN = "circle_1234567890abcdefghijklmnopqrstuvwxyz1234567890";

// Travis CI
const TRAVIS_TOKEN = "travis_1234567890abcdefghijklmnopqrst";

// Azure DevOps
const AZURE_DEVOPS_PAT = "abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmn";

// TeamCity
const TEAMCITY_TOKEN = "eyJ0eXAiOiAiVENWMiJ9.abcdefghijklmnopqrstuvwxyz123456.1234567890";

// ============================================================================
// PAYMENT & FINANCIAL SERVICES
// ============================================================================

// Stripe
const STRIPE_SECRET_KEY = "sk_test_1234567890abcdefghijklmnopqrstuv";
const STRIPE_LIVE_KEY = "sk_live_1234567890abcdefghijklmnopqrstuv";
const STRIPE_RESTRICTED_KEY = "rk_test_1234567890abcdefghijklmnopqrstuv";
const STRIPE_PUBLISHABLE_KEY = "pk_test_1234567890abcdefghijklmnopqrstuv";

// PayPal
const PAYPAL_CLIENT_ID = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
const PAYPAL_CLIENT_SECRET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
const PAYPAL_ACCESS_TOKEN = "A21AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456";

// Square
const SQUARE_ACCESS_TOKEN = "EAAABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv";
const SQUARE_APP_SECRET = "sq0csp-1234567890_abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOP";

// Braintree
const BRAINTREE_PUBLIC_KEY = "abcdefghijklmnop";
const BRAINTREE_PRIVATE_KEY = "1234567890abcdefghijklmnopqrstuv";
const BRAINTREE_MERCHANT_ID = "abcdefghijklmnop";

// Plaid
const PLAID_CLIENT_ID = "1234567890abcdef1234567890";
const PLAID_SECRET = "1234567890abcdef1234567890abcdef";

// Coinbase
const COINBASE_API_KEY = "organizations/abcd1234-5678-90ef-ghij-klmnopqrstuv/apiKeys/abcd1234-5678-90ef";
const COINBASE_API_SECRET = "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIAbCdEfGhIjKlMnOpQrStUvWxYz1234567890\n-----END EC PRIVATE KEY-----";

// ============================================================================
// COMMUNICATION & MESSAGING
// ============================================================================

// Slack
const SLACK_BOT_TOKEN = "xoxb-1234567890-1234567890-abcdefghijklmnopqrstuvwx";
const SLACK_USER_TOKEN = "xoxp-1234567890-1234567890-1234567890-abcdefghijklmnopqrstuvwxyz123456";
const SLACK_WEBHOOK = "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX";
const SLACK_APP_TOKEN = "xapp-1-A01234567-1234567890-abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnop";

// Twilio
const TWILIO_ACCOUNT_SID = "ACabcdef1234567890abcdef1234567890";
const TWILIO_AUTH_TOKEN = "1234567890abcdef1234567890abcdef";
const TWILIO_API_KEY = "SKabcdef1234567890abcdef1234567890";
const TWILIO_API_SECRET = "abcdefghijklmnopqrstuvwxyz123456";

// SendGrid
const SENDGRID_API_KEY = "SG.1234567890abcdefghijklm.1234567890abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJK";

// Mailgun
const MAILGUN_API_KEY = "key-1234567890abcdefghijklmnopqrstuv";
const MAILGUN_PRIVATE_KEY = "1234567890abcdef1234567890abcdef-12345678-90abcdef";

// MessageBird
const MESSAGEBIRD_API_KEY = "AbCdEfGhIjKlMnOpQrStUvWx";

// Discord
const DISCORD_BOT_TOKEN = "MTIzNDU2Nzg5MDEyMzQ1Njc4.GaBcDe.1234567890abcdefghijklmnopqrstuvwxyz";
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz-1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DISCORD_CLIENT_SECRET = "AbCdEfGhIjKlMnOpQrStUvWxYz123456";

// Telegram
const TELEGRAM_BOT_TOKEN = "1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh";

// ============================================================================
// DATABASES
// ============================================================================

// MongoDB
const MONGODB_URI = "mongodb+srv://admin:P@ssw0rd123@cluster0.mongodb.net/mydb?retryWrites=true";
const MONGODB_CONNECTION = "mongodb://user:pass123@localhost:27017/database";

// PostgreSQL
const POSTGRES_URL = "postgresql://username:P@ssw0rd123@localhost:5432/mydb";
const POSTGRES_CONNECTION = "postgres://admin:SecretPass123@db.example.com:5432/production";

// MySQL
const MYSQL_URI = "mysql://root:MyS3cr3tP@ssw0rd@localhost:3306/database";

// Redis
const REDIS_URL = "redis://:MyR3d1sP@ss@localhost:6379";
const REDIS_CONNECTION = "redis://user:SecretPassword123@redis.example.com:6379/0";

// Elasticsearch
const ELASTICSEARCH_URL = "https://elastic:P@ssw0rd123@localhost:9200";

// Cassandra
const CASSANDRA_PASSWORD = "cassandra_pass_12345";

// CouchDB
const COUCHDB_URL = "http://admin:P@ssw0rd123@localhost:5984";

// ============================================================================
// API KEYS & SERVICES
// ============================================================================

// OpenAI
const OPENAI_API_KEY = "sk-proj-1234567890abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQR";
const OPENAI_ORG_KEY = "org-1234567890abcdefghijklmn";

// Anthropic (Claude)
const ANTHROPIC_API_KEY = "sk-ant-api03-1234567890abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqr";

// Google Maps
const GOOGLE_MAPS_API_KEY = "AIzaSyDaGmWKa4JsXZ_HjGw7ISLn_3namBGewQe";

// Firebase
const FIREBASE_API_KEY = "AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567",
  authDomain: "myapp-12345.firebaseapp.com",
  projectId: "myapp-12345",
  storageBucket: "myapp-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Auth0
const AUTH0_CLIENT_SECRET = "AbCdEfGhIjKlMnOpQrStUvWxYz1234567890-AbCdEfGhIjKlMnOp";
const AUTH0_DOMAIN = "myapp.auth0.com";
const AUTH0_CLIENT_ID = "AbCdEfGhIjKlMnOpQrStUvWx";

// Okta
const OKTA_API_TOKEN = "00AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AB";

// Datadog
const DATADOG_API_KEY = "1234567890abcdef1234567890abcdef";
const DATADOG_APP_KEY = "abcdef1234567890abcdef1234567890abcdef12";

// New Relic
const NEW_RELIC_LICENSE_KEY = "1234567890abcdef1234567890abcdef12345678";
const NEW_RELIC_API_KEY = "NRAK-ABCDEFGHIJKLMNOPQRSTUVWXYZ123456";

// Sentry
const SENTRY_DSN = "https://1234567890abcdef1234567890abcdef@o123456.ingest.sentry.io/1234567";
const SENTRY_AUTH_TOKEN = "sntrys_1234567890abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRST";

// PagerDuty
const PAGERDUTY_API_KEY = "u+1234567890abcdefghij";

// Algolia
const ALGOLIA_API_KEY = "1234567890abcdef1234567890abcdef";
const ALGOLIA_APP_ID = "ABCDEFGHIJ";

// MapBox
const MAPBOX_TOKEN = "pk.eyJ1IjoibXl1c2VyIiwiYSI6ImNsYWJjZGVmZzEyMzQ1Njc4OTB6In0.1234567890abcdefghijklmnopqrstuv";

// Contentful
const CONTENTFUL_ACCESS_TOKEN = "CFPAT-1234567890abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOP";

// Cloudflare
const CLOUDFLARE_API_TOKEN = "AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AB";
const CLOUDFLARE_API_KEY = "1234567890abcdef1234567890abcdef12345";

// Docker Hub
const DOCKER_HUB_TOKEN = "dckr_pat_1234567890abcdefghijklmnopqrstuv";

// npm
const NPM_TOKEN = "npm_1234567890abcdefghijklmnopqrstuvwxyz";

// PyPI
const PYPI_TOKEN = "pypi-AgEIcHlwaS5vcmcCJGFiY2RlZmdoLWlqa2wtbW5vcC1xcnN0LXV2d3h5ejEyMzQ";

// NuGet
const NUGET_API_KEY = "oy2abcdefghijklmnopqrstuvwxyz1234567890";

// ============================================================================
// ENCRYPTION & SIGNING KEYS
// ============================================================================

// RSA Private Key
const RSA_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJ
KLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK
LMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK
-----END RSA PRIVATE KEY-----`;

// SSH Private Key
const SSH_PRIVATE_KEY = `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdz
c2gtcnNhAAAAAwEAAQAAAQEA1234567890abcdefghijklmnopqrstuvwxyz
-----END OPENSSH PRIVATE KEY-----`;

// PGP Private Key
const PGP_PRIVATE_KEY = `-----BEGIN PGP PRIVATE KEY BLOCK-----

lQOYBGAbCdEfBEAD1234567890abcdefghijklmnopqrstuvwxyz123456789
0abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnop
-----END PGP PRIVATE KEY BLOCK-----`;

// JWT Secret
const JWT_SIGNING_SECRET = "my-super-secret-jwt-key-12345-ABCDEF";
const JWT_REFRESH_SECRET = "refresh-token-secret-67890-GHIJKL";

// Encryption Keys
const ENCRYPTION_KEY = "1234567890abcdef1234567890abcdef";
const AES_256_KEY = "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

// ============================================================================
// CONTAINER & ORCHESTRATION
// ============================================================================

// Docker Registry
const DOCKER_REGISTRY_PASSWORD = "dckr_pat_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890";

// Kubernetes
const KUBERNETES_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQ1Njc4OTAifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50In0.1234567890";
const KUBERNETES_SECRET = "kubeconfig-user-abcdef:1234567890abcdefghijklmnopqrstuvwxyz";

// Terraform Cloud
const TERRAFORM_TOKEN = "AbCdEfGhIjKlMnOpQrStUvWxYz.atlasv1.1234567890abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Ansible Vault
const ANSIBLE_VAULT_PASSWORD = "$ANSIBLE_VAULT;1.1;AES256\n1234567890abcdef1234567890abcdef";

// ============================================================================
// MONITORING & LOGGING
// ============================================================================

// Splunk
const SPLUNK_TOKEN = "Splunk 1234567890abcdef-1234-5678-90ab-cdef12345678";

// Loggly
const LOGGLY_TOKEN = "12345678-90ab-cdef-1234-567890abcdef";

// Papertrail
const PAPERTRAIL_TOKEN = "1234567890abcdefghijklmnopqrstuvwxyz";

// LogDNA
const LOGDNA_INGESTION_KEY = "1234567890abcdefghijklmnopqrstuvwxyz1234567890ab";

// ============================================================================
// CDN & STORAGE
// ============================================================================

// Cloudinary
const CLOUDINARY_URL = "cloudinary://123456789012345:AbCdEfGhIjKlMnOpQrStUv@mycloud";
const CLOUDINARY_API_SECRET = "AbCdEfGhIjKlMnOpQrStUvWxYz123456";

// Amazon S3 (via URL)
const S3_PRESIGNED_URL = "https://mybucket.s3.amazonaws.com/file.txt?AWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&Expires=1234567890&Signature=AbCdEfGhIjKlMnOpQrStUvWxYz%3D";

// ============================================================================
// MOBILE & PUSH NOTIFICATIONS
// ============================================================================

// Firebase Cloud Messaging
const FCM_SERVER_KEY = "AAAAAbCdEfG:APA91bGhIjKlMnOpQrStUvWxYz1234567890-ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz123456";

// Apple Push Notification
const APNS_AUTH_KEY = `-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg1234567890abcd
-----END PRIVATE KEY-----`;

// OneSignal
const ONESIGNAL_API_KEY = "NGAbCdEfGhIjKlMnOpQrStUvWxYz1234567890";
const ONESIGNAL_REST_API_KEY = "MzAwAbCdEfGhIjKlMnOpQrStUvWxYz123456-AbCdEf-1234-5678-90ab-cdef12345678";

// ============================================================================
// TESTING & UTILITIES
// ============================================================================

// BrowserStack
const BROWSERSTACK_ACCESS_KEY = "abCdEfGhIjKlMnOpQrSt";

// Sauce Labs
const SAUCE_ACCESS_KEY = "1234567890-abcd-efgh-ijkl-1234567890ab";

// ============================================================================
// E-COMMERCE & SHOPPING
// ============================================================================

// Shopify
const SHOPIFY_ACCESS_TOKEN = "shpat_1234567890abcdefghijklmnopqrstuv";
const SHOPIFY_API_KEY = "1234567890abcdefghijklmnopqrst";
const SHOPIFY_PASSWORD = "shppa_1234567890abcdefghijklmnopqrstuv";

// WooCommerce
const WOOCOMMERCE_CONSUMER_KEY = "ck_1234567890abcdefghijklmnopqrstuvwxyz12";
const WOOCOMMERCE_CONSUMER_SECRET = "cs_1234567890abcdefghijklmnopqrstuvwxyz12";

// ============================================================================
// MARKETING & ANALYTICS
// ============================================================================

// Google Analytics
const GA_MEASUREMENT_ID = "G-ABCDEFGHIJ";
const GA_API_SECRET = "AbCdEfGhIjKlMnOpQrStUvWx";

// Mixpanel
const MIXPANEL_TOKEN = "1234567890abcdefghijklmnopqrstuv";
const MIXPANEL_API_SECRET = "1234567890abcdefghijklmnopqrstuv";

// Segment
const SEGMENT_WRITE_KEY = "AbCdEfGhIjKlMnOpQrStUvWxYz1234";

// Amplitude
const AMPLITUDE_API_KEY = "1234567890abcdefghijklmnopqrstuvwxyz";

// ============================================================================
// CRM & SALES
// ============================================================================

// Salesforce
const SALESFORCE_ACCESS_TOKEN = "00D1234567890ABC!ARAbCdEfGhIjKlMnOpQrStUvWxYz.1234567890abcdefghijklmnopqrstuvwxyz";
const SALESFORCE_CONSUMER_SECRET = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

// HubSpot
const HUBSPOT_API_KEY = "pat-na1-1234567890ab-cdef-ghij-klmn-opqrstuvwxyz";

// Intercom
const INTERCOM_ACCESS_TOKEN = "dG9rOjEyMzQ1Njc4OTBhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejEyMzQ1Njc4OTA=";

// Zendesk
const ZENDESK_API_TOKEN = "1234567890abcdefghijklmnopqrstuvwxyz1234";

// ============================================================================
// COMMONLY EXPOSED PATTERNS
// ============================================================================

// Generic API Keys
const api_key = "1234567890abcdefghijklmnopqrstuvwxyz";
const apiKey = "AbCdEfGhIjKlMnOpQrStUvWxYz123456";
const API_SECRET = "secret_key_1234567890abcdefghij";

// Generic Tokens
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const bearer_token = "Bearer 1234567890abcdefghijklmnopqrstuvwxyz";

// Database Passwords
const db_password = "P@ssw0rd123!";
const database_password = "SuperSecret123";
const DB_PASS = "MyDBP@ss2024";

// Admin Credentials
const admin_password = "Admin@12345";
const root_password = "R00tP@ssw0rd!";

// Environment Variables Exposure
process.env.SECRET_KEY = "my-secret-key-12345";
process.env.PRIVATE_KEY = "private-key-67890";
process.env.PASSWORD = "password123";

// URL with credentials
const url_with_creds = "https://admin:P@ssw0rd123@api.example.com/endpoint";
const ftp_url = "ftp://user:password123@ftp.example.com/files";

// Connection Strings
const connectionString = "Server=myserver;Database=mydb;User Id=sa;Password=MyP@ssw0rd123;";

// ============================================================================
// NOTES
// ============================================================================

/**
 * Secret Detection Categories Covered:
 *
 * 1. Cloud Providers (8):
 *    - AWS, Google Cloud, Azure, Digital Ocean, Heroku, IBM Cloud, Alibaba, Oracle
 *
 * 2. Version Control & CI/CD (8):
 *    - GitHub, GitLab, Bitbucket, Jenkins, CircleCI, Travis, Azure DevOps, TeamCity
 *
 * 3. Payment Services (6):
 *    - Stripe, PayPal, Square, Braintree, Plaid, Coinbase
 *
 * 4. Communication (7):
 *    - Slack, Twilio, SendGrid, Mailgun, MessageBird, Discord, Telegram
 *
 * 5. Databases (7):
 *    - MongoDB, PostgreSQL, MySQL, Redis, Elasticsearch, Cassandra, CouchDB
 *
 * 6. API Services (12):
 *    - OpenAI, Anthropic, Google Maps, Firebase, Auth0, Okta, Datadog, New Relic,
 *      Sentry, PagerDuty, Algolia, MapBox, Contentful, Cloudflare, Docker, npm, PyPI, NuGet
 *
 * 7. Encryption Keys (6):
 *    - RSA, SSH, PGP, JWT, AES, General encryption keys
 *
 * 8. Container/Orchestration (4):
 *    - Docker, Kubernetes, Terraform, Ansible
 *
 * 9. Monitoring & Logging (4):
 *    - Splunk, Loggly, Papertrail, LogDNA
 *
 * 10. CDN & Storage (2):
 *     - Cloudinary, S3
 *
 * 11. Mobile & Push (3):
 *     - FCM, APNS, OneSignal
 *
 * 12. Testing (2):
 *     - BrowserStack, Sauce Labs
 *
 * 13. E-Commerce (2):
 *     - Shopify, WooCommerce
 *
 * 14. Marketing & Analytics (4):
 *     - Google Analytics, Mixpanel, Segment, Amplitude
 *
 * 15. CRM & Sales (4):
 *     - Salesforce, HubSpot, Intercom, Zendesk
 *
 * Total: 79+ different types of secrets/credentials
 *
 * All secrets follow realistic patterns and formats used in production systems.
 * This file should trigger comprehensive secret detection across all categories.
 */

module.exports = {
  // Export for testing purposes
  testSecrets: {
    cloudProviders: { AWS_ACCESS_KEY_ID, GCP_API_KEY, AZURE_CLIENT_SECRET },
    versionControl: { GITHUB_TOKEN, GITLAB_TOKEN, BITBUCKET_APP_PASSWORD },
    payment: { STRIPE_SECRET_KEY, PAYPAL_CLIENT_SECRET },
    communication: { SLACK_BOT_TOKEN, TWILIO_AUTH_TOKEN },
    databases: { MONGODB_URI, POSTGRES_URL, REDIS_URL }
  }
};
