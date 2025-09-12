/**
 * Widget YAML generators - extracted to reduce cognitive complexity
 * Each function handles a specific widget type with focused logic
 */

// DateTime widget YAML generation
export const generateDateTimeWidgetYAML = (widget) => {
  let yamlStr = '';
  
  if (widget.options?.format) {
    yamlStr += `    format:\n`;
    if (widget.options.format.timeStyle) {
      yamlStr += `      timeStyle: ${widget.options.format.timeStyle}\n`;
    }
    if (widget.options.format.dateStyle) {
      yamlStr += `      dateStyle: ${widget.options.format.dateStyle}\n`;
    }
  }
  
  if (widget.options?.timezone) {
    yamlStr += `    timezone: ${widget.options.timezone}\n`;
  }
  
  if (widget.options?.showSeconds) {
    yamlStr += `    showSeconds: ${widget.options.showSeconds}\n`;
  }
  
  return yamlStr;
};

// Weather widget YAML generation
export const generateWeatherWidgetYAML = (widget) => {
  let yamlStr = '';
  const options = widget.options;
  
  if (!options) return yamlStr;
  
  if (options.location) yamlStr += `    location: ${options.location}\n`;
  if (options.units) yamlStr += `    units: ${options.units}\n`;
  if (options.provider) yamlStr += `    provider: ${options.provider}\n`;
  if (options.show) yamlStr += `    show: ${options.show}\n`;
  if (options.showForecast) yamlStr += `    showForecast: ${options.showForecast}\n`;
  
  return yamlStr;
};

// Resources widget YAML generation
export const generateResourcesWidgetYAML = (widget) => {
  let yamlStr = '';
  const options = widget.options;
  
  if (!options) return yamlStr;
  
  if (options.refresh) yamlStr += `    refresh: ${options.refresh}\n`;
  if (options.units) yamlStr += `    units: ${options.units}\n`;
  
  yamlStr += `    show:\n`;
  yamlStr += `      cpu: ${options.cpu !== false}\n`;
  yamlStr += `      memory: ${options.memory !== false}\n`;
  yamlStr += `      disk: ${options.disk !== false}\n`;
  
  if (options.temp) {
    yamlStr += `      temperature: ${options.temp}\n`;
  }
  
  return yamlStr;
};

// Search widget YAML generation
export const generateSearchWidgetYAML = (widget) => {
  let yamlStr = '';
  const options = widget.options;
  
  if (!options) return yamlStr;
  
  if (options.placeholder) {
    yamlStr += `    placeholder: "${options.placeholder}"\n`;
  }
  if (options.provider) {
    yamlStr += `    provider: ${options.provider}\n`;
  }
  if (options.showIcon !== undefined) {
    yamlStr += `    showIcon: ${options.showIcon}\n`;
  }
  if (options.autofocus) {
    yamlStr += `    autofocus: ${options.autofocus}\n`;
  }
  
  return yamlStr;
};

// Bookmarks widget YAML generation
export const generateBookmarksWidgetYAML = (widget) => {
  let yamlStr = '';
  const options = widget.options;
  
  if (!options) return yamlStr;
  
  if (options.limit) {
    yamlStr += `    limit: ${options.limit}\n`;
  }
  if (options.layout) {
    yamlStr += `    layout: ${options.layout}\n`;
  }
  
  if (options.categories) {
    const categories = options.categories
      .split(',')
      .map(cat => cat.trim())
      .filter(cat => cat);
      
    if (categories.length > 0) {
      yamlStr += `    categories:\n`;
      categories.forEach(category => {
        yamlStr += `      - ${category}\n`;
      });
    }
  }
  
  if (options.showIcons !== undefined) {
    yamlStr += `    showIcons: ${options.showIcons}\n`;
  }
  
  return yamlStr;
};

// Greeting widget YAML generation
export const generateGreetingWidgetYAML = (widget) => {
  let yamlStr = '';
  const options = widget.options;
  
  if (!options) return yamlStr;
  
  if (options.name) {
    yamlStr += `    name: "${options.name}"\n`;
  }
  if (options.format) {
    yamlStr += `    timeFormat: ${options.format}\n`;
  }
  if (options.showTime !== undefined) {
    yamlStr += `    showTime: ${options.showTime}\n`;
  }
  
  yamlStr += `    messages:\n`;
  yamlStr += `      morning: "${options.morning || 'Good morning'}"\n`;
  yamlStr += `      afternoon: "${options.afternoon || 'Good afternoon'}"\n`;
  yamlStr += `      evening: "${options.evening || 'Good evening'}"\n`;
  yamlStr += `      night: "${options.night || 'Good night'}"\n`;
  
  return yamlStr;
};

// Widget type to generator mapping for easy lookup
export const WIDGET_GENERATORS = {
  datetime: generateDateTimeWidgetYAML,
  weather: generateWeatherWidgetYAML,
  resources: generateResourcesWidgetYAML,
  search: generateSearchWidgetYAML,
  bookmarks: generateBookmarksWidgetYAML,
  greeting: generateGreetingWidgetYAML
};

// Main widget options YAML generator - simplified with early returns
export const generateWidgetOptionsYAML = (widget) => {
  if (!widget.options || Object.keys(widget.options).length === 0) {
    return '';
  }
  
  const generator = WIDGET_GENERATORS[widget.type];
  if (!generator) {
    return ''; // Unknown widget type, skip options
  }
  
  const optionsYaml = generator(widget);
  return optionsYaml ? `  options:\n${optionsYaml}` : '';
};

// Simplified main widgets YAML generator
export const generateWidgetsYAML = (informationWidgets) => {
  if (!informationWidgets?.widgets || informationWidgets.widgets.length === 0) {
    return '# No widgets configured yet';
  }
  
  const enabledWidgets = informationWidgets.widgets.filter(w => w.enabled);
  if (enabledWidgets.length === 0) {
    return '# No enabled widgets';
  }
  
  return enabledWidgets
    .map((widget, index) => {
      let yamlStr = `- type: ${widget.type}\n`;
      const optionsYaml = generateWidgetOptionsYAML(widget);
      
      if (optionsYaml) {
        yamlStr += optionsYaml;
      }
      
      return yamlStr;
    })
    .join('\n\n'); // Add spacing between widgets
};