import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import Backdrop from '../components/Backdrop';
import useRefreshToken from '../hooks/useRefreshToken';
import useAlert from '../hooks/useAlert';

const Protect = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const refresh = useRefreshToken();
  const router = useRouter();
  const { showAlert } = useAlert();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        showAlert(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    !user ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  if (isLoading) return <Backdrop />;

  if (user) return children;

  router.replace('/auth/login');
};

export default Protect;
