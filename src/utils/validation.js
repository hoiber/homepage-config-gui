// Input validation utilities

export const validators = {
  required: (value) => {
    const isValid = value != null && typeof value === 'string' && value.trim().length > 0;
    return {
      isValid,
      message: isValid ? '' : 'This field is required'
    };
  },

  url: (value) => {
    if (!value) return { isValid: true, message: '' }; // Optional field
    try {
      const url = new URL(value);
      // Additional validation: must have a valid protocol
      if (!['http:', 'https:'].includes(url.protocol)) {
        return { isValid: false, message: 'Please enter a valid URL' };
      }
      // Must have a hostname
      if (!url.hostname || url.hostname.length === 0) {
        return { isValid: false, message: 'Please enter a valid URL' };
      }
      return { isValid: true, message: '' };
    } catch {
      return { isValid: false, message: 'Please enter a valid URL' };
    }
  },

  apiKey: (value) => {
    if (!value) return { isValid: true, message: '' }; // Optional field
    if (value.trim().length < 4) {
      return { isValid: false, message: 'API key must be at least 4 characters' };
    }
    if (value.trim().length > 256) {
      return { isValid: false, message: 'API key must be less than 256 characters' };
    }
    return { isValid: true, message: '' };
  },

  serviceName: (value) => {
    if (!value || value.trim().length === 0) {
      return { isValid: false, message: 'Service name is required' };
    }
    if (value.trim().length > 50) {
      return { isValid: false, message: 'Service name must be less than 50 characters' };
    }
    if (!/^[a-zA-Z0-9\s\-_\.]+$/.test(value)) {
      return { isValid: false, message: 'Service name can only contain letters, numbers, spaces, hyphens, underscores, and periods' };
    }
    return { isValid: true, message: '' };
  },

  groupName: (value) => {
    if (!value || value.trim().length === 0) {
      return { isValid: false, message: 'Group name is required' };
    }
    if (value.trim().length > 30) {
      return { isValid: false, message: 'Group name must be less than 30 characters' };
    }
    if (!/^[a-zA-Z0-9\s\-_]+$/.test(value)) {
      return { isValid: false, message: 'Group name can only contain letters, numbers, spaces, hyphens, and underscores' };
    }
    return { isValid: true, message: '' };
  },

  port: (value) => {
    if (!value) return { isValid: true, message: '' }; // Optional field
    const port = parseInt(value);
    if (isNaN(port) || port < 1 || port > 65535) {
      return { isValid: false, message: 'Port must be between 1 and 65535' };
    }
    return { isValid: true, message: '' };
  },

  hostname: (value) => {
    if (!value) return { isValid: true, message: '' }; // Optional field
    // Basic hostname validation
    const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!hostnameRegex.test(value)) {
      return { isValid: false, message: 'Please enter a valid hostname' };
    }
    return { isValid: true, message: '' };
  },

  yamlKey: (value) => {
    if (!value || value.trim().length === 0) {
      return { isValid: false, message: 'Key is required' };
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return { isValid: false, message: 'Key can only contain letters, numbers, hyphens, and underscores' };
    }
    return { isValid: true, message: '' };
  }
};

// Validate a form with multiple fields
export const validateForm = (formData, fieldValidators) => {
  const errors = {};
  let isValid = true;

  Object.keys(fieldValidators).forEach(fieldName => {
    const validator = fieldValidators[fieldName];
    const value = formData[fieldName];
    const result = validator(value);
    
    if (!result.isValid) {
      errors[fieldName] = result.message;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Validate service configuration
export const validateService = (service) => {
  return validateForm(service, {
    name: validators.serviceName,
    href: validators.url,
    description: (value) => ({ isValid: true, message: '' }), // Optional
    icon: (value) => ({ isValid: true, message: '' }) // Optional
  });
};

// Validate widget configuration
export const validateWidget = (widget) => {
  if (!widget) return { isValid: true, errors: {} };
  
  const fieldValidators = {
    type: validators.required,
    url: validators.url
  };

  // Add key validation if present
  if (widget.key !== undefined) {
    fieldValidators.key = validators.apiKey;
  }

  return validateForm(widget, fieldValidators);
};