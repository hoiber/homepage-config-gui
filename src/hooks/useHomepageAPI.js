import { useState, useCallback } from 'react';

// Custom hook for managing Homepage API operations
export const useHomepageAPI = () => {
  const [liveUpdateConfig, setLiveUpdateConfig] = useState({
    enabled: false,
    configPath: '',
    status: 'unknown'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [importSuccess, setImportSuccess] = useState('');
  const [importError, setImportError] = useState('');

  // Generic API request handler with error handling
  const apiRequest = useCallback(async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${url}:`, error);
      throw error;
    }
  }, []);

  // Check live update status
  const checkLiveUpdateStatus = useCallback(async () => {
    try {
      const result = await apiRequest('/api/health');
      setLiveUpdateConfig({
        enabled: result.liveUpdates || false,
        configPath: result.configPath || '',
        status: result.liveUpdates ? 'enabled' : 'disabled'
      });
    } catch (error) {
      setLiveUpdateConfig(prev => ({ ...prev, status: 'error' }));
    }
  }, [apiRequest]);

  // Save configuration
  const saveConfig = useCallback(async (type, content) => {
    if (!liveUpdateConfig.enabled) {
      setImportError('Live updates are not enabled');
      return false;
    }

    setIsLoading(true);
    setImportError('');
    setImportSuccess('');

    try {
      const result = await apiRequest(`/api/config/${type}`, {
        method: 'POST',
        body: JSON.stringify({ content })
      });

      setImportSuccess(result.message || `${type} configuration saved successfully`);
      return true;
    } catch (error) {
      setImportError(`Failed to save ${type} configuration: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [liveUpdateConfig.enabled, apiRequest]);

  // Load configuration
  const loadConfig = useCallback(async (type) => {
    if (!liveUpdateConfig.enabled) return null;

    setIsLoading(true);
    setImportError('');

    try {
      const result = await apiRequest(`/api/config/${type}`);
      return result.content;
    } catch (error) {
      setImportError(`Failed to load ${type} configuration: ${error.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [liveUpdateConfig.enabled, apiRequest]);

  // Load backup list
  const loadBackupList = useCallback(async (type) => {
    if (!liveUpdateConfig.enabled) return [];

    try {
      const backups = await apiRequest(`/api/config/${type}/backups`);
      return backups || [];
    } catch (error) {
      console.error('Failed to load backup list:', error);
      return [];
    }
  }, [liveUpdateConfig.enabled, apiRequest]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setImportSuccess('');
    setImportError('');
  }, []);

  // Auto-clear messages after delay
  const setSuccessMessage = useCallback((message, delay = 3000) => {
    setImportSuccess(message);
    setImportError('');
    setTimeout(() => setImportSuccess(''), delay);
  }, []);

  const setErrorMessage = useCallback((message, delay = 5000) => {
    setImportError(message);
    setImportSuccess('');
    setTimeout(() => setImportError(''), delay);
  }, []);

  return {
    // State
    liveUpdateConfig,
    isLoading,
    importSuccess,
    importError,

    // API operations
    checkLiveUpdateStatus,
    saveConfig,
    loadConfig,
    loadBackupList,

    // Message management
    clearMessages,
    setSuccessMessage,
    setErrorMessage,
    setImportSuccess,
    setImportError
  };
};