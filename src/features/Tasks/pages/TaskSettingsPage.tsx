import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Loader, AlertTriangle } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import { Dropdown } from '../../../design-system/components/molecules/Dropdown';
import { useTaskStore } from '../../../store/taskStore';
import type { TaskPriority, TaskSettings } from '../types';
import { TASK_PRIORITY_OPTIONS } from '../types';

const DEFAULT_SETTINGS: TaskSettings = {
  defaultView: 'list',
  showCompletedTasks: true,
  autoArchiveDays: 30,
  defaultPriority: 'medium',
};

const TaskSettingsPage: React.FC = () => {
  const { settings, loading, error, fetchSettings, updateSettings } = useTaskStore();
  const [form, setForm] = useState<TaskSettings>({ ...settings });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Sync form when settings load from API
  useEffect(() => {
    setForm({ ...settings });
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    await updateSettings(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = async () => {
    setForm({ ...DEFAULT_SETTINGS });
    await updateSettings(DEFAULT_SETTINGS);
    setSaved(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Task Settings</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Configure your task management preferences.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Display Settings */}
      <Card variant="elevated">
        <CardHeader divider>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
            Display Settings
          </h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-5">
          {/* Default View */}
          <Dropdown
            label="Default View"
            options={[
              { value: 'list', label: 'List View' },
              { value: 'board', label: 'Board View' },
            ]}
            value={form.defaultView}
            onChange={(v) => setForm((p) => ({ ...p, defaultView: v as 'list' | 'board' }))}
          />

          {/* Show Completed Tasks */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Show Completed Tasks
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Display tasks marked as "Done" in your task list.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={form.showCompletedTasks}
              onClick={() => setForm((p) => ({ ...p, showCompletedTasks: !p.showCompletedTasks }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.showCompletedTasks
                  ? 'bg-green-500'
                  : 'bg-neutral-300 dark:bg-neutral-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.showCompletedTasks ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Behavior Settings */}
      <Card variant="elevated">
        <CardHeader divider>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
            Behavior Settings
          </h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-5">
          {/* Default Priority */}
          <Dropdown
            label="Default Priority for New Tasks"
            options={TASK_PRIORITY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            value={form.defaultPriority}
            onChange={(v) => setForm((p) => ({ ...p, defaultPriority: v as TaskPriority }))}
          />

          {/* Auto Archive */}
          <Input
            label="Auto-archive completed tasks after (days)"
            type="number"
            min={1}
            max={365}
            value={String(form.autoArchiveDays)}
            onChange={(e) =>
              setForm((p) => ({ ...p, autoArchiveDays: parseInt(e.target.value) || 30 }))
            }
            helperText="Completed tasks will be archived automatically after this many days."
          />
        </CardBody>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="md"
          leftIcon={saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
        <Button
          variant="outline"
          size="md"
          leftIcon={<RotateCcw size={18} />}
          onClick={handleReset}
          disabled={saving}
        >
          Reset to Default
        </Button>
        {saved && (
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            ✓ Settings saved successfully
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskSettingsPage;

