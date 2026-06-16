
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import BuildingDetail from './pages/BuildingDetail';
import Chat from './pages/Chat';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'map', element: <Map /> },
      { path: 'chat', element: <Chat /> },
      { path: 'building/:id', element: <BuildingDetail /> },
      { path: 'alerts', element: <Alerts /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);
