import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  withPattern?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, withPattern = false, className = '', ...props }, ref) => {
    const baseStyles = 'relative animate-shimmer overflow-hidden';
    
    const variantStyles = {
      text: 'rounded h-4 bg-neutral-200',
      circular: 'rounded-full bg-neutral-200',
      rectangular: 'rounded-lg bg-neutral-200',
    };
    
    const style: React.CSSProperties = {
      width: width || (variant === 'text' ? '100%' : undefined),
      height: height || (variant === 'circular' ? width : undefined),
    };
    
    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        style={style}
        role="status"
        aria-label="Loading..."
        {...props}
      >
        {/* Pattern overlay */}
        {withPattern && (
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 5C12.268 5 6 11.268 6 19s6.268 14 14 14 14-6.268 14-14S27.732 5 20 5z' fill='%23FF8833' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Skeleton components for common patterns
export const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <Skeleton variant="rectangular" height={192} className="mb-4" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" width="60%" className="mb-4" />
    <div className="flex justify-between items-center">
      <Skeleton variant="text" width={80} />
      <Skeleton variant="rectangular" width={100} height={24} />
    </div>
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="flex gap-4 items-center">
        <Skeleton variant="text" className="flex-1" />
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={80} />
        <Skeleton variant="rectangular" width={100} height={24} />
      </div>
    ))}
  </div>
);

export const SkeletonProductGrid: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);
