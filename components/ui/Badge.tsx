import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', children, className = '', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all duration-200';
    
    const variantStyles = {
      default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      success: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
      warning: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
      error: 'bg-red-100 text-red-700 hover:bg-red-200',
      info: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    };
    
    const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;
    
    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
