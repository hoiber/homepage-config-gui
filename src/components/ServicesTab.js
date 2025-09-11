import { useState } from 'react';
import { Plus, Download, Upload, ChevronUp, ChevronDown, Trash2, Copy } from 'lucide-react';
import { commonServices } from '../data/commonServices';
import Card, { CardHeader, CardActions } from './UI/Card';
import Button from './UI/Button';
import Input from './UI/Input';
import { generateServicesYAML } from '../utils/yamlHelpers';
import { COMMON_STYLES } from '../utils/styles';

const ServicesTab = ({ 
  config, 
  updateService, 
  deleteService, 
  duplicateService, 
  addService,
  updateGroup,
  deleteGroup,
  addGroup,
  liveUpdateConfig, 
  saveConfig,
  loadConfig,
  setImportSuccess,
  setImportError,
  globalDomain 
}) => {
  const [editingService, setEditingService] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [collapsedServices, setCollapsedServices] = useState({});
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddService, setQuickAddService] = useState('');
  const [selectedGroupForAdd, setSelectedGroupForAdd] = useState(null);
  const [showImportExport, setShowImportExport] = useState(false);
  const [importYaml, setImportYaml] = useState('');

  const handleExportYAML = () => {
    try {
      const yamlContent = generateServicesYAML(config);
      const blob = new Blob([yamlContent], { type: 'text/yaml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'services.yaml';
      a.click();
      URL.revokeObjectURL(url);
      setImportSuccess('Services configuration exported successfully');
    } catch (error) {
      setImportError(`Export failed: ${error.message}`);
    }
  };

  const handleSaveToHomepage = async () => {
    try {
      const yamlContent = generateServicesYAML(config);
      const success = await saveConfig('services', yamlContent);
      if (success) {
        setImportSuccess('Services configuration saved to Homepage');
      }
    } catch (error) {
      setImportError(`Save failed: ${error.message}`);
    }
  };

  const handleLoadFromHomepage = async () => {
    try {
      const content = await loadConfig('services');
      if (content) {
        setImportYaml(content);
        setImportSuccess('Services configuration loaded from Homepage');
      }
    } catch (error) {
      setImportError(`Load failed: ${error.message}`);
    }
  };

  const addQuickService = (groupId) => {
    if (!quickAddService.trim()) return;
    
    const serviceTemplate = commonServices[quickAddService.toLowerCase()];
    if (serviceTemplate) {
      const serviceData = {
        ...serviceTemplate,
        href: globalDomain ? serviceTemplate.href.replace(/https?:\/\/[^\/]+/, `http://${globalDomain}`) : serviceTemplate.href
      };
      addService(groupId, serviceData);
      setImportSuccess(`Added ${serviceTemplate.name} to group`);
    } else {
      addService(groupId, { name: quickAddService, href: '', description: '' });
      setImportSuccess(`Added custom service: ${quickAddService}`);
    }
    
    setQuickAddService('');
    setShowQuickAdd(false);
    setSelectedGroupForAdd(null);
  };

  const toggleServiceCollapse = (serviceId) => {
    setCollapsedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <CardHeader>
        <h2 className={COMMON_STYLES.text.heading}>Services Configuration</h2>
        <CardActions className="mt-0">
          <Button variant="secondary" size="sm" onClick={() => setShowImportExport(!showImportExport)}>
            {showImportExport ? 'Hide' : 'Show'} Import/Export
          </Button>
          <Button variant="primary" size="sm" onClick={addGroup}>
            <Plus className="w-4 h-4 mr-1" />
            Add Group
          </Button>
        </CardActions>
      </CardHeader>

      {/* Import/Export Section */}
      {showImportExport && (
        <Card variant="secondary">
          <CardHeader>
            <h3 className={COMMON_STYLES.text.subheading}>Import/Export Services</h3>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="secondary" onClick={handleExportYAML}>
              <Download className="w-4 h-4 mr-2" />
              Export YAML
            </Button>
            {liveUpdateConfig.enabled && (
              <>
                <Button variant="success" onClick={handleSaveToHomepage}>
                  <Upload className="w-4 h-4 mr-2" />
                  Save to Homepage
                </Button>
                <Button variant="ghost" onClick={handleLoadFromHomepage}>
                  Load from Homepage
                </Button>
              </>
            )}
          </div>
          {importYaml && (
            <div className="mt-4">
              <label className={COMMON_STYLES.text.label}>Loaded YAML Content:</label>
              <textarea
                value={importYaml}
                onChange={(e) => setImportYaml(e.target.value)}
                className={COMMON_STYLES.input.default}
                rows="10"
                placeholder="YAML content will appear here..."
              />
            </div>
          )}
        </Card>
      )}

      {/* Groups and Services */}
      {config.groups.map((group) => (
        <Card key={group.id} variant="primary">
          <CardHeader>
            <div className={COMMON_STYLES.layout.flexStart}>
              {editingGroup === group.id ? (
                <Input
                  value={group.name}
                  onChange={(e) => updateGroup(group.id, { name: e.target.value })}
                  onBlur={() => setEditingGroup(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingGroup(null)}
                  className="max-w-xs"
                />
              ) : (
                <h3
                  className={`${COMMON_STYLES.text.heading} ${COMMON_STYLES.interactive.clickableWithFocus}`}
                  onClick={() => setEditingGroup(group.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setEditingGroup(group.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Edit group name"
                >
                  {group.name}
                </h3>
              )}
            </div>
            <CardActions className="mt-0">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSelectedGroupForAdd(group.id);
                  setShowQuickAdd(true);
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Quick Add
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={() => deleteGroup(group.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardActions>
          </CardHeader>

          {/* Quick Add Service */}
          {showQuickAdd && selectedGroupForAdd === group.id && (
            <div className="mb-4 p-3 bg-slate-700 rounded border border-slate-600">
              <div className={COMMON_STYLES.layout.flexStart}>
                <Input
                  value={quickAddService}
                  onChange={(e) => setQuickAddService(e.target.value)}
                  placeholder="Service name or type (e.g., 'plex', 'Custom Service')"
                  className="flex-1"
                />
                <Button onClick={() => addQuickService(group.id)}>Add</Button>
                <Button variant="ghost" onClick={() => setShowQuickAdd(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Services List */}
          <div className="space-y-3">
            {(group.services || []).map((service) => (
              <div key={service.id} className="bg-slate-700 rounded-lg p-3 border border-slate-600">
                <div className={COMMON_STYLES.layout.flexBetween}>
                  <div className={COMMON_STYLES.layout.flexStart}>
                    <button
                      onClick={() => toggleServiceCollapse(service.id)}
                      className={COMMON_STYLES.interactive.clickableWithFocus}
                    >
                      {collapsedServices[service.id] ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronUp className="w-4 h-4" />
                      }
                    </button>
                    {editingService === service.id ? (
                      <Input
                        value={service.name}
                        onChange={(e) => updateService(service.id, { name: e.target.value })}
                        onBlur={() => setEditingService(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingService(null)}
                        className="max-w-xs"
                      />
                    ) : (
                      <span
                        className={`${COMMON_STYLES.text.heading} ${COMMON_STYLES.interactive.clickableWithFocus}`}
                        onClick={() => setEditingService(service.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setEditingService(service.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Edit service name"
                      >
                        {service.name}
                      </span>
                    )}
                  </div>
                  <CardActions className="mt-0">
                    <Button variant="ghost" size="sm" onClick={() => duplicateService(service)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => deleteService(service.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardActions>
                </div>

                {/* Service Details */}
                {!collapsedServices[service.id] && (
                  <div className="mt-4 space-y-3">
                    <div className={COMMON_STYLES.layout.grid2}>
                      <Input
                        label="URL"
                        value={service.href || ''}
                        onChange={(e) => updateService(service.id, { href: e.target.value })}
                        placeholder="http://localhost:3000"
                      />
                      <Input
                        label="Icon"
                        value={service.icon || ''}
                        onChange={(e) => updateService(service.id, { icon: e.target.value })}
                        placeholder="plex, gitlab, etc."
                      />
                    </div>
                    <Input
                      label="Description"
                      value={service.description || ''}
                      onChange={(e) => updateService(service.id, { description: e.target.value })}
                      placeholder="Optional description"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty state */}
          {(!group.services || group.services.length === 0) && (
            <div className="text-center py-8 text-slate-400">
              <p>No services in this group yet.</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2"
                onClick={() => {
                  setSelectedGroupForAdd(group.id);
                  setShowQuickAdd(true);
                }}
              >
                Add your first service
              </Button>
            </div>
          )}
        </Card>
      ))}

      {/* Empty state for no groups */}
      {config.groups.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <h3 className={COMMON_STYLES.text.heading}>No service groups yet</h3>
            <p className={COMMON_STYLES.text.muted}>Create your first group to organize your services</p>
            <Button variant="primary" className="mt-4" onClick={addGroup}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Group
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ServicesTab;