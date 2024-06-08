import axios from '../../config/axios';

export async function login(credentials) {
  return await axios.post('/login', credentials);
}

export async function register(credentials) {
  return await axios.post('/register', credentials);
}

export async function logout() {
  return await axios.post('/logout');
}

export async function refreshToken() {
  return await axios.post('/refresh-token');
}
