// Utility functions for the Homepage Config GUI

// Generate secure random IDs
export const generateId = (prefix = '') => {
  const uuid = crypto.randomUUID?.() || 
    `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
  return prefix ? `${prefix}_${uuid}` : uuid;
};

// Helper function to swap hostname while preserving protocol, port, and path
export const swapHost = (originalUrl, newHost) => {
  try {
    const u = new URL(originalUrl);
    u.host = newHost;
    return u.toString();
  } catch {
    return originalUrl;
  }
};

// Validate URL format
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

// Validate required field
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

// Validate API key format (basic check for non-empty and reasonable length)
export const validateApiKey = (key) => {
  return key && key.trim().length >= 4 && key.trim().length <= 256;
};

// Sanitize string for YAML output
export const sanitizeYamlString = (str) => {
  if (!str) return '';
  // Escape special YAML characters and ensure proper quoting
  if (str.includes(':') || str.includes('#') || str.includes("'") || str.includes('"')) {
    return `"${str.replace(/"/g, '\\"')}"`;
  }
  return str;
};

// Deep clone object to avoid mutation
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Format bytes to human readable format
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Debounce function for search/input
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Check if string contains only safe characters for YAML keys
export const isSafeYamlKey = (key) => {
  return /^[a-zA-Z0-9_-]+$/.test(key);
};