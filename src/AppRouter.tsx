import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './pages/Dashboard';
import { TransactionsPage } from './features/Transactions';
import { WalletsPage } from './features/Wallets';
import { ReportsPage } from './features/Reports';
import { NotFound } from './pages/NotFound';

function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/wallets" element={<WalletsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRouter;


