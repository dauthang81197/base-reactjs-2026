// ── Calendar Types ─────────────────────────────────────────────────────────────

export type CalendarColor =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'teal'
    | 'cyan'
    | 'blue'
    | 'purple'
    | 'pink';

export interface CalendarCategory {
    id: string;
    name: string;
    color: CalendarColor;
    visible: boolean;
}

export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    startTime?: string; // HH:mm format, undefined = all day
    endTime?: string;
    allDay: boolean;
    repeat?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    calendarId: string; // Reference to CalendarCategory
}

export type CalendarViewMode = 'month' | 'week' | 'day';

export interface CalendarState {
    currentDate: Date;
    viewMode: CalendarViewMode;
    categories: CalendarCategory[];
    events: CalendarEvent[];
    selectedEvent: CalendarEvent | null;
}

// ── Color Map ──────────────────────────────────────────────────────────────────
export const CALENDAR_COLORS: Record<CalendarColor, { bg: string; text: string; border: string; light: string }> = {
    red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-500', light: 'bg-red-100' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-500', light: 'bg-orange-100' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-500', light: 'bg-yellow-100' },
    lime: { bg: 'bg-lime-500', text: 'text-lime-600', border: 'border-lime-500', light: 'bg-lime-100' },
    green: { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500', light: 'bg-emerald-100' },
    teal: { bg: 'bg-teal-500', text: 'text-teal-600', border: 'border-teal-500', light: 'bg-teal-100' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-500', light: 'bg-cyan-100' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-500', light: 'bg-blue-100' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-500', light: 'bg-purple-100' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-500', light: 'bg-pink-100' },
};

// ── Form Types ─────────────────────────────────────────────────────────────────
export interface NewCalendarFormData {
    name: string;
    description?: string;
    color: CalendarColor;
}

export interface NewEventFormData {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    allDay: boolean;
    repeat: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    calendarId: string;
}
