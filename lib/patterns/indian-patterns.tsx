/**
 * Indian-inspired SVG pattern library
 * Patterns include: Paisley, Mandala, Geometric, and Floral designs
 */

export const PaisleyPattern = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="paisley-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <g opacity="0.05" fill="currentColor">
          <path d="M30,60 Q30,30 50,30 Q70,30 70,50 Q70,70 50,80 Q30,90 30,60 Z" />
          <circle cx="50" cy="50" r="3" />
          <path d="M45,45 Q48,42 51,45 Q48,48 45,45 Z" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#paisley-pattern)" />
  </svg>
);

export const MandalaPattern = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="mandala-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
        <g opacity="0.08" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="75" cy="75" r="30" />
          <circle cx="75" cy="75" r="20" />
          <circle cx="75" cy="75" r="10" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 75 + Math.cos(rad) * 10;
            const y1 = 75 + Math.sin(rad) * 10;
            const x2 = 75 + Math.cos(rad) * 30;
            const y2 = 75 + Math.sin(rad) * 30;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 75 + Math.cos(rad) * 25;
            const cy = 75 + Math.sin(rad) * 25;
            return <circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" />;
          })}
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#mandala-pattern)" />
  </svg>
);

export const GeometricPattern = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="geometric-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <g opacity="0.06" fill="currentColor">
          <rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)" />
          <rect x="50" y="10" width="20" height="20" transform="rotate(45 60 20)" />
          <rect x="10" y="50" width="20" height="20" transform="rotate(45 20 60)" />
          <rect x="50" y="50" width="20" height="20" transform="rotate(45 60 60)" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
  </svg>
);

export const FloralPattern = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="floral-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <g opacity="0.04" fill="currentColor">
          <circle cx="50" cy="50" r="4" />
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 50 + Math.cos(rad) * 15;
            const cy = 50 + Math.sin(rad) * 15;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="8"
                ry="12"
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#floral-pattern)" />
  </svg>
);

// Pattern wrapper components for easy use
export const PatternBackground = ({
  pattern = 'paisley',
  className = '',
  children,
}: {
  pattern?: 'paisley' | 'mandala' | 'geometric' | 'floral';
  className?: string;
  children?: React.ReactNode;
}) => {
  const PatternComponent = {
    paisley: PaisleyPattern,
    mandala: MandalaPattern,
    geometric: GeometricPattern,
    floral: FloralPattern,
  }[pattern];

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <PatternComponent />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// CSS class names for pattern backgrounds (for use in Tailwind)
export const patternClasses = {
  paisley: 'bg-[url(/patterns/paisley.svg)]',
  mandala: 'bg-[url(/patterns/mandala.svg)]',
  geometric: 'bg-[url(/patterns/geometric.svg)]',
  floral: 'bg-[url(/patterns/floral.svg)]',
};
