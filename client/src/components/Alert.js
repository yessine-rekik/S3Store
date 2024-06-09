import { Alert as MuiAlert } from '@mui/material';

function Alert({ severity, message, handleClose }) {
  return (
    <MuiAlert severity={severity} onClose={handleClose}>
      {message}
    </MuiAlert>
  );
}

export default Alert;
