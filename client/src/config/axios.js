import axios from 'axios';
import config from '.';

function getBaseURL() {
  switch (config.ENV) {
    case 'dev':
      return config.DEV_BASE_URL;

    case 'staging':
      return config.STAGING_BASE_URL;

    case 'prod':
      return config.PROD_BASE_URL;

    default:
      return config.DEV_BASE_URL;
  }
}

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export default api;
