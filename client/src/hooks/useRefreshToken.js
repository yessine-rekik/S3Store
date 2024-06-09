import axios from '../config/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setUser } = useAuth();

  const refresh = async () => {
    try {
      const res = await axios.post('/refresh-token');
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
