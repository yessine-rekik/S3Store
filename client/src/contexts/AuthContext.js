import { createContext, useEffect, useState } from 'react';
import axios from '../config/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axios.post('/refresh-token');
        setUser(response.data);
      } catch (err) {
        console.log(err);
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
