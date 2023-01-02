import React, { useEffect } from 'react';
import { findUserByUsername } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { User } from '@/page-components/User';
import Head from 'next/head';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';

export default function UserPage({ user }) {
  const { data } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (data?.user === null) {
      router.replace('/');
    } else if (!data?.user?.emailVerified) {
      router.replace('/email-verify');
    }
  }, [data]);
  return (
    data?.user && (
      <>
        <Head>
          <title>
            {user.name} (@{user.username})
          </title>
        </Head>
        <User user={user} />
      </>
    )
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const user = await findUserByUsername(db, context.params.username);
  if (!user) {
    return {
      notFound: true,
    };
  }
  user._id = String(user._id);
  return { props: { user } };
}
