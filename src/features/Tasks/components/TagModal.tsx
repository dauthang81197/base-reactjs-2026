import React, { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import { Badge } from '../../../design-system/components/atoms/Badge';
import { useTaskStore } from '../../../store/taskStore';
import type { TaskTag } from '../types';
import { DEFAULT_TAG_COLORS } from '../types';

interface TagModalProps {
  open: boolean;
  onClose: () => void;
  tag?: TaskTag | null;
}

export const TagModal: React.FC<TagModalProps> = ({ open, onClose, tag }) => {
  const { addTag, updateTag } = useTaskStore();
  const [name, setName] = useState('');
  const [color, setColor] = useState<string>('brand');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(tag);

  useEffect(() => {
    if (tag) {
      setName(tag.name);
      setColor(tag.color);
    } else {
      setName('');
      setColor('brand');
    }
    setError('');
    setSubmitting(false);
  }, [tag, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Tag name is required');
      return;
    }

    setSubmitting(true);
    try {
      if (isEdit && tag) {
        await updateTag(tag.id, { name: name.trim(), color });
      } else {
        await addTag({ name: name.trim(), color });
      }
      onClose();
    } catch {
      // Error handled in store
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm mx-4 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {isEdit ? 'Edit Tag' : 'Create Tag'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <Input
            label="Tag Name"
            required
            placeholder="e.g., Work, Study, Personal"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            errorText={error}
          />

          {/* Color Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-label-md font-medium text-neutral-700 dark:text-neutral-300">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_TAG_COLORS.map((c) => (
                <button key={c} type="button" onClick={() => setColor(c)}>
                  <Badge
                    variant="solid"
                    color={c as 'brand'}
                    size="md"
                    className={`cursor-pointer transition-all ${
                      color === c ? 'ring-2 ring-offset-2 ring-brand-primary dark:ring-offset-neutral-900' : ''
                    }`}
                  >
                    {c}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-1.5">
            <label className="text-label-md font-medium text-neutral-700 dark:text-neutral-300">
              Preview
            </label>
            <div>
              <Badge variant="subtle" color={color as 'brand'} size="md">
                {name || 'Tag Name'}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <Button variant="outline" size="md" type="button" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={submitting}
              leftIcon={submitting ? <Loader size={16} className="animate-spin" /> : undefined}
            >
              {submitting ? 'Saving...' : isEdit ? 'Update Tag' : 'Create Tag'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagModal;

