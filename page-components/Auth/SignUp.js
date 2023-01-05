import { Button } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';
import InputBox from '@/components/Input/InputBox';

const SignUp = () => {
  const { data: { user } = {}, mutate } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace('/');
    } else {
      setIsUser(true);
    }
  }, [router, user]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetcher('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
          username: username,
        }),
      });
      mutate({ user: response.user }, false);
      toast.success('Your account has been created');
      setEmail('');
      setPassword('');
      setName('');
      setUsername('');
      // router.replace('/feed');
      router.replace('/email-verify');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const emailHandler = (e) => {
    const value = e.target.value;
    if (value) {
      if (validateEmail(value)) {
        setIsEmailError(false);
        setEmail(value);
      } else {
        setEmail(value);
        setIsEmailError(true);
      }
    } else {
      setIsEmailError(false);
      setEmail('');
    }
  };
  const passwordHandler = (e) => {
    const value = e.target.value;
    if (value) {
      if (value?.length >= 7) {
        setIsError(false);
        setPassword(value);
      } else {
        setPassword(value);
        setIsError(true);
      }
    } else {
      setIsError(false);
      setPassword('');
    }
  };
  const userNameHandler = (e) => {
    const value = e.target.value;
    if (value) {
      if (value?.length >= 4) {
        setIsUserError(false);
        setUsername(value);
      } else {
        setIsUserError(true);
        setUsername(value);
      }
    } else {
      setIsUserError(false);
      setUsername('');
    }
  };
  if (!isUser) return null;
  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        <div className={styles.main_sub}>
          <h1 className={styles.title}>Join Now</h1>
          <form onSubmit={onSubmit}>
            <Container alignItems="center">
              <p className={styles.subtitle}>Your login</p>
              <div className={styles.seperator} />
            </Container>
            <InputBox
              htmlType="email"
              autoComplete="email"
              size="large"
              required
              label={'Email Address'}
              error={isEmailError}
              errorMessage="Please Enter Valid Email Address"
              value={email}
              onChange={emailHandler}
            />
            <Spacer size={0.5} axis="vertical" />
            <InputBox
              htmlType="password"
              autoComplete="new-password"
              size="large"
              required
              label={'Password'}
              value={password}
              onChange={passwordHandler}
              error={isError}
              errorMessage="Password length must be at least 7 characters"
            />
            <Spacer size={0.75} axis="vertical" />
            <Container alignItems="center">
              <p className={styles.subtitle}>About you</p>
              <div className={styles.seperator} />
            </Container>
            <InputBox
              autoComplete="username"
              size="large"
              required
              label={'Username'}
              value={username}
              // onChange={(e) => setUsername(e.target.value)}
              onChange={userNameHandler}
              error={isUserError}
              errorMessage={'UserName must be at least 4 characters'}
            />
            <Spacer size={0.5} axis="vertical" />
            <InputBox
              autoComplete="name"
              size="large"
              required
              label={'Your Name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Spacer size={1} axis="vertical" />
            <Button
              htmlType="submit"
              className={styles.submit}
              type="success"
              size="large"
              loading={isLoading}
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
      <div className={styles.footer}>
        <Link href="/login" passHref>
          <TextLink color="link" variant="highlight">
            Already have an account? Log in
          </TextLink>
        </Link>
      </div>
    </Wrapper>
  );
};

export default SignUp;
