import React, { useEffect, useRef } from 'react';
import { X, Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import type { CalendarEvent, CalendarCategory } from '../types';
import { CALENDAR_COLORS } from '../types';
import { getMonthName } from '../calendarUtils';

interface EventPreviewProps {
    event: CalendarEvent;
    category?: CalendarCategory;
    position: { x: number; y: number };
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export const EventPreview: React.FC<EventPreviewProps> = ({
    event,
    category,
    position,
    onClose,
    onEdit,
    onDelete,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    // Calculate position to keep within viewport
    const calculatePosition = () => {
        const padding = 16;
        const width = 320;
        const height = 200;

        let x = position.x;
        let y = position.y;

        // Adjust horizontal position if overflowing right
        if (x + width > window.innerWidth - padding) {
            x = window.innerWidth - width - padding;
        }

        // Adjust vertical position if overflowing bottom
        if (y + height > window.innerHeight - padding) {
            y = position.y - height - 10;
        }

        return { left: Math.max(padding, x), top: Math.max(padding, y) };
    };

    const pos = calculatePosition();
    const colors = category ? CALENDAR_COLORS[category.color] : null;

    // Format date display
    const formatEventDate = () => {
        const startDate = new Date(event.startDate);
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][startDate.getDay()];
        const month = getMonthName(startDate.getMonth());
        const day = startDate.getDate();

        let dateStr = `${dayOfWeek}, ${month} ${day}`;

        if (event.startTime && event.endTime) {
            dateStr += ` • ${event.startTime} - ${event.endTime}`;
        } else if (event.allDay) {
            dateStr += ' • All day';
        }

        return dateStr;
    };

    return (
        <div
            ref={ref}
            className="fixed bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 z-50"
            style={{
                left: pos.left,
                top: pos.top,
                width: '320px',
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2">
                    {colors && (
                        <span className={`w-3 h-3 rounded ${colors.bg}`} />
                    )}
                    <h3 className="font-semibold text-neutral-900 dark:text-white truncate">
                        {event.title}
                    </h3>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={onEdit}
                        className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                        aria-label="Edit event"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={onDelete}
                        className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        aria-label="Delete event"
                    >
                        <Trash2 size={16} />
                    </button>
                    <button
                        type="button"
                        className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                        aria-label="More options"
                    >
                        <MoreHorizontal size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Date and time */}
                <div className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full mt-1.5 ${colors?.bg || 'bg-neutral-400'}`} />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {formatEventDate()}
                    </p>
                </div>

                {/* Description */}
                {event.description && (
                    <div className="flex items-start gap-2">
                        <span className="w-2 h-2 mt-1.5" />
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3">
                            {event.description}
                        </p>
                    </div>
                )}

                {/* Calendar/Category */}
                {category && (
                    <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-700">
                        <span className={`w-3 h-3 rounded ${colors?.bg}`} />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {category.name}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
