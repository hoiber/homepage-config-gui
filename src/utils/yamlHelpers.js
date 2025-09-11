import yaml from 'js-yaml';

// YAML generation utilities to reduce code duplication

export const generateServicesYAML = (config) => {
  const yamlStructure = {};

  config.groups.forEach(group => {
    if (!group.services || group.services.length === 0) {
      yamlStructure[group.name] = [];
      return;
    }

    yamlStructure[group.name] = group.services.map(service => {
      const serviceObj = {
        [service.name]: {
          href: service.href || '',
          description: service.description || '',
          ...(service.icon && { icon: service.icon })
        }
      };

      // Add widget configuration if present
      if (service.widget && service.widget.type) {
        serviceObj[service.name].widget = {
          type: service.widget.type,
          ...(service.widget.url && { url: service.widget.url }),
          ...(service.widget.key && { key: service.widget.key }),
          // Add other widget properties dynamically
          ...Object.fromEntries(
            Object.entries(service.widget).filter(([key]) => 
              !['type', 'url', 'key'].includes(key)
            )
          )
        };
      }

      return serviceObj;
    });
  });

  return yaml.dump(yamlStructure, { 
    indent: 2, 
    lineWidth: -1,
    noRefs: true,
    sortKeys: false 
  });
};

export const generateSettingsYAML = (settings) => {
  const yamlSettings = {
    title: settings.title || 'Homepage',
    ...(settings.favicon && { favicon: settings.favicon }),
    theme: settings.theme || 'dark',
    color: settings.color || 'slate',
    headerStyle: settings.headerStyle || 'underlined',
    language: settings.language || 'en',
    target: settings.target || '_blank',
    ...(settings.hideVersion && { hideVersion: settings.hideVersion }),
    ...(settings.searchDescriptions && { searchDescriptions: settings.searchDescriptions }),
    ...(settings.hideInternetSearch && { hideInternetSearch: settings.hideInternetSearch }),
    ...(settings.hideVisitURL && { hideVisitURL: settings.hideVisitURL })
  };

  // Add weather configuration if API keys are provided
  if (settings.openWeatherMapKey || settings.weatherApiKey) {
    yamlSettings.providers = {};
    if (settings.openWeatherMapKey) {
      yamlSettings.providers.openweathermap = settings.openWeatherMapKey;
    }
    if (settings.weatherApiKey) {
      yamlSettings.providers.weatherapi = settings.weatherApiKey;
    }
  }

  return yaml.dump(yamlSettings, { 
    indent: 2, 
    lineWidth: -1,
    noRefs: true 
  });
};

export const generateWidgetsYAML = (widgets) => {
  if (!widgets || widgets.length === 0) {
    return '# No widgets configured\n';
  }

  const widgetStructure = widgets.map(widget => {
    const { id, ...widgetConfig } = widget;
    return widgetConfig;
  });

  return yaml.dump(widgetStructure, { 
    indent: 2, 
    lineWidth: -1,
    noRefs: true 
  });
};

export const parseYAMLSafely = (yamlString, fallback = {}) => {
  try {
    return yaml.load(yamlString) || fallback;
  } catch (error) {
    console.error('Failed to parse YAML:', error);
    return fallback;
  }
};

export const validateYAMLStructure = (yamlString) => {
  try {
    yaml.load(yamlString);
    return { isValid: true, error: null };
  } catch (error) {
    return { 
      isValid: false, 
      error: error.message,
      line: error.mark?.line,
      column: error.mark?.column
    };
  }
};

// Helper to clean undefined/empty values from objects before YAML generation
export const cleanObject = (obj) => {
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const cleanedNested = cleanObject(value);
        if (Object.keys(cleanedNested).length > 0) {
          cleaned[key] = cleanedNested;
        }
      } else {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
};