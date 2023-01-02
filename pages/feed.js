import { Feed } from '@/page-components/Feed';
import Head from 'next/head';
import { useCurrentUser } from '@/lib/user';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const FeedPage = () => {
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
    user.emailVerified && (
      <>
        <Head>
          <title>Feed</title>
        </Head>
        <Feed />
      </>
    )
  );
};

export default FeedPage;
