import { createContext, useEffect, useState } from 'react';
import { refreshToken as refreshTokenApi } from '../apis/apis';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await refreshTokenApi();
        setUser(response.data);
      } catch (err) {
        return;
      }
    };

    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
