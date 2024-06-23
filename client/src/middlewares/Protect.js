import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import Backdrop from '../components/Backdrop';

const Protect = ({ children }) => {
  const { user, isLoading, refreshToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) refreshToken();
  }, []);

  if (isLoading) return <Backdrop />;

  if (user) return children;

  router.replace('/auth/login');
};

export default Protect;
