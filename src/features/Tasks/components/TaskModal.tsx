import React, { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import { Dropdown } from '../../../design-system/components/molecules/Dropdown';
import { Badge } from '../../../design-system/components/atoms/Badge';
import { cn } from '../../../design-system/foundation/cn';
import { useTaskStore } from '../../../store/taskStore';
import type { Task, TaskStatus, TaskPriority } from '../types';
import { TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from '../types';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null; // null = create mode
}

const emptyForm = {
  title: '',
  description: '',
  status: 'todo' as TaskStatus,
  priority: 'medium' as TaskPriority,
  dueDate: new Date().toISOString().split('T')[0],
  tags: [] as string[],
  estimatedTime: 30,
};

export const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, task }) => {
  const { addTask, updateTask, tags } = useTaskStore();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(task);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        tags: [...task.tags],
        estimatedTime: task.estimatedTime,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setSubmitting(false);
  }, [task, open]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.dueDate) errs.dueDate = 'Due date is required';
    if (form.estimatedTime < 0) errs.estimatedTime = 'Must be positive';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (isEdit && task) {
        await updateTask(task.id, {
          title: form.title,
          description: form.description,
          status: form.status,
          priority: form.priority,
          dueDate: form.dueDate,
          estimatedMinutes: form.estimatedTime,
          tagIds: form.tags,
        });
      } else {
        await addTask({
          title: form.title,
          description: form.description,
          status: form.status,
          priority: form.priority,
          dueDate: form.dueDate,
          estimatedMinutes: form.estimatedTime,
          tagIds: form.tags,
        });
      }
      onClose();
    } catch {
      // Error is handled in store
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {isEdit ? 'Edit Task' : 'Create Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {/* Title */}
          <Input
            label="Title"
            required
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            errorText={errors.title}
          />

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-label-md font-medium text-neutral-700 dark:text-neutral-300">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Add a description..."
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className={cn(
                'w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-transparent px-3 py-2',
                'text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400',
                'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent',
                'resize-none'
              )}
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Dropdown
              label="Status"
              options={TASK_STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              value={form.status}
              onChange={(v) => setForm((p) => ({ ...p, status: v as TaskStatus }))}
            />
            <Dropdown
              label="Priority"
              options={TASK_PRIORITY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              value={form.priority}
              onChange={(v) => setForm((p) => ({ ...p, priority: v as TaskPriority }))}
            />
          </div>

          {/* Due Date & Estimated Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              required
              value={form.dueDate}
              onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
              errorText={errors.dueDate}
            />
            <Input
              label="Estimated Time (minutes)"
              type="number"
              min={0}
              value={String(form.estimatedTime)}
              onChange={(e) =>
                setForm((p) => ({ ...p, estimatedTime: parseInt(e.target.value) || 0 }))
              }
              errorText={errors.estimatedTime}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-label-md font-medium text-neutral-700 dark:text-neutral-300">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const selected = form.tags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                  >
                    <Badge
                      variant={selected ? 'solid' : 'outline'}
                      color={tag.color as 'brand'}
                      size="md"
                      className="cursor-pointer"
                    >
                      {tag.name}
                    </Badge>
                  </button>
                );
              })}
              {tags.length === 0 && (
                <span className="text-sm text-neutral-400">No tags available. Create tags first.</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <Button variant="outline" size="md" onClick={onClose} type="button" disabled={submitting}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={submitting}
              leftIcon={submitting ? <Loader size={16} className="animate-spin" /> : undefined}
            >
              {submitting ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

