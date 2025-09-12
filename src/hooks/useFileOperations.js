import { useCallback, useState } from 'react';
import yaml from 'js-yaml';

/**
 * Custom hook for file import/export operations
 * Reduces cognitive complexity by extracting file handling logic
 */
export const useFileOperations = (config, setConfig) => {
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');

  // Handle file import with error handling and validation
  const handleImport = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.yaml') && !file.name.toLowerCase().endsWith('.yml')) {
      setImportError('Please select a YAML file (.yaml or .yml)');
      setImportSuccess('');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const yamlContent = e.target.result;
        const parsedData = yaml.load(yamlContent);
        
        if (!parsedData || typeof parsedData !== 'object') {
          throw new Error('Invalid YAML structure');
        }

        // Update configuration with imported data
        setConfig(prevConfig => {
          const newConfig = { ...prevConfig };
          
          // Merge imported data intelligently
          if (parsedData.services && Array.isArray(parsedData.services)) {
            newConfig.groups = parsedData.services.map((group, index) => ({
              id: group.id || `group-${Date.now()}-${index}`,
              name: group.name || `Group ${index + 1}`,
              services: (group.services || []).map((service, serviceIndex) => ({
                id: service.id || `service-${Date.now()}-${serviceIndex}`,
                name: service.name || 'Unnamed Service',
                href: service.href || '',
                description: service.description || '',
                icon: service.icon || '',
                widget: service.widget || null
              }))
            }));
          }

          return newConfig;
        });

        setImportSuccess('Configuration imported successfully!');
        setImportError('');
      } catch (error) {
        console.error('Import error:', error);
        setImportError(`Error parsing YAML: ${error.message || 'Unknown error'}. The file may be corrupted or in an unsupported format.`);
        setImportSuccess('');
      }
    };
    
    reader.onerror = () => {
      setImportError('Error reading file. Please try again.');
      setImportSuccess('');
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  }, [setConfig]);

  // Trigger file import dialog
  const triggerImport = useCallback(() => {
    const fileInput = document.getElementById('yaml-import');
    if (fileInput) {
      fileInput.click();
    }
  }, []);

  // Generate and download YAML export
  const handleExport = useCallback(() => {
    try {
      const exportData = {
        services: config.groups || []
      };

      const yamlString = yaml.dump(exportData, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false
      });

      // Create and trigger download
      const blob = new Blob([yamlString], { type: 'text/yaml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'homepage-config.yaml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Export error:', error);
      setImportError('Error exporting configuration. Please try again.');
    }
  }, [config.groups]);

  return {
    handleImport,
    triggerImport,
    handleExport,
    importError,
    importSuccess,
    setImportError,
    setImportSuccess
  };
};