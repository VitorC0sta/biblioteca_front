import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { Layout } from "../pages/layout";
import { Dashboard } from "../pages/dashboard";
import { Lending } from "../pages/lending";
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
            path: 'lending',
            element: <Lending />,
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
