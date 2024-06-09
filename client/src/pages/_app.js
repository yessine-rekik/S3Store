import { useState } from 'react';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { AlertProvider } from '../contexts/AlertContext';
import { AuthProvider } from '../contexts/AuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import darkTheme from '../themes/darkTheme';
import lightTheme from '../themes/lightTheme';
import ToggleTheme from '../components/ToggleTheme';

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <AuthProvider>
        <AlertProvider>
          <Header />
          <ToggleTheme
            darkMode={darkMode}
            handleToggle={() => setDarkMode((darkMode) => !darkMode)}
          />
          <Body>
            <Component {...pageProps} />
          </Body>
        </AlertProvider>
      </AuthProvider>
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
