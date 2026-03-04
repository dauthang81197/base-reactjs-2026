import { apiClient } from './api';
import type { ApiResponse, PaginatedResponse } from '../types';
import type { Task, TaskTag, TaskSettings } from '../features/Tasks/types';

// ── Filter Types ──────────────────────────────────────────────────────────────
export interface TaskFilters {
  search?: string;
  status?: string;
  priority?: string;
  tagId?: string;
  page?: number;
  limit?: number;
}

// ── Create / Update DTOs ──────────────────────────────────────────────────────
export interface CreateTaskData {
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
  estimatedMinutes: number;
  tagIds?: string[];
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  estimatedMinutes?: number;
  tagIds?: string[];
}

export interface CreateTagData {
  name: string;
  color: string;
}

export interface UpdateTagData {
  name?: string;
  color?: string;
}

// ── Dashboard Response Types ──────────────────────────────────────────────────
export interface TaskDashboardStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
  completionRate: number;
  totalEstimatedMinutes: number;
  priorityBreakdown: {
    high: number;
    medium: number;
    low: number;
  };
  upcomingDeadlines: Task[];
  tagsOverview: Array<TaskTag & { taskCount: number }>;
}

export interface TodayTasksResponse {
  tasks: Task[];
  stats: {
    total: number;
    completed: number;
    remainingMinutes: number;
    totalMinutes: number;
  };
}

export interface TagWithCount extends TaskTag {
  taskCount: number;
}

// ── Task Service ──────────────────────────────────────────────────────────────
export const taskService = {
  /**
   * Get all tasks with pagination and filters
   * GET /flower/tasks?search=&status=&priority=&tagId=&page=&limit=
   */
  async getTasks(filters?: TaskFilters): Promise<ApiResponse<PaginatedResponse<Task>>> {
    return apiClient.get('/flower/tasks', { params: filters });
  },

  /**
   * Get single task by ID
   * GET /flower/tasks/:id
   */
  async getTask(id: string): Promise<ApiResponse<Task>> {
    return apiClient.get(`/flower/tasks/${id}`);
  },

  /**
   * Get today's tasks + stats
   * GET /flower/tasks/today
   */
  async getTodayTasks(): Promise<ApiResponse<TodayTasksResponse>> {
    return apiClient.get('/flower/tasks/today');
  },

  /**
   * Get task dashboard stats
   * GET /flower/tasks/dashboard
   */
  async getDashboard(): Promise<ApiResponse<TaskDashboardStats>> {
    return apiClient.get('/flower/tasks/dashboard');
  },

  /**
   * Create a new task
   * POST /flower/tasks
   */
  async createTask(data: CreateTaskData): Promise<ApiResponse<Task>> {
    return apiClient.post('/flower/tasks', data);
  },

  /**
   * Update a task (partial update)
   * PATCH /flower/tasks/:id
   */
  async updateTask(id: string, data: UpdateTaskData): Promise<ApiResponse<Task>> {
    return apiClient.patch(`/flower/tasks/${id}`, data);
  },

  /**
   * Delete a task
   * DELETE /flower/tasks/:id
   */
  async deleteTask(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete(`/flower/tasks/${id}`);
  },
};

// ── Tag Service ───────────────────────────────────────────────────────────────
export const tagService = {
  /**
   * Get all tags (with task count)
   * GET /flower/tags
   */
  async getTags(): Promise<ApiResponse<TagWithCount[]>> {
    return apiClient.get('/flower/tags');
  },

  /**
   * Get single tag by ID
   * GET /flower/tags/:id
   */
  async getTag(id: string): Promise<ApiResponse<TaskTag>> {
    return apiClient.get(`/flower/tags/${id}`);
  },

  /**
   * Create a new tag
   * POST /flower/tags
   */
  async createTag(data: CreateTagData): Promise<ApiResponse<TaskTag>> {
    return apiClient.post('/flower/tags', data);
  },

  /**
   * Update a tag (partial update)
   * PATCH /flower/tags/:id
   */
  async updateTag(id: string, data: UpdateTagData): Promise<ApiResponse<TaskTag>> {
    return apiClient.patch(`/flower/tags/${id}`, data);
  },

  /**
   * Delete a tag
   * DELETE /flower/tags/:id
   */
  async deleteTag(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete(`/flower/tags/${id}`);
  },
};

// ── Task Settings Service ─────────────────────────────────────────────────────
export const taskSettingsService = {
  /**
   * Get task settings
   * GET /flower/task-settings
   */
  async getSettings(): Promise<ApiResponse<TaskSettings>> {
    return apiClient.get('/flower/task-settings');
  },

  /**
   * Update task settings (partial)
   * PATCH /flower/task-settings
   */
  async updateSettings(data: Partial<TaskSettings>): Promise<ApiResponse<TaskSettings>> {
    return apiClient.patch('/flower/task-settings', data);
  },
};

