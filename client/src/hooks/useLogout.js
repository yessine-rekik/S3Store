import axios from '../config/axios';
import useAlert from './useAlert';
import useAuth from './useAuth';

const useLogout = () => {
  const { setUser } = useAuth();
  const { showAlert } = useAlert();

  const logout = async () => {
    setUser(null);
    try {
      await axios.post('/logout');
    } catch (err) {
      showAlert(err.message);
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
