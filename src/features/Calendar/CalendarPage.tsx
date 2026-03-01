import React, { useState, useCallback, useMemo } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import type { CalendarCategory, CalendarEvent, CalendarViewMode } from './types';
import { defaultCalendarCategories, defaultCalendarEvents } from '../../data/calendarMockData';
import {
    generateMonthGrid,
    generateWeekDays,
    generateHourGrid,
    getMonthName,
    getEventColor,
    getEventPositionInDay,
} from './calendarUtils';
import { CalendarSidebar } from './components/CalendarSidebar';
import { NewCalendarModal } from './components/NewCalendarModal';
import { NewEventModal } from './components/NewEventModal';
import { EventPreview } from './components/EventPreview';
import { DeleteEventDialog } from './components/DeleteEventDialog';

// ── View Mode Toggle ───────────────────────────────────────────────────────────
interface ViewModeToggleProps {
    mode: CalendarViewMode;
    onChange: (mode: CalendarViewMode) => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ mode, onChange }) => {
    const modes: CalendarViewMode[] = ['month', 'week', 'day'];

    return (
        <div className="flex rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            {modes.map((m) => (
                <button
                    key={m}
                    type="button"
                    onClick={() => onChange(m)}
                    className={`px-4 py-1.5 text-sm font-medium capitalize transition-colors ${mode === m
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white text-neutral-600 hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                        }`}
                >
                    {m}
                </button>
            ))}
        </div>
    );
};

// ── Main Calendar Page ─────────────────────────────────────────────────────────
export const CalendarPage: React.FC = () => {
    // State
    const [currentDate, setCurrentDate] = useState(new Date(2020, 8, 8)); // September 2020 for demo
    const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
    const [categories, setCategories] = useState<CalendarCategory[]>(defaultCalendarCategories);
    const [events, setEvents] = useState<CalendarEvent[]>(defaultCalendarEvents);

    // Modal states
    const [showNewCalendarModal, setShowNewCalendarModal] = useState(false);
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [eventPreviewPosition, setEventPreviewPosition] = useState<{ x: number; y: number } | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);

    // Computed values
    const visibleCalendarIds = useMemo(
        () => categories.filter(c => c.visible).map(c => c.id),
        [categories]
    );

    const monthGrid = useMemo(
        () => generateMonthGrid(currentDate.getFullYear(), currentDate.getMonth(), events, visibleCalendarIds),
        [currentDate, events, visibleCalendarIds]
    );

    const weekDays = useMemo(
        () => generateWeekDays(currentDate, events, visibleCalendarIds),
        [currentDate, events, visibleCalendarIds]
    );

    const hours = useMemo(() => generateHourGrid(), []);

    // Navigation handlers
    const goToPrevious = useCallback(() => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (viewMode === 'month') {
                newDate.setMonth(prev.getMonth() - 1);
            } else if (viewMode === 'week') {
                newDate.setDate(prev.getDate() - 7);
            } else {
                newDate.setDate(prev.getDate() - 1);
            }
            return newDate;
        });
    }, [viewMode]);

    const goToNext = useCallback(() => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (viewMode === 'month') {
                newDate.setMonth(prev.getMonth() + 1);
            } else if (viewMode === 'week') {
                newDate.setDate(prev.getDate() + 7);
            } else {
                newDate.setDate(prev.getDate() + 1);
            }
            return newDate;
        });
    }, [viewMode]);

    const goToToday = useCallback(() => {
        setCurrentDate(new Date(2020, 8, 8)); // For demo, use September 2020
    }, []);

    // Category handlers
    const handleToggleCategory = useCallback((id: string) => {
        setCategories(prev =>
            prev.map(c => (c.id === id ? { ...c, visible: !c.visible } : c))
        );
    }, []);

    const handleAddCategory = useCallback((data: { name: string; color: string }) => {
        const newCategory: CalendarCategory = {
            id: `custom-${Date.now()}`,
            name: data.name,
            color: data.color as CalendarCategory['color'],
            visible: true,
        };
        setCategories(prev => [...prev, newCategory]);
        setShowNewCalendarModal(false);
    }, []);

    // Event handlers
    const handleEventClick = useCallback((event: CalendarEvent, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedEvent(event);
        setEventPreviewPosition({ x: e.clientX, y: e.clientY });
    }, []);

    const handleClosePreview = useCallback(() => {
        setSelectedEvent(null);
        setEventPreviewPosition(null);
    }, []);

    const handleEditEvent = useCallback((event: CalendarEvent) => {
        setEditingEvent(event);
        setShowNewEventModal(true);
        handleClosePreview();
    }, [handleClosePreview]);

    const handleDeleteEventClick = useCallback((event: CalendarEvent) => {
        setEventToDelete(event);
        setShowDeleteDialog(true);
        handleClosePreview();
    }, [handleClosePreview]);

    const handleConfirmDelete = useCallback(() => {
        if (eventToDelete) {
            setEvents(prev => prev.filter(e => e.id !== eventToDelete.id));
        }
        setShowDeleteDialog(false);
        setEventToDelete(null);
    }, [eventToDelete]);

    const handleSaveEvent = useCallback((data: Omit<CalendarEvent, 'id'>) => {
        if (editingEvent) {
            setEvents(prev =>
                prev.map(e => (e.id === editingEvent.id ? { ...data, id: e.id } : e))
            );
        } else {
            const newEvent: CalendarEvent = {
                ...data,
                id: `event-${Date.now()}`,
            };
            setEvents(prev => [...prev, newEvent]);
        }
        setShowNewEventModal(false);
        setEditingEvent(null);
    }, [editingEvent]);

    // Render event pill
    const renderEventPill = (event: CalendarEvent, compact = false) => {
        const colors = getEventColor(event, categories);

        return (
            <button
                key={event.id}
                type="button"
                onClick={(e) => handleEventClick(event, e)}
                className={`w-full text-left rounded px-2 py-0.5 text-xs truncate mb-0.5 ${colors.light} ${colors.text} border-l-2 ${colors.border} hover:opacity-80 transition-opacity`}
            >
                {compact ? event.title : `${event.title}${event.startTime ? ` ${event.startTime}` : ''}`}
            </button>
        );
    };

    // Render Month View
    const renderMonthView = () => (
        <div className="flex-1 overflow-auto">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-neutral-200 dark:border-neutral-700">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div
                        key={day}
                        className="px-2 py-3 text-center text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="flex-1">
                {monthGrid.map((week, weekIdx) => (
                    <div key={weekIdx} className="grid grid-cols-7 border-b border-neutral-200 dark:border-neutral-700">
                        {week.map((day, dayIdx) => (
                            <div
                                key={dayIdx}
                                className={`min-h-[120px] p-2 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0 ${!day.isCurrentMonth ? 'bg-neutral-50 dark:bg-neutral-900' : ''
                                    }`}
                            >
                                <div className="flex justify-center mb-1">
                                    <span
                                        className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${day.isToday
                                                ? 'bg-emerald-500 text-white font-semibold'
                                                : day.isCurrentMonth
                                                    ? 'text-neutral-900 dark:text-white'
                                                    : 'text-neutral-400 dark:text-neutral-600'
                                            }`}
                                    >
                                        {day.date.getDate()}
                                    </span>
                                </div>
                                <div className="space-y-0.5">
                                    {day.events.slice(0, 3).map(event => renderEventPill(event, true))}
                                    {day.events.length > 3 && (
                                        <p className="text-xs text-neutral-500 px-2">+{day.events.length - 3} more</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    // Render Week View
    const renderWeekView = () => (
        <div className="flex-1 overflow-auto">
            {/* Header with days */}
            <div className="grid grid-cols-8 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 bg-white dark:bg-neutral-800 z-10">
                <div className="p-2 border-r border-neutral-200 dark:border-neutral-700" />
                {weekDays.map((day, idx) => (
                    <div
                        key={idx}
                        className="p-2 text-center border-r border-neutral-200 dark:border-neutral-700 last:border-r-0"
                    >
                        <div className="text-xs text-neutral-500 uppercase">{day.dayName}</div>
                        <div
                            className={`inline-flex items-center justify-center w-8 h-8 mt-1 text-lg font-semibold rounded-full ${day.isToday
                                    ? 'bg-emerald-500 text-white'
                                    : 'text-neutral-900 dark:text-white'
                                }`}
                        >
                            {day.date.getDate()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Hour grid */}
            <div className="relative">
                {hours.map((hour, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-8 border-b border-neutral-100 dark:border-neutral-800"
                        style={{ height: '60px' }}
                    >
                        <div className="p-1 text-xs text-neutral-500 text-right pr-2 border-r border-neutral-200 dark:border-neutral-700">
                            {hour}
                        </div>
                        {weekDays.map((day, dayIdx) => (
                            <div
                                key={dayIdx}
                                className="relative border-r border-neutral-100 dark:border-neutral-800 last:border-r-0"
                            >
                                {/* Render events for this hour */}
                                {day.events
                                    .filter(e => e.startTime?.startsWith(hour.split(':')[0]))
                                    .map(event => {
                                        const colors = getEventColor(event, categories);
                                        const pos = getEventPositionInDay(event);
                                        return (
                                            <button
                                                key={event.id}
                                                type="button"
                                                onClick={(e) => handleEventClick(event, e)}
                                                className={`absolute left-1 right-1 rounded px-1 py-0.5 text-xs ${colors.light} ${colors.text} border-l-2 ${colors.border} overflow-hidden hover:opacity-80`}
                                                style={{ height: `${pos.height}px` }}
                                            >
                                                <div className="font-medium truncate">{event.startTime} - {event.endTime}</div>
                                                <div className="truncate">{event.title}</div>
                                            </button>
                                        );
                                    })}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    // Render Day View
    const renderDayView = () => {
        const dayEvents = events.filter(e => {
            if (!visibleCalendarIds.includes(e.calendarId)) return false;
            const eventStart = new Date(e.startDate);
            const eventEnd = new Date(e.endDate);
            return currentDate >= eventStart && currentDate <= eventEnd;
        });

        return (
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <div className="border-b border-neutral-200 dark:border-neutral-700 p-4 text-center sticky top-0 bg-white dark:bg-neutral-800 z-10">
                    <div className="text-sm text-neutral-500 uppercase">
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()]} {currentDate.getDate()}
                    </div>
                </div>

                {/* Hour grid */}
                <div className="relative">
                    {hours.map((hour, idx) => (
                        <div
                            key={idx}
                            className="flex border-b border-neutral-100 dark:border-neutral-800"
                            style={{ height: '60px' }}
                        >
                            <div className="w-16 p-1 text-xs text-neutral-500 text-right pr-2 border-r border-neutral-200 dark:border-neutral-700 shrink-0">
                                {hour}
                            </div>
                            <div className="flex-1 relative">
                                {/* Render events for this hour */}
                                {dayEvents
                                    .filter(e => e.startTime?.startsWith(hour.split(':')[0]))
                                    .map(event => {
                                        const colors = getEventColor(event, categories);
                                        const pos = getEventPositionInDay(event);
                                        return (
                                            <button
                                                key={event.id}
                                                type="button"
                                                onClick={(e) => handleEventClick(event, e)}
                                                className={`absolute left-2 right-2 rounded px-2 py-1 text-sm ${colors.light} ${colors.text} border-l-2 ${colors.border} overflow-hidden hover:opacity-80`}
                                                style={{ height: `${pos.height}px` }}
                                            >
                                                <div className="font-medium">{event.startTime} - {event.endTime}</div>
                                                <div>{event.title}</div>
                                            </button>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex gap-6">
            {/* Left Sidebar */}
            <CalendarSidebar
                categories={categories}
                onToggleCategory={handleToggleCategory}
                onAddCalendar={() => setShowNewCalendarModal(true)}
            />

            {/* Main Calendar Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        Calendar
                    </h1>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                            setEditingEvent(null);
                            setShowNewEventModal(true);
                        }}
                    >
                        <Plus size={16} className="mr-1" />
                        Add Event
                    </Button>
                </div>

                {/* Calendar Card */}
                <Card className="flex-1 flex flex-col overflow-hidden">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={goToPrevious}
                                    className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={goToNext}
                                    className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={goToToday}
                                className="px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            >
                                Today
                            </button>
                            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                {getMonthName(currentDate.getMonth())} <span className="text-neutral-400 font-normal">{currentDate.getFullYear()}</span>
                            </h2>
                        </div>
                        <ViewModeToggle mode={viewMode} onChange={setViewMode} />
                    </div>

                    {/* Calendar View */}
                    {viewMode === 'month' && renderMonthView()}
                    {viewMode === 'week' && renderWeekView()}
                    {viewMode === 'day' && renderDayView()}
                </Card>
            </div>

            {/* Modals */}
            {showNewCalendarModal && (
                <NewCalendarModal
                    onClose={() => setShowNewCalendarModal(false)}
                    onSave={handleAddCategory}
                />
            )}

            {showNewEventModal && (
                <NewEventModal
                    event={editingEvent}
                    categories={categories}
                    onClose={() => {
                        setShowNewEventModal(false);
                        setEditingEvent(null);
                    }}
                    onSave={handleSaveEvent}
                />
            )}

            {selectedEvent && eventPreviewPosition && (
                <EventPreview
                    event={selectedEvent}
                    category={categories.find(c => c.id === selectedEvent.calendarId)}
                    position={eventPreviewPosition}
                    onClose={handleClosePreview}
                    onEdit={() => handleEditEvent(selectedEvent)}
                    onDelete={() => handleDeleteEventClick(selectedEvent)}
                />
            )}

            {showDeleteDialog && eventToDelete && (
                <DeleteEventDialog
                    eventTitle={eventToDelete.title}
                    onCancel={() => {
                        setShowDeleteDialog(false);
                        setEventToDelete(null);
                    }}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default CalendarPage;
