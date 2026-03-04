// ── Task Feature Types ─────────────────────────────────────────────────────────

export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'overdue';
export type TaskPriority = 'low' | 'medium' | 'high';

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

export interface TaskDashboardData {
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
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'overdue', label: 'Overdue' },
];

export const TASK_PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export const STATUS_COLOR_MAP: Record<TaskStatus, string> = {
  'todo': 'neutral',
  'in-progress': 'info',
  'done': 'success',
  'overdue': 'danger',
};

export const PRIORITY_COLOR_MAP: Record<TaskPriority, string> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
};

export const DEFAULT_TAG_COLORS = [
  'brand', 'success', 'warning', 'danger', 'info', 'coral', 'purple', 'cyan',
] as const;

