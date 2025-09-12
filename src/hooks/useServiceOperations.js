import { useCallback } from 'react';

/**
 * Custom hook for service management operations
 * Extracts service manipulation logic to reduce cognitive complexity
 */
export const useServiceOperations = (config, setConfig) => {
  
  // Move service up within a group
  const moveServiceUp = useCallback((groupId, serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id !== groupId) return group;
        
        const serviceIndex = group.services.findIndex(s => s.id === serviceId);
        if (serviceIndex <= 0) return group;
        
        const newServices = [...group.services];
        [newServices[serviceIndex - 1], newServices[serviceIndex]] = 
          [newServices[serviceIndex], newServices[serviceIndex - 1]];
        
        return { ...group, services: newServices };
      })
    }));
  }, [setConfig]);

  // Move service down within a group
  const moveServiceDown = useCallback((groupId, serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id !== groupId) return group;
        
        const serviceIndex = group.services.findIndex(s => s.id === serviceId);
        if (serviceIndex < 0 || serviceIndex >= group.services.length - 1) return group;
        
        const newServices = [...group.services];
        [newServices[serviceIndex], newServices[serviceIndex + 1]] = 
          [newServices[serviceIndex + 1], newServices[serviceIndex]];
        
        return { ...group, services: newServices };
      })
    }));
  }, [setConfig]);

  // Delete a service from a group
  const deleteService = useCallback((groupId, serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id !== groupId) return group;
        
        return {
          ...group,
          services: group.services.filter(s => s.id !== serviceId)
        };
      })
    }));
  }, [setConfig]);

  // Update a service in a group
  const updateService = useCallback((groupId, serviceId, updates) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id !== groupId) return group;
        
        return {
          ...group,
          services: group.services.map(service =>
            service.id === serviceId ? { ...service, ...updates } : service
          )
        };
      })
    }));
  }, [setConfig]);

  // Add a new service to a group
  const addService = useCallback((groupId, newService) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id !== groupId) return group;
        
        return {
          ...group,
          services: [...group.services, newService]
        };
      })
    }));
  }, [setConfig]);

  return {
    moveServiceUp,
    moveServiceDown,
    deleteService,
    updateService,
    addService
  };
};