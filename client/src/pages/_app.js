import Footer from '../components/Footer';
import Header from '../components/Header';
import { AlertProvider } from '../contexts/AlertContext';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <AlertProvider>
          <Header />
          <Component {...pageProps} />
        </AlertProvider>
      </AuthProvider>
      <Footer />
    </>
  );
}

export default MyApp;
