import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { OverviewPage } from './features/overview/OverviewPage';
import { LibraryViewPage } from './features/library-view/LibraryViewPage';
import { FloorManagementPage } from './features/floor-management/FloorManagementPage';
import { SeatsUsersPage } from './features/seats-users/SeatsUsersPage';
import { NoiseMonitoringPage } from './features/noise-monitoring/NoiseMonitoringPage';
import { AnalyticsPage } from './features/analytics/AnalyticsPage';
import { ReportsPage } from './features/reports/ReportsPage';
import { SettingsPage } from './features/settings/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="library-view" element={<LibraryViewPage />} />
          <Route path="floor-management" element={<FloorManagementPage />} />
          <Route path="seats-users" element={<SeatsUsersPage />} />
          <Route path="noise-monitoring" element={<NoiseMonitoringPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
