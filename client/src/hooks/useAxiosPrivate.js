import { useEffect } from 'react';
import axios from '../config/axios';
import useAuth from './useAuth';

function useAxiosPrivate() {
  const { user, refreshToken } = useAuth();

  useEffect(() => {
    // If refresh token is not present in the cookie, reject request
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization)
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (err) => Promise.reject(err)
    );

    // If access token has expired, try to ask for a new one.
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevReq = err?.config;
        if (err?.response?.status === 401 && !prevReq.sent) {
          prevReq.sent = true;

          const { accessToken: newAccessToken } = await refreshToken();
          prevReq.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(prevReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, refreshToken]);

  return axios;
}

export default useAxiosPrivate;
