# Personal Finance Management Application - Setup Guide

## 📋 Table of Contents

1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Architecture Overview](#architecture-overview)
4. [Key Features](#key-features)
5. [State Management](#state-management)
6. [Component Examples](#component-examples)
7. [API Integration](#api-integration)
8. [Dark Mode](#dark-mode)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

## 🚀 Installation

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Step 1: Navigate to Project

```bash
cd /Users/darius/project/pv/course/finance
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Step 4: Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 📁 Project Structure

### Root Level
```
finance/
├── src/                      # Source code
├── public/                   # Static assets
├── dist/                     # Production build
├── node_modules/             # Dependencies
├── tailwind.config.js        # TailwindCSS configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project metadata
├── .env.example              # Environment variables template
└── README.md                 # Documentation
```

### Source Code Structure

```
src/
├── components/               # Reusable UI components
│   ├── Alert.tsx            # Alert/notification component
│   ├── Button.tsx           # Button component
│   ├── Card.tsx             # Card wrapper component
│   ├── DashboardStats.tsx   # Dashboard stats cards
│   ├── ExpenseChart.tsx     # Pie chart for expenses
│   ├── IncomeExpenseChart.tsx # Bar chart comparison
│   ├── Input.tsx            # Input field component
│   ├── LoadingSpinner.tsx   # Loading indicator
│   ├── Select.tsx           # Select dropdown
│   ├── ThemeToggle.tsx      # Dark mode toggle
│   └── TransactionList.tsx  # Transaction table
│
├── features/                 # Feature-based modules
│   ├── Transactions/        # Transactions feature
│   │   ├── TransactionModal.tsx
│   │   └── index.tsx
│   ├── Wallets/             # Wallets feature
│   │   └── index.tsx
│   └── Reports/             # Reports feature
│       └── index.tsx
│
├── layouts/                  # Layout components
│   ├── Header.tsx           # Navigation header
│   └── MainLayout.tsx       # Main layout wrapper
│
├── pages/                    # Page components
│   ├── Dashboard.tsx        # Dashboard page
│   └── NotFound.tsx         # 404 page
│
├── store/                    # State management
│   └── financeStore.ts      # Zustand store
│
├── services/                 # API & data services
│   ├── api.ts               # API client
│   ├── transactionService.ts
│   ├── walletService.ts
│   ├── categoryService.ts
│   └── mockData.ts          # Mock data
│
├── types/                    # TypeScript interfaces
│   └── index.ts
│
├── utils/                    # Utility functions
│   ├── helpers.ts           # Helper functions
│   └── validation.ts        # Zod schemas
│
├── hooks/                    # Custom React hooks
│   └── index.ts
│
├── App.tsx                   # Main app component
├── AppRouter.tsx            # Router configuration
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## 🏗️ Architecture Overview

### Layered Architecture

1. **Presentation Layer** (`components/`, `pages/`, `layouts/`)
   - React components for UI
   - Handles user interactions
   - Displays data

2. **State Management Layer** (`store/`)
   - Zustand store
   - Global state
   - Business logic

3. **Service Layer** (`services/`)
   - API communication
   - Data fetching
   - Mock data

4. **Type Layer** (`types/`)
   - TypeScript interfaces
   - Type definitions
   - Enums

### Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Store Action (Zustand)
    ↓
State Updated
    ↓
Component Re-renders
```

## 🎯 Key Features

### 1. Dashboard
- Real-time financial overview
- Summary statistics (balance, income, expense)
- Visual charts (pie & bar)
- Recent transactions list

### 2. Transactions Management
- Add/Edit/Delete transactions
- Filter by type, category, date, wallet
- Pagination support
- Modal form with validation

### 3. Wallet Management
- Multiple wallets support
- View balances
- Manage wallet details
- Delete wallets

### 4. Reports & Analytics
- Monthly trends
- Yearly breakdown
- Income vs Expense comparison
- Detailed breakdown table

### 5. User Experience
- Dark mode toggle
- Responsive design
- Form validation
- Loading states
- Error handling

## 🔄 State Management

### Zustand Store Structure

```typescript
// Location: src/store/financeStore.ts

interface FinanceStore {
  // State
  transactions: Transaction[];
  wallets: Wallet[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  
  // Transaction Actions
  addTransaction: (transaction) => void;
  updateTransaction: (id, transaction) => void;
  deleteTransaction: (id) => void;
  
  // Wallet Actions
  addWallet: (wallet) => void;
  updateWallet: (id, wallet) => void;
  deleteWallet: (id) => void;
  
  // Computed Properties
  getTotalBalance: () => number;
  getMonthlyIncome: () => number;
  getMonthlyExpense: () => number;
  getExpenseByCategory: () => Array<...>;
  getFilteredTransactions: () => Transaction[];
}
```

### Using Store in Components

```typescript
import { useFinanceStore } from '../store/financeStore';

export const MyComponent = () => {
  // Access state
  const transactions = useFinanceStore(state => state.transactions);
  
  // Access actions
  const addTransaction = useFinanceStore(state => state.addTransaction);
  
  // Computed values
  const totalBalance = useFinanceStore(state => state.getTotalBalance());
  
  return (
    <div>
      {/* Use state and actions */}
    </div>
  );
};
```

## 💻 Component Examples

### Example 1: Using DashboardStats

```typescript
import { DashboardStats } from './components/DashboardStats';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>
      <DashboardStats />
    </div>
  );
};
```

### Example 2: Creating a Transaction Modal

```typescript
import { TransactionModal } from './features/Transactions/TransactionModal';

export const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add Transaction</button>
      {isOpen && (
        <TransactionModal
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
```

### Example 3: Using Charts

```typescript
import { ExpenseChart } from './components/ExpenseChart';
import { IncomeExpenseChart } from './components/IncomeExpenseChart';

export const ReportsPage = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <ExpenseChart />
      <IncomeExpenseChart />
    </div>
  );
};
```

### Example 4: Form with Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../utils/validation';
import { Input, Select, Button } from '../components';

export const TransactionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Amount"
        type="number"
        register={register('amount')}
        error={errors.amount}
      />
      <Select
        label="Type"
        options={[
          { value: 'income', label: 'Income' },
          { value: 'expense', label: 'Expense' },
        ]}
        register={register('type')}
        error={errors.type}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

## 🔌 API Integration

### API Client

```typescript
// Location: src/services/api.ts

import { apiClient } from './api';

// GET request
const response = await apiClient.get('/endpoint');

// POST request
const response = await apiClient.post('/endpoint', data);

// PUT request
const response = await apiClient.put('/endpoint/123', data);

// DELETE request
const response = await apiClient.delete('/endpoint/123');
```

### Service Pattern

```typescript
// Location: src/services/transactionService.ts

export const transactionService = {
  async getTransactions(filters?) {
    return apiClient.get('/transactions', { params: filters });
  },
  
  async createTransaction(data) {
    return apiClient.post('/transactions', data);
  },
  
  // More methods...
};
```

### Using Services

```typescript
import { transactionService } from '../services/transactionService';

const MyComponent = () => {
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await transactionService.getTransactions({
        type: 'income',
      });
      console.log(response.data);
    };
    
    fetchTransactions();
  }, []);
};
```

## 🌙 Dark Mode

### How It Works

Dark mode is managed with a custom hook and localStorage:

```typescript
// src/hooks/index.ts

export const useDarkMode = () => {
  const [isDark, setIsDark] = useLocalStorage('dark-mode', false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);
  return { isDark, toggle };
};
```

### Toggle Dark Mode

```typescript
import { ThemeToggle } from './components/ThemeToggle';

// Use in your layout
<ThemeToggle />
```

### Using Dark Mode in Components

```typescript
// TailwindCSS dark mode classes
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deployment Options

#### 1. Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### 2. Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

#### 3. GitHub Pages
- Build: `npm run build`
- Deploy `dist/` folder

#### 4. Traditional Hosting
- Build project: `npm run build`
- Upload `dist/` folder to server
- Configure server for SPA (single-page app)

## 📝 Mock Data

The application includes pre-loaded mock data:

```typescript
// src/services/mockData.ts

mockTransactions = [
  { id: '1', amount: 5000, type: 'income', category: 'Salary', ... },
  { id: '2', amount: 1500, type: 'expense', category: 'Food & Dining', ... },
  // More transactions...
];

mockWallets = [
  { id: '1', name: 'Cash Wallet', type: 'cash', balance: 2000, ... },
  { id: '2', name: 'Bank Account', type: 'bank', balance: 15000, ... },
  { id: '3', name: 'E-Wallet', type: 'e-wallet', balance: 5000, ... },
];

mockCategories = [
  // Income categories
  { id: '1', name: 'Salary', type: 'income', icon: '💼', ... },
  // Expense categories
  { id: '5', name: 'Food & Dining', type: 'expense', icon: '🍔', ... },
  // More categories...
];
```

No backend required! The app works completely with mock data.

## ⚙️ Configuration

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

### TypeScript Configuration

Adjust `tsconfig.json` as needed for strict type checking.

### TailwindCSS Customization

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },
      success: { ... },
      danger: { ... },
    },
  },
},
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# Or use different port
npm run dev -- --port 3000
```

#### 2. TypeScript Errors
```bash
# Clear TypeScript cache
rm -rf node_modules/.vite
npm run build
```

#### 3. Dark Mode Not Working
- Check browser localStorage
- Verify TailwindCSS config has `darkMode: 'class'`
- Check `html` tag has `dark` class

#### 4. Build Fails
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Router Documentation](https://reactrouter.com)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

## 🎓 Learning Path

1. **Understand React Basics**
   - Components
   - Hooks (useState, useEffect)
   - Props & State

2. **Learn Project Structure**
   - Feature-based organization
   - Separation of concerns
   - Reusable components

3. **Master State Management**
   - Zustand store
   - Selectors
   - Actions

4. **Explore Features**
   - Dashboard
   - Transactions
   - Wallets
   - Reports

5. **Customize & Extend**
   - Add new features
   - Modify existing features
   - Style adjustments

## 🤝 Contributing

To extend this project:

1. Create new feature folder in `src/features/`
2. Add corresponding types in `src/types/`
3. Create store actions if needed
4. Build components
5. Add routes in `AppRouter.tsx`

## 📄 License

MIT License - Feel free to use this template!

---

**Happy coding! 💰📊**

