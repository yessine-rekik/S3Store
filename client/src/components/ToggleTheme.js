import { DarkMode, LightMode } from '@mui/icons-material';
import React from 'react';

function ToggleTheme({ darkMode, handleToggle }) {
  return (
    <div
      style={{
        display: 'flex',
        margin: '1.5rem',
        justifyContent: 'end',
      }}
      onClick={handleToggle}
    >
      <div style={{ cursor: 'pointer' }}>
        {darkMode ? <DarkMode /> : <LightMode />}
      </div>
    </div>
  );
}

export default ToggleTheme;
