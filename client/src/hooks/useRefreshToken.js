import { refreshToken as refreshTokenApi } from '../apis/apis';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setUser } = useAuth();

  const refresh = async () => {
    try {
      const res = await refreshTokenApi();
      const user = res.data;
      setUser(user);
      return user;
    } catch (err) {
      setUser(null);
    }
  };

  return refresh;
};

export default useRefreshToken;
