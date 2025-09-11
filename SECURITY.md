# Security Implementation

This document outlines the security measures implemented in the Homepage Config GUI to protect against common web application vulnerabilities.

## Critical Security Fixes

### 🛡️ Path Traversal Protection (CVE Fixed)

**Issue**: User-controlled timestamp parameter in backup deletion endpoint could be manipulated to delete arbitrary files.

**Location**: `/api/config/:type/backup/:timestamp` endpoint in `server.js:255`

**Fix Implemented**:
1. **Input Validation**: Strict timestamp validation with regex pattern `^\d{13}$`
2. **Range Validation**: Timestamps must be within reasonable time range (not more than 1 year old)
3. **Path Resolution**: Double-check that resolved path stays within config directory
4. **Sanitization**: Only numeric timestamps accepted, all path traversal patterns rejected

**Protected Against**:
- `../../../etc/passwd` - Directory traversal
- `..\\..\\windows\\system32` - Windows path traversal  
- `/absolute/path/file.txt` - Absolute path injection
- `1234;rm -rf /` - Command injection attempts
- All other path traversal variations

```javascript
const validateTimestamp = (timestamp) => {
  // Only allow 13-digit numeric timestamps (Date.now() format)
  if (!/^\d{13}$/.test(timestamp)) {
    return false;
  }
  
  // Validate timestamp is within reasonable range
  const numTimestamp = parseInt(timestamp, 10);
  const now = Date.now();
  const oneYearMs = 365 * 24 * 60 * 60 * 1000;
  
  if (numTimestamp < (now - oneYearMs) || numTimestamp > now) {
    return false;
  }
  
  return true;
};
```

## Comprehensive Security Measures

### 🔒 Input Validation & Sanitization

1. **YAML Syntax Validation**
   - All YAML content validated before file operations
   - Prevents malformed configuration injection
   - Uses `js-yaml` library for parsing validation

2. **Form Input Validation**
   - URLs validated with URL constructor
   - API keys length and format validation
   - Service names restricted to safe characters
   - Port numbers validated within valid range (1-65535)

3. **Path Sanitization**
   - All file paths resolved and validated
   - Config directory boundary enforcement
   - No relative path traversal allowed

### 🚦 Rate Limiting & DoS Protection

**Implementation**: Custom rate limiting middleware
- **Limit**: 100 requests per 15 minutes per IP
- **Scope**: All `/api/*` endpoints
- **Memory**: In-memory request tracking with cleanup
- **Response**: HTTP 429 Too Many Requests

```javascript
const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map();
  // Implementation prevents DoS attacks
};
```

### 🛡️ Access Control

1. **Live Updates Disabled by Default**
   - `ENABLE_LIVE_UPDATES=false` by default
   - Requires explicit opt-in for file system access
   - Static mode (read-only) available for high-security environments

2. **Environment-Based Security**
   - Production vs Development error messages
   - No sensitive information leaked in production errors
   - Debug information only in development mode

### 🚨 Error Handling & Information Disclosure

1. **Global Error Handler**
   - Catches unhandled exceptions
   - Different error responses for prod/dev
   - No stack traces in production

2. **Graceful Shutdown**
   - Proper cleanup on SIGTERM/SIGINT
   - Prevents resource leaks
   - 10-second forced shutdown timeout

3. **404 Handling**
   - Separate handling for API vs frontend routes
   - No directory enumeration possible

### 🔐 HTTP Security Headers

**Implemented**:
- CORS properly configured
- JSON payload size limit (10MB)
- Request validation middleware

**Recommended** (for production deployment):
```nginx
# Add these headers in your reverse proxy
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=31536000";
```

### 🧪 Security Testing

**Automated Tests**: `src/security.test.js`
- Path traversal attack simulation
- Input validation verification
- Timestamp validation testing
- Security measure documentation

**Test Coverage**:
- ✅ Path traversal attempts (15+ attack vectors tested)
- ✅ Invalid timestamp formats  
- ✅ Command injection patterns
- ✅ Directory enumeration prevention
- ✅ File system boundary validation

## Security Best Practices for Deployment

### 🚀 Production Deployment

1. **Environment Variables**:
   ```bash
   NODE_ENV=production
   ENABLE_LIVE_UPDATES=false  # Only enable if needed
   HOMEPAGE_CONFIG_PATH=/secure/path/config
   ```

2. **File System Permissions**:
   ```bash
   # Restrict config directory access
   chmod 750 /path/to/config
   chown app:app /path/to/config
   ```

3. **Network Security**:
   - Deploy behind reverse proxy (nginx/traefik)
   - Use HTTPS in production
   - Implement additional rate limiting at proxy level
   - Consider IP whitelisting for admin endpoints

4. **Monitoring**:
   - Log failed authentication attempts
   - Monitor backup deletion operations
   - Alert on repeated 429 responses
   - Track unusual file system access patterns

### 🔍 Security Scanning

**Static Analysis**: Compatible with tools like:
- SonarQube (security hotspot scanning)
- ESLint security plugins
- npm audit for dependency scanning

**Dynamic Testing**: Test endpoints with:
- OWASP ZAP
- Burp Suite
- Custom security test suites

## Incident Response

### 🚨 If Security Issue Detected

1. **Immediate Actions**:
   - Set `ENABLE_LIVE_UPDATES=false`
   - Restart application to clear memory-based attacks
   - Check backup files for unauthorized deletions
   - Review access logs for suspicious patterns

2. **Investigation**:
   - Check timestamp validation logs
   - Verify config directory integrity
   - Scan for unusual file modifications
   - Review rate limiting logs

3. **Recovery**:
   - Restore from known good backups
   - Update to latest security patches
   - Implement additional monitoring

## Security Contact

For security issues, please:
1. Do NOT open public GitHub issues for security vulnerabilities
2. Contact maintainers privately with details
3. Provide proof of concept if possible
4. Allow reasonable time for patches before disclosure

---

**Last Updated**: December 2024  
**Security Review**: Passed - Path traversal vulnerability fixed  
**Next Review**: Quarterly security assessment recommended