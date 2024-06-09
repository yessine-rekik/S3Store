import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { AppBar, Button, Toolbar } from '@mui/material';
import {
  Description,
  Home,
  Login,
  Logout,
  PersonAdd,
} from '@mui/icons-material';

const Header = () => {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <AppBar position="static" style={{ backgroundColor: '#29335c' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Button color="inherit" startIcon={<Home />}>
            Home
          </Button>
        </Link>
        <Link href="/files" style={{ textDecoration: 'none', color: 'white' }}>
          <Button color="inherit" startIcon={<Description />}>
            Files
          </Button>
        </Link>
        {!user && (
          <>
            <Link
              href="/auth/login"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button color="inherit" startIcon={<Login />}>
                Login
              </Button>
            </Link>
            <Link
              href="/auth/register"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button color="inherit" startIcon={<PersonAdd />}>
                Register
              </Button>
            </Link>
          </>
        )}
        {user && (
          <Button color="inherit" startIcon={<Logout />} onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
