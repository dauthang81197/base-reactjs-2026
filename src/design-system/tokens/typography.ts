/**
 * Design Tokens – Typography
 * Figma: Clean sans-serif, M3-style scale (Display, Headline, Title, Label, Body)
 */

export const fontFamily = {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
  mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
} as const;

export const fontSize = {
  // Display
  'display-lg': ['3rem',    { lineHeight: '3.75rem', letterSpacing: '-0.02em', fontWeight: '400' }],
  'display-md': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em', fontWeight: '400' }],
  'display-sm': ['1.75rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em', fontWeight: '400' }],
  // Headline
  'headline-lg': ['2rem',    { lineHeight: '2.5rem',  letterSpacing: '0',       fontWeight: '400' }],
  'headline-md': ['1.75rem', { lineHeight: '2.25rem', letterSpacing: '0',       fontWeight: '400' }],
  'headline-sm': ['1.5rem',  { lineHeight: '2rem',    letterSpacing: '0',       fontWeight: '400' }],
  // Title
  'title-lg': ['1.375rem', { lineHeight: '1.75rem', letterSpacing: '0',       fontWeight: '500' }],
  'title-md': ['1rem',     { lineHeight: '1.5rem',  letterSpacing: '0.009em', fontWeight: '500' }],
  'title-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.006em', fontWeight: '500' }],
  // Label
  'label-lg': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.006em', fontWeight: '500' }],
  'label-md': ['0.75rem',  { lineHeight: '1rem',    letterSpacing: '0.031em', fontWeight: '500' }],
  'label-sm': ['0.6875rem',{ lineHeight: '1rem',    letterSpacing: '0.031em', fontWeight: '500' }],
  // Body
  'body-lg': ['1rem',     { lineHeight: '1.5rem',  letterSpacing: '0.009em', fontWeight: '400' }],
  'body-md': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.016em', fontWeight: '400' }],
  'body-sm': ['0.75rem',  { lineHeight: '1rem',    letterSpacing: '0.025em', fontWeight: '400' }],
  // Link
  'link-md': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.016em', fontWeight: '400', textDecoration: 'underline' }],
  'link-sm': ['0.75rem',  { lineHeight: '1rem',    letterSpacing: '0.025em', fontWeight: '400', textDecoration: 'underline' }],
} as const;

export const fontWeight = {
  regular: '400',
  medium:  '500',
  semibold:'600',
  bold:    '700',
} as const;

