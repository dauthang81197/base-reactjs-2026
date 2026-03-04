import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo,
  Loader,
  TrendingUp,
  Calendar,
  Flame,
  RefreshCw,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../../design-system/components/atoms/Card';
import { Badge } from '../../../design-system/components/atoms/Badge';
import { Button } from '../../../design-system/components/atoms/Button';
import { useTaskStore } from '../../../store/taskStore';
import { STATUS_COLOR_MAP, PRIORITY_COLOR_MAP } from '../types';

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatMinutes = (min: number) => {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// ── Page ──────────────────────────────────────────────────────────────────────
const TaskDashboardPage: React.FC = () => {
  const { dashboardData, loading, error, fetchDashboard } = useTaskStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size={32} className="animate-spin text-neutral-400" />
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
        <AlertTriangle size={48} className="mb-3 text-red-400" />
        <p className="text-lg font-medium text-red-500">Failed to load dashboard</p>
        <p className="text-sm mt-1">{error}</p>
        <Button variant="outline" size="md" leftIcon={<RefreshCw size={16} />} onClick={() => fetchDashboard()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const stats = dashboardData || {
    total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0,
    completionRate: 0, totalEstimatedMinutes: 0, todayTasks: 0,
    priorityBreakdown: { high: 0, medium: 0, low: 0 },
    upcomingDeadlines: [],
    tagsOverview: [],
  };

  const completionRate = stats.completionRate;
  const upcomingTasks = stats.upcomingDeadlines || [];
  const tagBreakdown = stats.tagsOverview || [];

  const priorityBreakdown = [
    { key: 'high', label: 'High', count: stats.priorityBreakdown.high },
    { key: 'medium', label: 'Medium', count: stats.priorityBreakdown.medium },
    { key: 'low', label: 'Low', count: stats.priorityBreakdown.low },
  ];

  const getTagById = (tagId: string) => tagBreakdown.find((t) => t.id === tagId);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Task Dashboard</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Overview of your task management
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fetchDashboard()}
          disabled={loading}
          aria-label="Refresh"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: ListTodo, color: 'text-neutral-600', bg: 'bg-neutral-100 dark:bg-neutral-800' },
          { label: 'Todo', value: stats.todo, icon: ListTodo, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'In Progress', value: stats.inProgress, icon: Loader, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
          { label: 'Done', value: stats.done, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Overdue', value: stats.overdue, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map((stat) => (
          <Card key={stat.label} variant="outlined">
            <CardBody className="p-4 flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-neutral-500">{stat.label}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Progress & Estimates Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Completion Progress */}
        <Card variant="elevated">
          <CardHeader divider>
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-neutral-500" />
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
                Completion Rate
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl font-bold text-neutral-900 dark:text-white">{completionRate}%</span>
              <span className="text-sm text-neutral-500">
                {stats.done} of {stats.total} tasks
              </span>
            </div>
            <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <div className="flex justify-between mt-3 text-xs text-neutral-500">
              <span>Total estimate: {formatMinutes(stats.totalEstimatedMinutes)}</span>
              <span>Today: {stats.todayTasks} task{stats.todayTasks !== 1 ? 's' : ''}</span>
            </div>
          </CardBody>
        </Card>

        {/* Priority Breakdown */}
        <Card variant="elevated">
          <CardHeader divider>
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-neutral-500" />
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
                Priority Breakdown
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-3">
              {priorityBreakdown.map((item) => {
                const pct = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                const colorMap: Record<string, string> = {
                  high: 'bg-red-500',
                  medium: 'bg-yellow-500',
                  low: 'bg-green-500',
                };
                return (
                  <div key={item.key}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="subtle"
                          color={PRIORITY_COLOR_MAP[item.key as keyof typeof PRIORITY_COLOR_MAP] as 'brand'}
                          size="sm"
                        >
                          {item.label}
                        </Badge>
                      </div>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {item.count} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${colorMap[item.key]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming Tasks */}
        <Card variant="elevated" className="lg:col-span-2">
          <CardHeader divider>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-neutral-500" />
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
                Upcoming Deadlines
              </h2>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            {upcomingTasks.length === 0 ? (
              <div className="py-12 text-center text-neutral-400">
                <p className="text-sm">No upcoming deadlines</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="subtle" color={STATUS_COLOR_MAP[task.status] as 'brand'} size="sm">
                          {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </Badge>
                        {task.tags.slice(0, 2).map((tagId) => {
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
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {formatDate(task.dueDate)}
                      </p>
                      {task.estimatedTime > 0 && (
                        <p className="text-xs text-neutral-400 flex items-center gap-1 justify-end mt-0.5">
                          <Clock size={12} /> {formatMinutes(task.estimatedTime)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Tags Overview */}
        <Card variant="elevated">
          <CardHeader divider>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
              Tags Overview
            </h2>
          </CardHeader>
          <CardBody>
            {tagBreakdown.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-6">No tags yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {tagBreakdown.map((tag) => (
                  <div key={tag.id} className="flex items-center justify-between">
                    <Badge variant="subtle" color={tag.color as 'brand'} size="sm">
                      {tag.name}
                    </Badge>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {tag.taskCount} task{tag.taskCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TaskDashboardPage;

