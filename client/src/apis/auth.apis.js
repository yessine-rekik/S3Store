import axios from '../config/axios';

const serviceEndpoint = '/auth';

export async function login(credentials) {
  return await axios.post(serviceEndpoint + '/login', credentials);
}

export async function register(credentials) {
  return await axios.post(serviceEndpoint + '/register', credentials);
}

export async function logout() {
  return await axios.post(serviceEndpoint + '/logout');
}

export async function refreshToken() {
  return await axios.post(serviceEndpoint + '/refresh-token');
}
