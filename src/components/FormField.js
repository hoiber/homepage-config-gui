import { useState, useId } from 'react';

const FormField = ({
  label,
  children,
  required = false,
  error = '',
  helpText = '',
  className = ''
}) => {
  const id = useId();

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs text-slate-400">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      {typeof children === 'function' 
        ? children(id)
        : children && typeof children === 'object' && children.type === 'input'
          ? { ...children, props: { ...children.props, id } }
          : children
      }
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-xs text-slate-500">{helpText}</p>
      )}
    </div>
  );
};

// Wrapper for input fields with automatic accessibility
export const AccessibleInput = ({
  label,
  required = false,
  error = '',
  helpText = '',
  className = '',
  inputClassName = '',
  ...inputProps
}) => {
  const id = useId();

  const defaultInputClassName = `
    w-full bg-slate-600 text-white px-2 py-1 rounded border transition-all text-sm outline-none
    ${error ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' : 'border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'}
  `.trim();

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs text-slate-400">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        id={id}
        className={`${defaultInputClassName} ${inputClassName}`}
        {...inputProps}
      />
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-xs text-slate-500">{helpText}</p>
      )}
    </div>
  );
};

// Wrapper for select fields with automatic accessibility
export const AccessibleSelect = ({
  label,
  required = false,
  error = '',
  helpText = '',
  className = '',
  selectClassName = '',
  options = [],
  ...selectProps
}) => {
  const id = useId();

  const defaultSelectClassName = `
    w-full bg-slate-600 text-white px-2 py-1 rounded border transition-all text-sm outline-none
    ${error ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' : 'border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'}
  `.trim();

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs text-slate-400">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <select
        id={id}
        className={`${defaultSelectClassName} ${selectClassName}`}
        {...selectProps}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {selectProps.children}
      </select>
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-xs text-slate-500">{helpText}</p>
      )}
    </div>
  );
};

// Component for clickable elements that need keyboard support
export const ClickableElement = ({
  children,
  onClick,
  onKeyDown,
  role = 'button',
  tabIndex = 0,
  className = '',
  ...props
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e);
    }
    onKeyDown?.(e);
  };

  return (
    <div
      role={role}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/20 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default FormField;