import { Feed } from '@/page-components/Feed';
import Head from 'next/head';
import { useCurrentUser } from '@/lib/user';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const FeedPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const userRouteHandler = async (user) => {
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
    userRouteHandler(user);
  }, [router, user]);
  if (!isUser) return null;
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
