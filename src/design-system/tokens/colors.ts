/**
 * Design Tokens – Color System
 * Extracted from Figma: Primary (forest green + teal), Supporting palette, Secondary (grays)
 */

export const colorTokens = {
  // ── Primary Brand ──────────────────────────────────────────
  'brand-primary':   '#1C3B2E', // deep forest green (header bg in Figma)
  'brand-accent':    '#5BC8AF', // teal/mint accent
  'brand-primary-hover': '#142d23',
  'brand-accent-hover':  '#3fb89a',

  // ── Supporting / Semantic ───────────────────────────────────
  'support-coral':   '#E06B5A', // supporting red-coral
  'support-yellow':  '#F0C040', // yellow
  'support-peach':   '#F2C9A8', // light peach/orange
  'support-pink':    '#DA6FD4', // pink-violet
  'support-green':   '#5DBB6B', // medium green
  'support-lime':    '#A8D44A', // lime green
  'support-cyan':    '#4DC8DC', // bright cyan
  'support-purple':  '#8C5ED4', // purple

  // ── Secondary / Neutrals ───────────────────────────────────
  'neutral-950':  '#0F1117',
  'neutral-900':  '#1A1D23',
  'neutral-800':  '#2C3142',
  'neutral-700':  '#3D4258',
  'neutral-600':  '#5C6070',
  'neutral-500':  '#8A8E9B',
  'neutral-400':  '#B0B4BF',
  'neutral-300':  '#D0D3DA',
  'neutral-200':  '#E8EAED',
  'neutral-100':  '#F4F5F7',
  'neutral-50':   '#FAFBFC',
  'neutral-0':    '#FFFFFF',

  // ── Semantic Status ────────────────────────────────────────
  'success-bg':   '#F0FDF4',
  'success-text': '#16A34A',
  'success-border':'#BBF7D0',
  'success':      '#22C55E',

  'warning-bg':   '#FFFBEB',
  'warning-text': '#D97706',
  'warning-border':'#FDE68A',
  'warning':      '#F59E0B',

  'danger-bg':    '#FEF2F2',
  'danger-text':  '#DC2626',
  'danger-border':'#FECACA',
  'danger':       '#EF4444',

  'info-bg':      '#EFF6FF',
  'info-text':    '#2563EB',
  'info-border':  '#BFDBFE',
  'info':         '#3B82F6',

  // ── Surface / Background ───────────────────────────────────
  'surface-base':    '#FFFFFF',
  'surface-subtle':  '#F4F5F7',
  'surface-overlay': 'rgba(15,17,23,0.5)',

  'surface-dark-base':   '#1A1D23',
  'surface-dark-subtle': '#0F1117',
  'surface-dark-card':   '#2C3142',
} as const;

export type ColorToken = keyof typeof colorTokens;

