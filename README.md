# Personal Finance Management Application

A modern, production-ready Personal Finance Management application built with React 18, Vite, TypeScript, and TailwindCSS.

## 🚀 Features

### Dashboard
- **Total Balance**: Real-time sum of all wallets
- **Monthly Income**: Current month's income transactions
- **Monthly Expense**: Current month's expense transactions
- **Expense by Category**: Pie chart visualization
- **Income vs Expense**: Bar chart comparison

### Transactions
- ✅ Add transactions (Income/Expense)
- ✅ Edit transactions
- ✅ Delete transactions
- ✅ Filter by date range, category, type, wallet
- ✅ Pagination support

### Wallets
- ✅ Create multiple wallets (Cash, Bank, E-wallet)
- ✅ View wallet balance
- ✅ Manage wallet details
- ✅ Delete wallets

### Reports
- ✅ Monthly trends
- ✅ Yearly breakdown
- ✅ Trend line charts
- ✅ Income/Expense summary

### Additional Features
- 🌓 Dark mode support
- 📱 Fully responsive design
- ✔️ Form validation with Zod
- 🎯 Clean, modular architecture
- ⚡ Fast with Vite
- 🏗️ Scalable folder structure

## 📦 Tech Stack

- React 18+, Vite, TypeScript, TailwindCSS
- React Router v6, Zustand, Recharts
- Axios, React Hook Form, Zod, Lucide React

## 🚀 Quick Start

```bash
cd finance
npm install
npm run dev
```

Visit `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── features/          # Feature-based modules
├── layouts/           # Layout components
├── pages/             # Page components
├── store/             # Zustand store
├── services/          # API & data services
├── types/             # TypeScript types
├── utils/             # Utility functions
├── hooks/             # Custom hooks
└── App.tsx
```

**Happy managing your finances! 💰**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
