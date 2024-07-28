import { createBrowserRouter } from 'react-router-dom';

import Dashboard from '@/src/application/pages/Dashboard';

import ErrorBoundary from '../components/Error/ErrorBoundary';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <Dashboard />, errorElement: <ErrorBoundary /> }],
  },
]);

export default router;
