import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/layout/layout';
import PostsPage from './pages/posts-page';
import PostDetailsPage from './pages/post-details-page';
import NotFoundPage from './pages/not-found-page';
import ProfilePage from './pages/profile-page';

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/posts" replace />,
      },
      {
        path: '/posts',
        element: <PostsPage />,
      },
      {
        path: '/posts/:postId',
        element: <PostDetailsPage />,
      },
      {
        path: '/my-profile',
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
