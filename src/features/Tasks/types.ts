// ── Task Feature Types ─────────────────────────────────────────────────────────

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'OVERDUE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TaskTag {
  id: string;
  name: string;
  color: string; // badge color key: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'coral' | 'purple' | 'cyan'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO date string
  tags: string[]; // tag IDs
  estimatedTime: number; // minutes
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  status?: TaskStatus | 'all';
  priority?: TaskPriority | 'all';
  tagId?: string | 'all';
  search?: string;
}

export interface TaskSettings {
  defaultView: 'list' | 'board';
  showCompletedTasks: boolean;
  autoArchiveDays: number;
  defaultPriority: TaskPriority;
}

// ── API Response Types ────────────────────────────────────────────────────────

/** Raw shape returned from GET /flower/tasks/dashboard */
export interface TaskDashboardApiResponse {
  percentage: number;
  completed: number;
  total: number;
  totalEstimatedMinutes: number;
  todayTasks: number;
  todo?: number;
  inProgress?: number;
  overdue?: number;
  priorityBreakdown?: {
    high: number;
    medium: number;
    low: number;
  };
  upcomingDeadlines?: Task[];
  tagsOverview?: Array<TaskTag & { taskCount: number }>;
}

/** Normalized dashboard data used by the UI */
export interface TaskDashboardData {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
  completionRate: number;
  totalEstimatedMinutes: number;
  todayTasks: number;
  priorityBreakdown: {
    high: number;
    medium: number;
    low: number;
  };
  upcomingDeadlines: Task[];
  tagsOverview: Array<TaskTag & { taskCount: number }>;
}

export interface TodayTasksData {
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

// ── Constants ─────────────────────────────────────────────────────────────────

export const TASK_STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'TODO', label: 'Todo' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' },
  { value: 'OVERDUE', label: 'Overdue' },
];

export const TASK_PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

export const STATUS_COLOR_MAP: Record<TaskStatus, string> = {
  'TODO': 'neutral',
  'IN_PROGRESS': 'info',
  'DONE': 'success',
  'OVERDUE': 'danger',
};

export const PRIORITY_COLOR_MAP: Record<TaskPriority, string> = {
  'LOW': 'success',
  'MEDIUM': 'warning',
  'HIGH': 'danger',
};

export const DEFAULT_TAG_COLORS = [
  'brand', 'success', 'warning', 'danger', 'info', 'coral', 'purple', 'cyan',
] as const;

