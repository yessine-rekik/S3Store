import { createContext, useState } from 'react';
import Alert from '../components/Alert';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const showAlert = (message, severity = 'error') => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  const hideAlert = () => {
    setAlert({
      open: false,
      message: null,
      severity: null,
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert.open && (
        <Alert
          severity={alert.severity}
          message={alert.message}
          handleClose={hideAlert}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
