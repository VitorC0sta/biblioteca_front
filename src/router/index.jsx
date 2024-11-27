import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from '../pages/login';
import { Dashboard } from '../pages/dashboard';
import { Layout } from '../pages/layout';
import { Lending } from '../pages/lending';
import { Library } from '../pages/library';
import { Profile } from '../pages/profile';
import { Users } from '../pages/users';
import { NotFound } from '../pages/not-found';
import { AuthProvider } from '../contexts/authorization';
import { ProtectedRoute } from '../middlewares/protectRoute';
import App from "../App";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <ProtectedRoute element={<Dashboard />} />,
          },
          {
            path: 'lending',
            element: <ProtectedRoute element={<Lending />} />,
          },
          {
            path: 'library',
            element: <ProtectedRoute element={<Library />} />,
          },
          {
            path: 'settings/profile',
            element: <ProtectedRoute element={<Profile />} />,
          },
          {
            path: 'settings/users',
            element: <ProtectedRoute element={<Users />} />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
