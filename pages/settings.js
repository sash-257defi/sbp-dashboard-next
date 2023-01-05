import { Settings } from '@/page-components/Settings';
import Head from 'next/head';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SettingPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const userHandler = async () => {
    if (user === null) {
      await setIsUser(false);
      await router.replace('/');
    } else {
      if (user) {
        if (!user?.emailVerified) {
          await setIsUser(false);
          await router.replace('/email-verify');
        } else {
          await setIsUser(true);
        }
      }
    }
  };
  useEffect(() => {
    userHandler(user);
  }, [router, user]);
  if (!isUser) return null;
  return (
    user &&
    user?.emailVerified && (
      <>
        <Head>
          <title>Settings</title>
        </Head>
        <Settings />
      </>
    )
  );
};

export default SettingPage;
