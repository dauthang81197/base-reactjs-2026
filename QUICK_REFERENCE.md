# Quick Reference Guide

## 🚀 Quick Start (5 minutes)

```bash
# Navigate to project
cd /Users/darius/project/pv/course/finance

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Visit: http://localhost:5173
```

## 📁 File Locations

| What | Where |
|------|-------|
| Components | `src/components/` |
| Pages | `src/pages/` |
| Features | `src/features/` |
| Store (State) | `src/store/financeStore.ts` |
| API Services | `src/services/` |
| Types | `src/types/index.ts` |
| Styles | `tailwind.config.js` + `src/index.css` |
| Routes | `src/AppRouter.tsx` |

## 🎯 Common Tasks

### Add a New Page

1. Create file: `src/pages/NewPage.tsx`
2. Add route in `src/AppRouter.tsx`
3. Add navigation in `src/layouts/Header.tsx`

```typescript
// src/AppRouter.tsx
<Route path="/newpage" element={<NewPage />} />
```

### Add a New Component

1. Create file: `src/components/NewComponent.tsx`
2. Export as React FC

```typescript
export const NewComponent: React.FC = () => {
  return <div>New Component</div>;
};
```

### Use Store in Component

```typescript
import { useFinanceStore } from '../store/financeStore';

const MyComponent = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const addTransaction = useFinanceStore(state => state.addTransaction);
  
  return <div>{transactions.length} transactions</div>;
};
```

### Add Form Validation

1. Define Zod schema in `src/utils/validation.ts`
2. Use in component with react-hook-form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const { register, handleSubmit, errors } = useForm({
  resolver: zodResolver(mySchema),
});
```

### Style a Component

Use TailwindCSS classes:

```typescript
<div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Hello
  </h1>
</div>
```

## 🔄 State Management Flow

```typescript
// 1. Get state
const state = useFinanceStore(state => state.transactions);

// 2. Get action
const addTransaction = useFinanceStore(state => state.addTransaction);

// 3. Call action
addTransaction({ amount: 100, type: 'income', ... });

// 4. Component re-renders with new state
```

## 🎨 Styling

### Colors
- `bg-primary-600` - Primary button
- `text-success-600` - Success text (green)
- `text-danger-600` - Danger text (red)
- `text-warning-600` - Warning text (amber)

### Responsive
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- `hidden md:block`
- `w-full md:w-1/2 lg:w-1/3`

### Dark Mode
- `dark:bg-gray-800`
- `dark:text-white`
- All colors have `dark:` variants

## 🧪 Testing the App

### Features to Try

1. **Dashboard**: Click on charts, see real-time updates
2. **Transactions**: Add/Edit/Delete transactions with filters
3. **Wallets**: Create and manage wallets
4. **Reports**: View trends and analytics
5. **Dark Mode**: Toggle theme in header
6. **Mobile**: Resize browser to test responsive design

### Test Data
- 6 pre-loaded transactions
- 3 wallets with balances
- 12 categories (income & expense)

## 📦 Dependencies Overview

```json
{
  "react": "UI library",
  "react-dom": "React for web",
  "react-router-dom": "Routing",
  "zustand": "State management",
  "react-hook-form": "Form management",
  "zod": "Validation",
  "axios": "HTTP client",
  "recharts": "Charts",
  "lucide-react": "Icons",
  "tailwindcss": "Styling"
}
```

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
# Kill process
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### TypeScript Errors
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run build
```

### Styles Not Applying
- Check Tailwind class names are correct
- Verify `src/index.css` has `@tailwind` directives
- Restart dev server

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app wrapper |
| `src/AppRouter.tsx` | Route configuration |
| `src/store/financeStore.ts` | Global state |
| `src/types/index.ts` | All types/interfaces |
| `src/components/Button.tsx` | Button component |
| `src/components/Card.tsx` | Card wrapper |
| `tailwind.config.js` | Tailwind config |
| `package.json` | Dependencies & scripts |

## 🎓 Learning Path

1. **Understand Structure**: Read `PROJECT_SUMMARY.md`
2. **Run App**: `npm run dev`
3. **Explore Components**: Open `src/components/`
4. **Modify Store**: Update `src/store/financeStore.ts`
5. **Add Feature**: Create in `src/features/`
6. **Test Build**: Run `npm run build`

## 🚢 Deployment

```bash
# Production build
npm run build

# Output: dist/ folder

# Deploy to Vercel
vercel

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

## 💡 Pro Tips

1. **Dark Mode Persistence**: Uses localStorage automatically
2. **Type Safety**: Use TypeScript for better IDE support
3. **Zustand Selectors**: Only subscribe to what you need
4. **Tailwind**: Use `dark:` prefix for dark mode variants
5. **React Router**: Use `<Link>` instead of `<a>` for internal navigation

## 📖 Documentation

- **Quick Start**: `README.md`
- **Setup Guide**: `SETUP_GUIDE.md`
- **Project Summary**: `PROJECT_SUMMARY.md`
- **This File**: `QUICK_REFERENCE.md`

---

**Ready to build! 🚀**

