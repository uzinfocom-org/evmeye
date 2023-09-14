import { createBrowserRouter } from 'react-router-dom';
import HomeView from './views/HomeView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
  },
]);
