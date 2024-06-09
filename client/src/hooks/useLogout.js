import { logout as logoutApi } from '../apis/apis';
import useAlert from './useAlert';
import useAuth from './useAuth';

const useLogout = () => {
  const { setUser } = useAuth();
  const { showAlert } = useAlert();

  const logout = async () => {
    setUser(null);
    try {
      await logoutApi();
    } catch (err) {
      showAlert(err.message);
    }
  };

  return logout;
};

export default useLogout;
