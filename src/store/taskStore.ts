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

// ── Raw API Response Type ─────────────────────────────────────────────────────
interface RawDashboardResponse {
  stats?: { total?: number; todo?: number; inProgress?: number; done?: number; overdue?: number; totalEstimatedMinutes?: number; todayTasks?: number };
  total?: number;
  todo?: number;
  inProgress?: number;
  done?: number;
  overdue?: number;
  totalEstimatedMinutes?: number;
  todayTasks?: number;
  completionRate?: { percentage?: number; completed?: number; totalEstimatedMinutes?: number; todayTasks?: number } | number;
  priorityBreakdown?: {
    high?: { count?: number } | number;
    medium?: { count?: number } | number;
    low?: { count?: number } | number;
  };
  upcomingDeadlines?: Task[];
  tagsOverview?: TagWithCount[];
}

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
  fetchTodayTasks: (date: Date) => Promise<void>;

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
  defaultPriority: 'MEDIUM',
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
          tasks: paginated.items || [],
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
        // Normalize raw API response → UI-friendly shape
        const raw = response.data as RawDashboardResponse;
        const stats = raw.stats ?? raw;
        const cr = raw.completionRate ?? {};
        const crObj = typeof cr === 'object' ? cr : {};
        const pb = raw.priorityBreakdown ?? {};
        const normalized: TaskDashboardData = {
          total: stats.total ?? 0,
          todo: stats.todo ?? 0,
          inProgress: stats.inProgress ?? 0,
          done: stats.done ?? crObj.completed ?? 0,
          overdue: stats.overdue ?? 0,
          completionRate: typeof cr === 'object' ? (cr.percentage ?? 0) : (cr ?? 0),
          totalEstimatedMinutes: crObj.totalEstimatedMinutes ?? stats.totalEstimatedMinutes ?? 0,
          todayTasks: crObj.todayTasks ?? stats.todayTasks ?? 0,
          priorityBreakdown: {
            high: typeof pb.high === 'object' ? (pb.high?.count ?? 0) : (pb.high ?? 0),
            medium: typeof pb.medium === 'object' ? (pb.medium?.count ?? 0) : (pb.medium ?? 0),
            low: typeof pb.low === 'object' ? (pb.low?.count ?? 0) : (pb.low ?? 0),
          },
          upcomingDeadlines: raw.upcomingDeadlines ?? [],
          tagsOverview: raw.tagsOverview ?? [],
        };
        set({ dashboardData: normalized, loading: false });
      } else {
        set({ loading: false, error: 'Failed to fetch dashboard' });
      }
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to fetch dashboard' });
    }
  },

  // ── Fetch Today Tasks ──────────────────────────────────────────
  fetchTodayTasks: async (date: Date) => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.getTodayTasks(date);
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

