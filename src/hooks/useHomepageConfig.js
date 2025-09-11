import { useState, useCallback } from 'react';

// Custom hook for managing Homepage configuration state and operations
export const useHomepageConfig = () => {
  const [config, setConfig] = useState({
    groups: [
      {
        id: 'group1',
        name: 'My Services',
        services: []
      }
    ]
  });

  const [settings, setSettings] = useState({
    title: 'Homepage',
    favicon: '',
    theme: 'dark',
    color: 'slate',
    headerStyle: 'underlined',
    language: 'en',
    target: '_blank',
    hideVersion: false,
    searchDescriptions: false,
    hideInternetSearch: false,
    hideVisitURL: false,
    showGreeting: false,
    quickSearch: false,
    openWeatherMapKey: '',
    weatherApiKey: '',
    showProxmoxTab: false,
    globalDomain: ''
  });

  const [widgets, setWidgets] = useState([]);

  // Group management functions
  const addGroup = useCallback(() => {
    const newGroup = {
      id: `group${Date.now()}`,
      name: 'New Group',
      services: []
    };
    setConfig(prev => ({
      ...prev,
      groups: [...prev.groups, newGroup]
    }));
  }, []);

  const updateGroup = useCallback((groupId, updates) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === groupId ? { ...group, ...updates } : group
      )
    }));
  }, []);

  const deleteGroup = useCallback((groupId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.filter(group => group.id !== groupId)
    }));
  }, []);

  const reorderGroups = useCallback((fromIndex, toIndex) => {
    setConfig(prev => {
      const newGroups = [...prev.groups];
      const [removed] = newGroups.splice(fromIndex, 1);
      newGroups.splice(toIndex, 0, removed);
      return { ...prev, groups: newGroups };
    });
  }, []);

  // Service management functions
  const addService = useCallback((groupId, serviceData) => {
    const newService = {
      id: `service${Date.now()}`,
      name: serviceData.name || 'New Service',
      href: serviceData.href || '',
      description: serviceData.description || '',
      icon: serviceData.icon || '',
      ...serviceData
    };

    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === groupId
          ? { ...group, services: [...(group.services || []), newService] }
          : group
      )
    }));
  }, []);

  const updateService = useCallback((serviceId, updates) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => ({
        ...group,
        services: (group.services || []).map(service =>
          service.id === serviceId ? { ...service, ...updates } : service
        )
      }))
    }));
  }, []);

  const deleteService = useCallback((serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => ({
        ...group,
        services: (group.services || []).filter(service => service.id !== serviceId)
      }))
    }));
  }, []);

  const duplicateService = useCallback((service) => {
    const duplicatedService = {
      ...service,
      id: `service${Date.now()}`,
      name: `${service.name} (Copy)`
    };

    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.services?.some(s => s.id === service.id)
          ? { ...group, services: [...group.services, duplicatedService] }
          : group
      )
    }));
  }, []);

  // Widget management functions
  const addWidget = useCallback((widgetData) => {
    const newWidget = {
      id: `widget${Date.now()}`,
      ...widgetData
    };
    setWidgets(prev => [...prev, newWidget]);
  }, []);

  const updateWidget = useCallback((widgetId, updates) => {
    setWidgets(prev => prev.map(widget =>
      widget.id === widgetId ? { ...widget, ...updates } : widget
    ));
  }, []);

  const deleteWidget = useCallback((widgetId) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
  }, []);

  // Settings management
  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateMultipleSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // Bulk operations
  const resetConfig = useCallback(() => {
    setConfig({
      groups: [
        {
          id: 'group1',
          name: 'My Services',
          services: []
        }
      ]
    });
    setSettings({
      title: 'Homepage',
      favicon: '',
      theme: 'dark',
      color: 'slate',
      headerStyle: 'underlined',
      language: 'en',
      target: '_blank',
      hideVersion: false,
      searchDescriptions: false,
      hideInternetSearch: false,
      hideVisitURL: false,
      showGreeting: false,
      quickSearch: false,
      openWeatherMapKey: '',
      weatherApiKey: '',
      showProxmoxTab: false,
      globalDomain: ''
    });
    setWidgets([]);
  }, []);

  return {
    // State
    config,
    settings,
    widgets,
    setConfig,
    setSettings,
    setWidgets,
    
    // Group operations
    addGroup,
    updateGroup,
    deleteGroup,
    reorderGroups,
    
    // Service operations
    addService,
    updateService,
    deleteService,
    duplicateService,
    
    // Widget operations
    addWidget,
    updateWidget,
    deleteWidget,
    
    // Settings operations
    updateSetting,
    updateMultipleSettings,
    
    // Bulk operations
    resetConfig
  };
};