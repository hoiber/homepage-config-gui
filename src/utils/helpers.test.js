import { 
  generateId, 
  swapHost, 
  isValidUrl, 
  validateRequired, 
  validateApiKey,
  sanitizeYamlString,
  deepClone,
  formatBytes,
  debounce,
  isSafeYamlKey 
} from './helpers';

// Mock crypto.randomUUID for testing
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => '12345678-1234-1234-1234-123456789012')
  },
  writable: true
});

describe('generateId', () => {
  beforeEach(() => {
    global.crypto.randomUUID.mockClear();
  });

  it('should generate ID without prefix', () => {
    const id = generateId();
    expect(id).toMatch(/^[0-9a-f-]{36}$/);
    expect(global.crypto.randomUUID).toHaveBeenCalled();
  });

  it('should generate ID with prefix', () => {
    const id = generateId('service');
    expect(id).toMatch(/^service_[0-9a-f-]{36}$/);
    expect(global.crypto.randomUUID).toHaveBeenCalled();
  });

  it('should fallback to timestamp-based ID if crypto.randomUUID is not available', () => {
    const originalRandomUUID = global.crypto.randomUUID;
    global.crypto.randomUUID = undefined;

    const id = generateId();
    expect(id).toContain('-');
    expect(id.length).toBeGreaterThan(20);

    global.crypto.randomUUID = originalRandomUUID;
  });
});

describe('swapHost', () => {
  it('should swap hostname correctly', () => {
    const result = swapHost('http://localhost:8080/path', 'example.com');
    expect(result).toBe('http://example.com:8080/path');
  });

  it('should preserve protocol and port', () => {
    const result = swapHost('https://old-host:3000/api/v1', 'new-host');
    expect(result).toBe('https://new-host:3000/api/v1');
  });

  it('should return original URL for invalid URLs', () => {
    const invalidUrl = 'not-a-valid-url';
    const result = swapHost(invalidUrl, 'new-host');
    expect(result).toBe(invalidUrl);
  });

  it('should handle URLs without ports', () => {
    const result = swapHost('https://example.com/path', 'newhost.com');
    expect(result).toBe('https://newhost.com/path');
  });
});

describe('isValidUrl', () => {
  it('should return true for valid URLs', () => {
    const validUrls = [
      'http://localhost:8080',
      'https://example.com',
      'http://192.168.1.1:3000/path'
    ];

    validUrls.forEach(url => {
      expect(isValidUrl(url)).toBe(true);
    });
  });

  it('should return false for invalid URLs', () => {
    const invalidUrls = [
      'not-a-url',
      'localhost:8080', // Missing protocol
      ''
    ];

    invalidUrls.forEach(url => {
      expect(isValidUrl(url)).toBe(false);
    });
  });
});

describe('validateRequired', () => {
  it('should return true for non-empty strings', () => {
    expect(validateRequired('test')).toBe(true);
  });

  it('should return false for empty or whitespace strings', () => {
    expect(validateRequired('')).toBe(false);
    expect(validateRequired('   ')).toBe(false);
    expect(validateRequired(null)).toBe(false);
    expect(validateRequired(undefined)).toBe(false);
  });
});

describe('validateApiKey', () => {
  it('should return true for valid API keys', () => {
    expect(validateApiKey('valid-key')).toBe(true);
    expect(validateApiKey('a'.repeat(100))).toBe(true);
  });

  it('should return false for invalid API keys', () => {
    expect(validateApiKey('abc')).toBe(false); // Too short
    expect(validateApiKey('a'.repeat(257))).toBe(false); // Too long
    expect(validateApiKey('')).toBe(false);
    expect(validateApiKey(null)).toBe(false);
    expect(validateApiKey(undefined)).toBe(false);
  });
});

describe('sanitizeYamlString', () => {
  it('should return empty string for falsy values', () => {
    expect(sanitizeYamlString('')).toBe('');
    expect(sanitizeYamlString(null)).toBe('');
    expect(sanitizeYamlString(undefined)).toBe('');
  });

  it('should quote strings with special YAML characters', () => {
    expect(sanitizeYamlString('value: with colon')).toBe('"value: with colon"');
    expect(sanitizeYamlString('value # with comment')).toBe('"value # with comment"');
    expect(sanitizeYamlString("value 'with quotes'")).toBe('"value \'with quotes\'"');
  });

  it('should escape double quotes in quoted strings', () => {
    expect(sanitizeYamlString('value "with quotes"')).toBe('"value \\"with quotes\\""');
  });

  it('should return unmodified strings without special characters', () => {
    expect(sanitizeYamlString('simple-value')).toBe('simple-value');
  });
});

describe('deepClone', () => {
  it('should create a deep copy of an object', () => {
    const original = {
      name: 'test',
      nested: {
        value: 123,
        array: [1, 2, 3]
      }
    };

    const cloned = deepClone(original);
    cloned.nested.value = 456;
    cloned.nested.array.push(4);

    expect(original.nested.value).toBe(123);
    expect(original.nested.array).toEqual([1, 2, 3]);
    expect(cloned.nested.value).toBe(456);
    expect(cloned.nested.array).toEqual([1, 2, 3, 4]);
  });
});

describe('formatBytes', () => {
  it('should format bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(1073741824)).toBe('1 GB');
  });

  it('should handle decimal places', () => {
    expect(formatBytes(1536, 1)).toBe('1.5 KB');
    expect(formatBytes(1536, 0)).toBe('2 KB');
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  it('should debounce function calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1');
    debouncedFn('arg2');
    debouncedFn('arg3');

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('arg3');
  });

  it('should reset timer on subsequent calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1');
    jest.advanceTimersByTime(50);
    debouncedFn('arg2');
    jest.advanceTimersByTime(50);

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('arg2');
  });
});

describe('isSafeYamlKey', () => {
  it('should return true for safe YAML keys', () => {
    const safeKeys = ['key', 'my_key', 'key-123', 'KEY', 'key_with_underscores'];
    
    safeKeys.forEach(key => {
      expect(isSafeYamlKey(key)).toBe(true);
    });
  });

  it('should return false for unsafe YAML keys', () => {
    const unsafeKeys = ['key with spaces', 'key:colon', 'key#hash', 'key@symbol', ''];
    
    unsafeKeys.forEach(key => {
      expect(isSafeYamlKey(key)).toBe(false);
    });
  });
});