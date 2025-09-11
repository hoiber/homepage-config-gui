import { CARD_VARIANTS } from '../../utils/styles';

const Card = ({ 
  variant = 'primary',
  className = '',
  children,
  ...props 
}) => {
  const baseClass = CARD_VARIANTS[variant] || CARD_VARIANTS.primary;
  const finalClassName = `${baseClass} ${className}`.trim();

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`flex items-center justify-between mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardActions = ({ className = '', children, ...props }) => (
  <div className={`flex items-center gap-2 mt-4 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;