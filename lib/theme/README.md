# Indian Theme Design System

This directory contains the Indian-inspired theme configuration for the e-commerce application.

## Overview

The Indian theme provides a culturally rich, soft, and eye-friendly color palette with traditional patterns and animations.

## Files

- `indian-theme.ts` - Core theme constants including colors, fonts, animations, shadows, and utility functions
- `index.ts` - Export module for easy imports

## Usage

### Colors

```tsx
import { indianColors } from '@/lib/theme';

// Use in Tailwind classes
<div className="bg-saffron-500 text-white">...</div>

// Or access programmatically
const primaryColor = indianColors.saffron[500]; // '#FF8833'
```

### Fonts

```tsx
// Heading font (Poppins)
<h1 className="font-heading">Welcome</h1>

// Accent font (Playfair Display)
<p className="font-accent">Elegant text</p>
```

### Currency Formatting

```tsx
import { formatINR, formatIndianNumber } from '@/lib/theme';

// Format as Indian Rupee
formatINR(1299); // '₹1,299'

// Format with Indian thousand separators
formatIndianNumber(100000); // '1,00,000'
```

## Color Palette

### Saffron (Primary)
Warm, inviting orange inspired by the Indian flag
- Use for: Primary CTAs, important actions, brand elements

### Royal Blue (Secondary)
Deep, rich blue representing trust and stability
- Use for: Links, secondary actions, informational elements

### Terracotta
Earthy, warm red-brown tone
- Use for: Warnings, alerts, accent elements

### Emerald (Success)
Fresh, vibrant green
- Use for: Success states, confirmations, positive feedback

### Gold (Accent)
Rich, luxurious gold tone
- Use for: Premium features, highlights, special offers

### Neutral
Soft gray tones for backgrounds and text
- Use for: Backgrounds, borders, muted text

## Animations

All animations respect `prefers-reduced-motion` for accessibility.

Available animations:
- `animate-fade-in` - Fade in with slight upward movement
- `animate-slide-in` - Slide in from left
- `animate-scale-in` - Scale up with fade
- `animate-shimmer` - Loading shimmer effect
- `animate-mandala` - Rotating mandala pattern
- `animate-celebration` - Celebratory bounce and rotate

## Shadows

- `shadow-soft` - Subtle, soft shadow
- `shadow-indian` - Saffron-tinted shadow
- `shadow-lift` - Elevated card shadow

## Gradients

- `bg-indian-gradient` - Multi-color Indian gradient
- `bg-saffron-gradient` - Saffron gradient
- `bg-royal-gradient` - Royal blue gradient
