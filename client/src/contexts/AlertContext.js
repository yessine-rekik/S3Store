import { createContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
  });

  const showAlert = (message) => {
    setAlert({
      open: true,
      message,
    });
  };

  const hideAlert = () => {
    setAlert({
      open: false,
      message: '',
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert.open && (
        <>
          <h3>{alert.message}</h3>
          <button onClick={hideAlert}>Close</button>
        </>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
