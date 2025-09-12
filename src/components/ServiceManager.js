import React from 'react';
import { ChevronUp, ChevronDown, Trash2, Edit } from 'lucide-react';

/**
 * Service management component with actions
 * Extracted to reduce cognitive complexity of main App component
 */
const ServiceManager = ({ 
  service, 
  groupId, 
  isFirst, 
  isLast, 
  onMoveUp, 
  onMoveDown, 
  onDelete, 
  onEdit 
}) => {
  
  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="flex items-center justify-between bg-slate-700 p-3 rounded">
      <div className="flex-1">
        <button
          className="text-blue-300 hover:text-blue-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400/20 rounded text-left w-full"
          onClick={() => onEdit(service.id)}
          onKeyDown={(e) => handleKeyDown(e, () => onEdit(service.id))}
          aria-label={`Edit service ${service.name}`}
        >
          {service.name}
        </button>
        {service.description && (
          <p className="text-slate-400 text-sm mt-1">{service.description}</p>
        )}
        {service.href && (
          <p className="text-slate-500 text-xs mt-1 truncate">{service.href}</p>
        )}
      </div>

      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={() => onMoveUp(groupId, service.id)}
          disabled={isFirst}
          className={`p-1 rounded transition-colors ${
            isFirst 
              ? 'text-slate-600 cursor-not-allowed' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400/20'
          }`}
          aria-label={`Move ${service.name} up`}
          title="Move up"
        >
          <ChevronUp size={16} />
        </button>
        
        <button
          onClick={() => onMoveDown(groupId, service.id)}
          disabled={isLast}
          className={`p-1 rounded transition-colors ${
            isLast 
              ? 'text-slate-600 cursor-not-allowed' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400/20'
          }`}
          aria-label={`Move ${service.name} down`}
          title="Move down"
        >
          <ChevronDown size={16} />
        </button>
        
        <button
          onClick={() => onEdit(service.id)}
          className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-600 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/20"
          aria-label={`Edit ${service.name}`}
          title="Edit service"
        >
          <Edit size={16} />
        </button>
        
        <button
          onClick={() => onDelete(groupId, service.id)}
          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-400/20"
          aria-label={`Delete ${service.name}`}
          title="Delete service"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServiceManager;