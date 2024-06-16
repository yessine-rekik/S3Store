import React from 'react';

function Body({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '5rem',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        minHeight: '80vh',
      }}
    >
      {children}
    </div>
  );
}

export default Body;
