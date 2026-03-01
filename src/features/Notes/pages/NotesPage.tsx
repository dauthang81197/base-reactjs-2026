import * as React from 'react';
import { useState, useCallback } from 'react';
import { Plus, Pin, SlidersHorizontal, X, Edit2, MoreHorizontal } from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import { notes as initialNotes } from '../../../data/notesMockData';
import { formatDate } from '../../../utils/formatters';
import type { Note, NoteColor } from '../types';

// ── Color Map ─────────────────────────────────────────────────────────────────
const noteColorClasses: Record<NoteColor, { bg: string; indicator: string }> = {
    white: {
        bg: 'bg-white dark:bg-neutral-900',
        indicator: 'bg-neutral-300',
    },
    yellow: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        indicator: 'bg-amber-400',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        indicator: 'bg-green-500',
    },
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        indicator: 'bg-blue-500',
    },
    pink: {
        bg: 'bg-pink-50 dark:bg-pink-900/20',
        indicator: 'bg-pink-500',
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        indicator: 'bg-purple-500',
    },
};

// ── Note Card Component ───────────────────────────────────────────────────────
interface NoteCardProps {
    note: Note;
    onClick: () => void;
    onPin: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onPin }) => {
    const colorClass = noteColorClasses[note.color];

    return (
        <Card
            className={`cursor-pointer hover:shadow-lg transition-shadow ${colorClass.bg} border border-neutral-200 dark:border-neutral-700`}
            onClick={onClick}
        >
            <CardBody className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${colorClass.indicator}`} />
                        <span className="text-xs text-neutral-500">
                            {formatDate(note.createdAt, { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onPin();
                        }}
                        className={`p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${note.isPinned ? 'text-amber-500' : 'text-neutral-400'
                            }`}
                    >
                        <Pin className="h-4 w-4" fill={note.isPinned ? 'currentColor' : 'none'} />
                    </button>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                    {note.title}
                </h3>

                {/* Content Preview */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-4">
                    {note.content}
                </p>
            </CardBody>
        </Card>
    );
};

// ── Note Detail Modal ─────────────────────────────────────────────────────────
interface NoteDetailModalProps {
    note: Note;
    isOpen: boolean;
    onClose: () => void;
    onEdit: () => void;
}

const NoteDetailModal: React.FC<NoteDetailModalProps> = ({
    note,
    isOpen,
    onClose,
    onEdit,
}) => {
    if (!isOpen) return null;

    const colorClass = noteColorClasses[note.color];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onEdit}
                            className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                            <Edit2 className="h-4 w-4 text-neutral-500" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">
                            <MoreHorizontal className="h-4 w-4 text-neutral-500" />
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                        <X className="h-4 w-4 text-neutral-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Title with color indicator */}
                    <div className="flex items-start gap-3 mb-3">
                        <span className={`h-3 w-3 rounded-full ${colorClass.indicator} mt-1.5 shrink-0`} />
                        <div>
                            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                {note.title}
                            </h2>
                            <p className="text-xs text-neutral-500">
                                {formatDate(note.createdAt, { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Full Content */}
                    <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                        {note.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Add Note Modal ────────────────────────────────────────────────────────────
interface AddNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { title: string; content: string; color: NoteColor }) => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [color, setColor] = useState<NoteColor>('white');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({ title, content, color });
        setTitle('');
        setContent('');
        setColor('white');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        Add Note
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                        <X className="h-5 w-5 text-neutral-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                            Title
                        </label>
                        <Input
                            type="text"
                            placeholder="The title of a note"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                            Description
                        </label>
                        <textarea
                            placeholder="Type something"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Color Selection */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Color
                        </label>
                        <div className="flex gap-2">
                            {(Object.keys(noteColorClasses) as NoteColor[]).map((colorKey) => (
                                <button
                                    key={colorKey}
                                    type="button"
                                    onClick={() => setColor(colorKey)}
                                    className={`h-6 w-6 rounded-full border-2 transition-all ${noteColorClasses[colorKey].indicator
                                        } ${color === colorKey
                                            ? 'border-neutral-900 dark:border-white scale-110'
                                            : 'border-transparent'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="filled"
                        className="w-full bg-green-600 hover:bg-green-700"
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
};

// ── Notes Page ────────────────────────────────────────────────────────────────
const NotesPage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [searchTerm] = useState('');

    // Filter notes based on search
    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNoteClick = useCallback((note: Note) => {
        setSelectedNote(note);
        setIsDetailOpen(true);
    }, []);

    const handlePinNote = useCallback((noteId: string) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
            )
        );
    }, []);

    const handleAddNote = useCallback(
        (data: { title: string; content: string; color: NoteColor }) => {
            const newNote: Note = {
                id: `note-${Date.now()}`,
                title: data.title,
                content: data.content,
                color: data.color,
                isPinned: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setNotes((prev) => [newNote, ...prev]);
        },
        []
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Notes</h1>
                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <SlidersHorizontal className="h-4 w-4 text-neutral-500" />
                    </button>
                    <Button
                        variant="filled"
                        size="sm"
                        leftIcon={<Plus className="h-4 w-4" />}
                        onClick={() => setIsAddOpen(true)}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Add Note
                    </Button>
                </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onClick={() => handleNoteClick(note)}
                        onPin={() => handlePinNote(note.id)}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredNotes.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-neutral-500 dark:text-neutral-400">No notes found</p>
                </div>
            )}

            {/* Note Detail Modal */}
            {selectedNote && (
                <NoteDetailModal
                    note={selectedNote}
                    isOpen={isDetailOpen}
                    onClose={() => {
                        setIsDetailOpen(false);
                        setSelectedNote(null);
                    }}
                    onEdit={() => console.log('Edit note:', selectedNote.id)}
                    onPin={() => handlePinNote(selectedNote.id)}
                />
            )}

            {/* Add Note Modal */}
            <AddNoteModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSave={handleAddNote}
            />
        </div>
    );
};

export default NotesPage;
