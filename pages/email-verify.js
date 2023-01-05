import Head from 'next/head';
import EmailVerify from '@/page-components/Auth/EmailVerify';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EmailVerifyPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const userHandler = async (user) => {
    if (user === null) {
      await setIsUser(false);
      await router.replace('/');
    } else {
      if (user) {
        if (user?.emailVerified) {
          await setIsUser(false);
          await router.replace('/feed');
        } else {
          await setIsUser(true);
        }
      }
    }
  };
  useEffect(() => {
    userHandler(user);
  }, [user]);
  if (!isUser) return null;
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
