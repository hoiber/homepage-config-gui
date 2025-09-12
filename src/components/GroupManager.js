import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ServiceManager from './ServiceManager';
import { generateId } from '../utils/helpers';

/**
 * Group management component
 * Handles group-level operations and reduces main component complexity
 */
const GroupManager = ({ 
  group, 
  editingGroup,
  setEditingGroup,
  editingService,
  setEditingService,
  onUpdateGroup,
  onDeleteGroup,
  onAddService,
  onMoveServiceUp,
  onMoveServiceDown,
  onDeleteService,
  commonServices 
}) => {
  const [isAddingService, setIsAddingService] = useState(false);

  const handleGroupNameSubmit = (e) => {
    if (e.key === 'Enter') {
      setEditingGroup('');
    }
  };

  const handleAddService = () => {
    const newService = {
      id: generateId('service'),
      name: 'New Service',
      href: 'http://localhost:8080',
      description: '',
      icon: '',
      widget: null
    };
    
    onAddService(group.id, newService);
    setEditingService(newService.id);
    setIsAddingService(false);
  };

  const renderGroupHeader = () => {
    if (editingGroup === group.id) {
      return (
        <input
          type="text"
          value={group.name}
          onChange={(e) => onUpdateGroup(group.id, { name: e.target.value })}
          onKeyDown={handleGroupNameSubmit}
          onBlur={() => setEditingGroup('')}
          className="text-lg font-medium bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none w-full"
          autoFocus
          aria-label="Edit group name"
        />
      );
    }

    return (
      <button
        className="text-lg font-medium cursor-pointer hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/20 rounded bg-transparent border-none text-left w-full"
        onClick={() => setEditingGroup(group.id)}
        aria-label="Edit group name"
      >
        {group.name}
      </button>
    );
  };

  const renderServicesList = () => {
    if (!group.services || group.services.length === 0) {
      return (
        <div className="text-slate-400 text-sm py-4 text-center">
          No services in this group. Click "Add Service" to get started.
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {group.services.map((service, index) => (
          <ServiceManager
            key={service.id}
            service={service}
            groupId={group.id}
            isFirst={index === 0}
            isLast={index === group.services.length - 1}
            onMoveUp={onMoveServiceUp}
            onMoveDown={onMoveServiceDown}
            onDelete={onDeleteService}
            onEdit={setEditingService}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          {renderGroupHeader()}
        </div>
        <button
          onClick={() => onDeleteGroup(group.id)}
          className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-400/20"
          aria-label={`Delete group ${group.name}`}
          title="Delete group"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {renderServicesList()}

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleAddService}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/20"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>
    </div>
  );
};

export default GroupManager;