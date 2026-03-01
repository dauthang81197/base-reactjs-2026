// ── Notes Feature Types ───────────────────────────────────────────────────────

export type NoteColor = 'white' | 'yellow' | 'green' | 'blue' | 'pink' | 'purple';

export interface Note {
    id: string;
    title: string;
    content: string;
    color: NoteColor;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NoteFormData {
    title: string;
    content: string;
    color?: NoteColor;
}
