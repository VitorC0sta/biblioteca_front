import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { Layout } from "../pages/layout";
import { Dashboard, Home } from "../pages/dashboard";
import { Categories } from "../pages/categories";
import { Library } from "../pages/library";
import { Profile } from "../pages/profile";
import { Users } from "../pages/users";
import { NotFound } from "../pages/not-found";


const router = createBrowserRouter([
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
            element: <Dashboard />,
          },
          {
            path: 'categories',
            element: <Categories />,
          },
          {
            path: 'library',
            element: <Library />,
          },
          {
            path: 'settings/profile',
            element: <Profile />,
          },
          {
            path: 'settings/users',
            element: <Users />,
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
  return <RouterProvider router={router} />;
}
