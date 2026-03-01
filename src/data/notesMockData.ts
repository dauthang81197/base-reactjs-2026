import type { Note } from '../features/Notes/types';

// ── Notes Mock Data ───────────────────────────────────────────────────────────
export const notes: Note[] = [
    {
        id: 'note-1',
        title: 'The title of a note',
        content:
            'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad minim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat. seds eliusmod.',
        color: 'green',
        isPinned: true,
        createdAt: '2020-06-12T10:00:00Z',
        updatedAt: '2020-06-12T10:00:00Z',
    },
    {
        id: 'note-2',
        title: 'The title of a note',
        content:
            'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad minim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat. seds eliusmod.',
        color: 'white',
        isPinned: true,
        createdAt: '2020-06-12T10:00:00Z',
        updatedAt: '2020-06-12T10:00:00Z',
    },
    {
        id: 'note-3',
        title: 'The title of a note',
        content:
            'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad minim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat. seds eliusmod.',
        color: 'white',
        isPinned: true,
        createdAt: '2020-06-12T10:00:00Z',
        updatedAt: '2020-06-12T10:00:00Z',
    },
    {
        id: 'note-4',
        title: 'The title of a note',
        content:
            'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad minim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat. seds eliusmod.',
        color: 'yellow',
        isPinned: false,
        createdAt: '2020-06-12T10:00:00Z',
        updatedAt: '2020-06-12T10:00:00Z',
    },
    {
        id: 'note-5',
        title: 'The title of a note',
        content:
            'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad minim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat. seds eliusmod.',
        color: 'white',
        isPinned: false,
        createdAt: '2020-06-12T10:00:00Z',
        updatedAt: '2020-06-12T10:00:00Z',
    },
    {
        id: 'note-6',
        title: 'The title of a note',
        content:
            'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad minim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat. seds eliusmod.',
        color: 'white',
        isPinned: false,
        createdAt: '2020-06-12T10:00:00Z',
        updatedAt: '2020-06-12T10:00:00Z',
    },
    {
        id: 'note-7',
        title: 'The title of a note',
        content: 'Lorem ipsum dolor sit amet, ullamcous',
        color: 'white',
        isPinned: false,
        createdAt: '2020-06-12T10:00:00Z',
        updatedAt: '2020-06-12T10:00:00Z',
    },
    {
        id: 'note-8',
        title: 'The title of a note',
        content: 'Lorem ipsum dolor sit amet, ullamcous',
        color: 'white',
        isPinned: false,
        createdAt: '2020-06-12T10:00:00Z',
        updatedAt: '2020-06-12T10:00:00Z',
    },
    {
        id: 'note-9',
        title: 'The title of a note',
        content: 'Lorem ipsum dolor sit amet, ullamcous',
        color: 'white',
        isPinned: false,
        createdAt: '2020-06-12T10:00:00Z',
        updatedAt: '2020-06-12T10:00:00Z',
    },
];

// ── Helper Functions ──────────────────────────────────────────────────────────
export const getNoteById = (id: string): Note | undefined =>
    notes.find((note) => note.id === id);

export const getPinnedNotes = (): Note[] => notes.filter((note) => note.isPinned);

export const getUnpinnedNotes = (): Note[] => notes.filter((note) => !note.isPinned);
