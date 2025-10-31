/**
 * Indian Theme Constants
 * Centralized theme configuration for the Indian-inspired design system
 */

export const indianColors = {
  saffron: {
    50: '#FFF8F0',
    100: '#FFE8D1',
    200: '#FFD4A8',
    300: '#FFB87F',
    400: '#FF9D56',
    500: '#FF8833',
    600: '#E67A2E',
    700: '#CC6B29',
    800: '#B35C24',
    900: '#994D1F',
  },
  royalBlue: {
    50: '#F0F4FF',
    100: '#D9E5FF',
    200: '#B3CCFF',
    300: '#8CB3FF',
    400: '#6699FF',
    500: '#4080FF',
    600: '#3366CC',
    700: '#2952A3',
    800: '#1F3D7A',
    900: '#152951',
  },
  terracotta: {
    50: '#FFF5F2',
    100: '#FFE6DD',
    200: '#FFCCBB',
    300: '#FFB399',
    400: '#FF9977',
    500: '#E87A5D',
    600: '#CC6B52',
    700: '#B35C47',
    800: '#994D3C',
    900: '#803E31',
  },
  emerald: {
    50: '#F0FFF4',
    100: '#D1FAE0',
    200: '#A7F3C2',
    300: '#6EE7A3',
    400: '#34D884',
    500: '#10B968',
    600: '#059652',
    700: '#047841',
    800: '#065F33',
    900: '#064E2A',
  },
  gold: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#D4A574',
    600: '#B8860B',
    700: '#996515',
    800: '#7A4F0F',
    900: '#5C3A0A',
  },
  neutral: {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
  },
} as const;

export const indianFonts = {
  sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
  heading: ['Poppins', 'Inter', 'sans-serif'],
  accent: ['Playfair Display', 'Noto Serif Devanagari', 'serif'],
} as const;

export const indianAnimations = {
  durations: {
    fast: '200ms',
    normal: '300ms',
    slow: '400ms',
  },
  easings: {
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
    easeInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
  },
} as const;

export const indianShadows = {
  soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  indian: '0 4px 20px -2px rgba(255, 136, 51, 0.15), 0 2px 8px -1px rgba(255, 136, 51, 0.1)',
  lift: '0 12px 28px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.08)',
} as const;

export const indianGradients = {
  primary: 'linear-gradient(135deg, #FFF8F0 0%, #FFE8D1 50%, #F0F4FF 100%)',
  saffron: 'linear-gradient(135deg, #FF8833 0%, #E67A2E 100%)',
  royal: 'linear-gradient(135deg, #4080FF 0%, #3366CC 100%)',
} as const;

// Currency formatter for Indian Rupee
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with Indian thousand separators (lakhs, crores)
export const formatIndianNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};
