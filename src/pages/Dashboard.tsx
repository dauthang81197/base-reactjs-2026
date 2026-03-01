import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import {
  DollarSign, TrendingUp, Users, Download, MoreHorizontal, Calendar
} from 'lucide-react';
import { Card } from '../components/Card';
import { Avatar } from '../design-system/components/atoms/Avatar';
import { Dropdown } from '../design-system/components/molecules/Dropdown';
import {
  statCards,
  statisticsChartData,
  analyticsChartData,
  analyticsMetrics,
  salesData,
  horizontalStatsData,
  lastOrders,
  transactions,
  dateFilterOptions,
} from '../data/dashboardMockData';

// ── Colors ────────────────────────────────────────────────────────────────────
const CHART_COLORS = {
  primary: '#1C3B2E',
  accent: '#5BC8AF',
  income: '#5BC8AF',
  expense: '#1C3B2E',
  line: '#5BC8AF',
};

// ── Stat Card Icon Component ──────────────────────────────────────────────────
const StatIcon: React.FC<{ type: 'dollar' | 'chart' | 'users' }> = ({ type }) => {
  const iconClass = "w-5 h-5";
  const bgColors = {
    dollar: 'bg-emerald-100 text-emerald-600',
    chart: 'bg-blue-100 text-blue-600',
    users: 'bg-amber-100 text-amber-600',
  };

  return (
    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${bgColors[type]}`}>
      {type === 'dollar' && <DollarSign className={iconClass} />}
      {type === 'chart' && <TrendingUp className={iconClass} />}
      {type === 'users' && <Users className={iconClass} />}
    </div>
  );
};

// ── Dashboard Page ────────────────────────────────────────────────────────────
export const DashboardPage: React.FC = () => {
  const [dateFilter, setDateFilter] = useState('7days');
  const [statisticsDateRange] = useState('19 Aug - 25 Aug');

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Overview
        </h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700">
            <Download size={16} />
            Export
          </button>
          <Dropdown
            options={dateFilterOptions}
            value={dateFilter}
            onChange={setDateFilter}
            size="md"
            className="w-40"
          />
        </div>
      </div>

      {/* ── Top Statistic Cards ── */}
      <div className="dashboard-grid">
        {statCards.map((stat) => (
          <div key={stat.id} className="dashboard-col-4">
            <Card className="h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {stat.value}
                    </span>
                    <span className={`text-sm font-medium ${stat.changeType === 'positive'
                        ? 'text-emerald-600'
                        : 'text-red-600'
                      }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <StatIcon type={stat.icon} />
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* ── Charts Section: Statistics & Analytics ── */}
      <div className="dashboard-grid">
        {/* Statistics Bar Chart */}
        <div className="dashboard-col-6">
          <Card
            header={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Statistics
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5BC8AF]" />
                      2,500
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1C3B2E]" />
                      1,200
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Calendar size={14} />
                  {statisticsDateRange}
                </div>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={statisticsChartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="income" fill={CHART_COLORS.income} radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill={CHART_COLORS.expense} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="w-3 h-3 rounded bg-[#5BC8AF]" />
                Income
              </span>
              <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="w-3 h-3 rounded bg-[#1C3B2E]" />
                Expense
              </span>
            </div>
          </Card>
        </div>

        {/* Analytics Line Chart */}
        <div className="dashboard-col-6">
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Analytics
                </h3>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Calendar size={14} />
                  19 Aug - 25 Aug
                </div>
              </div>
            }
          >
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-emerald-100 text-emerald-600">
                  <TrendingUp size={14} />
                </span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {analyticsMetrics.income}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-red-100 text-red-600">
                  <TrendingUp size={14} className="rotate-180" />
                </span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {analyticsMetrics.expense}
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={analyticsChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.accent} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={CHART_COLORS.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={CHART_COLORS.accent}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* ── Sales & Statistics Section ── */}
      <div className="dashboard-grid">
        {/* Sales Donut Chart */}
        <div className="dashboard-col-4">
          <Card
            header={
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Sales
              </h3>
            }
          >
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Current Week', value: salesData.currentWeek },
                        { name: 'Last Week', value: salesData.lastWeek },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill={CHART_COLORS.accent} />
                      <Cell fill="#E5E7EB" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                    {(salesData.total / 1000).toFixed(3)}
                  </span>
                  <span className="text-sm text-neutral-500">Total</span>
                </div>
              </div>
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5BC8AF]" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Current Week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {salesData.currentWeek.toLocaleString()}
                    </span>
                    <span className="text-sm text-emerald-600">{salesData.currentWeekChange}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Last Week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {salesData.lastWeek.toLocaleString()}
                    </span>
                    <span className="text-sm text-emerald-600">{salesData.lastWeekChange}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Horizontal Statistics Chart */}
        <div className="dashboard-col-8">
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Statistics
                </h3>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5BC8AF]" />
                    Income
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                    Expense
                  </span>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Calendar size={14} />
                    19 Aug - 25 Aug
                  </div>
                </div>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={horizontalStatsData}
                layout="vertical"
                barGap={2}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="income" fill={CHART_COLORS.accent} radius={[0, 4, 4, 0]} />
                <Bar dataKey="expense" fill="#F97316" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* ── Last Orders & Transactions ── */}
      <div className="dashboard-grid">
        {/* Last Orders Table */}
        <div className="dashboard-col-8">
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Last Orders
                </h3>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Calendar size={14} />
                  19 Aug - 25 Aug
                </div>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">
                      Customer Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">
                      Order No.
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">
                      Payment Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lastOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar
                            size="sm"
                            name={order.customerName}
                            color="coral"
                          />
                          <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            {order.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                        {order.orderNo}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white">
                        ${order.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                        {order.paymentType}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Transactions List */}
        <div className="dashboard-col-4">
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Transactions
                </h3>
                <button className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="sm"
                      name={transaction.name}
                      color={transaction.type === 'payment' ? 'coral' : 'purple'}
                    />
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {transaction.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {transaction.time} — {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${transaction.type === 'payment'
                      ? 'text-emerald-600'
                      : 'text-red-500'
                    }`}>
                    {transaction.type === 'payment' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};


