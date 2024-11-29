import './styles/reset.css';

import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from './contexts/authorization';

const NAVIGATION = [
  { kind: 'header', title: 'MENU' },
  { segment: '', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'lending', title: 'Empréstimos', icon: <AssignmentIcon /> },
  { segment: 'library', title: 'Acervo', icon: <BookmarkRoundedIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: '' },
  {
    segment: 'settings',
    title: 'Configurações',
    icon: <SettingsRoundedIcon />,
    children: [
      { segment: 'profile', title: 'Perfil', icon: <AccountCircleIcon /> },
      { segment: 'users', title: 'Usuários', icon: <ManageAccountsIcon /> },
    ],
  },
  { segment: 'logout', title: 'Sair', icon: <LogoutIcon /> },
];

function App() {
  const {logout, isAuthenticated} = useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  const router = React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => {
        if (path === "/settings") {
          return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
          };
        }

        if(path === "/logout") {
          logout()
          navigate("/login")
          
          return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
          };
        }
        navigate(path);
      },
    };
  }, [location, navigate]);

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
