# Indian-Themed UI Component Library

Enhanced UI components with Indian aesthetics, soft eye-friendly colors, and delightful animations.

## Components

### Button
Enhanced button component with Indian-inspired styling and animations.

**Features:**
- Variants: `primary` (saffron), `secondary` (royal blue), `outline`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Loading state with spinner animation
- Icon support (left/right positioning)
- Optional Indian pattern overlay
- Hover animations (scale + shadow effects)
- Accessibility compliant

**Usage:**
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Click Me</Button>
<Button variant="primary" isLoading>Loading...</Button>
<Button variant="primary" withPattern leftIcon={<Icon />}>With Icon</Button>
```

### Input
Enhanced input component with floating labels and Indian-themed focus states.

**Features:**
- Floating label animation
- Icon support (left/right positioning)
- Error state with shake animation
- Success state with checkmark icon
- Focus ring with Indian colors (saffron)
- Helper text support
- Accessibility compliant

**Usage:**
```tsx
import { Input } from '@/components/ui';

<Input label="Email" placeholder="Enter email" />
<Input label="Password" type="password" error="Invalid password" />
<Input label="Search" leftIcon={<SearchIcon />} success />
```

### Card
Enhanced card component with Indian patterns and hover animations.

**Features:**
- Variants: `default`, `bordered`, `elevated`, `flat`
- Pattern options: `none`, `paisley`, `mandala`, `geometric`, `floral`
- Hover lift animation (-8px translateY)
- Shadow transitions
- Subcomponents: `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card hover pattern="paisley">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### MandalaSpinner
Rotating mandala-inspired loading spinner.

**Features:**
- Sizes: `sm`, `md`, `lg`, `xl`
- Colors: `saffron`, `royal`, `emerald`, `gold`
- Smooth rotation animation
- Accessibility compliant

**Usage:**
```tsx
import { MandalaSpinner } from '@/components/ui';

<MandalaSpinner size="md" color="saffron" />
```

### PaisleyLoader
Sequential fade loader with paisley-inspired dot pattern.

**Features:**
- Sizes: `sm`, `md`, `lg`
- Colors: `saffron`, `royal`, `emerald`, `gold`
- Sequential fade animation
- Circular dot arrangement

**Usage:**
```tsx
import { PaisleyLoader } from '@/components/ui';

<PaisleyLoader size="md" color="royal" />
```

### ButtonLoader
Compact loader for button loading states.

**Features:**
- Sizes: `sm`, `md`, `lg`
- Variants: `spinner`, `dots`, `pulse`
- Designed for inline use in buttons

**Usage:**
```tsx
import { ButtonLoader } from '@/components/ui';

<button>
  <ButtonLoader variant="spinner" size="sm" />
  Loading...
</button>
```

### Skeleton
Shimmer skeleton loader with optional Indian pattern overlay.

**Features:**
- Variants: `text`, `circular`, `rectangular`
- Optional pattern overlay
- Shimmer animation
- Preset components: `SkeletonCard`, `SkeletonTable`, `SkeletonProductGrid`

**Usage:**
```tsx
import { Skeleton, SkeletonCard } from '@/components/ui';

<Skeleton variant="text" />
<Skeleton variant="rectangular" height={200} withPattern />
<SkeletonCard />
```

## Design Principles

1. **Indian Aesthetics**: Warm colors (saffron, royal blue, terracotta, emerald, gold)
2. **Soft & Eye-Friendly**: Muted tones, off-whites, proper contrast ratios
3. **Smooth Animations**: 200-400ms durations, GPU-accelerated transforms
4. **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen reader support
5. **Performance**: Optimized animations, minimal re-renders

## Color Palette

- **Saffron**: Primary actions, CTAs
- **Royal Blue**: Secondary actions, links
- **Emerald**: Success states
- **Terracotta**: Error states
- **Gold**: Premium features, accents
- **Neutral**: Backgrounds, text

## Animation Guidelines

- Hover effects: scale(1.02) + shadow transitions
- Focus states: 2px ring with saffron color
- Loading states: Smooth rotations and fades
- Error states: Shake animation
- All animations respect `prefers-reduced-motion`

## Requirements Fulfilled

- ✅ 4.4: Interactive animations and transitions
- ✅ 8.2: Touch-optimized for mobile (44x44px minimum)
- ✅ 6.6: Form validation with error states
- ✅ 1.2: Indian cultural patterns and motifs
- ✅ 4.2: Smooth page load animations
- ✅ 5.1-5.5: Loading states and feedback
