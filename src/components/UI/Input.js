import { useId } from 'react';
import { INPUT_VARIANTS } from '../../utils/styles';

const Input = ({ 
  label,
  error = '',
  helpText = '',
  required = false,
  className = '',
  ...props 
}) => {
  const id = useId();
  const inputClassName = error ? INPUT_VARIANTS.error : INPUT_VARIANTS.default;
  const finalClassName = `${inputClassName} ${className}`.trim();

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-xs text-slate-400">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        id={id}
        className={finalClassName}
        {...props}
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

export default Input;