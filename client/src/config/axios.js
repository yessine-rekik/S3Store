import axios from 'axios';
import config from '.';

const api = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

export default api;
