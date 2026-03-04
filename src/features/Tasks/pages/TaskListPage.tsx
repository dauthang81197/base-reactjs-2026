import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Clock,
  Calendar,
  Flame,
  MoreVertical,
  Loader,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import { Badge } from '../../../design-system/components/atoms/Badge';
import { Dropdown } from '../../../design-system/components/molecules/Dropdown';
import { useTaskStore } from '../../../store/taskStore';
import { TaskModal } from '../components/TaskModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import type { Task, TaskStatus, TaskPriority } from '../types';
import {
  TASK_STATUS_OPTIONS,
  TASK_PRIORITY_OPTIONS,
  STATUS_COLOR_MAP,
  PRIORITY_COLOR_MAP,
} from '../types';

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatMinutes = (min: number) => {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// ── Page Component ────────────────────────────────────────────────────────────
const TaskListPage: React.FC = () => {
  const {
    tasks,
    tags,
    filters,
    loading,
    error,
    totalTasks,
    setFilters,
    resetFilters,
    fetchTasks,
    fetchTags,
    deleteTask,
    updateTask,
  } = useTaskStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [searchDebounce, setSearchDebounce] = useState(filters.search || '');
  console.log(tasks, "adsflkj")
  // Fetch tasks and tags on mount
  useEffect(() => {
    fetchTasks();
    fetchTags();
  }, [fetchTasks, fetchTags]);

  // Re-fetch when filters change (except search, which is debounced)
  useEffect(() => {
    fetchTasks();
  }, [filters.status, filters.priority, filters.tagId, fetchTasks]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: searchDebounce });
      fetchTasks({ ...filters, search: searchDebounce });
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce]);

  const handleCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = (task: Task) => {
    setDeleteTarget(task);
    setOpenMenuId(null);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteTask(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleStatusToggle = async (task: Task) => {
    const nextStatus: Record<TaskStatus, TaskStatus> = {
      'TODO': 'IN_PROGRESS',
      'IN_PROGRESS': 'DONE',
      'DONE': 'TODO',
      'OVERDUE': 'IN_PROGRESS',
    };
    await updateTask(task.id, { status: nextStatus[task.status] });
  };

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    // Refresh after create/edit
    fetchTasks();
  }, [fetchTasks]);

  const getTagById = (tagId: string) => tags.find((t) => t.id === tagId);

  const statusFilterOptions = [
    { value: 'all', label: 'All Status' },
    ...TASK_STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  ];

  const priorityFilterOptions = [
    { value: 'all', label: 'All Priority' },
    ...TASK_PRIORITY_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  ];

  const tagFilterOptions = [
    { value: 'all', label: 'All Tags' },
    ...tags.map((t) => ({ value: t.id, label: t.name })),
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Tasks</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your tasks efficiently. {totalTasks} task{totalTasks !== 1 ? 's' : ''} found.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fetchTasks()}
            disabled={loading}
            aria-label="Refresh"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </Button>
          <Button variant="primary" size="md" leftIcon={<Plus size={18} />} onClick={handleCreate}>
            New Task
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

      {/* Filters */}
      <Card variant="outlined">
        <CardBody className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Input
              placeholder="Search tasks..."
              value={searchDebounce}
              onChange={(e) => setSearchDebounce(e.target.value)}
              leftAddon={<Search size={16} />}
            />
            <Dropdown
              options={statusFilterOptions}
              value={filters.status || 'all'}
              onChange={(v) => setFilters({ status: v as TaskStatus | 'all' })}
              placeholder="Filter by status"
            />
            <Dropdown
              options={priorityFilterOptions}
              value={filters.priority || 'all'}
              onChange={(v) => setFilters({ priority: v as TaskPriority | 'all' })}
              placeholder="Filter by priority"
            />
            <Dropdown
              options={tagFilterOptions}
              value={filters.tagId || 'all'}
              onChange={(v) => setFilters({ tagId: v })}
              placeholder="Filter by tag"
            />
          </div>
          {(filters.status !== 'all' || filters.priority !== 'all' || filters.tagId !== 'all' || filters.search) && (
            <div className="mt-3 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => { resetFilters(); setSearchDebounce(''); fetchTasks(); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Task List */}
      <Card variant="elevated">
        <CardHeader divider>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
              Task List
            </h2>
            <span className="text-sm text-neutral-500">{tasks?.length} items</span>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {loading && tasks?.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <Loader size={32} className="animate-spin text-neutral-400" />
            </div>
          ) : tasks?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
              <p className="text-lg font-medium">No tasks found</p>
              <p className="text-sm mt-1">Try adjusting your filters or create a new task.</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {tasks?.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 px-5 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  {/* Status checkbox */}
                  <button
                    type="button"
                    className="mt-0.5 shrink-0"
                    onClick={() => handleStatusToggle(task)}
                    title="Toggle status"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.status === 'DONE'
                        ? 'bg-green-500 border-green-500'
                        : task.status === 'OVERDUE'
                          ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                          : task.status === 'IN_PROGRESS'
                            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-neutral-300 dark:border-neutral-600'
                        }`}
                    >
                      {task.status === 'DONE' && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm font-medium ${task.status === 'DONE'
                          ? 'line-through text-neutral-400'
                          : 'text-neutral-900 dark:text-white'
                          }`}
                      >
                        {task.title}
                      </p>

                      {/* Actions menu */}
                      <div className="relative shrink-0">
                        <button
                          type="button"
                          onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}
                          className="p-1 rounded-md text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openMenuId === task.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                            <div className="absolute right-0 z-20 mt-1 w-36 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 py-1">
                              <button
                                type="button"
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                onClick={() => handleEdit(task)}
                              >
                                <Pencil size={14} /> Edit
                              </button>
                              <button
                                type="button"
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => handleDelete(task)}
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                        {task.description}
                      </p>
                    )}

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="subtle" color={STATUS_COLOR_MAP[task.status] as 'brand'} size="sm">
                        {task.status === 'IN_PROGRESS' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </Badge>

                      <Badge variant="subtle" color={PRIORITY_COLOR_MAP[task.priority] as 'brand'} size="sm">
                        <Flame size={12} />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>

                      <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                        <Calendar size={12} />
                        {formatDate(task.dueDate)}
                      </span>

                      {task.estimatedTime > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                          <Clock size={12} />
                          {formatMinutes(task.estimatedTime)}
                        </span>
                      )}

                      {/* Tags */}
                      {task.tags.map((tagId) => {
                        const tag = getTagById(tagId);
                        if (!tag) return null;
                        return (
                          <Badge key={tagId} variant="outline" color={tag.color as 'brand'} size="sm">
                            {tag.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modals */}
      <TaskModal open={modalOpen} onClose={handleModalClose} task={editingTask} />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default TaskListPage;

