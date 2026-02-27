/**
 * Foundation – Semantic theme token mapping
 * Maps design tokens to semantic role names used throughout components
 */
export const theme = {
  colors: {
    // Brand
    primary:        'var(--color-brand-primary)',
    primaryHover:   'var(--color-brand-primary-hover)',
    accent:         'var(--color-brand-accent)',
    accentHover:    'var(--color-brand-accent-hover)',

    // Surface
    surface:        'var(--color-surface-base)',
    surfaceSubtle:  'var(--color-surface-subtle)',
    surfaceDark:    'var(--color-surface-dark-base)',

    // Text
    textPrimary:    'var(--color-neutral-900)',
    textSecondary:  'var(--color-neutral-600)',
    textDisabled:   'var(--color-neutral-400)',
    textInverse:    'var(--color-neutral-0)',

    // Border
    border:         'var(--color-neutral-200)',
    borderStrong:   'var(--color-neutral-300)',

    // Status
    success:        'var(--color-success)',
    warning:        'var(--color-warning)',
    danger:         'var(--color-danger)',
    info:           'var(--color-info)',
  },
  radius: {
    sm:   'var(--radius-sm)',
    md:   'var(--radius-md)',
    lg:   'var(--radius-lg)',
    full: 'var(--radius-full)',
  },
} as const;

