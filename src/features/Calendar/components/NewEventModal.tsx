import React, { useState, useMemo } from 'react';
import { X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import type { CalendarEvent, CalendarCategory } from '../types';
import { CALENDAR_COLORS } from '../types';
import { timeOptions } from '../../../data/calendarMockData';
import { getMonthName, getDaysInMonth, getFirstDayOfMonth } from '../calendarUtils';

interface NewEventModalProps {
    event?: CalendarEvent | null;
    categories: CalendarCategory[];
    onClose: () => void;
    onSave: (data: Omit<CalendarEvent, 'id'>) => void;
}

export const NewEventModal: React.FC<NewEventModalProps> = ({
    event,
    categories,
    onClose,
    onSave,
}) => {
    const isEditing = Boolean(event);

    // Form state
    const [title, setTitle] = useState(event?.title || '');
    const [description, setDescription] = useState(event?.description || '');
    const [startDate, setStartDate] = useState(event?.startDate || new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(event?.endDate || new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState(event?.startTime || '00:00');
    const [endTime, setEndTime] = useState(event?.endTime || '00:00');
    const [allDay, setAllDay] = useState(event?.allDay || false);
    const [repeat] = useState<'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'>(event?.repeat || 'none');
    const [calendarId, setCalendarId] = useState(event?.calendarId || categories[0]?.id || '');

    // Date picker state
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSave({
            title: title.trim(),
            description: description.trim() || undefined,
            startDate,
            endDate,
            startTime: allDay ? undefined : startTime,
            endTime: allDay ? undefined : endTime,
            allDay,
            repeat,
            calendarId,
        });
    };

    const formatDisplayDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const selectedCategory = categories.find(c => c.id === calendarId);

    // Mini calendar for date picker
    const MiniCalendar: React.FC<{
        selectedDate: string;
        onSelect: (date: string) => void;
        onClose: () => void;
    }> = ({ selectedDate, onSelect, onClose: closeCalendar }) => {
        const [viewDate, setViewDate] = useState(new Date(selectedDate || new Date()));

        const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
        const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

        const days = useMemo(() => {
            const result: (number | null)[] = [];
            // Previous month padding
            for (let i = 0; i < firstDay; i++) {
                result.push(null);
            }
            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                result.push(i);
            }
            return result;
        }, [daysInMonth, firstDay]);

        const handleDayClick = (day: number) => {
            const year = viewDate.getFullYear();
            const month = String(viewDate.getMonth() + 1).padStart(2, '0');
            const dayStr = String(day).padStart(2, '0');
            onSelect(`${year}-${month}-${dayStr}`);
            closeCalendar();
        };

        return (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-3 z-50" style={{ width: '280px' }}>
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-3">
                    <button
                        type="button"
                        onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))}
                        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="font-medium text-sm">
                        {getMonthName(viewDate.getMonth())} {viewDate.getFullYear()}
                    </span>
                    <button
                        type="button"
                        onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))}
                        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                    {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                        <div key={day} className="text-center text-xs text-neutral-500 py-1">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, idx) => {
                        if (day === null) {
                            return <div key={`empty-${idx}`} />;
                        }

                        const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isSelected = dateStr === selectedDate;
                        const isToday = dateStr === new Date().toISOString().split('T')[0];

                        return (
                            <button
                                key={day}
                                type="button"
                                onClick={() => handleDayClick(day)}
                                className={`w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors ${isSelected
                                        ? 'bg-emerald-500 text-white'
                                        : isToday
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                    }`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Time picker dropdown
    const TimePicker: React.FC<{
        value: string;
        onChange: (time: string) => void;
        onClose: () => void;
    }> = ({ value, onChange, onClose: closeTimePicker }) => (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-50 max-h-48 overflow-auto" style={{ width: '100px' }}>
            {timeOptions.map(opt => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                        onChange(opt.value);
                        closeTimePicker();
                    }}
                    className={`w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-2 ${value === opt.value ? 'text-emerald-600' : ''
                        }`}
                >
                    {value === opt.value && <span className="text-emerald-600">✓</span>}
                    {opt.label}
                </button>
            ))}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {isEditing ? 'Edit Event' : 'New Event'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 rounded"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                            Title
                        </label>
                        <Input
                            type="text"
                            placeholder="Sending order"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                            Description
                        </label>
                        <textarea
                            placeholder="Sending order #25789 Felecia Burke at 5:30"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-700 dark:text-white resize-none"
                        />
                    </div>

                    {/* Time and Date */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                            Time and Date
                        </label>
                        <div className="flex items-center gap-2 flex-wrap">
                            {/* Start Time */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowStartTimePicker(!showStartTimePicker)}
                                    disabled={allDay}
                                    className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm flex items-center gap-1 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50"
                                >
                                    {startTime}
                                    <ChevronDown size={14} />
                                </button>
                                {showStartTimePicker && (
                                    <TimePicker
                                        value={startTime}
                                        onChange={setStartTime}
                                        onClose={() => setShowStartTimePicker(false)}
                                    />
                                )}
                            </div>

                            {/* Start Date */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowStartDatePicker(!showStartDatePicker);
                                    }}
                                    className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm flex items-center gap-1 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                >
                                    {formatDisplayDate(startDate)}
                                    <ChevronDown size={14} />
                                </button>
                                {showStartDatePicker && (
                                    <MiniCalendar
                                        selectedDate={startDate}
                                        onSelect={setStartDate}
                                        onClose={() => setShowStartDatePicker(false)}
                                    />
                                )}
                            </div>

                            <span className="text-neutral-400">—</span>

                            {/* End Time */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowEndTimePicker(!showEndTimePicker)}
                                    disabled={allDay}
                                    className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm flex items-center gap-1 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50"
                                >
                                    {endTime}
                                    <ChevronDown size={14} />
                                </button>
                                {showEndTimePicker && (
                                    <TimePicker
                                        value={endTime}
                                        onChange={setEndTime}
                                        onClose={() => setShowEndTimePicker(false)}
                                    />
                                )}
                            </div>

                            {/* End Date */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEndDatePicker(!showEndDatePicker);
                                    }}
                                    className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm flex items-center gap-1 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                >
                                    {formatDisplayDate(endDate)}
                                    <ChevronDown size={14} />
                                </button>
                                {showEndDatePicker && (
                                    <MiniCalendar
                                        selectedDate={endDate}
                                        onSelect={setEndDate}
                                        onClose={() => setShowEndDatePicker(false)}
                                    />
                                )}
                            </div>
                        </div>

                        {/* All Day & Repeat */}
                        <div className="flex items-center gap-6 mt-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={allDay}
                                    onChange={(e) => setAllDay(e.target.checked)}
                                    className="w-4 h-4 text-emerald-500 border-neutral-300 rounded focus:ring-emerald-500"
                                />
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">All Day</span>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-neutral-500">
                                <span>Repeat</span>
                            </label>
                        </div>
                    </div>

                    {/* Calendar Selection */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                            Calendar
                        </label>
                        <div className="relative">
                            <select
                                value={calendarId}
                                onChange={(e) => setCalendarId(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-700 dark:text-white appearance-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                        </div>
                        {selectedCategory && (
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`w-3 h-3 rounded-full ${CALENDAR_COLORS[selectedCategory.color].bg}`} />
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">{selectedCategory.name}</span>
                            </div>
                        )}
                    </div>

                    <Button type="submit" variant="primary" className="w-full !bg-emerald-500 hover:!bg-emerald-600">
                        {isEditing ? 'Save Changes' : 'Create'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
