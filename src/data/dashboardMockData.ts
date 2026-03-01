// ── Dashboard Mock Data ────────────────────────────────────────────────────────

export interface StatCard {
    id: string;
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: 'dollar' | 'chart' | 'users';
}

export interface ChartDataPoint {
    name: string;
    income: number;
    expense: number;
}

export interface AnalyticsDataPoint {
    date: string;
    value: number;
    label?: string;
}

export interface SalesData {
    total: number;
    currentWeek: number;
    currentWeekChange: string;
    lastWeek: number;
    lastWeekChange: string;
}

export interface HorizontalStatItem {
    label: string;
    income: number;
    expense: number;
}

export interface Order {
    id: string;
    customerName: string;
    customerAvatar?: string;
    orderNo: string;
    amount: number;
    paymentType: string;
    date: string;
}

export interface TransactionItem {
    id: string;
    name: string;
    time: string;
    date: string;
    amount: number;
    type: 'payment' | 'refund';
    avatar?: string;
}

// ── Stat Cards ─────────────────────────────────────────────────────────────────
export const statCards: StatCard[] = [
    {
        id: 'total-income',
        title: 'Total Income',
        value: '$8,500',
        change: '↑ 50.8%',
        changeType: 'positive',
        icon: 'dollar',
    },
    {
        id: 'total-sales',
        title: 'Total Sales',
        value: '3,500K',
        change: '↑ 10.5%',
        changeType: 'positive',
        icon: 'chart',
    },
    {
        id: 'new-clients',
        title: 'New Clients',
        value: '2,500K',
        change: '↑ 24.9%',
        changeType: 'positive',
        icon: 'users',
    },
];

// ── Statistics Bar Chart Data ──────────────────────────────────────────────────
export const statisticsChartData: ChartDataPoint[] = [
    { name: 'Mon', income: 320, expense: 180 },
    { name: 'Tue', income: 280, expense: 120 },
    { name: 'Wed', income: 180, expense: 80 },
    { name: 'Thu', income: 200, expense: 100 },
    { name: 'Fri', income: 420, expense: 220 },
    { name: 'Sat', income: 280, expense: 140 },
    { name: 'Sun', income: 180, expense: 90 },
];

// ── Analytics Line Chart Data ──────────────────────────────────────────────────
export const analyticsChartData: AnalyticsDataPoint[] = [
    { date: 'Mon', value: 5850 },
    { date: 'Tue', value: 4200 },
    { date: 'Wed', value: 3800, label: '$1,000' },
    { date: 'Thu', value: 4500 },
    { date: 'Fri', value: 5200 },
    { date: 'Sat', value: 4800 },
    { date: 'Sun', value: 1750 },
];

export const analyticsMetrics = {
    income: '$5,850',
    expense: '$1,750',
    highlight: {
        value: '$1,000',
        date: '22 August, 2019',
    },
};

// ── Sales Donut Chart Data ─────────────────────────────────────────────────────
export const salesData: SalesData = {
    total: 3500,
    currentWeek: 2500,
    currentWeekChange: '+8.8%',
    lastWeek: 1000,
    lastWeekChange: '+6.9%',
};

// ── Horizontal Statistics Data ─────────────────────────────────────────────────
export const horizontalStatsData: HorizontalStatItem[] = [
    { label: '25', income: 2500, expense: 1200 },
    { label: '24', income: 2100, expense: 800 },
    { label: '23', income: 1800, expense: 600 },
    { label: '22', income: 1500, expense: 400 },
    { label: '21', income: 1200, expense: 300 },
    { label: '20', income: 900, expense: 200 },
    { label: '19', income: 600, expense: 100 },
];

// ── Last Orders ────────────────────────────────────────────────────────────────
export const lastOrders: Order[] = [
    {
        id: '1',
        customerName: 'Regina Cooper',
        orderNo: '#780841',
        amount: 2500,
        paymentType: 'Credit Card',
        date: '12.09.2019',
    },
    {
        id: '2',
        customerName: 'Robert Edwards',
        orderNo: '#709894',
        amount: 1500,
        paymentType: 'PayPal',
        date: '12.09.2019',
    },
    {
        id: '3',
        customerName: 'Gloria Mckinney',
        orderNo: '#780857',
        amount: 5600,
        paymentType: 'Credit Card',
        date: '12.09.2018',
    },
    {
        id: '4',
        customerName: 'Randall Fisher',
        orderNo: '#780687',
        amount: 2850,
        paymentType: 'PayPal',
        date: '12.09.2018',
    },
];

// ── Transactions ───────────────────────────────────────────────────────────────
export const transactions: TransactionItem[] = [
    {
        id: '1',
        name: 'Devon Williamson',
        time: '08:00 AM',
        date: '19 August',
        amount: 1400,
        type: 'payment',
    },
    {
        id: '2',
        name: 'Debra Wilson',
        time: '09:45 AM',
        date: '19 August',
        amount: 850,
        type: 'refund',
    },
    {
        id: '3',
        name: 'Judith Black',
        time: '10:15 AM',
        date: '20 August',
        amount: 2050,
        type: 'payment',
    },
    {
        id: '4',
        name: 'Philip Henry',
        time: '10:50 AM',
        date: '23 August',
        amount: 650,
        type: 'payment',
    },
    {
        id: '5',
        name: 'Mitchell Cooper',
        time: '12:45 AM',
        date: '25 August',
        amount: 800,
        type: 'payment',
    },
];

// ── Date Filter Options ────────────────────────────────────────────────────────
export const dateFilterOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'year', label: 'This year' },
];

// ── Navigation Items for Sidebar ───────────────────────────────────────────────
export const sidebarNavItems = [
    { key: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { key: '/tasks', label: 'Task', icon: 'tasks' },
    { key: '/ecommerce', label: 'E-Commerce', icon: 'ecommerce' },
    { key: '/calendar', label: 'Calendar', icon: 'calendar' },
    { key: '/mail', label: 'Mail', icon: 'mail', badge: 1 },
    { key: '/chat', label: 'Chat', icon: 'chat' },
    { key: '/projects', label: 'Projects', icon: 'projects' },
    { key: '/file-manager', label: 'File Manager', icon: 'files' },
    { key: '/notes', label: 'Notes', icon: 'notes' },
    { key: '/contacts', label: 'Contacts', icon: 'contacts' },
];
