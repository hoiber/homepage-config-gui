import { useState } from 'react';
import { Trash2, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import FormInput from './FormInput';
import { validators } from '../utils/validation';
import { generateId, swapHost } from '../utils/helpers';

const ServiceConfig = ({ 
  service, 
  onUpdate, 
  onDelete, 
  onDuplicate, 
  globalDomain,
  isExpanded = false,
  onToggleExpand
}) => {
  const [localService, setLocalService] = useState(service);

  const handleServiceChange = (field, value) => {
    const updated = { ...localService, [field]: value };
    setLocalService(updated);
    onUpdate(updated);
  };

  const handleWidgetChange = (field, value) => {
    const updated = {
      ...localService,
      widget: {
        ...localService.widget,
        [field]: value
      }
    };
    setLocalService(updated);
    onUpdate(updated);
  };

  const applyGlobalDomain = () => {
    if (globalDomain && service.href) {
      const newHref = swapHost(service.href, globalDomain);
      handleServiceChange('href', newHref);
      
      if (service.widget?.url) {
        const newWidgetUrl = swapHost(service.widget.url, globalDomain);
        handleWidgetChange('url', newWidgetUrl);
      }
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      {/* Service Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleExpand}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>
          <h4 className="font-medium text-white">
            {service.name || 'Unnamed Service'}
          </h4>
        </div>
        <div className="flex gap-2">
          {globalDomain && (
            <button
              onClick={applyGlobalDomain}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs transition-colors"
              title={`Apply global domain: ${globalDomain}`}
            >
              Apply Domain
            </button>
          )}
          <button
            onClick={() => onDuplicate(service)}
            className="p-2 hover:bg-slate-700 rounded transition-colors"
            title="Duplicate service"
          >
            <Copy className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="p-2 hover:bg-red-900 rounded transition-colors"
            title="Delete service"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Basic Service Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Service Name"
              value={localService.name}
              onChange={(e) => handleServiceChange('name', e.target.value)}
              placeholder="My Service"
              required
              validator={validators.serviceName}
            />
            <FormInput
              label="Icon"
              value={localService.icon}
              onChange={(e) => handleServiceChange('icon', e.target.value)}
              placeholder="plex"
              helpText="Homepage icon name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <FormInput
              label="URL"
              value={localService.href}
              onChange={(e) => handleServiceChange('href', e.target.value)}
              placeholder="http://localhost:8080"
              validator={validators.url}
              helpText="The URL to open when clicking the service"
            />
            <FormInput
              label="Description"
              value={localService.description}
              onChange={(e) => handleServiceChange('description', e.target.value)}
              placeholder="Service description"
              helpText="Optional description shown on the service tile"
            />
          </div>

          {/* Widget Configuration */}
          {localService.widget && (
            <div className="border-t border-slate-700 pt-4">
              <h5 className="text-sm font-medium text-slate-300 mb-3">Widget Configuration</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Widget Type"
                  value={localService.widget.type}
                  onChange={(e) => handleWidgetChange('type', e.target.value)}
                  placeholder="plex"
                  required
                />
                <FormInput
                  label="Widget URL"
                  value={localService.widget.url}
                  onChange={(e) => handleWidgetChange('url', e.target.value)}
                  placeholder="http://localhost:8080"
                  validator={validators.url}
                />
              </div>
              <div className="mt-4">
                <FormInput
                  label="API Key"
                  value={localService.widget.key}
                  onChange={(e) => handleWidgetChange('key', e.target.value)}
                  type="password"
                  placeholder="your-api-key"
                  validator={validators.apiKey}
                  helpText="API key for widget data access"
                />
              </div>
            </div>
          )}

          {/* Widget Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700">
            <span className="text-sm text-slate-400">Enable Widget</span>
            <button
              onClick={() => {
                if (localService.widget) {
                  const { widget, ...serviceWithoutWidget } = localService;
                  setLocalService(serviceWithoutWidget);
                  onUpdate(serviceWithoutWidget);
                } else {
                  const serviceWithWidget = {
                    ...localService,
                    widget: { type: '', url: '', key: '' }
                  };
                  setLocalService(serviceWithWidget);
                  onUpdate(serviceWithWidget);
                }
              }}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${localService.widget ? 'bg-blue-600' : 'bg-slate-600'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${localService.widget ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceConfig;