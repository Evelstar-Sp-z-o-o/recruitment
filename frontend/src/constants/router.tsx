import { createBrowserRouter } from 'react-router-dom';

import EditPost from '@/src/screens/EditPost';
import Home from '@/src/screens/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/edit/:id',
    element: <EditPost />,
  },
]);
