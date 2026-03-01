import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './pages/Dashboard';
import { CalendarPage } from './features/Calendar';
import {
  ExpenseOverviewPage,
  TransactionsPage,
  WalletsPage,
  BudgetsPage,
  CategoriesPage,
} from './features/Expenses';
import { FileManagerPage } from './features/FileManager';
import { NotesPage } from './features/Notes';
import { NotFound } from './pages/NotFound';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

// Auth pages
import {
  LoginPageV1,
  LoginPageV2,
  RegisterPageV1,
  RegisterPageV2,
  ForgotPasswordPageV1,
  ForgotPasswordPageV2,
  ResetPasswordPageV1,
  ResetPasswordPageV2,
  LockScreenPageV1,
  LockScreenPageV2,
} from './features/Auth';

// ── Placeholder Pages ─────────────────────────────────────────────────────────
// These are placeholder components for routes that don't have full implementations yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px]">
    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{title}</h2>
    <p className="text-neutral-500 dark:text-neutral-400">This page is under construction.</p>
  </div>
);

const TasksPage = () => <PlaceholderPage title="Tasks" />;
const EcommercePage = () => <PlaceholderPage title="E-Commerce" />;
const MailPage = () => <PlaceholderPage title="Mail" />;
const ChatPage = () => <PlaceholderPage title="Chat" />;
const ProjectsPage = () => <PlaceholderPage title="Projects" />;
const ContactsPage = () => <PlaceholderPage title="Contacts" />;

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Root redirect ── */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ── Auth Routes (Public) ── */}
        {/* Login */}
        <Route path="/auth/login" element={<PublicRoute><LoginPageV1 /></PublicRoute>} />
        <Route path="/auth/login-v2" element={<PublicRoute><LoginPageV2 /></PublicRoute>} />

        {/* Register */}
        <Route path="/auth/register" element={<PublicRoute><RegisterPageV1 /></PublicRoute>} />
        <Route path="/auth/register-v2" element={<PublicRoute><RegisterPageV2 /></PublicRoute>} />

        {/* Forgot Password */}
        <Route path="/auth/forgot-password" element={<PublicRoute><ForgotPasswordPageV1 /></PublicRoute>} />
        <Route path="/auth/forgot-password-v2" element={<PublicRoute><ForgotPasswordPageV2 /></PublicRoute>} />

        {/* Reset Password */}
        <Route path="/auth/reset-password" element={<PublicRoute><ResetPasswordPageV1 /></PublicRoute>} />
        <Route path="/auth/reset-password-v2" element={<PublicRoute><ResetPasswordPageV2 /></PublicRoute>} />

        {/* Lock Screen */}
        <Route path="/auth/lock-screen" element={<LockScreenPageV1 />} />
        <Route path="/auth/lock-screen-v2" element={<LockScreenPageV2 />} />

        {/* ── Protected Routes (Main Layout) ── */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/ecommerce" element={<EcommercePage />} />
          <Route path="/calendar" element={<CalendarPage />} />

          {/* ── Expenses routes ── */}
          <Route path="/expenses" element={<ExpenseOverviewPage />} />
          <Route path="/expenses/transactions" element={<TransactionsPage />} />
          <Route path="/expenses/wallets" element={<WalletsPage />} />
          <Route path="/expenses/budgets" element={<BudgetsPage />} />
          <Route path="/expenses/categories" element={<CategoriesPage />} />

          <Route path="/mail" element={<MailPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/file-manager" element={<FileManagerPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Route>

        {/* ── 404 Page ── */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;


