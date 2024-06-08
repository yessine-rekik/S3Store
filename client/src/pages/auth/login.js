import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { login } from './apis';
import useAlert from '../../hooks/useAlert';

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
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Login;
