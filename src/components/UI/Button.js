import { BUTTON_VARIANTS } from '../../utils/styles';

const Button = ({ 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  children,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const baseClass = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const stateClass = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '';

  const finalClassName = `${baseClass} ${sizeClass} ${stateClass} ${className}`.trim();

  return (
    <button 
      className={finalClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </div>
      ) : children}
    </button>
  );
};

export default Button;