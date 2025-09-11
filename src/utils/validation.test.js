import { validators, validateForm, validateService, validateWidget } from './validation';

describe('validators', () => {
  describe('required', () => {
    it('should pass for non-empty strings', () => {
      const result = validators.required('test');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('');
    });

    it('should fail for empty strings', () => {
      const result = validators.required('');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('This field is required');
    });

    it('should fail for whitespace-only strings', () => {
      const result = validators.required('   ');
      expect(result.isValid).toBe(false);
    });

    it('should fail for null or undefined', () => {
      expect(validators.required(null).isValid).toBe(false);
      expect(validators.required(undefined).isValid).toBe(false);
    });
  });

  describe('url', () => {
    it('should pass for valid URLs', () => {
      const validUrls = [
        'http://localhost:8080',
        'https://example.com',
        'http://192.168.1.1:3000/path',
        'https://subdomain.example.com:8443/api/v1'
      ];

      validUrls.forEach(url => {
        const result = validators.url(url);
        expect(result.isValid).toBe(true);
      });
    });

    it('should fail for invalid URLs', () => {
      const invalidUrls = [
        'not-a-url',
        'localhost:8080', // Missing protocol
        'http://',
        'just-text'
      ];

      invalidUrls.forEach(url => {
        const result = validators.url(url);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Please enter a valid URL');
      });
    });

    it('should pass for empty values (optional field)', () => {
      const result = validators.url('');
      expect(result.isValid).toBe(true);
    });
  });

  describe('apiKey', () => {
    it('should pass for valid API keys', () => {
      const validKeys = [
        'abcd1234',
        'very-long-api-key-with-special-chars_123',
        'sk-1234567890abcdef'
      ];

      validKeys.forEach(key => {
        const result = validators.apiKey(key);
        expect(result.isValid).toBe(true);
      });
    });

    it('should fail for too short API keys', () => {
      const result = validators.apiKey('abc');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('API key must be at least 4 characters');
    });

    it('should fail for too long API keys', () => {
      const longKey = 'a'.repeat(257);
      const result = validators.apiKey(longKey);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('API key must be less than 256 characters');
    });

    it('should pass for empty values (optional field)', () => {
      const result = validators.apiKey('');
      expect(result.isValid).toBe(true);
    });
  });

  describe('serviceName', () => {
    it('should pass for valid service names', () => {
      const validNames = [
        'Plex',
        'My Service 123',
        'Service-Name_v2.0'
      ];

      validNames.forEach(name => {
        const result = validators.serviceName(name);
        expect(result.isValid).toBe(true);
      });
    });

    it('should fail for invalid characters', () => {
      const result = validators.serviceName('Service@#$%');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('can only contain letters, numbers');
    });

    it('should fail for too long names', () => {
      const longName = 'a'.repeat(51);
      const result = validators.serviceName(longName);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Service name must be less than 50 characters');
    });

    it('should fail for empty names', () => {
      const result = validators.serviceName('');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Service name is required');
    });
  });

  describe('port', () => {
    it('should pass for valid ports', () => {
      const validPorts = ['80', '8080', '65535', '1'];

      validPorts.forEach(port => {
        const result = validators.port(port);
        expect(result.isValid).toBe(true);
      });
    });

    it('should fail for invalid ports', () => {
      const invalidPorts = ['0', '65536', 'abc', '-1'];

      invalidPorts.forEach(port => {
        const result = validators.port(port);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Port must be between 1 and 65535');
      });
    });

    it('should pass for empty values (optional field)', () => {
      const result = validators.port('');
      expect(result.isValid).toBe(true);
    });
  });
});

describe('validateForm', () => {
  it('should validate form with multiple fields', () => {
    const formData = {
      name: 'Test Service',
      url: 'http://localhost:8080',
      apiKey: 'valid-key-123'
    };

    const fieldValidators = {
      name: validators.serviceName,
      url: validators.url,
      apiKey: validators.apiKey
    };

    const result = validateForm(formData, fieldValidators);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return errors for invalid fields', () => {
    const formData = {
      name: '',
      url: 'invalid-url',
      apiKey: 'abc'
    };

    const fieldValidators = {
      name: validators.serviceName,
      url: validators.url,
      apiKey: validators.apiKey
    };

    const result = validateForm(formData, fieldValidators);
    expect(result.isValid).toBe(false);
    expect(Object.keys(result.errors)).toHaveLength(3);
  });
});

describe('validateService', () => {
  it('should validate a complete service', () => {
    const service = {
      name: 'Plex',
      href: 'http://localhost:32400',
      description: 'Media server',
      icon: 'plex'
    };

    const result = validateService(service);
    expect(result.isValid).toBe(true);
  });

  it('should fail for service with invalid name', () => {
    const service = {
      name: '',
      href: 'http://localhost:32400'
    };

    const result = validateService(service);
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });
});

describe('validateWidget', () => {
  it('should validate a complete widget', () => {
    const widget = {
      type: 'plex',
      url: 'http://localhost:32400',
      key: 'valid-api-key'
    };

    const result = validateWidget(widget);
    expect(result.isValid).toBe(true);
  });

  it('should pass for null widget', () => {
    const result = validateWidget(null);
    expect(result.isValid).toBe(true);
  });

  it('should fail for widget with missing required fields', () => {
    const widget = {
      url: 'http://localhost:32400',
      key: 'valid-api-key'
    };

    const result = validateWidget(widget);
    expect(result.isValid).toBe(false);
    expect(result.errors.type).toBeDefined();
  });
});