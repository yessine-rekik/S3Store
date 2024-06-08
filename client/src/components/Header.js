import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const Header = () => {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/files">Files</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
              <li>
                <Link href="/auth/register">Register</Link>
              </li>
            </>
          )}
          {user && (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
