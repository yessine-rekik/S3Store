import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { AppBar, Toolbar } from '@mui/material';
import {
  Description,
  Home,
  Login,
  Logout,
  PersonAdd,
} from '@mui/icons-material';
import NavbarItem from './NavbarItem';

const Header = () => {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <AppBar position="static" style={{ backgroundColor: '#29335c' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <NavbarItem href={'/'} text={'Home'} Icon={Home} />
        <NavbarItem href={'/files'} text={'Files'} Icon={Description} />
        {!user && (
          <>
            <NavbarItem href={'/auth/login'} text={'Login'} Icon={Login} />
            <NavbarItem
              href={'/auth/register'}
              text={'Register'}
              Icon={PersonAdd}
            />
          </>
        )}
        {user && (
          <div
            onClick={logout}
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Logout />
            <h4>Logout</h4>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
