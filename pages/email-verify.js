import Head from 'next/head';
import EmailVerify from '@/page-components/Auth/EmailVerify';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EmailVerifyPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.replace('/');
    } else if (user?.emailVerified) {
      router.replace('/feed');
    }
  }, [user]);
  return (
    user && (
      <>
        <Head>
          <title>Email Verification</title>
        </Head>
        <EmailVerify />
      </>
    )
  );
};
export default EmailVerifyPage;
