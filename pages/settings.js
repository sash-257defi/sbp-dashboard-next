import { Settings } from '@/page-components/Settings';
import Head from 'next/head';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SettingPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.replace('/');
    } else if (!user?.emailVerified) {
      router.replace('/email-verify');
    }
  }, [router, user]);
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
