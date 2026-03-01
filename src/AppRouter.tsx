import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './pages/Dashboard';
import { CalendarPage } from './features/Calendar';
import { NotFound } from './pages/NotFound';

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
const FileManagerPage = () => <PlaceholderPage title="File Manager" />;
const NotesPage = () => <PlaceholderPage title="Notes" />;
const ContactsPage = () => <PlaceholderPage title="Contacts" />;

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Root redirect ── */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ── Main Layout with nested routes ── */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/ecommerce" element={<EcommercePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
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


