import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Clock, Calendar, Flame, CheckCircle2, Pencil, Trash2, MoreVertical, Loader, AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Badge } from '../../../design-system/components/atoms/Badge';
import { useTaskStore } from '../../../store/taskStore';
import { TaskModal } from '../components/TaskModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import type { Task, TaskStatus } from '../types';
import { STATUS_COLOR_MAP, PRIORITY_COLOR_MAP } from '../types';

const formatMinutes = (min: number) => {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const TodayTasksPage: React.FC = () => {
  const { todayData, tags, loading, error, fetchTodayTasks, fetchTags, updateTask, deleteTask } = useTaskStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchTodayTasks();
    fetchTags();
  }, [fetchTodayTasks, fetchTags]);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const todayTasks = todayData?.tasks || [];
  const todayStats = todayData?.stats || { total: 0, completed: 0, remainingMinutes: 0, totalMinutes: 0 };

  const getTagById = (tagId: string) => tags.find((t) => t.id === tagId);

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

  const handleStatusToggle = async (task: Task) => {
    const nextStatus: Record<TaskStatus, TaskStatus> = {
      'todo': 'in-progress',
      'in-progress': 'done',
      'done': 'todo',
      'overdue': 'in-progress',
    };
    await updateTask(task.id, { status: nextStatus[task.status] });
    // Refresh today tasks after status change
    fetchTodayTasks();
  };

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    fetchTodayTasks();
  }, [fetchTodayTasks]);

  if (loading && !todayData) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size={32} className="animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Today's Tasks</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{dateStr}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fetchTodayTasks()}
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="outlined">
          <CardBody className="flex items-center gap-4 p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{todayStats.total}</p>
              <p className="text-xs text-neutral-500">Total Tasks</p>
            </div>
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardBody className="flex items-center gap-4 p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20">
              <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {todayStats.completed}/{todayStats.total}
              </p>
              <p className="text-xs text-neutral-500">Completed</p>
            </div>
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardBody className="flex items-center gap-4 p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <Clock size={20} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {formatMinutes(todayStats.remainingMinutes)}
              </p>
              <p className="text-xs text-neutral-500">Remaining ({formatMinutes(todayStats.totalMinutes)} total)</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Task List */}
      <Card variant="elevated">
        <CardHeader divider>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
            Schedule for Today
          </h2>
        </CardHeader>
        <CardBody className="p-0">
          {todayTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
              <CheckCircle2 size={48} className="mb-3 text-neutral-300" />
              <p className="text-lg font-medium">No tasks for today</p>
              <p className="text-sm mt-1">Enjoy your free day or add new tasks.</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 px-5 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  {/* Toggle */}
                  <button
                    type="button"
                    className="mt-0.5 shrink-0"
                    onClick={() => handleStatusToggle(task)}
                    title="Toggle status"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.status === 'done'
                          ? 'bg-green-500 border-green-500'
                          : task.status === 'overdue'
                          ? 'border-red-400'
                          : task.status === 'in-progress'
                          ? 'border-blue-400'
                          : 'border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      {task.status === 'done' && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        task.status === 'done'
                          ? 'line-through text-neutral-400'
                          : 'text-neutral-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <Badge variant="subtle" color={STATUS_COLOR_MAP[task.status] as 'brand'} size="sm">
                        {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </Badge>
                      <Badge variant="subtle" color={PRIORITY_COLOR_MAP[task.priority] as 'brand'} size="sm">
                        <Flame size={12} />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                      {task.estimatedTime > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                          <Clock size={12} /> {formatMinutes(task.estimatedTime)}
                        </span>
                      )}
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

                  {/* Actions */}
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
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onConfirm={async () => { if (deleteTarget) { await deleteTask(deleteTarget.id); setDeleteTarget(null); fetchTodayTasks(); } }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default TodayTasksPage;

