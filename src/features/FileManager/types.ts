// ── File Manager Types ────────────────────────────────────────────────────────

export type FileType =
    | 'folder'
    | 'image'
    | 'video'
    | 'audio'
    | 'document'
    | 'spreadsheet'
    | 'presentation'
    | 'pdf'
    | 'archive'
    | 'code'
    | 'design'
    | 'unknown';

export type ViewMode = 'grid' | 'list';

export interface FileItem {
    id: string;
    name: string;
    type: FileType;
    size: number; // bytes
    extension?: string;
    parentId: string | null;
    ownerId: string;
    ownerName: string;
    ownerAvatar?: string;
    createdAt: string;
    modifiedAt: string;
    isShared?: boolean;
    isFavorite?: boolean;
    isSelected?: boolean;
    children?: FileItem[]; // For folders in tree view
}

export interface FolderTreeItem {
    id: string;
    name: string;
    icon?: string;
    parentId: string | null;
    children?: FolderTreeItem[];
    isExpanded?: boolean;
}

export interface FileUpload {
    id: string;
    name: string;
    size: number;
    type: FileType;
    progress: number; // 0-100
    status: 'pending' | 'uploading' | 'completed' | 'failed';
    error?: string;
}

export interface StorageInfo {
    used: number; // bytes
    total: number; // bytes
    percentage: number;
}

export interface FileSettings {
    fileSharingEnabled: boolean;
    backupEnabled: boolean;
    syncEnabled: boolean;
}

export interface ContextMenuAction {
    key: string;
    label: string;
    icon?: React.ReactNode;
    danger?: boolean;
    divider?: boolean;
}
