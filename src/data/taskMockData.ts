import type { Task, TaskTag, TaskSettings } from '../features/Tasks/types';

// ── Default Tags ──────────────────────────────────────────────────────────────
export const mockTags: TaskTag[] = [
  { id: 'tag-1', name: 'Work', color: 'brand' },
  { id: 'tag-2', name: 'Study', color: 'info' },
  { id: 'tag-3', name: 'Personal', color: 'purple' },
  { id: 'tag-4', name: 'Health', color: 'success' },
  { id: 'tag-5', name: 'Finance', color: 'warning' },
  { id: 'tag-6', name: 'Urgent', color: 'danger' },
];

// ── Default Tasks ─────────────────────────────────────────────────────────────
export const mockTasks: Task[] = [

  {
    id: 'task-5',
    title: 'Book dentist appointment',
    description: 'Schedule a routine checkup for next week.',
    status: 'TODO',
    priority: 'LOW',
    dueDate: '2026-03-08',
    tags: ['tag-3', 'tag-4'],
    estimatedTime: 15,
    createdAt: '2026-03-03T12:00:00Z',
    updatedAt: '2026-03-03T12:00:00Z',
  },
  {
    id: 'task-6',
    title: 'Fix authentication bug',
    description: 'Google OAuth callback is not properly handling token refresh.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2026-03-04',
    tags: ['tag-1', 'tag-6'],
    estimatedTime: 90,
    createdAt: '2026-03-03T09:00:00Z',
    updatedAt: '2026-03-04T08:00:00Z',
  },
  {
    id: 'task-7',
    title: 'Read "Atomic Habits"',
    description: 'Finish chapters 7-10 this week.',
    status: 'TODO',
    priority: 'LOW',
    dueDate: '2026-03-09',
    tags: ['tag-2', 'tag-3'],
    estimatedTime: 60,
    createdAt: '2026-03-02T20:00:00Z',
    updatedAt: '2026-03-02T20:00:00Z',
  },
  {
    id: 'task-8',
    title: 'Submit tax documents',
    description: 'Upload all required documents for annual tax filing.',
    status: 'OVERDUE',
    priority: 'HIGH',
    dueDate: '2026-03-01',
    tags: ['tag-5', 'tag-6'],
    estimatedTime: 120,
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-03-01T23:59:00Z',
  },
  {
    id: 'task-9',
    title: 'Team standup meeting',
    description: 'Daily 15-min sync with the development team.',
    status: 'DONE',
    priority: 'MEDIUM',
    dueDate: '2026-03-04',
    tags: ['tag-1'],
    estimatedTime: 15,
    createdAt: '2026-03-04T08:45:00Z',
    updatedAt: '2026-03-04T09:00:00Z',
  },
  {
    id: 'task-10',
    title: 'Grocery shopping',
    description: 'Buy vegetables, fruits, and household essentials.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2026-03-05',
    tags: ['tag-3'],
    estimatedTime: 45,
    createdAt: '2026-03-04T07:00:00Z',
    updatedAt: '2026-03-04T07:00:00Z',
  },
];

// ── Default Settings ──────────────────────────────────────────────────────────
export const mockTaskSettings: TaskSettings = {
  defaultView: 'list',
  showCompletedTasks: true,
  autoArchiveDays: 30,
  defaultPriority: 'MEDIUM',
};

