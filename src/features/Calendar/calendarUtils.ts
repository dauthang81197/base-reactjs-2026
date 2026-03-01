import type { CalendarEvent, CalendarCategory } from './types';

// ── Date Utilities ─────────────────────────────────────────────────────────────

export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
    // Returns 0 = Sunday, 1 = Monday, etc.
    const day = new Date(year, month, 1).getDay();
    // Convert to Monday = 0, Sunday = 6
    return day === 0 ? 6 : day - 1;
};

export const getMonthName = (month: number): string => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
};

export const getShortMonthName = (month: number): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
};

export const getDayName = (dayIndex: number, short = false): string => {
    const days = short
        ? ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
        : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[dayIndex];
};

export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatDisplayDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

export const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date());
};

// ── Calendar Grid Generation ───────────────────────────────────────────────────

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    events: CalendarEvent[];
}

export const generateMonthGrid = (
    year: number,
    month: number,
    events: CalendarEvent[],
    visibleCalendarIds: string[]
): CalendarDay[][] => {
    const weeks: CalendarDay[][] = [];
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    let currentWeek: CalendarDay[] = [];

    // Fill in previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
        currentWeek.push({
            date,
            isCurrentMonth: false,
            isToday: isToday(date),
            events: getEventsForDate(date, events, visibleCalendarIds),
        });
    }

    // Fill in current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        currentWeek.push({
            date,
            isCurrentMonth: true,
            isToday: isToday(date),
            events: getEventsForDate(date, events, visibleCalendarIds),
        });

        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    // Fill in next month days
    if (currentWeek.length > 0) {
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        let nextDay = 1;

        while (currentWeek.length < 7) {
            const date = new Date(nextYear, nextMonth, nextDay);
            currentWeek.push({
                date,
                isCurrentMonth: false,
                isToday: isToday(date),
                events: getEventsForDate(date, events, visibleCalendarIds),
            });
            nextDay++;
        }
        weeks.push(currentWeek);
    }

    return weeks;
};

// ── Week View Generation ───────────────────────────────────────────────────────

export interface WeekDay {
    date: Date;
    dayName: string;
    isToday: boolean;
    events: CalendarEvent[];
}

export const generateWeekDays = (
    baseDate: Date,
    events: CalendarEvent[],
    visibleCalendarIds: string[]
): WeekDay[] => {
    const days: WeekDay[] = [];
    const dayOfWeek = baseDate.getDay();
    // Get Monday of this week
    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        days.push({
            date,
            dayName: getDayName(i, true),
            isToday: isToday(date),
            events: getEventsForDate(date, events, visibleCalendarIds),
        });
    }

    return days;
};

// ── Event Helpers ──────────────────────────────────────────────────────────────

export const getEventsForDate = (
    date: Date,
    events: CalendarEvent[],
    visibleCalendarIds: string[]
): CalendarEvent[] => {
    const dateStr = formatDate(date);

    return events.filter(event => {
        // Check if calendar is visible
        if (!visibleCalendarIds.includes(event.calendarId)) {
            return false;
        }

        // Check if event spans this date
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        const checkDate = new Date(dateStr);

        return checkDate >= eventStart && checkDate <= eventEnd;
    });
};

export const getEventColor = (
    event: CalendarEvent,
    categories: CalendarCategory[]
): { bg: string; text: string; border: string; light: string } => {
    const category = categories.find(c => c.id === event.calendarId);
    if (!category) {
        return { bg: 'bg-gray-500', text: 'text-gray-600', border: 'border-gray-500', light: 'bg-gray-100' };
    }

    const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
        red: { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-500', light: 'bg-red-100' },
        orange: { bg: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-500', light: 'bg-orange-100' },
        yellow: { bg: 'bg-yellow-400', text: 'text-yellow-700', border: 'border-yellow-400', light: 'bg-yellow-100' },
        lime: { bg: 'bg-lime-500', text: 'text-lime-700', border: 'border-lime-500', light: 'bg-lime-100' },
        green: { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-500', light: 'bg-emerald-100' },
        teal: { bg: 'bg-teal-500', text: 'text-teal-700', border: 'border-teal-500', light: 'bg-teal-100' },
        cyan: { bg: 'bg-cyan-500', text: 'text-cyan-700', border: 'border-cyan-500', light: 'bg-cyan-100' },
        blue: { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-500', light: 'bg-blue-100' },
        purple: { bg: 'bg-purple-500', text: 'text-purple-700', border: 'border-purple-500', light: 'bg-purple-100' },
        pink: { bg: 'bg-pink-500', text: 'text-pink-700', border: 'border-pink-500', light: 'bg-pink-100' },
    };

    return colorMap[category.color] || colorMap.blue;
};

// ── Hour Grid for Week/Day View ────────────────────────────────────────────────

export const generateHourGrid = (): string[] => {
    const hours: string[] = [];
    for (let i = 0; i < 24; i++) {
        hours.push(`${String(i).padStart(2, '0')}:00`);
    }
    return hours;
};

export const getEventPositionInDay = (event: CalendarEvent): { top: number; height: number } => {
    if (event.allDay || !event.startTime || !event.endTime) {
        return { top: 0, height: 60 }; // All day events at top
    }

    const [startHour, startMin] = event.startTime.split(':').map(Number);
    const [endHour, endMin] = event.endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const duration = Math.max(endMinutes - startMinutes, 30); // Minimum 30 min

    // Each hour is 60px
    const top = (startMinutes / 60) * 60;
    const height = (duration / 60) * 60;

    return { top, height };
};
