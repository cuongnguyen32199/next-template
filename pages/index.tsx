import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Layout from '../components/Layout';
import withAuth from '../middlewares/withAuth';

export default function Home() {
  return (
    <Layout>
      Home
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = (context: GetServerSidePropsContext) => withAuth(context);
