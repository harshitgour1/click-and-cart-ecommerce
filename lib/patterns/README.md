# Indian Pattern Library

This directory contains SVG-based Indian-inspired decorative patterns for backgrounds and visual elements.

## Overview

The pattern library includes four traditional Indian design patterns that can be used as subtle background elements throughout the application.

## Files

- `indian-patterns.tsx` - React components for all patterns
- `index.ts` - Export module for easy imports

## Available Patterns

### 1. Paisley Pattern
Traditional teardrop-shaped motif (opacity: 0.05)
- Use for: Hero sections, landing pages

### 2. Mandala Pattern
Circular geometric design with radial symmetry (opacity: 0.08)
- Use for: Loading screens, meditation/focus areas

### 3. Geometric Pattern
Diamond-shaped repeating pattern (opacity: 0.06)
- Use for: Section dividers, content backgrounds

### 4. Floral Pattern
Five-petal flower design (opacity: 0.04)
- Use for: Product cards, subtle backgrounds

## Usage

### As React Component

```tsx
import { PatternBackground } from '@/lib/patterns';

<PatternBackground pattern="paisley" className="min-h-screen">
  <YourContent />
</PatternBackground>
```

### Individual Pattern Components

```tsx
import { MandalaPattern, PaisleyPattern } from '@/lib/patterns';

<div className="relative">
  <div className="absolute inset-0">
    <MandalaPattern />
  </div>
  <div className="relative z-10">
    <YourContent />
  </div>
</div>
```

### Pattern Options

- `paisley` - Paisley teardrop pattern
- `mandala` - Mandala circular pattern
- `geometric` - Geometric diamond pattern
- `floral` - Floral petal pattern

## Customization

All patterns use `currentColor` for their fill/stroke, so you can control the color using text color classes:

```tsx
<div className="text-saffron-500">
  <PatternBackground pattern="mandala">
    {/* Pattern will be saffron-colored */}
  </PatternBackground>
</div>
```

## Accessibility

Patterns are decorative only and use `pointer-events-none` to ensure they don't interfere with user interactions.
