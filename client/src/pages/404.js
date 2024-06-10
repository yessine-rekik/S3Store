import Link from 'next/link';
import Head from 'next/head';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>S3Store - 404 Not Found</title>
      </Head>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/">Go back to home</Link>
      </div>
    </>
  );
};

export default NotFoundPage;
