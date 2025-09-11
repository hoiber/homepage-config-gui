import { useState, useEffect } from 'react';

const FormInput = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  validator = null,
  className = '',
  disabled = false,
  helpText = '',
  ...props
}) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched && validator) {
      const result = validator(value);
      setError(result.isValid ? '' : result.message);
    }
  }, [value, validator, touched]);

  const handleChange = (e) => {
    onChange(e);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const inputClassName = `
    w-full bg-slate-600 text-white px-3 py-2 rounded border transition-all text-sm
    ${error ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' : 'border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    outline-none
    ${className}
  `.trim();

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-xs text-slate-400">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={inputClassName}
        disabled={disabled}
        {...props}
      />
      {error && touched && (
        <p className="text-xs text-red-400">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-xs text-slate-500">{helpText}</p>
      )}
    </div>
  );
};

export default FormInput;