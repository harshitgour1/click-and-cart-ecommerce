import React from 'react';

export interface MandalaSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'saffron' | 'royal' | 'emerald' | 'gold';
}

export const MandalaSpinner = React.forwardRef<HTMLDivElement, MandalaSpinnerProps>(
  ({ size = 'md', color = 'saffron', className = '', ...props }, ref) => {
    const sizeStyles = {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24',
    };
    
    const colorStyles = {
      saffron: 'text-saffron-500',
      royal: 'text-royalBlue-500',
      emerald: 'text-emerald-500',
      gold: 'text-gold-500',
    };
    
    const classes = `${sizeStyles[size]} ${colorStyles[color]} ${className}`;
    
    return (
      <div ref={ref} className="flex items-center justify-center" {...props}>
        <svg
          className={`animate-mandala ${classes}`}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Loading"
          role="status"
        >
          {/* Outer circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.2"
          />
          
          {/* Middle circle */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.4"
          />
          
          {/* Inner circle */}
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.6"
          />
          
          {/* Center circle */}
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="currentColor"
            opacity="0.8"
          />
          
          {/* Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
            const radians = (angle * Math.PI) / 180;
            const x = 50 + 30 * Math.cos(radians);
            const y = 50 + 30 * Math.sin(radians);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="8"
                fill="currentColor"
                opacity="0.5"
              />
            );
          })}
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

MandalaSpinner.displayName = 'MandalaSpinner';
