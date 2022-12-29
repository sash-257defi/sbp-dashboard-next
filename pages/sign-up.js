import { SignUp } from '@/page-components/Auth';
import Head from 'next/head';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignupPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    const routHandler = async () => {
      if (user) {
        await router.replace('/');
      }
    };
    void routHandler();
  }, [user]);
  return (
    !user && (
      <>
        <Head>
          <title>Sign up</title>
        </Head>
        <SignUp />
      </>
    )
  );
};

export default SignupPage;
