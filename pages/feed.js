import { Feed } from '@/page-components/Feed';
import Head from 'next/head';
import { useCurrentUser } from '@/lib/user';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const FeedPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (user === null) {
      router.replace('/');
    } else {
      if (user) {
        if (!user?.emailVerified) {
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
