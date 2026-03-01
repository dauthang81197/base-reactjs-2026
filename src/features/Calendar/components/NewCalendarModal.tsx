import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import type { CalendarColor } from '../types';
import { CALENDAR_COLORS } from '../types';

interface NewCalendarModalProps {
    onClose: () => void;
    onSave: (data: { name: string; description?: string; color: string }) => void;
}

const colorOptions: CalendarColor[] = [
    'red', 'orange', 'yellow', 'lime', 'green',
    'teal', 'cyan', 'blue', 'purple', 'pink'
];

export const NewCalendarModal: React.FC<NewCalendarModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState<CalendarColor>('green');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        onSave({
            name: name.trim(),
            description: description.trim() || undefined,
            color: selectedColor,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-sm">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        New Calendar
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
                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                            Name
                        </label>
                        <Input
                            type="text"
                            placeholder="Personal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                            Description
                        </label>
                        <textarea
                            placeholder="Type something"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-700 dark:text-white resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                            Color
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {colorOptions.map((color) => {
                                const colors = CALENDAR_COLORS[color];
                                return (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-lg ${colors.bg} transition-all ${selectedColor === color
                                                ? 'ring-2 ring-offset-2 ring-neutral-900 dark:ring-neutral-100'
                                                : 'hover:scale-110'
                                            }`}
                                        aria-label={color}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full !bg-emerald-500 hover:!bg-emerald-600">
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
};
