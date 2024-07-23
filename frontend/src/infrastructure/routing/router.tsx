import { createBrowserRouter } from 'react-router-dom';

import Dashboard from '@/src/application/pages/Dashboard';

import Layout from '../layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <Dashboard /> }],
  },
]);

export default router;
