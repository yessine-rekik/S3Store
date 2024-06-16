import Head from 'next/head';
import Protect from '../../middlewares/Protect';

function Index() {
  return (
    <>
      <Head>
        <title>S3Store - My Files</title>
      </Head>
      <Protect>
        <h2>My Files</h2>
      </Protect>
    </>
  );
}

export default Index;
