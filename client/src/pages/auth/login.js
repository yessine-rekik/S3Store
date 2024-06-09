import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { login } from '../../apis/apis';
import useAlert from '../../hooks/useAlert';
import { Button, Paper, TextField } from '@mui/material';
import Link from 'next/link';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { setUser } = useAuth();
  const { showAlert } = useAlert();
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      setUser(response.data);
      router.replace(router.query.from || '/');
    } catch (err) {
      showAlert(err.message);
    }
  };

  return (
    <Paper style={{ borderRadius: '1rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <h2>Login</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <TextField
            type="text"
            name="username"
            label="Username"
            value={credentials.username}
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            style={{ marginTop: '1rem' }}
            type="submit"
            variant="contained"
            fullWidth
          >
            Login
          </Button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '3rem',
              marginTop: '1rem',
            }}
          >
            <Link
              href="#"
              style={{ textDecoration: 'underline', color: 'inherit' }}
            >
              Forgot password?
            </Link>
            <Link
              href="/auth/register"
              style={{
                textDecoration: 'underline',
                color: 'inherit',
              }}
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </Paper>
  );
}

export default Login;
