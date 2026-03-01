import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import type { CalendarCategory } from '../types';
import { CALENDAR_COLORS } from '../types';

interface CalendarSidebarProps {
    categories: CalendarCategory[];
    onToggleCategory: (id: string) => void;
    onAddCalendar: () => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
    categories,
    onToggleCategory,
    onAddCalendar,
}) => {
    return (
        <aside className="w-48 shrink-0 hidden lg:block">
            {/* Calendars Section */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        Calendars
                    </h3>
                    <button
                        type="button"
                        onClick={onAddCalendar}
                        className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        aria-label="Add calendar"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                <div className="space-y-1">
                    {categories.map((category) => {
                        const colors = CALENDAR_COLORS[category.color];

                        return (
                            <div
                                key={category.id}
                                className="group flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                            >
                                <label className="flex items-center gap-2 flex-1 cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={category.visible}
                                            onChange={() => onToggleCategory(category.id)}
                                            className="sr-only peer"
                                        />
                                        <div
                                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${category.visible
                                                    ? `${colors.bg} border-transparent`
                                                    : 'bg-transparent border-neutral-300 dark:border-neutral-600'
                                                }`}
                                        >
                                            {category.visible && (
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                        {category.name}
                                    </span>
                                </label>
                                <button
                                    type="button"
                                    className="p-0.5 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-neutral-600 dark:hover:text-neutral-300 transition-opacity"
                                    aria-label="More options"
                                >
                                    <MoreHorizontal size={14} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};
