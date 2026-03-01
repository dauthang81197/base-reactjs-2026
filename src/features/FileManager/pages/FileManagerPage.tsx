import * as React from 'react';
import { useState, useCallback } from 'react';
import {
    Search,
    Upload,
    Grid3X3,
    List,
    Folder,
    ChevronRight,
    ChevronDown,
    MoreVertical,
    Share2,
    Link2,
    Download,
    Edit2,
    Copy,
    Move,
    Trash2,
    HardDrive,
    Check,
    X,
    RefreshCw,
    Plus,
} from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Avatar } from '../../../design-system/components/atoms/Avatar';
import {
    folders,
    files,
    folderTree,
    storageInfo,
    defaultFileSettings,
    uploadQueue as initialUploadQueue,
    formatFileSize,
    getFileIcon,
} from '../../../data/fileManagerMockData';
import type {
    FileItem,
    FolderTreeItem,
    ViewMode,
    FileUpload,
    FileSettings,
} from '../types';
import { formatDate } from '../../../utils/formatters';

// ── Folder Tree Item Component ────────────────────────────────────────────────
interface FolderTreeItemProps {
    item: FolderTreeItem;
    selectedId: string | null;
    onSelect: (id: string) => void;
    level?: number;
}

const FolderTreeItemComponent: React.FC<FolderTreeItemProps> = ({
    item,
    selectedId,
    onSelect,
    level = 0,
}) => {
    const [expanded, setExpanded] = useState(item.isExpanded ?? false);
    const hasChildren = item.children && item.children.length > 0;
    const isSelected = selectedId === item.id;

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    onSelect(item.id);
                    if (hasChildren) setExpanded(!expanded);
                }}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-left text-sm transition-colors ${isSelected
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
                {hasChildren ? (
                    expanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-neutral-400" />
                    ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400" />
                    )
                ) : (
                    <span className="w-4" />
                )}
                <Folder className="h-4 w-4 shrink-0 text-amber-500" />
                <span className="truncate">{item.name}</span>
            </button>
            {hasChildren && expanded && (
                <div>
                    {item.children!.map((child) => (
                        <FolderTreeItemComponent
                            key={child.id}
                            item={child}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// ── Folder Card Component (Grid View) ─────────────────────────────────────────
interface FolderCardProps {
    folder: FileItem;
    isSelected: boolean;
    onSelect: () => void;
    onContextMenu: (e: React.MouseEvent) => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
    folder,
    isSelected,
    onSelect,
    onContextMenu,
}) => (
    <div
        onClick={onSelect}
        onContextMenu={onContextMenu}
        className={`group relative flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all ${isSelected
                ? 'bg-amber-50 ring-2 ring-amber-400 dark:bg-amber-900/20'
                : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
            }`}
    >
        <div className="text-6xl mb-2">📁</div>
        <p className="text-sm font-medium text-neutral-900 dark:text-white text-center truncate w-full">
            {folder.name}
        </p>
        <p className="text-xs text-neutral-500">{formatFileSize(folder.size)}</p>
    </div>
);

// ── File Card Component (Grid View) ───────────────────────────────────────────
interface FileCardProps {
    file: FileItem;
    isSelected: boolean;
    onSelect: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, isSelected, onSelect }) => (
    <div
        onClick={onSelect}
        className={`group flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all ${isSelected
                ? 'bg-amber-50 ring-2 ring-amber-400 dark:bg-amber-900/20'
                : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
            }`}
    >
        <div className="text-5xl mb-2">{getFileIcon(file.type, file.extension)}</div>
        <p className="text-sm font-medium text-neutral-900 dark:text-white text-center truncate w-full">
            {file.name}
        </p>
        <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
    </div>
);

// ── File Row Component (List View) ────────────────────────────────────────────
interface FileRowProps {
    item: FileItem;
    isSelected: boolean;
    onSelect: () => void;
    onContextMenu?: (e: React.MouseEvent) => void;
}

const FileRow: React.FC<FileRowProps> = ({
    item,
    isSelected,
    onSelect,
    onContextMenu,
}) => (
    <tr
        onClick={onSelect}
        onContextMenu={onContextMenu}
        className={`cursor-pointer transition-colors ${isSelected
                ? 'bg-amber-50 dark:bg-amber-900/20'
                : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
            }`}
    >
        <td className="py-3 px-4">
            <div className="flex items-center gap-3">
                {isSelected && (
                    <div className="h-5 w-5 rounded bg-green-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                    </div>
                )}
                {!isSelected && item.type === 'folder' && (
                    <Folder className="h-5 w-5 text-amber-500" />
                )}
                {!isSelected && item.type !== 'folder' && (
                    <span className="text-lg">{getFileIcon(item.type, item.extension)}</span>
                )}
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    {item.name}
                </span>
            </div>
        </td>
        <td className="py-3 px-4 text-sm text-neutral-500">
            {formatDate(item.modifiedAt, { month: '2-digit', day: '2-digit', year: '2-digit' })}
        </td>
        <td className="py-3 px-4 text-sm text-neutral-500">{formatFileSize(item.size)}</td>
        <td className="py-3 px-4">
            <Avatar size="sm" name={item.ownerName} src={item.ownerAvatar} />
        </td>
        <td className="py-3 px-4">
            <button className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">
                <MoreVertical className="h-4 w-4 text-neutral-400" />
            </button>
        </td>
    </tr>
);

// ── Context Menu Component ────────────────────────────────────────────────────
interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onAction: (action: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onAction }) => {
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const menuItems = [
        { key: 'share', label: 'Share', icon: <Share2 className="h-4 w-4" /> },
        { key: 'sharing-link', label: 'Sharing Link', icon: <Link2 className="h-4 w-4" /> },
        { key: 'download', label: 'Download', icon: <Download className="h-4 w-4" /> },
        { key: 'rename', label: 'Rename', icon: <Edit2 className="h-4 w-4" /> },
        { key: 'copy', label: 'Copy', icon: <Copy className="h-4 w-4" /> },
        { key: 'move', label: 'Move', icon: <Move className="h-4 w-4" /> },
        { key: 'divider', label: '', icon: null },
        { key: 'delete', label: 'Delete', icon: <Trash2 className="h-4 w-4" />, danger: true },
    ];

    return (
        <div
            ref={menuRef}
            className="fixed z-50 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 min-w-[180px]"
            style={{ left: x, top: y }}
        >
            {menuItems.map((item) =>
                item.key === 'divider' ? (
                    <div
                        key={item.key}
                        className="h-px bg-neutral-200 dark:bg-neutral-700 my-1"
                    />
                ) : (
                    <button
                        key={item.key}
                        onClick={() => {
                            onAction(item.key);
                            onClose();
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${item.danger
                                ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                )
            )}
        </div>
    );
};

// ── Details Panel Component ───────────────────────────────────────────────────
interface DetailsPanelProps {
    selectedItem: FileItem | null;
    settings: FileSettings;
    onSettingsChange: (key: keyof FileSettings, value: boolean) => void;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({
    selectedItem,
    settings,
    onSettingsChange,
}) => {
    if (!selectedItem) {
        return (
            <div className="w-64 shrink-0 p-4 text-center text-neutral-500">
                <p>Select a file or folder to view details</p>
            </div>
        );
    }

    return (
        <div className="w-64 shrink-0 p-4 border-l border-neutral-200 dark:border-neutral-700">
            {/* Preview */}
            <div className="flex flex-col items-center mb-6">
                <div className="text-7xl mb-3">
                    {selectedItem.type === 'folder'
                        ? '📁'
                        : getFileIcon(selectedItem.type, selectedItem.extension)}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white text-center">
                    {selectedItem.name}
                </h3>
            </div>

            {/* Info */}
            <div className="mb-6">
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                    Info
                </h4>
                <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <dt className="text-neutral-500">Type</dt>
                        <dd className="text-neutral-900 dark:text-white capitalize">
                            {selectedItem.type}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-neutral-500">Size</dt>
                        <dd className="text-neutral-900 dark:text-white">
                            {formatFileSize(selectedItem.size)}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-neutral-500">Owner</dt>
                        <dd className="text-neutral-900 dark:text-white">{selectedItem.ownerName}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-neutral-500">Location</dt>
                        <dd className="text-amber-600">My Files</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-neutral-500">Modified</dt>
                        <dd className="text-neutral-900 dark:text-white">
                            {formatDate(selectedItem.modifiedAt)}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-neutral-500">Created</dt>
                        <dd className="text-neutral-900 dark:text-white">
                            {formatDate(selectedItem.createdAt)}
                        </dd>
                    </div>
                </dl>
            </div>

            {/* Settings */}
            <div>
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                    Settings
                </h4>
                <div className="space-y-3">
                    {/* File Sharing Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                            File Sharing
                        </span>
                        <button
                            onClick={() =>
                                onSettingsChange('fileSharingEnabled', !settings.fileSharingEnabled)
                            }
                            className={`relative w-10 h-6 rounded-full transition-colors ${settings.fileSharingEnabled ? 'bg-green-500' : 'bg-neutral-300'
                                }`}
                        >
                            <span
                                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${settings.fileSharingEnabled ? 'translate-x-4' : ''
                                    }`}
                            />
                        </button>
                    </div>
                    {/* Backup Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">Backup</span>
                        <button
                            onClick={() => onSettingsChange('backupEnabled', !settings.backupEnabled)}
                            className={`relative w-10 h-6 rounded-full transition-colors ${settings.backupEnabled ? 'bg-green-500' : 'bg-neutral-300'
                                }`}
                        >
                            <span
                                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${settings.backupEnabled ? 'translate-x-4' : ''
                                    }`}
                            />
                        </button>
                    </div>
                    {/* Sync Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">Sync</span>
                        <button
                            onClick={() => onSettingsChange('syncEnabled', !settings.syncEnabled)}
                            className={`relative w-10 h-6 rounded-full transition-colors ${settings.syncEnabled ? 'bg-green-500' : 'bg-neutral-300'
                                }`}
                        >
                            <span
                                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${settings.syncEnabled ? 'translate-x-4' : ''
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Upload Panel Component ────────────────────────────────────────────────────
interface UploadPanelProps {
    uploads: FileUpload[];
    variant: 'expanded' | 'collapsed';
    onToggle: () => void;
    onClose: () => void;
    onRetry: (id: string) => void;
}

const UploadPanel: React.FC<UploadPanelProps> = ({
    uploads,
    variant,
    onToggle,
    onClose,
    onRetry,
}) => {
    const completedCount = uploads.filter((u) => u.status === 'completed').length;
    const totalCount = uploads.length;
    const uploadingCount = uploads.filter((u) => u.status === 'uploading').length;
    const overallProgress = Math.round(
        uploads.reduce((acc, u) => acc + u.progress, 0) / totalCount
    );

    return (
        <div
            className={`fixed bottom-4 right-4 z-40 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 w-80 overflow-hidden ${variant === 'collapsed' ? 'max-h-14' : ''
                }`}
        >
            {/* Header */}
            <div
                className={`flex items-center justify-between px-4 py-3 cursor-pointer ${variant === 'collapsed'
                        ? 'bg-green-600 text-white'
                        : 'border-b border-neutral-200 dark:border-neutral-700'
                    }`}
                onClick={onToggle}
            >
                <div className="flex items-center gap-2">
                    <span className="font-medium">
                        Uploading {totalCount} files
                    </span>
                    {variant === 'expanded' && (
                        <span className="text-sm text-neutral-500">
                            {overallProgress}% • {uploadingCount > 0 ? '2 minutes left' : 'Complete'}
                        </span>
                    )}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                    <MoreVertical className="h-4 w-4" />
                </button>
            </div>

            {/* File List */}
            {variant === 'expanded' && (
                <div className="max-h-80 overflow-y-auto">
                    {uploads.map((upload) => (
                        <div
                            key={upload.id}
                            className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                        >
                            <span className="text-2xl shrink-0">
                                {getFileIcon(upload.type)}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                                    {upload.name}
                                </p>
                                {upload.status === 'failed' ? (
                                    <p className="text-xs text-red-500">{upload.error}</p>
                                ) : (
                                    <p className="text-xs text-neutral-500">{formatFileSize(upload.size)}</p>
                                )}
                                {upload.status === 'uploading' && (
                                    <div className="mt-1 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full transition-all"
                                            style={{ width: `${upload.progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="shrink-0">
                                {upload.status === 'completed' && (
                                    <Check className="h-5 w-5 text-green-500" />
                                )}
                                {upload.status === 'failed' && (
                                    <button
                                        onClick={() => onRetry(upload.id)}
                                        className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                    >
                                        <RefreshCw className="h-4 w-4 text-neutral-500" />
                                    </button>
                                )}
                                {upload.status === 'uploading' && (
                                    <span className="text-sm font-medium text-green-600">
                                        {upload.progress}%
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ── Main File Manager Page ────────────────────────────────────────────────────
const FileManagerPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [settings, setSettings] = useState<FileSettings>(defaultFileSettings);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [showUploadPanel, setShowUploadPanel] = useState(false);
    const [uploadVariant, setUploadVariant] = useState<'expanded' | 'collapsed'>('expanded');
    const [uploads] = useState<FileUpload[]>(initialUploadQueue);

    // Get selected item for details panel
    const selectedItem = selectedItemId
        ? [...folders, ...files].find((f) => f.id === selectedItemId) ?? null
        : null;

    // Filter items based on search
    const filteredFolders = folders.filter((f) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredFiles = files.filter((f) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleContextMenu = useCallback(
        (e: React.MouseEvent, itemId: string) => {
            e.preventDefault();
            setSelectedItemId(itemId);
            setContextMenu({ x: e.clientX, y: e.clientY });
        },
        []
    );

    const handleContextAction = (action: string) => {
        console.log('Context action:', action, 'on item:', selectedItemId);
        // Handle actions here
    };

    const handleSettingsChange = (key: keyof FileSettings, value: boolean) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex h-[calc(100vh-120px)] gap-0">
            {/* Left Sidebar - Folder Tree */}
            <div className="w-52 shrink-0 border-r border-neutral-200 dark:border-neutral-700 flex flex-col">
                <div className="p-3">
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                        Folders
                    </h3>
                    <div className="space-y-0.5">
                        {folderTree.map((folder) => (
                            <FolderTreeItemComponent
                                key={folder.id}
                                item={folder}
                                selectedId={selectedFolderId}
                                onSelect={setSelectedFolderId}
                            />
                        ))}
                    </div>
                </div>

                {/* Trash */}
                <div className="px-3 mt-auto">
                    <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Trash2 className="h-4 w-4 text-neutral-400" />
                        <span>Trash</span>
                    </button>
                </div>

                {/* Storage */}
                <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <HardDrive className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">Storage</span>
                        <span className="ml-auto text-sm font-medium text-neutral-900 dark:text-white">
                            {storageInfo.percentage}%
                        </span>
                    </div>
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${storageInfo.percentage}%`,
                                background: 'linear-gradient(90deg, #FCD34D 0%, #10B981 100%)',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Toolbar */}
                <div className="flex items-center gap-4 p-4 border-b border-neutral-200 dark:border-neutral-700">
                    {/* Search */}
                    <div className="flex-1 max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                        />
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 ${viewMode === 'grid'
                                    ? 'bg-neutral-100 dark:bg-neutral-700 text-amber-600'
                                    : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                }`}
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 ${viewMode === 'list'
                                    ? 'bg-neutral-100 dark:bg-neutral-700 text-amber-600'
                                    : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                }`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Upload Button */}
                    <Button
                        variant="filled"
                        size="sm"
                        leftIcon={<Upload className="h-4 w-4" />}
                        onClick={() => setShowUploadPanel(true)}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Upload
                    </Button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-4">
                    {viewMode === 'grid' ? (
                        <>
                            {/* Folders Section */}
                            <section className="mb-8">
                                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                                    Folders
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                    {filteredFolders.map((folder) => (
                                        <FolderCard
                                            key={folder.id}
                                            folder={folder}
                                            isSelected={selectedItemId === folder.id}
                                            onSelect={() => setSelectedItemId(folder.id)}
                                            onContextMenu={(e) => handleContextMenu(e, folder.id)}
                                        />
                                    ))}
                                    {/* Add Folder Card */}
                                    <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors">
                                        <Plus className="h-8 w-8 text-neutral-400 mb-2" />
                                        <p className="text-sm text-neutral-500">Add Folder</p>
                                    </div>
                                </div>
                            </section>

                            {/* Files Section */}
                            <section>
                                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                                    Files
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                    {filteredFiles.map((file) => (
                                        <FileCard
                                            key={file.id}
                                            file={file}
                                            isSelected={selectedItemId === file.id}
                                            onSelect={() => setSelectedItemId(file.id)}
                                        />
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : (
                        /* List View */
                        <Card>
                            <CardBody className="p-0">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                            <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                                Size
                                            </th>
                                            <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                                Owner
                                            </th>
                                            <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider w-12"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                        {/* Folders first */}
                                        {filteredFolders.map((folder) => (
                                            <FileRow
                                                key={folder.id}
                                                item={folder}
                                                isSelected={selectedItemId === folder.id}
                                                onSelect={() => setSelectedItemId(folder.id)}
                                                onContextMenu={(e) => handleContextMenu(e, folder.id)}
                                            />
                                        ))}
                                        {/* Then files */}
                                        {filteredFiles.map((file) => (
                                            <FileRow
                                                key={file.id}
                                                item={file}
                                                isSelected={selectedItemId === file.id}
                                                onSelect={() => setSelectedItemId(file.id)}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </div>

            {/* Right Sidebar - Details Panel */}
            <DetailsPanel
                selectedItem={selectedItem}
                settings={settings}
                onSettingsChange={handleSettingsChange}
            />

            {/* Context Menu */}
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={() => setContextMenu(null)}
                    onAction={handleContextAction}
                />
            )}

            {/* Upload Panel */}
            {showUploadPanel && (
                <UploadPanel
                    uploads={uploads}
                    variant={uploadVariant}
                    onToggle={() =>
                        setUploadVariant((v) => (v === 'expanded' ? 'collapsed' : 'expanded'))
                    }
                    onClose={() => setShowUploadPanel(false)}
                    onRetry={(id) => console.log('Retry upload:', id)}
                />
            )}
        </div>
    );
};

export default FileManagerPage;
