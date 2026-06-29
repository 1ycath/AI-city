
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import BuildingDetail from './pages/BuildingDetail';
import Chat from './pages/Chat';
import Buildings from './pages/Buildings';
import SmartReport from './pages/SmartReport';
import SmartReportVoice from './pages/SmartReportVoice';
import SmartReportImage from './pages/SmartReportImage';
import SmartReportTable from './pages/SmartReportTable';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'map', element: <Map /> },
      { path: 'chat', element: <Chat /> },
      { path: 'smart-report', element: <SmartReport /> },
      { path: 'smart-report/voice', element: <SmartReportVoice /> },
      { path: 'smart-report/image', element: <SmartReportImage /> },
      { path: 'smart-report/table', element: <SmartReportTable /> },
      { path: 'building/:id', element: <BuildingDetail /> },
      { path: 'alerts', element: <Alerts /> },
      { path: 'buildings', element: <Buildings /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);
