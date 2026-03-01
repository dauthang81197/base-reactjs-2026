import type {
    FileItem,
    FolderTreeItem,
    FileUpload,
    StorageInfo,
    FileSettings,
} from '../features/FileManager/types';

// ── Folders ───────────────────────────────────────────────────────────────────
export const folders: FileItem[] = [
    {
        id: 'folder-design',
        name: 'Design',
        type: 'folder',
        size: 5.8 * 1024 * 1024 * 1024, // 5.8 GB
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
    {
        id: 'folder-projects',
        name: 'Projects',
        type: 'folder',
        size: 3.2 * 1024 * 1024 * 1024, // 3.2 GB
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
    {
        id: 'folder-music',
        name: 'Music',
        type: 'folder',
        size: 1.5 * 1024 * 1024 * 1024, // 1.5 GB
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
    {
        id: 'folder-pictures',
        name: 'Pictures',
        type: 'folder',
        size: 1.7 * 1024 * 1024 * 1024, // 1.7 GB
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
    {
        id: 'folder-documents',
        name: 'Documents',
        type: 'folder',
        size: 440 * 1024 * 1024, // 440 MB
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
    {
        id: 'folder-downloads',
        name: 'Downloads',
        type: 'folder',
        size: 10.1 * 1024 * 1024 * 1024, // 10.1 GB
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
];

// ── Sub-folders (Projects) ────────────────────────────────────────────────────
export const projectSubfolders: FileItem[] = [
    {
        id: 'folder-projects-01',
        name: 'Projects_01',
        type: 'folder',
        size: 800 * 1024 * 1024,
        parentId: 'folder-projects',
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
    {
        id: 'folder-projects-02',
        name: 'Projects_02',
        type: 'folder',
        size: 600 * 1024 * 1024,
        parentId: 'folder-projects',
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
    {
        id: 'folder-projects-03',
        name: 'Projects_03',
        type: 'folder',
        size: 500 * 1024 * 1024,
        parentId: 'folder-projects',
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
    {
        id: 'folder-projects-04',
        name: 'Projects_04',
        type: 'folder',
        size: 400 * 1024 * 1024,
        parentId: 'folder-projects',
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-17T04:25:00Z',
    },
];

// ── Files ─────────────────────────────────────────────────────────────────────
export const files: FileItem[] = [
    {
        id: 'file-1',
        name: 'Rocket – Admin Dashboard & UI Kit',
        type: 'design',
        extension: 'fig',
        size: 1.8 * 1024 * 1024,
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-12T08:00:00Z',
    },
    {
        id: 'file-2',
        name: 'Rocket – Admin Dashboard & UI Kit',
        type: 'design',
        extension: 'sketch',
        size: 1.5 * 1024 * 1024,
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-12T08:00:00Z',
    },
    {
        id: 'file-3',
        name: 'Arion – Admin Dashboard & UI Kit',
        type: 'design',
        extension: 'sketch',
        size: 1.2 * 1024 * 1024,
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-12T08:00:00Z',
    },
    {
        id: 'file-4',
        name: 'Project Brief',
        type: 'document',
        extension: 'docx',
        size: 1.4 * 1024 * 1024,
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-12T08:00:00Z',
    },
    {
        id: 'file-5',
        name: 'Design',
        type: 'archive',
        extension: 'zip',
        size: 1.9 * 1024 * 1024 * 1024,
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-12T08:00:00Z',
    },
    {
        id: 'file-6',
        name: 'vCard – Resume',
        type: 'design',
        extension: 'psd',
        size: 2.5 * 1024 * 1024,
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-12T08:00:00Z',
    },
    {
        id: 'file-7',
        name: 'Project Brief',
        type: 'document',
        extension: 'docx',
        size: 1.2 * 1024 * 1024,
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-12T08:00:00Z',
    },
    {
        id: 'file-8',
        name: 'Brand Styles Guide',
        type: 'pdf',
        extension: 'pdf',
        size: 4.5 * 1024 * 1024,
        parentId: null,
        ownerId: 'user-1',
        ownerName: 'ArtTemplate',
        ownerAvatar: '/avatars/user1.jpg',
        createdAt: '2020-09-10T02:25:00Z',
        modifiedAt: '2020-09-12T08:00:00Z',
    },
];

// ── Folder Tree Structure ─────────────────────────────────────────────────────
export const folderTree: FolderTreeItem[] = [
    {
        id: 'folder-design',
        name: 'Design',
        parentId: null,
    },
    {
        id: 'folder-projects',
        name: 'Projects',
        parentId: null,
        isExpanded: true,
        children: [
            { id: 'folder-projects-01', name: 'Projects_01', parentId: 'folder-projects' },
            { id: 'folder-projects-02', name: 'Projects_02', parentId: 'folder-projects' },
            { id: 'folder-projects-03', name: 'Projects_03', parentId: 'folder-projects' },
            { id: 'folder-projects-04', name: 'Projects_04', parentId: 'folder-projects' },
        ],
    },
    {
        id: 'folder-music',
        name: 'Music',
        parentId: null,
    },
    {
        id: 'folder-pictures',
        name: 'Pictures',
        parentId: null,
    },
    {
        id: 'folder-documents',
        name: 'Documents',
        parentId: null,
    },
    {
        id: 'folder-downloads',
        name: 'Downloads',
        parentId: null,
    },
];

// ── Upload Queue ──────────────────────────────────────────────────────────────
export const uploadQueue: FileUpload[] = [
    {
        id: 'upload-1',
        name: 'Rocket – Admin Dashboard & UI Kit.fig',
        size: 1.8 * 1024 * 1024,
        type: 'design',
        progress: 100,
        status: 'completed',
    },
    {
        id: 'upload-2',
        name: 'Rocket – Admin Dashboard & UI Kit.sketch',
        size: 1.5 * 1024 * 1024,
        type: 'design',
        progress: 100,
        status: 'completed',
    },
    {
        id: 'upload-3',
        name: 'Arion – Admin Dashboard & UI Kit.sketch',
        size: 1.2 * 1024 * 1024,
        type: 'design',
        progress: 100,
        status: 'completed',
    },
    {
        id: 'upload-4',
        name: 'Project Brief.docx',
        size: 1.4 * 1024 * 1024,
        type: 'document',
        progress: 0,
        status: 'failed',
        error: 'Upload Failed',
    },
    {
        id: 'upload-5',
        name: 'Design.zip',
        size: 1.8 * 1024 * 1024,
        type: 'archive',
        progress: 95,
        status: 'uploading',
    },
    {
        id: 'upload-6',
        name: 'vCard – Resume.psd',
        size: 2.5 * 1024 * 1024,
        type: 'design',
        progress: 75,
        status: 'uploading',
    },
    {
        id: 'upload-7',
        name: 'Brand Styles Guide.pdf',
        size: 4.5 * 1024 * 1024,
        type: 'pdf',
        progress: 50,
        status: 'uploading',
    },
];

// ── Storage Info ──────────────────────────────────────────────────────────────
export const storageInfo: StorageInfo = {
    used: 70 * 1024 * 1024 * 1024, // 70 GB
    total: 100 * 1024 * 1024 * 1024, // 100 GB
    percentage: 70,
};

// ── Default Settings ──────────────────────────────────────────────────────────
export const defaultFileSettings: FileSettings = {
    fileSharingEnabled: true,
    backupEnabled: false,
    syncEnabled: false,
};

// ── Helper Functions ──────────────────────────────────────────────────────────
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const getFileIcon = (type: string, extension?: string): string => {
    const iconMap: Record<string, string> = {
        folder: '📁',
        image: '🖼️',
        video: '🎬',
        audio: '🎵',
        document: '📝',
        spreadsheet: '📊',
        presentation: '📽️',
        pdf: '📕',
        archive: '📦',
        code: '💻',
        design: '🎨',
        unknown: '📄',
    };

    // Extension-specific icons
    if (extension) {
        const extMap: Record<string, string> = {
            fig: '🎨',
            sketch: '💎',
            psd: '🎨',
            docx: '📝',
            doc: '📝',
            pdf: '📕',
            zip: '📦',
            rar: '📦',
        };
        if (extMap[extension]) return extMap[extension];
    }

    return iconMap[type] || iconMap.unknown;
};

export const getFileById = (id: string): FileItem | undefined => {
    return [...folders, ...projectSubfolders, ...files].find((f) => f.id === id);
};

export const getFolderContents = (
    folderId: string | null
): { folders: FileItem[]; files: FileItem[] } => {
    const folderItems = [...folders, ...projectSubfolders].filter(
        (f) => f.parentId === folderId
    );
    const fileItems = files.filter((f) => f.parentId === folderId);
    return { folders: folderItems, files: fileItems };
};
