import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { usePostPages } from '@/lib/post';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Poster.module.css';
import InputBox from '@/components/Input/InputBox';

const PosterInner = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const { mutate } = usePostPages();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fetcher('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content }),
      });
      toast.success('You have posted successfully');
      setContent('');
      // refresh post lists
      mutate();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Container className={styles.poster}>
        <Avatar size={40} username={user.username} url={user.profilePicture} />
        <InputBox
          className={styles.input}
          label={`What's on your mind, ${user.name}?`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          size={'small'}
        />
        <Button type="success" loading={isLoading}>
          Post
        </Button>
      </Container>
    </form>
  );
};

const Poster = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        <h3 className={styles.heading}>Share your thoughts</h3>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner user={data.user} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
            to post
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
