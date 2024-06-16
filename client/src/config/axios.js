import axios from 'axios';
import config from '.';

function getBaseURL() {
  if (config.ENV === 'dev') return config.DEV_BASE_URL;
  if (config.ENV === 'staging') return config.STAGING_BASE_URL;
  if (config.ENV === 'prod') return config.PROD_BASE_URL;

  return config.DEV_BASE_URL;
}

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export default api;
