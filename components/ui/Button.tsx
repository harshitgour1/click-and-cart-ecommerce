import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  withPattern?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    leftIcon,
    rightIcon,
    withPattern = false,
    children, 
    className = '', 
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';
    
    const variantStyles = {
      primary: 'bg-saffron-gradient text-white hover:shadow-indian hover:scale-[1.02] active:scale-[0.98] focus:ring-saffron-500 shadow-soft',
      secondary: 'bg-royal-gradient text-white hover:shadow-lift hover:scale-[1.02] active:scale-[0.98] focus:ring-royalBlue-500 shadow-soft',
      outline: 'border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50 hover:border-saffron-600 hover:scale-[1.02] active:scale-[0.98] focus:ring-saffron-500 bg-white',
      ghost: 'text-saffron-600 hover:bg-saffron-50 hover:text-saffron-700 hover:scale-[1.02] active:scale-[0.98] focus:ring-saffron-500 shadow-none',
    };
    
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[32px]',
      md: 'px-5 py-2.5 text-base gap-2 min-h-[40px]',
      lg: 'px-7 py-3.5 text-lg gap-2.5 min-h-[48px]',
    };
    
    const iconSizeStyles = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };
    
    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {/* Indian pattern overlay (optional) */}
        {withPattern && (
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px',
            }}
            aria-hidden="true"
          />
        )}
        
        {/* Button content */}
        <span className="relative flex items-center justify-center gap-inherit">
          {isLoading ? (
            <>
              <svg 
                className={`animate-spin ${iconSizeStyles[size]}`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            <>
              {leftIcon && (
                <span className={`flex-shrink-0 ${iconSizeStyles[size]}`} aria-hidden="true">
                  {leftIcon}
                </span>
              )}
              <span>{children}</span>
              {rightIcon && (
                <span className={`flex-shrink-0 ${iconSizeStyles[size]}`} aria-hidden="true">
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
