import React from 'react';

export interface ButtonLoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
}

export const ButtonLoader = React.forwardRef<HTMLSpanElement, ButtonLoaderProps>(
  ({ size = 'md', variant = 'spinner', className = '', ...props }, ref) => {
    const sizeStyles = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };
    
    const dotSizeStyles = {
      sm: 'h-1 w-1',
      md: 'h-1.5 w-1.5',
      lg: 'h-2 w-2',
    };
    
    if (variant === 'spinner') {
      return (
        <span ref={ref} className={`inline-flex items-center ${className}`} {...props}>
          <svg 
            className={`animate-spin ${sizeStyles[size]}`}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </span>
      );
    }
    
    if (variant === 'dots') {
      return (
        <span ref={ref} className={`inline-flex items-center gap-1 ${className}`} {...props}>
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`${dotSizeStyles[size]} bg-current rounded-full animate-pulse-soft`}
              style={{ animationDelay: `${index * 0.15}s` }}
              aria-hidden="true"
            />
          ))}
          <span className="sr-only">Loading...</span>
        </span>
      );
    }
    
    if (variant === 'pulse') {
      return (
        <span ref={ref} className={`inline-flex items-center ${className}`} {...props}>
          <span className={`${sizeStyles[size]} bg-current rounded-full animate-pulse-soft`} aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </span>
      );
    }
    
    return null;
  }
);

ButtonLoader.displayName = 'ButtonLoader';
