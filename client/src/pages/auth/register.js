import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { Button, Paper, TextField } from '@mui/material';
import { register } from '../../apis/auth.apis';
import useAlert from '../../hooks/useAlert';
import Link from 'next/link';
import Head from 'next/head';

function Register() {
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
      const response = await register(credentials);

      setUser(response.data);
      router.replace(router.query.from || '/');
    } catch (err) {
      showAlert(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>S3Store - Register</title>
      </Head>
      <Paper style={{ borderRadius: '1rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <h2>Register</h2>

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
              Register
            </Button>

            <Link
              style={{
                marginLeft: '10rem',
                marginTop: '1rem',
                textDecoration: 'underline',
                color: 'inherit',
              }}
              href="/auth/login"
            >
              Already have an account? Login
            </Link>
          </form>
        </div>
      </Paper>
    </>
  );
}

export default Register;
