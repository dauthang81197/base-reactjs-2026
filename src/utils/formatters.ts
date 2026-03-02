// ── Currency Formatter ────────────────────────────────────────────────────────
export const formatCurrency = (
    value: number,
    currency: string = 'USD',
    locale: string = 'en-US'
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

// ── Date Formatter ────────────────────────────────────────────────────────────
export const formatDate = (
    date: string | Date | undefined | null,
    options?: Intl.DateTimeFormatOptions
): string => {
    if (!date) return '—';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '—';
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    return dateObj.toLocaleDateString('en-US', options ?? defaultOptions);
};

// ── Relative Time Formatter ───────────────────────────────────────────────────
export const formatRelativeTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateObj);
};

// ── Number Formatter ──────────────────────────────────────────────────────────
export const formatNumber = (
    value: number,
    locale: string = 'en-US'
): string => {
    return new Intl.NumberFormat(locale).format(value);
};

// ── Percentage Formatter ──────────────────────────────────────────────────────
export const formatPercentage = (
    value: number,
    decimals: number = 1
): string => {
    return `${value.toFixed(decimals)}%`;
};

// ── Compact Number Formatter ──────────────────────────────────────────────────
export const formatCompactNumber = (value: number): string => {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toString();
};
