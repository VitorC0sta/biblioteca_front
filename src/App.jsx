import './styles/reset.css';

import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';


const NAVIGATION = [
  { kind: 'header', title: 'MENU' },
  { segment: '', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'categories', title: 'Categories', icon: <GridViewRoundedIcon /> },
  { segment: 'library', title: 'Library', icon: <BookmarkRoundedIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: '' },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsRoundedIcon />,
    children: [
      { segment: 'profile', title: 'Profile', icon: <AccountCircleIcon /> },
      { segment: 'users', title: 'Users', icon: <ManageAccountsIcon /> },
    ],
  },
  { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const router = React.useMemo(() => ({
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path) => navigate(path),
  }), [location, navigate]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        logo: '',
        title: 'Biblioteca',
      }}
    >
      <Outlet />
    </AppProvider>
  );
}

export default App;
