import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
  pattern?: 'none' | 'paisley' | 'mandala' | 'geometric' | 'floral';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = false, variant = 'default', pattern = 'none', className = '', ...props }, ref) => {
    const baseStyles = 'relative rounded-xl overflow-hidden transition-all duration-300';
    
    const variantStyles = {
      default: 'bg-white shadow-soft border border-neutral-200 p-6',
      bordered: 'bg-white border-2 border-saffron-200 p-6',
      elevated: 'bg-white shadow-lift border border-neutral-100 p-6',
      flat: 'bg-neutral-50 p-6',
    };
    
    const hoverStyles = hover 
      ? 'hover:shadow-lift hover:-translate-y-2 hover:border-saffron-300 cursor-pointer' 
      : '';
    
    const patternBackgrounds = {
      none: '',
      paisley: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 5C12.268 5 6 11.268 6 19s6.268 14 14 14 14-6.268 14-14S27.732 5 20 5z' fill='%23FF8833' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      mandala: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z' fill='%234080FF' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      geometric: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h10v10H0V0zm10 10h10v10H10V10z' fill='%23D4A574' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      floral: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='8' fill='%2310B968' fill-opacity='0.04'/%3E%3Ccircle cx='25' cy='10' r='5' fill='%2310B968' fill-opacity='0.04'/%3E%3Ccircle cx='25' cy='40' r='5' fill='%2310B968' fill-opacity='0.04'/%3E%3Ccircle cx='10' cy='25' r='5' fill='%2310B968' fill-opacity='0.04'/%3E%3Ccircle cx='40' cy='25' r='5' fill='%2310B968' fill-opacity='0.04'/%3E%3C/svg%3E")`,
    };
    
    const classes = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`;
    
    return (
      <div ref={ref} className={classes} {...props}>
        {/* Pattern Background */}
        {pattern !== 'none' && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: patternBackgrounds[pattern],
              backgroundSize: pattern === 'mandala' ? '60px 60px' : pattern === 'floral' ? '50px 50px' : '40px 40px',
            }}
            aria-hidden="true"
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`mb-4 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h3 ref={ref} className={`text-xl font-heading font-semibold text-neutral-900 ${className}`} {...props}>
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`mt-4 pt-4 border-t border-neutral-200 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
