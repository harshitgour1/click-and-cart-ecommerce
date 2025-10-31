import React from 'react';

export interface PaisleyLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'saffron' | 'royal' | 'emerald' | 'gold';
}

export const PaisleyLoader = React.forwardRef<HTMLDivElement, PaisleyLoaderProps>(
  ({ size = 'md', color = 'saffron', className = '', ...props }, ref) => {
    const sizeStyles = {
      sm: 'h-6 w-6',
      md: 'h-10 w-10',
      lg: 'h-14 w-14',
    };
    
    const colorStyles = {
      saffron: 'text-saffron-500',
      royal: 'text-royalBlue-500',
      emerald: 'text-emerald-500',
      gold: 'text-gold-500',
    };
    
    const dotSize = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2.5 w-2.5',
      lg: 'h-3.5 w-3.5',
    };
    
    const classes = `${sizeStyles[size]} ${className}`;
    
    return (
      <div ref={ref} className={`flex items-center justify-center ${classes}`} {...props}>
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Paisley-inspired dots in circular pattern */}
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const angle = (index * 60 * Math.PI) / 180;
            const radius = size === 'sm' ? 10 : size === 'md' ? 16 : 22;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            return (
              <div
                key={index}
                className={`absolute ${dotSize[size]} ${colorStyles[color]} rounded-full animate-paisley`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${index * 0.15}s`,
                }}
                aria-hidden="true"
              />
            );
          })}
          
          {/* Center dot */}
          <div
            className={`absolute ${dotSize[size]} ${colorStyles[color]} rounded-full opacity-80`}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
          />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

PaisleyLoader.displayName = 'PaisleyLoader';
