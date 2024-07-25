import { createBrowserRouter } from "react-router-dom";
import PostList from "../components/PostList";
import Login from "../components/LoginComponent";
import ProtectedRoute from "./ProtectedRoute";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      
        <PostList />
      
    ),
  },
  {
    path: "/posts",
    element: (
      <ProtectedRoute>
        <PostList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
