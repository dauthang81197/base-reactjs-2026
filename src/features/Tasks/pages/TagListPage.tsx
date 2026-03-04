import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader, AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Badge } from '../../../design-system/components/atoms/Badge';
import { useTaskStore } from '../../../store/taskStore';
import { TagModal } from '../components/TagModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import type { TaskTag } from '../types';

const TagListPage: React.FC = () => {
  const { tags, loading, error, fetchTags, deleteTag } = useTaskStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<TaskTag | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TaskTag | null>(null);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleCreate = () => {
    setEditingTag(null);
    setModalOpen(true);
  };

  const handleEdit = (tag: TaskTag) => {
    setEditingTag(tag);
    setModalOpen(true);
  };

  const handleDelete = (tag: TaskTag) => {
    setDeleteTarget(tag);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteTag(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    fetchTags();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Tags</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Organize your tasks with tags. {tags.length} tag{tags.length !== 1 ? 's' : ''} total.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fetchTags()}
            disabled={loading}
            aria-label="Refresh"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </Button>
          <Button variant="primary" size="md" leftIcon={<Plus size={18} />} onClick={handleCreate}>
            New Tag
          </Button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && tags.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <Loader size={32} className="animate-spin text-neutral-400" />
        </div>
      ) : (
        <>
          {/* Tags Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map((tag) => {
              const count = tag.taskCount ?? 0;
              return (
                <Card key={tag.id} variant="outlined" className="group">
                  <CardBody className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                        <Badge variant="subtle" color={tag.color as 'brand'} size="lg">
                          {tag.name}
                        </Badge>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {count} task{count !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(tag)}
                          aria-label="Edit tag"
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(tag)}
                          aria-label="Delete tag"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}

            {tags.length === 0 && (
              <div className="col-span-full">
                <Card variant="outlined">
                  <CardBody className="flex flex-col items-center justify-center py-16 text-neutral-400">
                    <p className="text-lg font-medium">No tags yet</p>
                    <p className="text-sm mt-1">Create your first tag to start organizing tasks.</p>
                    <Button variant="primary" size="md" leftIcon={<Plus size={18} />} onClick={handleCreate} className="mt-4">
                      Create Tag
                    </Button>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      <TagModal open={modalOpen} onClose={handleModalClose} tag={editingTag} />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Tag"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? It will be removed from all associated tasks.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default TagListPage;

