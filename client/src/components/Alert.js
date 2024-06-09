import { Alert as MuiAlert } from '@mui/material';

function Alert({ severity, message, handleClose }) {
  return (
    <MuiAlert
      severity={severity}
      onClose={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {message}
    </MuiAlert>
  );
}

export default Alert;
