import { createContext, useEffect, useState } from 'react';
import { refreshToken as refreshTokenApi } from '../apis/auth.apis';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const res = await refreshTokenApi();
      const user = res.data;
      setUser(res.data);
      return user;
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
