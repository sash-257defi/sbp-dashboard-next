import { Settings } from '@/page-components/Settings';
import Head from 'next/head';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SettingPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (user === null) {
      router.replace('/');
    } else {
      if (user) {
        if (!user?.emailVerified) {
          setIsUser(false);
          router.replace('/email-verify');
        } else {
          setIsUser(true);
        }
      }
    }
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
