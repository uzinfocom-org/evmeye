import { createBrowserRouter } from 'react-router-dom';
import HomeView from '@/views/HomeView';
import ScannerSettingsView from '@/views/settings/ScannerSettingsView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
  },
  {
    path: '/settings/scanner',
    element: <ScannerSettingsView />,
  },
]);
