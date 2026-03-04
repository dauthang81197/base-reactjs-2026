import { create } from 'zustand';
import {
  taskService,
  tagService,
  taskSettingsService,
} from '../services/taskService';
import type { CreateTaskData, UpdateTaskData, CreateTagData, UpdateTagData } from '../services/taskService';
import type {
  Task,
  TaskFilters,
  TaskSettings,
  TaskDashboardData,
  TodayTasksData,
  TagWithCount,
} from '../features/Tasks/types';
import type { TaskTag } from '../features/Tasks/types';

// ── Store Interface ───────────────────────────────────────────────────────────
interface TaskStore {
  // State
  tasks: Task[];
  tags: TagWithCount[];
  filters: TaskFilters;
  settings: TaskSettings;

  // Dashboard & Today
  dashboardData: TaskDashboardData | null;
  todayData: TodayTasksData | null;

  // Loading & Error
  loading: boolean;
  error: string | null;

  // Pagination
  totalTasks: number;
  currentPage: number;
  totalPages: number;

  // Task CRUD (async)
  fetchTasks: (filters?: TaskFilters) => Promise<void>;
  fetchTask: (id: string) => Promise<Task | null>;
  addTask: (data: CreateTaskData) => Promise<Task | null>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<boolean>;

  // Tag CRUD (async)
  fetchTags: () => Promise<void>;
  addTag: (data: CreateTagData) => Promise<TaskTag | null>;
  updateTag: (id: string, data: UpdateTagData) => Promise<TaskTag | null>;
  deleteTag: (id: string) => Promise<boolean>;

  // Dashboard & Today (async)
  fetchDashboard: () => Promise<void>;
  fetchTodayTasks: () => Promise<void>;

  // Settings (async)
  fetchSettings: () => Promise<void>;
  updateSettings: (data: Partial<TaskSettings>) => Promise<void>;

  // Filters (local)
  setFilters: (filters: Partial<TaskFilters>) => void;
  resetFilters: () => void;

  // Helpers
  clearError: () => void;
}

const DEFAULT_FILTERS: TaskFilters = {
  status: 'all',
  priority: 'all',
  tagId: 'all',
  search: '',
};

const DEFAULT_SETTINGS: TaskSettings = {
  defaultView: 'list',
  showCompletedTasks: true,
  autoArchiveDays: 30,
  defaultPriority: 'medium',
};

// ── Store ─────────────────────────────────────────────────────────────────────
export const useTaskStore = create<TaskStore>()((set, get) => ({
  // Initial state
  tasks: [],
  tags: [],
  filters: { ...DEFAULT_FILTERS },
  settings: { ...DEFAULT_SETTINGS },
  dashboardData: null,
  todayData: null,
  loading: false,
  error: null,
  totalTasks: 0,
  currentPage: 1,
  totalPages: 1,

  // ── Fetch Tasks (paginated + filtered) ──────────────────────────
  fetchTasks: async (filters?: TaskFilters) => {
    set({ loading: true, error: null });
    try {
      const currentFilters = filters || get().filters;
      const params: Record<string, string | number | undefined> = {};

      if (currentFilters.search) params.search = currentFilters.search;
      if (currentFilters.status && currentFilters.status !== 'all') params.status = currentFilters.status;
      if (currentFilters.priority && currentFilters.priority !== 'all') params.priority = currentFilters.priority;
      if (currentFilters.tagId && currentFilters.tagId !== 'all') params.tagId = currentFilters.tagId;

      const response = await taskService.getTasks(params);
      if (response.success && response.data) {
        const paginated = response.data;
        set({
          tasks: paginated.data,
          totalTasks: paginated.total,
          currentPage: paginated.page,
          totalPages: paginated.pages,
          loading: false,
        });
      } else {
        set({ loading: false, error: 'Failed to fetch tasks' });
      }
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to fetch tasks' });
    }
  },

  // ── Fetch Single Task ───────────────────────────────────────────
  fetchTask: async (id: string) => {
    try {
      const response = await taskService.getTask(id);
      if (response.success && response.data) {
        return response.data;
      }
      return null;
    } catch {
      return null;
    }
  },

  // ── Create Task ─────────────────────────────────────────────────
  addTask: async (data: CreateTaskData) => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.createTask(data);
      if (response.success && response.data) {
        // Refresh tasks list
        await get().fetchTasks();
        set({ loading: false });
        return response.data;
      }
      set({ loading: false, error: 'Failed to create task' });
      return null;
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to create task' });
      return null;
    }
  },

  // ── Update Task ─────────────────────────────────────────────────
  updateTask: async (id: string, data: UpdateTaskData) => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.updateTask(id, data);
      if (response.success && response.data) {
        const updatedTask = response.data;
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? updatedTask : t)),
          loading: false,
        }));
        return updatedTask;
      }
      set({ loading: false, error: 'Failed to update task' });
      return null;
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to update task' });
      return null;
    }
  },

  // ── Delete Task ─────────────────────────────────────────────────
  deleteTask: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.deleteTask(id);
      if (response.success) {
        set((s) => ({
          tasks: s.tasks.filter((t) => t.id !== id),
          totalTasks: s.totalTasks - 1,
          loading: false,
        }));
        return true;
      }
      set({ loading: false, error: 'Failed to delete task' });
      return false;
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to delete task' });
      return false;
    }
  },

  // ── Fetch Tags ──────────────────────────────────────────────────
  fetchTags: async () => {
    set({ loading: true, error: null });
    try {
      const response = await tagService.getTags();
      if (response.success && response.data) {
        set({ tags: response.data, loading: false });
      } else {
        set({ loading: false, error: 'Failed to fetch tags' });
      }
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to fetch tags' });
    }
  },

  // ── Create Tag ──────────────────────────────────────────────────
  addTag: async (data: CreateTagData) => {
    set({ loading: true, error: null });
    try {
      const response = await tagService.createTag(data);
      if (response.success && response.data) {
        await get().fetchTags();
        set({ loading: false });
        return response.data;
      }
      set({ loading: false, error: 'Failed to create tag' });
      return null;
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to create tag' });
      return null;
    }
  },

  // ── Update Tag ──────────────────────────────────────────────────
  updateTag: async (id: string, data: UpdateTagData) => {
    set({ loading: true, error: null });
    try {
      const response = await tagService.updateTag(id, data);
      if (response.success && response.data) {
        const updatedTag = response.data;
        set((s) => ({
          tags: s.tags.map((t) =>
            t.id === id ? { ...t, ...updatedTag } : t
          ),
          loading: false,
        }));
        return updatedTag;
      }
      set({ loading: false, error: 'Failed to update tag' });
      return null;
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to update tag' });
      return null;
    }
  },

  // ── Delete Tag ──────────────────────────────────────────────────
  deleteTag: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await tagService.deleteTag(id);
      if (response.success) {
        set((s) => ({
          tags: s.tags.filter((t) => t.id !== id),
          loading: false,
        }));
        return true;
      }
      set({ loading: false, error: 'Failed to delete tag' });
      return false;
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to delete tag' });
      return false;
    }
  },

  // ── Fetch Dashboard ─────────────────────────────────────────────
  fetchDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.getDashboard();
      if (response.success && response.data) {
        set({ dashboardData: response.data, loading: false });
      } else {
        set({ loading: false, error: 'Failed to fetch dashboard' });
      }
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to fetch dashboard' });
    }
  },

  // ── Fetch Today Tasks ──────────────────────────────────────────
  fetchTodayTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.getTodayTasks();
      if (response.success && response.data) {
        set({ todayData: response.data, loading: false });
      } else {
        set({ loading: false, error: 'Failed to fetch today tasks' });
      }
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to fetch today tasks' });
    }
  },

  // ── Fetch Settings ──────────────────────────────────────────────
  fetchSettings: async () => {
    try {
      const response = await taskSettingsService.getSettings();
      if (response.success && response.data) {
        set({ settings: response.data });
      }
    } catch {
      // Keep default settings on error
    }
  },

  // ── Update Settings ─────────────────────────────────────────────
  updateSettings: async (data: Partial<TaskSettings>) => {
    set({ loading: true, error: null });
    try {
      const response = await taskSettingsService.updateSettings(data);
      if (response.success && response.data) {
        set({ settings: response.data, loading: false });
      } else {
        set({ loading: false, error: 'Failed to update settings' });
      }
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to update settings' });
    }
  },

  // ── Filters (local) ────────────────────────────────────────────
  setFilters: (filters: Partial<TaskFilters>) => {
    set((s) => ({ filters: { ...s.filters, ...filters } }));
  },

  resetFilters: () => {
    set({ filters: { ...DEFAULT_FILTERS } });
  },

  // ── Helpers ─────────────────────────────────────────────────────
  clearError: () => {
    set({ error: null });
  },
}));

export default useTaskStore;

